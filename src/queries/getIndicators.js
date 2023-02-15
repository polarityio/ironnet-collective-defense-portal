const { map, uniqBy } = require('lodash/fp');
const { requestsInParallel } = require('../request');
const { createIgnoreFilter, indicatorItemShape, MAX_PAGE_SIZE } = require('./utils');

const getIndicators = async (entities, options) => {
  const indicatorRequests = map(
    (entity) => ({
      entity,
      queryBuilder: createIndicatorsQueryBuilder(entity, options),
      options
    }),
    entities
  );

  const indicatorQueryResults = await requestsInParallel(
    indicatorRequests
  );

  const formattedIndicators = formatIndicators(indicatorQueryResults);

  return formattedIndicators;
};
/**
 * return [{ entity: {...}, result: [{...}] }];
 * 
 * Note: Indicators might show a `totalAlertsCount` of >= 1 but not return any results on the Alerts
 */

const createIndicatorsQueryBuilder = (entity, options) => (page) => {
  const ignoreSubCategoriesFilter = createIgnoreFilter(
    'categoriesSubCategory',
    options.ignoreSubCategoriesValues
  );

  return `{
    indicatorCounts(
      take: ${MAX_PAGE_SIZE}
      skip: ${page * MAX_PAGE_SIZE}
      sortBy: [
        { direction: Descending, field: maxSeverity }
      ]
      filter: {
        and: [
          { indicatorValue: { operator: Eq, value: "${
            entity.value
          }" } },
          { maxSeverity: { operator: Gte, value: ${options.minSeverity} } }
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

const formatIndicators = (indicators) => {
  const formattedIndicators = map(
    ({ entity, result }) => ({
      entity,
      result: uniqBy('indicatorValue', result)
    }),
    indicators
  );

  return formattedIndicators;
};

module.exports = getIndicators;
