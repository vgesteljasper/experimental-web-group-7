const Path = require('path');
const chalk = require('chalk');
const log = require('fancy-log');

module.exports = (file) => {
  const pluginName = `[${chalk.magenta('ROUTE-PLUGIN')}]`;
  const fileName = chalk.yellow(Path.basename(file));

  log(`${pluginName} registered "${fileName}"`);
};
