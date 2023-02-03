const { map, get, flow, __ } = require('lodash/fp');

const parseUserOptions = (options) => {
  const selectOptionKeys = [
    'ignoreAnalystSeverity',
    'ignoreCategories',
    'ignoreSubCategories'
  ];

  const [ignoreAnalystSeverityValues, ignoreCategoriesValues, ignoreSubCategoriesValues] =
    map(flow(get(__, options), map(get('value'))), selectOptionKeys);

  return {
    ...options,
    ignoreAnalystSeverityValues,
    ignoreCategoriesValues,
    ignoreSubCategoriesValues
  };
};

module.exports = parseUserOptions;
