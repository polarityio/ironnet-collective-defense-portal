const { map } = require('lodash/fp');
const { requestsInParallel } = require('../request');
const { createIgnoreFilter, indicatorItemShape, MAX_PAGE_SIZE } = require('./utils');

const getIndependentIndicators = async (entities, options) => {
  const independentIndicatorRequests = map(
    (entity) => ({
      entity,
      queryBuilder: createIndependentIndicatorsQueryBuilder(entity, options),
      options
    }),
    entities
  );

  const independentIndicatorQueryResults = await requestsInParallel(
    independentIndicatorRequests
  );

  return independentIndicatorQueryResults;
};
/**
 * *** Independent Indicators are indicators that do not have any Alerts associated with them
 * return [{ entity: {...}, result: [{...}] }];
 */

const createIndependentIndicatorsQueryBuilder = (entity, options) => (page) => {
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
          { indicatorValue: { operator: ${entity.isIP ? 'Eq' : 'Like'}, value: "${
            entity.value
          }" } },
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
        ${indicatorItemShape}
      }
    }
  }`;
};

module.exports = getIndependentIndicators;
