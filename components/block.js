polarity.export = PolarityComponent.extend({
  details: Ember.computed.alias('block.data.details'),
  timezone: Ember.computed('Intl', function () {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }),
  selectedChannelName: '',
  messageValue: '',
  init () {
    this.set('selectedChannelName', this.get('details.availableChannelsToMessage')[0]);
    this._super(...arguments);
  },
  actions: {
    sendMessage: function () {
      const outerThis = this;
      outerThis.set('messagingToast', '');
      outerThis.set('errorMessagingToast', '');
      outerThis.set('sendingMessage', true);
      outerThis.get('block').notifyPropertyChange('data');

      outerThis
        .sendIntegrationMessage({
          action: 'sendMessageToChannel',
          data: {
            content: this.get('messageValue'),
            channel: this.get('selectedChannelName')
          }
        })
        .then(() => {
          outerThis.set('messageValue', '');
          outerThis.set('messagingToast', 'Successfully Sent Message');
        })
        .catch((err) => {
          outerThis.set(
            'errorMessagingToast',
            'Failed to Send Message: ' +
              (err &&
                (err.detail || err.err || err.message || err.title || err.description)) ||
              'Unknown Reason'
          );
        })
        .finally(() => {
          outerThis.set('sendingMessage', false);
          outerThis.get('block').notifyPropertyChange('data');
          setTimeout(() => {
            outerThis.set('messagingToast', '');
            outerThis.set('errorMessagingToast', '');
            outerThis.get('block').notifyPropertyChange('data');
          }, 5000);
        });
    }
  }
});
