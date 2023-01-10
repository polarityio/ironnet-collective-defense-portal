const { flow, get, size, find, eq, map, some, keys } = require('lodash/fp');

const assembleLookupResults = (entities, alerts, incidents, events, options) =>
  map((entity) => {
    const resultsForThisEntity = getResultsForThisEntity(
      entity,
      alerts,
      incidents,
      events,
      options
    );

    const resultsFound = flow(some(flow(keys, size)))(resultsForThisEntity);

    const lookupResult = {
      entity,
      data: resultsFound
        ? {
            summary: createSummaryTags(resultsForThisEntity, options),
            details: resultsForThisEntity
          }
        : null
    };

    return lookupResult;
  }, entities);

const getResultsForThisEntity = (entity, alerts, incidents, events, options) => {
  const getResultForThisEntityResult = (results) =>
    flow(find(flow(get('entity.value'), eq(entity.value))), get('result'))(results);

  return {
    alerts: getResultForThisEntityResult(alerts),
    incidents: getResultForThisEntityResult(incidents),
    events: getResultForThisEntityResult(events)
  };
};

const createSummaryTags = ({ alerts, incidents, events }, options) => {
  //TODO: Create Tags from Results once UI is implemented
  return [];
};

module.exports = assembleLookupResults;
