const chalk = require('chalk');
module.exports = {
    success: function (msg) {
        console.log(chalk.green(msg));
    },
    error: function (msg) {
        console.log(chalk.red(msg));
    },
    info: function (msg) {
        console.log(chalk.blue(msg));
    }
}