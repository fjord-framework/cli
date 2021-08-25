const fs = require('fs');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);

module.exports = async (obj, filename) => {
  const jsonObj = JSON.stringify(obj, null, 2);
  writeFile(`${filename}.json`, jsonObj, 'utf8');
  console.log(`${filename}.json created.`);
}