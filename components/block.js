polarity.export = PolarityComponent.extend({
  details: Ember.computed.alias('block.data.details'),
  timezone: Ember.computed('Intl', function () {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }),
  mitreExpandableTitleStates: {},
  correlationsExpandableTitleStates: {},
  communitiesExpandableTitleStates: {},
  categoriesExpandableTitleStates: {},
  contextFieldsExpandableTitleStates: {},
  activeTab: 'alerts',
  init() {
    const details = this.get('details');

    this.handleExpandableTitleStartingState(
      details.alerts,
      'mitreExpandableTitleStates',
      'mitreTacticTechniquePair'
    );
    this.handleExpandableTitleStartingState(
      details.indicators,
      'communitiesExpandableTitleStates',
      'allCommunities'
    );
    this.handleExpandableTitleStartingState(
      details.indicators,
      'categoriesExpandableTitleStates',
      'categories'
    );

    // Events are only obtainable via Alerts IDs found in the search so Events will never be the starting active tab
    this.set(
      'activeTab',
      details.alerts && details.alerts.length ? 'alerts' : 'indicators'
    );
    this._super(...arguments);
  },
  actions: {
    changeTab: function (tabName) {
      this.set('activeTab', tabName);
    },
    toggleMitreExpandableTitle: function (index) {
      this.toggleExpandableTitle('mitreExpandableTitleStates', index);
    },
    toggleCorrelationsExpandableTitle: function (index) {
      this.toggleExpandableTitle('correlationsExpandableTitleStates', index);
    },
    toggleCommunityExpandableTitle: function (index) {
      this.toggleExpandableTitle('communitiesExpandableTitleStates', index);
    },
    toggleCategoryExpandableTitle: function (index) {
      this.toggleExpandableTitle('categoriesExpandableTitleStates', index);
    },
    toggleContextFieldsExpandableTitle: function (index) {
      this.toggleExpandableTitle('contextFieldsExpandableTitleStates', index);
    }
  },
  toggleExpandableTitle: function (key, index) {
    this.set(
      key,
      Object.assign({}, this.get(key), {
        [index]: !this.get(key)[index]
      })
    );

    this.get('block').notifyPropertyChange('data');
  },
  handleExpandableTitleStartingState: function (titleValues, titleStatesKey, fieldKey) {
    titleValues &&
      titleValues.length &&
      titleValues.forEach(
        (titleValue, index) =>
          titleValue[fieldKey] &&
          titleValue[fieldKey].length <= 2 &&
          this.set(
            titleStatesKey,
            Object.assign({}, this.get(titleStatesKey), {
              [index]: true
            })
          )
      );

    this.get('block').notifyPropertyChange('data');
  }
});
