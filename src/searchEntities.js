const {
  getAlertsAndRelatedIncidents,
  getIndependentIncidents,
  getEvents
} = require('./queries');

const searchEntities = async (entities, options) => {
  const { alerts, relatedIncidents = [] } = await getAlertsAndRelatedIncidents(
    entities,
    options
  );

  const [independentIncidents, events] = await Promise.all([
    getIndependentIncidents(entities, options),
    getEvents(alerts, options)
  ]);

  const incidents = relatedIncidents.concat(independentIncidents);

  return {
    alerts,
    incidents,
    events
  };
};

module.exports = searchEntities;
