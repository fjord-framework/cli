const ora = require("ora");
const spinner = ora({interval: 1000});

const Progress = require("../util/deploymentProgress");
const progress = new Progress();

const { spawn } = require('promisify-child-process');

const getFromSettings = require("../util/getFromSettings");
const printNATgatewayIPs = require("../util/printNATgatewayIPs");
const printLoadBalancerIP = require("../util/printLoadBalancerIP");

module.exports = async () => {
  try {
    const sharedResources = await getFromSettings('name');
    const server = await getFromSettings('server');
    const consumerGroups = await getFromSettings('consumerGroups');

    // deploying shared resources
    spinner.start(`Deploying fjord-shared-${sharedResources} resources...\n`);
    const deployShared = spawn('cdk', ['deploy', '--outputs-file', `outputs.json`, `fjord-shared-${sharedResources}`], {});

    deployShared.stderr.on('data', data => progress.update(data));
        
    deployShared.on('close', async code => {
      if (code == 0) {
        progress.stop();
        spinner.succeed(`fjord-shared-${sharedResources} resources deployed.\n`);
        await printNATgatewayIPs();
        console.log('\nYou may want to whitelist the above IP addresses on your Kafka broker firewall while Fjord continues to deploy the remaining pieces of your AWS infrastructure.\n')
      } else {
        progress.stop();
        spinner.fail(`Failed to deploy fjord-shared-${sharedResources} resources. Exiting.`)
        console.log(`grep process exited with code ${code}`);
      }
    });

    await deployShared;

    // deploying API server
    spinner.start(`Deploying fjord-server-${server.NAME} service...\n`);
    const deployServer = spawn('cdk', ['deploy', '--outputs-file', `outputs.json`, `fjord-server-${server.NAME}`], {});

    deployServer.stderr.on('data', data => progress.update(data));
        
    deployServer.on('close', async code => {
      if (code == 0) {
        progress.stop();
        spinner.succeed(`fjord-server-${server.NAME} service deployed.\n`);
        await printLoadBalancerIP();
        console.log('You can find the NAT Gateway and Load Balancer IP addresses in the outputs.json file in the project directory.\n\n');
      } else {
        progress.stop();
        spinner.fail(`Failed to deploy fjord-server-${server.NAME} service. Exiting.`)
        console.log(`grep process exited with code ${code}`);
      }
    });

    await deployServer;
    
    // deploying consumer groups
    for (const consumerGroup of consumerGroups) {
      spinner.start(`Deploying fjord-consumer-${consumerGroup.NAME} service...\n`);

      const deployConsumer = spawn('cdk', ['deploy', `fjord-consumer-${consumerGroup.NAME}`], {});

      deployConsumer.stderr.on('data', data => progress.update(data));
          
      deployConsumer.on('close', async code => {
        if (code == 0) {
          progress.stop();
          spinner.succeed(`fjord-consumer-${consumerGroup.NAME} service deployed.\n`);
        } else {
          progress.stop();
          spinner.fail(`Failed to deploy jord-consumer-${consumerGroup.NAME} service. Exiting.`)
          console.log(`grep process exited with code ${code}`);
        }
      });

      await deployConsumer;
    };

  } catch (err) {
    console.log('Error:', err);
  }
}