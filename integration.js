'use strict';
const { validateOptions, parseUserOptionLists } = require('./src/userOptions');
const getLookupResults = require('./src/getLookupResults');
const {
  splitOutIgnoredIps,
  standardizeEntityTypes,
  parseErrorToReadableJSON
} = require('./src/dataTransformations');
const { concat } = require('lodash/fp');
const { setLogger, getLogger } = require('./src/logging');

const startup = setLogger;

const doLookup = async (entities, options, cb) => {
  const Logger = getLogger();
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


module.exports = {
  startup,
  validateOptions,
  doLookup
};
