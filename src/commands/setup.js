const createJson = require('../util/createJson')
const settings = require('../util/settingsTemplate')
const cdkObj = require('../util/cdkTemplate')
const createPrivateKey = require('../util/createPrivateKey');

module.exports = async (app_name) => {
  settings.name = app_name ? app_name : "fjord_app";
  settings.server.JWT_KEY = createPrivateKey();
  
  try {
    await createJson(settings, "FjordSettings");
    await createJson(cdkObj, "cdk");
  } catch (err) {
    console.log("An error occured while creating FjordSettings.json or cdk.json");
  }
}
