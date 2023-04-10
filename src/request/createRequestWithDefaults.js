const fs = require('fs');

const request = require('postman-request');
const { get, size } = require('lodash/fp');

const { ERROR_MESSAGES } = require('../../src/constants');
const authenticateRequest = require('./authenticateRequest');
const handleRequestPagination = require('./handleRequestPagination');
const { getLogger } = require('../logging');

const SUCCESSFUL_ROUNDED_REQUEST_STATUS_CODES = [200];

const _configFieldIsValid = (field) => typeof field === 'string' && field.length > 0;

const createRequestWithDefaults = () => {
  const {
    request: { ca, cert, key, passphrase, rejectUnauthorized, proxy }
  } = require('../../config/config.js');

  const defaults = {
    ...(_configFieldIsValid(ca) && { ca: fs.readFileSync(ca) }),
    ...(_configFieldIsValid(cert) && { cert: fs.readFileSync(cert) }),
    ...(_configFieldIsValid(key) && { key: fs.readFileSync(key) }),
    ...(_configFieldIsValid(passphrase) && { passphrase }),
    ...(_configFieldIsValid(proxy) && { proxy }),
    ...(typeof rejectUnauthorized === 'boolean' && { rejectUnauthorized }),
    json: true
  };

  const requestWithDefaultsBuilder = (
    preRequestFunction = async () => ({}),
    postRequestSuccessFunction = async (x) => x,
    postRequestFailureFunction = async (e) => {
      throw e;
    }
  ) => {
    const defaultsRequest = request.defaults(defaults);

    const _requestWithDefaults = (requestOptions) =>
      new Promise((resolve, reject) => {
        defaultsRequest(requestOptions, (err, res, body) => {
          if (err) return reject(err);
          resolve({ ...res, body });
        });
      });

    return async (requestOptions) => {
      const preRequestFunctionResults = await preRequestFunction(requestOptions);
      const _requestOptions = {
        ...requestOptions,
        ...preRequestFunctionResults
      };

      let postRequestFunctionResults;
      try {
        const result = await _requestWithDefaults(_requestOptions);
        checkForStatusError(result, _requestOptions);

        postRequestFunctionResults = await postRequestSuccessFunction(
          result,
          _requestOptions
        );
      } catch (error) {
        postRequestFunctionResults = await postRequestFailureFunction(
          error,
          _requestOptions
        );
      }
      return postRequestFunctionResults;
    };
  };

  const checkForStatusError = ({ statusCode, body }, requestOptions) => {
    const Logger = getLogger();

    const requestOptionsWithoutSensitiveData = {
      ...requestOptions,
      options: '{...}',
      headers: {
        ...requestOptions.headers,
        'x-api-key': '***'
      }
    };

    Logger.trace({
      MESSAGE: 'Request Ran, Checking Status...',
      statusCode,
      requestOptions: requestOptionsWithoutSensitiveData,
      responseBody: body
    });

    const roundedStatus = Math.round(statusCode / 100) * 100;
    const statusCodeNotSuccessful =
      !SUCCESSFUL_ROUNDED_REQUEST_STATUS_CODES.includes(roundedStatus);
    const responseBodyErrors = get('errors.0', body);

    if (get('extensions.code', responseBodyErrors) === 'NOT_FOUND') {
      return;
    }

    if (statusCodeNotSuccessful || responseBodyErrors) {
      const requestError = Error(
        `Request Error${
          responseBodyErrors.message ? ` -> ${responseBodyErrors.message}` : ''
        }`
      );
      requestError.status = statusCodeNotSuccessful
        ? statusCode
        : get('extensions.code', responseBodyErrors);
      requestError.detail = get(get('error', body), ERROR_MESSAGES);
      requestError.description = JSON.stringify(body);
      requestError.requestOptions = JSON.stringify(requestOptionsWithoutSensitiveData);
      throw requestError;
    }
  };

  const requestWithAuth = requestWithDefaultsBuilder(authenticateRequest);

  const requestDefaultsWithInterceptors = requestWithDefaultsBuilder(
    authenticateRequest,
    handleRequestPagination(requestWithAuth)
  );

  return requestDefaultsWithInterceptors;
};

// body: {
//   "errors": [
//     {
//       "message": "Alert [7d8d8ae3-10ea-4906-8ef9-29a44155fca7] not found",
//       "locations": [
//         {
//           "line": 2,
//           "column": 3
//         }
//       ],
//       "path": [
//         "events"
//       ],
//       "extensions": {
//         "code": "NOT_FOUND"
//       }
//     }
//   ],
//   "data": null
// }

module.exports = createRequestWithDefaults;
