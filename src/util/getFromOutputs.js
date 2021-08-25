const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const path = require('path');

module.exports = async (resourceType, filename) => {
  try {
    const text = await readFile(`${process.cwd()}/${filename}.json`);
    const obj = JSON.parse(text);
    return obj[resourceType];
  } catch (err) {
      console.log(`Error while locating/reading ${filename}.\n`, err);
  }
}