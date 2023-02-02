const { size, map, flow, join } = require('lodash/fp');

const MAX_PAGE_SIZE = 30;

const createIgnoreFilter = (key, values) =>
  flow(
    map((ignoreCategory) => `{ ${key}: { operator: Neq, value: ${ignoreCategory} } }`),
    join(','),
    (filters) => (size(filters) ? `{ and: [ ${filters} ] },\n` : '')
  )(values);

const indicatorItemShape = `
  indicatorValue
  indicatorType
  maxSeverity
  totalAlertsCount
  totalExpiredAlertsCount
  closedAlertsCount
  suspiciousOrMaliciousAlertsCount
  whitelistedOrBenignAlertsCount
  firstAlertCreatedTime
  lastAlertCreatedTime
  categories {
    category
    subCategory
  }
  allCommunities {
    id
    name
  }
`;

const alertQueryItemShape = `
  id
  indicatorAlertCount {
    indicatorValue
  }
  severity
  alertCreated
  alertUpdated
  analystSeverity
  analystExpectation
  category
  subCategory
  correlations {
    ip
    geoIp
    domain
    registrarDomain
    asn
    beaconingStats
    behavior
    fileHash
    fqdnStats
    httpPath
    httpProperties
    nonAnStructure
    none
    portSet
    signatureId
    suspiciousWords
    tlsFingerprint
    tlsIssuerDn
    tlsJa3
    tlsSan
    totalUniqueParticipants
    userAgent
  }
  status
  mitreTacticTechniquePair {
    mitreTacticCode
    mitreTechniqueCode
    tactic
    technique
  }
`;

const eventsQueryItemShape = `
  id
  alertId
  severity
  startTime
  endTime
  alert {
    id
    indicatorAlertCount {
      indicatorValue
    }
  }
  defenseId
  defenseVersion
  expired
  beta
  category
  subCategory
  analyticVersion
  severity
  confidence
  udpCreated
  udpUpdated
  eventCreated
  startTime
  endTime
  wlRuleIds
  defenseTirId
  udpTirId
  formattedContext
`;

module.exports = {
  MAX_PAGE_SIZE,
  createIgnoreFilter,
  alertQueryItemShape,
  indicatorItemShape,
  eventsQueryItemShape
};
