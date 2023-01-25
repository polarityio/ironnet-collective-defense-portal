polarity.export = PolarityComponent.extend({
  details: Ember.computed.alias('block.data.details'),
  timezone: Ember.computed('Intl', function () {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }),
  activeTab: 'alerts',
  init() {
    const details = this.get('details');

    // Events are only obtainable via Alerts found in the search so Events will never be the starting active tab
    this.set('activeTab', details.alerts.length ? 'alerts' : 'indicators');
    this._super(...arguments);
  },
  actions: {
    changeTab: function (tabName) {
      this.set('activeTab', tabName);
    }
  }
});
