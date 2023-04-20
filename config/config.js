module.exports = {
  name: 'IronNet Collective Defense Portal',
  acronym: 'ICDP',
  description:
    "Connect with IronNet Collective Defense Portal's Alert, Event, & Indicator data",
  entityTypes: ['domain', 'IPv4', 'IPv6'],
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
    level: 'info' //trace, debug, info, warn, error, fatal
  },
  options: [
    {
      key: 'apiKey',
      name: 'Your API Token',
      description:
        'Can be found on the IronNet Collective Defense Portal dashboard -> User Icon in the upper right hand corner -> API Access.',
      default: '',
      type: 'password',
      userCanEdit: false,
      adminOnly: true
    },
    {
      key: 'minSeverity',
      name: 'Minimum Severity',
      description:
        'The Minimum Severity for Alerts, Indicators, and Events to show up in search results.',
      default: 0,
      type: 'number',
      userCanEdit: false,
      adminOnly: true
    },
    {
      key: 'ignoreAnalystSeverity',
      name: 'Ignore Analyst Severities',
      description: 'The Analyst Severities you wish to exclude from your search results.',
      default: [],
      type: 'select',
      options: [
        { value: 'SEVERITY_NONE', display: 'None' },
        { value: 'SEVERITY_UNDECIDED', display: 'Undecided' },
        { value: 'SEVERITY_BENIGN', display: 'Benign' },
        { value: 'SEVERITY_SUSPICIOUS', display: 'Suspicious' },
        { value: 'SEVERITY_MALICIOUS', display: 'Malicious' },
        { value: 'SEVERITY_WHITELISTED', display: 'Whitelisted' }
      ],
      multiple: true,
      userCanEdit: false,
      adminOnly: true
    },
    {
      key: 'ignoreCategories',
      name: 'Ignore Categories',
      description: 'The Categories you wish to exclude from your search results.',
      default: [],
      type: 'select',
      options: [
        { value: 'ACTION', display: 'ACTION' },
        { value: 'ACCESS', display: 'ACCESS' },
        { value: 'C2', display: 'C2' },
        { value: 'EXTERNAL', display: 'EXTERNAL' },
        { value: 'CAT_NONE', display: 'NONE' },
        { value: 'OTHER', display: 'OTHER' },
        { value: 'RECON', display: 'RECON' },
        { value: 'TELEMETRY', display: 'TELEMETRY' }
      ],
      multiple: true,
      userCanEdit: false,
      adminOnly: true
    },
    {
      key: 'ignoreSubCategories',
      name: 'Ignore Sub Categories',
      description: 'The Sub Categories you wish to exclude from your search results.',
      default: [],
      type: 'select',
      options: [
        { value: 'SUBCAT_NONE', display: 'NONE' },
        { value: 'ANOMALOUS_PROTOCOL', display: 'ANOMALOUS PROTOCOL' },
        { value: 'ANOMALOUS_USER_AGENT', display: 'ANOMALOUS USER GENT' },
        { value: 'DNS_TUNNELING', display: 'DNS TUNNELING' },
        { value: 'DOMAIN_GENERATION_ALGORITHM', display: 'DOMAIN GENERATION ALGORITHM' },
        { value: 'EXTERNAL_IP_SCANNING', display: 'EXTERNAL IP SCANNING' },
        { value: 'EXTERNAL_PORT_SCANNING', display: 'EXTERNAL PORT SCANNING' },
        { value: 'EXTERNAL_RANDOM_IP_SCANNING', display: 'EXTERNAL RANDOM IP SCANNING' },
        { value: 'EXTREME_RATES', display: 'EXTREME RATES' },
        { value: 'IP_VPN_FAILED_LOGINS', display: 'IP VPN FAILED LOGINS' },
        { value: 'IMPORTANCE_CHANGE', display: 'IMPORTANCE CHANGE' },
        { value: 'INTERNAL_IP_SCANNING', display: 'INTERNAL IP SCANNING' },
        { value: 'INTERNAL_PORT_SCANNING', display: 'INTERNAL PORT SCANNING' },
        { value: 'INTERNAL_RANDOM_IP_SCANNING', display: 'INTERNAL RANDOM IP SCANNING' },
        { value: 'LATERAL_MOVEMENT_CHAINS', display: 'LATERAL MOVEMENT CHAINS' },
        { value: 'NETLOG_SPIKE', display: 'NETLOG SPIKE' },
        { value: 'NETWORK_DISCOVERY_SPIKE', display: 'NETWORK DISCOVERY SPIKE' },
        { value: 'PERIODIC_BEACONING', display: 'PERIODIC BEACONING' },
        { value: 'PORT_USAGE_CHANGE', display: 'PORT USAGE CHANGE' },
        { value: 'RANDOMIZED_BEACONING', display: 'RANDOMIZED BEACONING' },
        { value: 'REMOTE_ACCESS_SPIKE', display: 'REMOTE ACCESS_SPIKE' },
        {
          value: 'THREAT_INTELLIGENCE_RULE_MATCH',
          display: 'THREAT INTELLIGENCE RULE MATCH'
        },
        { value: 'SMB_BURST', display: 'SMB BURST' },
        { value: 'SMB_COI', display: 'SMB COI' },
        { value: 'SMB_SPIKE', display: 'SMB SPIKE' },
        {
          value: 'SUSPICIOUS_SPARSE_COMMUNICATIONS',
          display: 'SUSPICIOUS SPARSE COMMUNICATIONS'
        },
        { value: 'UNUSUAL_CONNECTIONS', display: 'UNUSUAL CONNECTIONS' },
        { value: 'UNUSUAL_DAY', display: 'UNUSUAL DAY' },
        { value: 'USER_VPN_FAILED_LOGINS', display: 'USER VPN FAILED LOGINS' },
        { value: 'VPN_FASTMOVE', display: 'VPN FASTMOVE' },
        { value: 'VPN_WORLD', display: 'VPN WORLD' },
        { value: 'CONTROL_BEACONING', display: 'CONTROL BEACONING' },
        { value: 'SMB_SHORTFLOWS_BURST', display: 'SMB SHORTFLOWS BURST' },
        { value: 'BLACKLISTED_USER_AGENTS', display: 'BLACKLISTED USER AGENTS' },
        { value: 'INTRUSION_DETECTION_SYSTEM', display: 'INTRUSION DETECTION SYSTEM' },
        { value: 'UNUSUAL_DAY_STAGING', display: 'UNUSUAL DAY STAGING' },
        {
          value: 'ACTIVE_DIRECTORY_FAILED_LOGINS',
          display: 'ACTIVE DIRECTORY FAILED LOGINS'
        },
        {
          value: 'ACTIVE_DIRECTORY_PATTERN_OF_LIFE',
          display: 'ACTIVE DIRECTORY PATTERN OF LIFE'
        },
        {
          value: 'ACTIVE_DIRECTORY_USER_PROFILE',
          display: 'ACTIVE DIRECTORY USER PROFILE'
        },
        {
          value: 'ACTIVE_DIRECTORY_SEQUENTIAL_LOGIN',
          display: 'ACTIVE DIRECTORY SEQUENTIAL LOGIN'
        },
        {
          value: 'NEW_REMOTE_ACCESS_CONNECTION',
          display: 'NEW REMOTE ACCESS CONNECTION'
        },
        { value: 'NEW_SERVER_CONNECTION', display: 'NEW SERVER CONNECTION' },
        { value: 'EXPLOIT_KIT', display: 'EXPLOIT KIT' },
        { value: 'WEBSHELL_CONNECTIONS', display: 'WEBSHELL CONNECTIONS' },
        { value: 'PERIODIC_BEACONING_HTTP', display: 'PERIODIC BEACONING HTTP' },
        { value: 'SURICATA_RULE_MATCH', display: 'SURICATA RULE MATCH' },
        {
          value: 'MULTIDIMENSIONAL_NOVELTY_DETECTION',
          display: 'MULTIDIMENSIONAL NOVELTY DETECTION'
        },
        { value: 'UNUSUAL_HTTP_COMMUNICATIONS', display: 'UNUSUAL HTTP COMMUNICATIONS' },
        { value: 'CREDENTIAL_PHISHING', display: 'CREDENTIAL PHISHING' },
        {
          value: 'SUSPICIOUS_PERIODIC_BEACONING_HTTP',
          display: 'SUSPICIOUS PERIODIC BEACONIN GHTTP'
        },
        {
          value: 'ANOMALOUS_PERIODIC_BEACONING_HTTP',
          display: 'ANOMALOUS PERIODIC BEACONING HTTP'
        },
        { value: 'TLS_INVALID_CERT_CHAIN', display: 'TLS INVALID CERT CHAIN' },
        { value: 'LONG_SESSIONS', display: 'LONG SESSIONS' },
        { value: 'DOMAIN_ANALYSIS_TLS', display: 'DOMAIN ANALYSIS TLS' },
        { value: 'DOMAIN_ANALYSIS_HTTP', display: 'DOMAIN ANALYSIS HTTP' },
        { value: 'PERIODIC_BEACONING_TLS', display: 'PERIODIC BEACONING TLS' },
        { value: 'RANDOMIZED_BEACONING_TLS', display: 'RANDOMIZED BEACONING TLS' },
        { value: 'RANDOMIZED_BEACONING_HTTP', display: 'RANDOMIZED BEACONING HTTP' },
        { value: 'RANDOMIZED_BEACONING_DNS', display: 'RANDOMIZED BEACONING DNS' },
        { value: 'ENCRYPTED_COMMS', display: 'ENCRYPTED COMMS' },
        { value: 'EXTREME_RATES_TLS', display: 'EXTREME RATES TLS' },
        { value: 'UNUSUAL_DAY_TLS', display: 'UNUSUAL DAY TLS' },
        { value: 'FIREWALL', display: 'FIREWALL' },
        { value: 'LONG_SESSIONS_PAIRS', display: 'LONG SESSIONS PAIRS' },
        { value: 'LONG_SESSIONS_TRIPLETS', display: 'LONG SESSIONS TRIPLETS' },
        { value: 'INTERNAL_HOST_ENUMERATION', display: 'INTERNAL HOST ENUMERATION' },
        { value: 'PORT_PROTOCOL_MISMATCH', display: 'PORT PROTOCOL MISMATCH' },
        { value: 'PHISHING_HTTPS', display: 'PHISHING HTTPS' },
        { value: 'CERTIFICATE_SPIKE', display: 'CERTIFICATE SPIKE' },
        { value: 'PII_DATA_LOSS', display: 'PII DATA LOSS' },
        { value: 'DOMAIN_FRONTING', display: 'DOMAIN FRONTING' },
        { value: 'UNUSUAL_DAY_HTTP', display: 'UNUSUAL DAY HTTP' },
        { value: 'UNUSUAL_DAY_DNS', display: 'UNUSUAL DAY DNS' },
        {
          value: 'UNUSUAL_REMOTE_ACCESS_CONNECTIONS',
          display: 'UNUSUAL REMOTE ACCESS CONNECTIONS'
        },
        { value: 'UNUSUAL_SERVER_CONNECTIONS', display: 'UNUSUAL SERVER CONNECTIONS' },
        {
          value: 'NEW_REMOTE_ACCESS_CONNECTIONS',
          display: 'NEW REMOTE ACCESS CONNECTIONS'
        },
        { value: 'NEW_SERVER_CONNECTIONS', display: 'NEW SERVER CONNECTIONS' },
        { value: 'SUSPICIOUS_FILE_DOWNLOADS', display: 'SUSPICIOUS FILE DOWNLOADS' },
        { value: 'DNS_SUSPICIOUS_RESPONSES', display: 'DNS SUSPICIOUS RESPONSES' },
        {
          value: 'OPERATIONAL_TECHNOLOGY_THREAT',
          display: 'OPERATIONAL TECHNOLOGY THREAT'
        },
        { value: 'OPERATIONAL_TECHNOLOGY_INFO', display: 'OPERATIONAL TECHNOLOGY INFO' },
        { value: 'CONSISTENT_BEACONING_HTTP', display: 'CONSISTENT BEACONING HTTP' },
        { value: 'UNUSUAL_WPAD_ACTIVITY', display: 'UNUSUAL WPAD ACTIVITY' },
        { value: 'DENIAL_OF_SERVICE', display: 'DENIAL OF SERVICE' },
        { value: 'CONSISTENT_BEACONING_TLS', display: 'CONSISTENT BEACONING TLS' },
        { value: 'DOMAIN_FIRST', display: 'DOMAIN FIRST' },
        { value: 'OBSERVED_BAD_ACTIVITY', display: 'OBSERVED BAD ACTIVITY' },
        { value: 'CLOUDTRAIL_ERROR_CODES', display: 'CLOUDTRAIL ERROR CODES' },
        { value: 'CLOUDTRAIL_ROLE_ENUMERATION', display: 'CLOUDTRAIL ROLE ENUMERATION' },
        { value: 'CLOUDTRAIL_PED', display: 'CLOUDTRAIL PED' },
        { value: 'CLOUDTRAIL_TIME_TRAVEL', display: 'CLOUDTRAIL TIME TRAVEL' },
        { value: 'KNOWLEDGE_BASED_DETECTION', display: 'KNOWLEDGE BASED DETECTION' },
        { value: 'TOR_TRAFFIC', display: 'TOR TRAFFIC' },
        {
          value: 'CONSISTENT_BEACONING_IRONFLOW',
          display: 'CONSISTENT BEACONING IRONFLOW'
        },
        { value: 'RARE_ASN', display: 'RARE ASN' },
        { value: 'FILE_STAGING', display: 'FILE STAGING' },
        { value: 'HIGH_FAILED_LOGINS', display: 'HIGH FAILED LOGINS' },
        { value: 'PASS_THE_HASH', display: 'PASS THE HASH' },
        { value: 'PASSWORD_SPRAY', display: 'PASSWORD SPRAY' },
        { value: 'SUSPICIOUS_LOGIN_TIMES', display: 'SUSPICIOUS LOGIN TIMES' },
        { value: 'SUSPICIOUS_FAILED_LOGINS', display: 'SUSPICIOUS FAILED LOGINS' },
        {
          value: 'SUSPICIOUS_SUCCESSFUL_LOGINS',
          display: 'SUSPICIOUS SUCCESSFUL LOGINS'
        },
        {
          value: 'CROWDSTRIKE_DETECTION_SUMMARY_EVENT',
          display: 'CROWDSTRIKE DETECTION SUMMARY EVENT'
        },
        { value: 'PALO_ALTO_THREAT_LOG', display: 'PALO ALTO THREAT LOG' },
        { value: 'NOVEL_JA3', display: 'NOVEL JA3' },
        { value: 'INITIAL_INDICATOR', display: 'INITIAL INDICATOR' },
        { value: 'CARBON_BLACK_ALERT', display: 'CARBON BLACK_ALERT' },
        { value: 'ANOMALOUS_ACTIVITY_SPIKE', display: 'ANOMALOUS ACTIVITY SPIKE' },
        { value: 'AWS_EVENT_ERRORS', display: 'AWS EVENT ERRORS' },
        { value: 'AWS_LOGIN_FAILURES', display: 'AWS LOGIN FAILURES' },
        { value: 'AWS_SUSPICIOUS_ACTIVITY', display: 'AWS SUSPICIOUS ACTIVITY' },
        {
          value: 'DESTRUCTIVE_STORAGE_ACTIVITY',
          display: 'DESTRUCTIVE STORAGE ACTIVITY'
        },
        { value: 'NON_MFA_ACTIVITY', display: 'NON MFA ACTIVITY' },
        {
          value: 'SUSPICIOUS_RESOURCE_ACTIVITY',
          display: 'SUSPICIOUS RESOURCE ACTIVITY'
        },
        { value: 'MALICIOUS_FILE_HASH', display: 'MALICIOUS FILE HASH' },
        { value: 'FILE_UPLOAD', display: 'FILE UPLOAD' },
        { value: 'NOVEL_USER_AGENT', display: 'NOVEL USER AGENT' },
        {
          value: 'CLOUDTRAIL_SUSPICIOUS_BEHAVIOR',
          display: 'CLOUDTRAIL SUSPICIOUS BEHAVIOR'
        },
        {
          value: 'CLOUDTRAIL_BUCKET_EXFILTRATION',
          display: 'CLOUDTRAIL BUCKET EXFILTRATION'
        },
        { value: 'ANOMALOUS_REMOTE_ADMIN', display: 'ANOMALOUS REMOTE ADMIN' },
        { value: 'VPN_PASSWORD_SPRAY', display: 'VPN PASSWORD SPRAY' },
        { value: 'VPN_HIGH_FAILED_LOGINS', display: 'VPN HIGH FAILED LOGINS' },
        { value: 'VPN_SUSPICIOUS_LOGIN_TIMES', display: 'VPN SUSPICIOUS LOGIN TIMES' },
        { value: 'EXTERNAL_IP_SUSPICIOUS_SCAN', display: 'EXTERNAL IP SUSPICIOUS SCAN' },
        {
          value: 'EXTERNAL_PORT_SUSPICIOUS_SCAN',
          display: 'EXTERNAL PORT SUSPICIOUS SCAN'
        },
        { value: 'INTERNAL_IP_SUSPICIOUS_SCAN', display: 'INTERNAL IP SUSPICIOUS SCAN' },
        {
          value: 'INTERNAL_PORT_SUSPICIOUS_SCAN',
          display: 'INTERNAL PORT SUSPICIOUS SCAN'
        },
        { value: 'SENTINELONE_ALERT', display: 'SENTINELONE ALERT' },
        { value: 'SENTINELONE_THREAT', display: 'SENTINELONE THREAT' },
        { value: 'NOVEL_DCERPC', display: 'NOVEL DCERPC' }
      ],
      multiple: true,
      userCanEdit: false,
      adminOnly: true
    }
    // Feature Suggestion: Consider adding a days/months back number option.
    /** The Query filter for the graphql query looks like this:
     * would likely use moment to create timestamps similar to
     * https://github.com/polarityio/microsoft-sentinel/blob/571d3864243ddc8c724db8ab7339e869b72f9db4/src/queries/utils.js#L23
     * OR
     * https://github.com/polarityio/hackerone/blob/52898af6abc93fe79d3ea019cd113a99928d2bd3/src/dataTransformations.js#L58
     * Query Filter Structure: {
          alertCreated: {
            start: "2022-11-16T19:05:43.112Z"
            end: "2022-11-23T19:05:43.112Z"
          }
        }
     */
  ]
};
