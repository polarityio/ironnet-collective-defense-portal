const {
  flow,
  get,
  size,
  find,
  eq,
  flatMap,
  map,
  includes,
  values,
  some,
  keys,
  filter,
  __,
  compact,
  uniq,
  omit
} = require('lodash/fp');
const reduce = require('lodash/fp/reduce').convert({ cap: false });

const createLookupResults = (
  entities,
  options
) =>
  map((entity) => {
    const resultsForThisEntity = getResultsForThisEntity(
      entity,
      options
    );

    const resultsFound = flow(
      some(flow(keys, size))
    )(resultsForThisEntity);

    const lookupResult = {
      entity,
      data: true
        ? {
            summary: createSummaryTags(resultsForThisEntity, options),
            details: resultsForThisEntity
          }
        : null
    };

    return lookupResult;
  }, entities);

const getResultsForThisEntity = (entity, options) => {
  const getResultForThisEntityResult = (results) =>
    flow(find(flow(get('entity.value'), eq(entity.value))), get('result'))(results);

  return {
    availableChannelsToMessage: options.parsedChannelNames
  };
};


const createSummaryTags = (
  { },
  options
) => {

  return []
};

module.exports = createLookupResults;
