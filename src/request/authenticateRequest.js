const authenticateRequest = async ({
  queryBuilder,
  page = 0,
  options,
  ...requestOptions
}) => ({
  ...requestOptions,
  method: 'POST',
  url: 'https://cdp.ironnetcybercloud.com/graphql',
  headers: {
    ...requestOptions.headers,
    'x-api-key': options.apiKey
  },
  body: {
    query: queryBuilder(page)
  }
});

module.exports = authenticateRequest;
