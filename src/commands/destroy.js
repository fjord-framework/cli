const ora = require("ora");
const spinner = ora();
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

module.exports = async (resource_name) => {
  try {
    const output = await exec(`cdk list`);
    const resourceList = output.stdout.trim().split('\n');
    const consumerGroups = resourceList.filter(resourceName => resourceName.includes('fjord-consumer'));
    const server = resourceList.find(resource => resource.includes('fjord-server'));
    const sharedResources = resourceList.find(resource => resource.includes('fjord-shared'));

    if (resource_name) {
      if (resourceList.includes(resource_name)) {
        spinner.start(`Destroying ${resource_name}...\n`);
        await exec(`cdk destroy ${resource_name} -f`);
        spinner.succeed(`${resource_name} destroyed.\n`);
      } else {
        console.log('Resource not found.');
      }
    } else {
      consumerGroups.forEach(async resourceName => {
        spinner.start(`Destroying ${resourceName} service...\n`);
        await exec(`cdk destroy ${resourceName} -f`);
        spinner.succeed(`${resourceName} service destroyed.\n`);
      })
    
      spinner.start(`Destroying ${server} service...\n`);
      await exec(`cdk destroy ${server} -f`);
      spinner.succeed(`${server} service destroyed.\n`);
    
      spinner.start(`Destroying ${sharedResources} resources...\n`);
      await exec(`cdk destroy ${sharedResources} -f`);
      spinner.succeed(`${sharedResources} resources destroyed.\n`);
    }
  } catch (err) {
    console.log('Error:', err);
  }
}