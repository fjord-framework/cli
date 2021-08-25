const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const path = require('path');

module.exports = async (resourceType) => {
  try {
    const text = await readFile(`${process.cwd()}/FjordSettings.json`);
    const settings = JSON.parse(text);
    return settings[resourceType];
  } catch (err) {
      console.log(`Error while locating/reading FjordSettings.js.\n`, err);
  }
}