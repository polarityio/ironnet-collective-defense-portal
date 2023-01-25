const { map, flow, uniqBy, get } = require('lodash/fp');
const { requestsInParallel } = require('../request');
const { alertQueryItemShape, MAX_PAGE_SIZE, createIgnoreFilter } = require('./utils');

const getAlertsAndRelatedIndicators = async (entities, options) => {
  const alerts = await getAlerts(entities, options);
  const relatedIndicators = parseOutRelatedIndicators(alerts);

  return {
    alerts,
    relatedIndicators
  };
};
/**
 * return {
 *   alerts: [{ entity: {...}, result: [{...}] }],
 *   *** Related Indicators are indicators that are returned from found Alerts ***
 *   relatedIndicators: [{ entity: {...}, result: [{...}] }]
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
          { indicator: { operator: ${entity.isIP ? 'Eq' : 'Like'}, value: "${
            entity.value
          }" } },
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

const parseOutRelatedIndicators = map(({ entity, result }) => ({
  entity,
  result: flow(map(get('indicatorAlertCount')), uniqBy('indicatorValue'))(result)
}));

module.exports = getAlertsAndRelatedIndicators;
