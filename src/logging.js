const { last, slice } = require('lodash/fp');

let logger = console;
const setLogger = (_logger) => {
  logger = _logger;
};

// Thanks Ed for the idea for this abstraction!
const getLogger =
  () =>
  (...args) => {
    const lastArg = last(args);
    const lastArgIsLevel = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'].includes(
      lastArg
    );
    const loggingLevel = lastArgIsLevel ? lastArg : 'info';
    const logArgs = lastArgIsLevel ? slice(0, -1, args) : args;
    logger[loggingLevel](...logArgs);
  };

module.exports = { setLogger, getLogger };
