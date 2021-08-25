const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const getFromOutputs = require("./getFromOutputs");

module.exports = async () => {
  try {
    const output = await exec(`cdk list`);
    const resourceList = output.stdout.trim().split('\n');
    const serverName = resourceList.find(resource => resource.includes('fjord-server'));
    const outputs = await getFromOutputs(serverName, `outputs`);
    console.log('\n', 'Your load balancer url is:\n', Object.values(outputs)[0], '\n');
  } catch {
    console.log('An error occurred while printing the Load Balancer URL.');
  }
}