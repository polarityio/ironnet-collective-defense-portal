'use strict';
const { validateOptions, parseUserOptionLists } = require('./src/userOptions');
const getLookupResults = require('./src/getLookupResults');
const {
  splitOutIgnoredIps,
  standardizeEntityTypes,
  parseErrorToReadableJSON
} = require('./src/dataTransformations');
const { last, slice, concat } = require('lodash/fp');
const createRequestWithDefaults = require('./src/request/createRequestWithDefaults');
const getOnMessage = require('./src/onMessage');

let logger = console;
const startup = (_logger) => {
  logger = _logger;
};

/** REQUIREMENTS:
 * QUERY CHANNELS:
 * We need to develop an integration with Microsoft Teams that allows users to query data in all channels or in specific channels.
 *
 * INCOMING WEBHOOK URI:
 *
 * https://breachintelligence.webhook.office.com/webhookb2/d41799e1-7c9b-42ae-bcf3-84b9bbf16a8a@7e686b3f-8a04-4cc8-87c4-191ef767f0c9/IncomingWebhook/18149951b1a64c4699373c7610236a5a/fd30d8e1-e9b8-4134-84fc-0199c7b88a2f
 * Users should also be able to push information to a Teams channel from the overlay window with a send to teams button -
 * that sends the information from the details view through to the channel that is specified in the overlay window.
 * If this is not possible we just have a text box that accepts information from users to push to the channel.
 * The integration should look up all entity types an allText entity type.
 *
 * DOCS:
 * https://learn.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook:
 * allows external app to POST content to team channels
 */

//TODO: Auth flow:
//** Register App with identity platform,
//** Get access token from microsoft identity platform
//** access as service or app??
//** what requestOptions?

const Logger = (...args) => {
  const lastArg = last(args);
  const lastArgIsLevel = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'].includes(
    lastArg
  );
  const loggingLevel = lastArgIsLevel ? lastArg : 'info';
  const logArgs = lastArgIsLevel ? slice(0, -1, args) : args;
  logger[loggingLevel](...logArgs);
};

const doLookup = async (entities, options, cb) => {
  try {
    Logger({ entities }, 'Entities', 'debug');

    const { entitiesPartition, ignoredIpLookupResults } = splitOutIgnoredIps(entities);
    const entitiesWithCustomTypesSpecified = standardizeEntityTypes(entitiesPartition);
    const optionsWithUpdatedLists = await parseUserOptionLists(options);

    const lookupResults = concat(
      await getLookupResults(entitiesWithCustomTypesSpecified, optionsWithUpdatedLists),
      ignoredIpLookupResults
    );

    Logger({ lookupResults }, 'Lookup Results', 'trace');
    cb(null, lookupResults);
  } catch (error) {
    const err = parseErrorToReadableJSON(error);

    Logger({ error, formattedError: err }, 'Get Lookup Results Failed', 'error');
    cb({ detail: error.message || 'Lookup Failed', err });
  }
};

const onMessage = ({ action, data: actionParams }, options, callback) =>
  getOnMessage[action](actionParams, options, callback);

module.exports = {
  startup,
  validateOptions,
  doLookup,
  onMessage,
  Logger
};
