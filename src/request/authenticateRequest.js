const { ConfidentialClientApplication } = require('@azure/msal-node');
const { get, flow, pick, join, concat, values } = require('lodash/fp');
const { mapObject } = require('../dataTransformations');

//**TODO: look into on-prem MSAL permissions  */

const NodeCache = require('node-cache');
const clientCache = new NodeCache();
const tokenCache = new NodeCache({
  stdTTL: 30 * 60
});

const authenticateRequest = async ({ site, route, options, ...requestOptions }) => {
  const { Logger } = require('../../integration');
  const accessToken = await getToken(site, options);
  Logger({ accessToken }, 'token', 'trace');

  return {
    ...requestOptions,
    url: urlBySite[site] + route,
    headers: {
      ...requestOptions.headers,
      Authorization: `Bearer ${accessToken}`
    }
  };
};

const getToken = async (site, options) => {
  const clientCacheId = flow(
    pick(['clientId', 'tenantId', 'clientSecret']),
    values,
    join(''),
    concat(site),
    join('')
  )(options);

  const client = await getClient(clientCacheId, options);

  const accessToken = await getAccessToken(clientCacheId, client, site);

  return accessToken;
};

const getClient = async (clientCacheId, options) => {
  let client = clientCache.get(clientCacheId);
  if (!client) {
    const config = {
      auth: {
        clientId: options.clientId,
        authority: urlBySite.login + options.tenantId,
        clientSecret: options.clientSecret
      }
    };
    client = new ConfidentialClientApplication(config);
    clientCache.set(clientCacheId, client);
  }
  return client;
};

const getAccessToken = async (clientCacheId, client, site) => {
  let accessToken = tokenCache.get(clientCacheId);
  if (!accessToken) {
    accessToken = get(
      'accessToken',
      await client.acquireTokenByClientCredential({ scopes: [scopesBySite[site]] })
    );

    tokenCache.set(clientCacheId, accessToken);
  }
  return accessToken;
};

const urlBySite = {
  teams: 'https://graph.microsoft.com/',
  login: 'https://login.microsoftonline.com/',
  baseUrl:
    'https://breachintelligence.webhook.office.com/webhookb2/d41799e1-7c9b-42ae-bcf3-84b9bbf16a8a@7e686b3f-8a04-4cc8-87c4-191ef767f0c9/IncomingWebhook/18149951b1a64c4699373c7610236a5a/fd30d8e1-e9b8-4134-84fc-0199c7b88a2f'
};

const scopesBySite = mapObject((value, key) => [key, `${value}.default`], urlBySite);

module.exports = authenticateRequest;
