const {
  getAlertsAndRelatedIndicators,
  getIndependentIndicators,
  getEvents
} = require('./queries');

const searchEntities = async (entities, options) => {
  const { alerts, relatedIndicators = [] } = await getAlertsAndRelatedIndicators(
    entities,
    options
  );

  const [independentIndicators, events] = await Promise.all([
    getIndependentIndicators(entities, options),
    getEvents(alerts, options)
  ]);

  const indicators = relatedIndicators.concat(independentIndicators);

  return {
    alerts,
    indicators,
    events
  };
};

module.exports = searchEntities;
