const { map } = require('lodash/fp');
const { requestsInParallel } = require('../request');
const { createIgnoreFilter, incidentItemShape, MAX_PAGE_SIZE } = require('./utils');

const getIndependentIncidents = async (entities, options) => {
  const independentIncidentRequests = map(
    (entity) => ({
      entity,
      queryBuilder: createIndependentIncidentsQueryBuilder(entity, options),
      options
    }),
    entities
  );

  const independentIncidentQueryResults = await requestsInParallel(
    independentIncidentRequests
  );

  return independentIncidentQueryResults;
};
/**
 * *** Independent Incidents are incidents that do not have any Alerts associated with them
 * return [{ entity: {...}, result: [{...}] }];
 */

const createIndependentIncidentsQueryBuilder = (entity, options) => (page) => {
  const ignoreSubCategoriesFilter = createIgnoreFilter(
    'subCategory',
    options.ignoreSubCategoriesValues
  );

  // TODO: Test User Option Filters
  // TODO: Found in testing the Like operator query to be slow.  Might need to change to Eq operator
  return `{
    indicatorCounts(
      take: ${MAX_PAGE_SIZE}
      skip: ${page * MAX_PAGE_SIZE}
      sortBy: [
        { direction: Descending, field: maxSeverity }
      ]
      filter: {
        and: [
          { indicatorValue: { operator: Like, value: "${entity.value}" } },
          { maxSeverity: { operator: Gte, value: ${options.minSeverity} } }
          { totalAlertsCount: { operator: Eq, value: 0 } }
          ${ignoreSubCategoriesFilter}
        ]
      }
      showNonActionable: true
    ) {
      start
      end
      total
      items {
        ${incidentItemShape}
      }
    }
  }`;
};

module.exports = getIndependentIncidents;
