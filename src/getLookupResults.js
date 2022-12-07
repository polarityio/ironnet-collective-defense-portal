const createLookupResults = require('./createLookupResults');
const {
  getAlertsAndRelatedIncidents,
  getIndependentIncidents,
  getEvents
} = require('./queries');

const getLookupResults = async (entities, options) => {
  const { alerts, relatedIncidents = [] } = await getAlertsAndRelatedIncidents(
    entities,
    options
  );

  const [independentIncidents, events] = await Promise.all([
    getIndependentIncidents(entities, options),
    getEvents(alerts, options)
  ]);

  const incidents = relatedIncidents.concat(independentIncidents);

  const lookupResults = createLookupResults(entities, alerts, incidents, events, options);

  return lookupResults;
};

module.exports = getLookupResults;
