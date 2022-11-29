const { size } = require('lodash/fp');

const { flattenOptions, validateStringOptions } = require('./utils');
const getSubscriptionsListMessage = require('./getSubscriptionsListMessage');
const getResourceGroupListMessage = require('./getResourceGroupListMessage');
const getWorkspaceListMessage = require('./getWorkspaceListMessage');

const validateOptions = async (options, callback) => {
  const stringOptionsErrorMessages = {
    clientId: '* Required',
    tenantId: '* Required',
    clientSecret: '* Required',
    //TODO: only check teamname and channel names if allow sending messages user option is true
    teamName: '* Required',
    channelNames: '* Required'
  };

  const stringValidationErrors = validateStringOptions(
    stringOptionsErrorMessages,
    options
  );

  const errors = stringValidationErrors

  callback(null, errors);
};

module.exports = validateOptions;
