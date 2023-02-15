const { get, keys, first, getOr, range, map, flow, flatten } = require('lodash/fp');
const { MAX_PAGE_SIZE } = require('../constants');
const createRequestsInParallel = require('./createRequestsInParallel');

const handleRequestPagination = (requestWithAuth) => {
  const requestsInParallel = createRequestsInParallel(requestWithAuth);

  const getRemainingPageResults = async (result, requestOptions) => {
    const resultKey = flow(get('body.data'), keys, first)(result);
    const {
      end,
      total,
      items: firstPageItems = []
    } = getOr({}, ['body', 'data', resultKey], result);
    if (end === total) return firstPageItems;

    const pagesRemaining = Math.ceil((total - end) / MAX_PAGE_SIZE);

    const paginatedRequests = map(
      (page) => ({ ...requestOptions, page }),
      range(pagesRemaining, 0)
    );

    const remainingPagesResults = flatten(
      await requestsInParallel(paginatedRequests, ['body', 'data', resultKey, 'items'])
    );

    return firstPageItems.concat(remainingPagesResults);
  };

  return getRemainingPageResults;
};

module.exports = handleRequestPagination;
