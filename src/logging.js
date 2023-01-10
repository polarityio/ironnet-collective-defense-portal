let logger = console;
const setLogger = (_logger) => {
  logger = _logger;
};

const getLogger = () => logger;

module.exports = { setLogger, getLogger };
