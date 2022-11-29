
const createLookupResults = require('./createLookupResults');
const { searchEntityInTeams } = require('./queries');


const getLookupResults = async (entities, options) => {
  // const foundMessages = await searchEntityInTeams(entities, options);
  
  const lookupResults = createLookupResults(entities, options);

  return lookupResults;
};


module.exports = getLookupResults;
