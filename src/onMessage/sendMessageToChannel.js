const { requestWithDefaults } = require('../request');
const { parseErrorToReadableJSON, sleep } = require('../dataTransformations');

const sendMessageToChannel = async ({ content, channel }, options, callback) => {
  const { Logger } = require('../../integration');
  try {
    // TODO: If returns 200 on failure will need to do error handling here
    // await requestWithDefaults({
    //   method: 'POST',
    //   site: 'teams',
    //   route: `v1.0/teams/${options.teamId}/channels/${channel}/messages`,
    //   body: {
    //     body: {
    //       content
    //     }
    //   },
    //   options
    // });

    await sleep(5000);

    throw new Error('Not working do da thing');

    callback(null, {});
  } catch (error) {
    const err = parseErrorToReadableJSON(error);
    Logger(
      {
        detail: 'Failed to Message Channel',
        options,
        formattedError: err
      },
      'Message Channel Failed',
      'error'
    );

    const { message, detail, status } = err;

    return callback({
      errors: [
        {
          err,
          detail: `${message}${detail ? ` - ${detail}` : ''}${
            status ? `, Code: ${status}` : ''
          }`
        }
      ]
    });
  }
};

module.exports = sendMessageToChannel;
