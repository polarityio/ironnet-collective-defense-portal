module.exports = {
  name: 'Microsoft Teams',
  acronym: 'MS-TEAMS',
  description: '',
  entityTypes: ['*'],
  styles: ['./styles/styles.less'],
  defaultColor: 'light-blue',
  block: {
    component: {
      file: './components/block.js'
    },
    template: {
      file: './templates/block.hbs'
    }
  },
  request: {
    cert: '',
    key: '',
    passphrase: '',
    ca: '',
    proxy: '',
    rejectUnauthorized: true
  },
  logging: {
    level: 'trace' //trace, debug, info, warn, error, fatal
  },
  options: [
    {
      key: 'clientId',
      name: 'Azure AD Registered App Client/Application ID',
      description:
        "Your Azure AD Registered App's Client ID associated with your Microsoft Sentinel Instance.",
      default: '',
      type: 'text',
      userCanEdit: false,
      adminOnly: true
    },
    {
      key: 'tenantId',
      name: 'Azure AD Registered App Tenant/Directory ID',
      description:
        "Your Azure AD Registered App's Tenant ID associated with your Microsoft Sentinel Instance.",
      default: '',
      type: 'text',
      userCanEdit: false,
      adminOnly: true
    },
    {
      key: 'clientSecret',
      name: 'Azure AD Registered App Client Secret',
      description:
        "Your Azure AD Registered App's Client Secret associated with your Microsoft Sentinel Instance.",
      default: '',
      type: 'password',
      userCanEdit: false,
      adminOnly: true
    },
    {
      key: 'allowSendingMessages',
      name: 'Allow Sending Slack Messages',
      description:
        'If checked, a prompt will show for every entity searched, regardless of Search ' +
        'Results, allowing you to send a message to any Channels listed below. ' +
        '(This option must be set to "Users can view only" or "Users can view and edit")',
      default: true,
      type: 'boolean',
      userCanEdit: true,
      adminOnly: false
    },
    {
      key: 'teamName',
      name: 'Team Name',
      description: 'The name of the team you wish to search and send messages in.',
      default: '',
      type: 'text',
      userCanEdit: false,
      adminOnly: true
    },
    {
      key: 'channelNames',
      name: 'Channel Names',
      description:
        'A comma separated list of channel names you would like to send messages to. NOTE: Channel names are case sensitive',
      default: 'General',
      type: 'text',
      userCanEdit: false,
      adminOnly: true
    }
    // TODO: posibly add option to add entity to text box
  ]
  //** TODO: add kql user option */
};
