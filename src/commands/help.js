const { log } = require('console');

module.exports = () => {
  log('Commands:');
  log('  $ fjord setup [optional: appName]\t\tCreates FjordSettings.json for customization.\n');
  log('  $ fjord deploy \t\t\t\tDeploys the entire stack to AWS.\n');
  log('  $ fjord destroy [optional: resourceName]\tDestroys the specified resource.');
  log('  \t\t\t\t\t\tIf a resource is not specified, the entire stack will be destroyed.\n')
  log('  $ fjord endpoints\t\t\t\tLists NAT gateways and API endpoints for deployed resources.');
};
