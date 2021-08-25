const { log } = require('console');

module.exports = () => {
  log('Commands:');
  log('\tfjord setup [optional: appName]\t\tCreates FjordSettings.json for customization.');
  log('\tfjord deploy [optional: resourceName]\tDeploys the specified resource. If a resource is not specified, the entire stack will be deployed.');
  log('\tfjord destroy [optional: resourceName]\tDestroys the specified resource. If a resource is not specified, the entire stack will be destroyed.');
  log('\tfjord endpoints\t\t\t\tLists NAT gateways and API endpoints for deployed resources.');
};
