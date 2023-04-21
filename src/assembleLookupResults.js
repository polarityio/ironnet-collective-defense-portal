const { flow, get, size, find, eq, map, some, keys } = require('lodash/fp');

const assembleLookupResults = (entities, alerts, indicators, events, options) =>
  map((entity) => {
    const resultsForThisEntity = getResultsForThisEntity(
      entity,
      alerts,
      indicators,
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

const getResultsForThisEntity = (entity, alerts, indicators, events, options) => {
  const getResultForThisEntityResult = (results) =>
    flow(find(flow(get('entity.value'), eq(entity.value))), get('result'))(results);

  return {
    alerts: getResultForThisEntityResult(alerts),
    indicators: getResultForThisEntityResult(indicators),
    events: getResultForThisEntityResult(events)
  };
};

const createSummaryTags = ({ alerts, indicators, events }, options) =>
  []
    .concat(size(alerts) ? `Alerts: ${size(alerts)}` : [])
    .concat(
      size(indicators) && size(indicators) > 1
        ? `Indicators: ${size(indicators)}` // more than 1 indicator
        : formatIndicators(indicators) // 0 or 1 indicator
    )
    .concat(size(events) ? `Events: ${size(events)}` : []);

const formatIndicators = (indicators) => {
  if (size(indicators) === 0) {
    return [];
  }

  return `Max Severity: ${indicators[0].maxSeverity}`;
};

module.exports = assembleLookupResults;
