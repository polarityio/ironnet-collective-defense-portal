const { validateStringOptions } = require('./utils');

const validateOptions = async (options, callback) => {
  const stringOptionsErrorMessages = {
    apiKey: '* Required'
  };

  const stringValidationErrors = validateStringOptions(
    stringOptionsErrorMessages,
    options
  );

  const minSeverityError =
    options.minSeverity.value < 1
      ? [
          {
            key: 'minSeverity',
            message: 'Must be more than 0'
          }
        ]
      : [];

  const errors = stringValidationErrors.concat(minSeverityError);

  callback(null, errors);
};

module.exports = validateOptions;
