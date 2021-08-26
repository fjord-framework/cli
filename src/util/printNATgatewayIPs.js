const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const getFromOutputs = require("./getFromOutputs");

module.exports = async () => {
  try {
    const output = await exec(`cdk list`);
    const resourceList = output.stdout.trim().split('\n');
    const sharedResources = resourceList.find(resource => resource.includes('fjord-shared'));
    const outputs = await getFromOutputs(sharedResources, `outputs`);
    
    Object.keys(outputs).forEach(key => {
      if (key.includes('NATGateway')) {
        console.log(`${key}: ${outputs[key]}`);
      }
    });
  } catch {
    console.log('An error occurred while printing the NAT Gateway IPs.');
  }
}
