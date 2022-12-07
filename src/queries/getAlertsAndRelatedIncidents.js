const { map, flow, uniqBy, get } = require('lodash/fp');
const { requestsInParallel } = require('../request');
const { alertQueryItemShape, MAX_PAGE_SIZE, createIgnoreFilter } = require('./utils');

const getAlertsAndRelatedIncidents = async (entities, options) => {
  const alerts = await getAlerts(entities, options);
  const relatedIncidents = parseOutRelatedIncidents(alerts);

  return {
    alerts,
    relatedIncidents
  };
};
/**
 * return {
 *   alerts: [{ entity: {...}, result: [{...}] }],
 *   *** Related Incidents are incidents that are returned from found Alerts ***
 *   relatedIncidents: [{ entity: {...}, result: [{...}] }]
 * };
 */

const getAlerts = async (entities, options) => {
  const alertRequests = map(
    (entity) => ({
      entity,
      queryBuilder: createAlertsQueryBuilder(entity, options),
      options
    }),
    entities
  );

  const alertQueryResults = await requestsInParallel(alertRequests);

  return alertQueryResults;
};

const createAlertsQueryBuilder = (entity, options) => (page) => {
  const ignoreAnalystSeverityFilter = createIgnoreFilter(
    'analystSeverity',
    options.ignoreAnalystSeverity
  );

  const ignoreCategoriesFilter = createIgnoreFilter(
    'category',
    options.ignoreCategoriesValues
  );

  const ignoreSubCategoriesFilter = createIgnoreFilter(
    'subCategory',
    options.ignoreSubCategoriesValues
  );

  // TODO: Test User Option Filters
  return `{
    alerts(
      take: ${MAX_PAGE_SIZE}
      skip: ${page * MAX_PAGE_SIZE}
      sortBy: { field: severity, direction: Descending }
      filter: {
        and: [
          { indicator: { operator: Like, value: "${entity.value}" } },
          { severity: { operator: Gte, value: ${options.minSeverity} }},
          ${ignoreAnalystSeverityFilter}
          ${ignoreCategoriesFilter}
          ${ignoreSubCategoriesFilter}
        ]
      }
    ) {
      start
      end
      total
      items {
        ${alertQueryItemShape}
      }
    }
  }`;
};

const parseOutRelatedIncidents = map(({ entity, result }) => ({
  entity,
  result: flow(map(get('indicatorAlertCount')), uniqBy('indicatorValue'))(result)
}));

module.exports = getAlertsAndRelatedIncidents;
