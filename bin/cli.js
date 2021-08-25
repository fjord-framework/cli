#!/usr/bin/env node

const clear = require('clear');
const colors = require('colors');
const { LOGO } = require('../src/util/ascii_logo')

clear();
console.log(colors.blue(LOGO) + `\n`);

const setup = require('../src/commands/setup');
const deploy = require('../src/commands/deploy');
const destroy = require('../src/commands/destroy');
const endpoints = require("../src/commands/endpoints");
const help = require('../src/commands/help');

var arguments = process.argv.splice(2);
[ command, opt_arg ] = arguments;

(() => {
  try {
    if (command === 'setup') {
      setup(opt_arg);
    } else if (command === 'deploy') {
      deploy();
    } else if (command === 'destroy') {
      destroy(opt_arg);
    } else if (command === 'endpoints') {
      endpoints();
    } else if (command === 'help') {
      help();
    }
  } catch (err) {
    console.log(`Command Line Interface error => ${err.message}`);
  }
})();



