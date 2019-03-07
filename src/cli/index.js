const program = require('commander');
const package = require('../../package.json')
program
    .version(package.version)
    .command('init')
    .description('init a project')
    .alias('i')
    .action(() => {
        require('../cmd/init.js')();
    });

program.parse(process.argv);

if (!program.args.length) {
    program.help();
}