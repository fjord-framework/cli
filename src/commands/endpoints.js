const printNATgatewayIPs = require("../util/printNATgatewayIPs");
const printLoadBalancerIP = require("../util/printLoadBalancerIP");

module.exports = async () => {
  try {
    console.log("Be sure to whitelist these NAT gateway IPs on your Kafka broker firewall:");
    await printNATgatewayIPs();
    await printLoadBalancerIP();
  } catch (err) {
    console.log("An error occurred while locating outputs.json.");
  }
}