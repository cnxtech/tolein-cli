
const prompt = require('co-prompt');
const co = require('co');
const ora = require('ora');
const fs = require('fs');
const exec = require('child_process').exec;
const message = require('../message');
const spinner = ora('Getting tempalate...');
module.exports = () => {
    co(function* () {
        // const templateName = yield prompt('template name: ');
        const projectName = yield prompt('project name: ');
        return new Promise((resolve, reject) => {
            resolve({
                // templateName,
                projectName
            })
        })

    }).then(res => {
        const { projectName } = res;
        fs.exists(projectName, (exists) => {
            if (exists) {
                message.error(`Project '${projectName}' is already exists. Do you want to overwrite it?`);
                co(function* () {
                    const overwrite = yield prompt('overwrite(y/n): ');
                    return new Promise((resolve, reject) => {
                        resolve(overwrite);
                    })
                }).then(overwrite => {
                    if (overwrite.toLowerCase() === 'y') {
                        exec(`rm -rf ${projectName}`, (err) => {
                            if (err) {
                                message.error('Failed to remove the project.');
                                process.exit();
                            }
                            init(projectName);
                        })
                    } else if (overwrite.toLowerCase() === 'n') {
                        message.error('Failed to init an exsting project. Changing your project name may help.');
                        process.exit();
                    }
                })
            } else {
                init(projectName);
            }
        })

    })
}

function init(projectName) {
    const repositoryUrl = `https://github.com/lioder/tolein-templates.git`
    const cloneCmd = `git clone ${repositoryUrl} ${projectName}`;
    spinner.start();
    exec(cloneCmd, (err) => {
        if (err) {
            message.error('Error getting template');
            process.exit();
        }
        const deleteCmd = `cd ${projectName} && rm -rf .git`
        exec(deleteCmd, (err) => {
            spinner.stop();
            if (err) {
                message.error('Error getting template');
                process.exit();
            }
            message.success('Template was successfully obtained');
            message.info(`Run "cd ${projectName} && npm install"`);
            process.exit();
        })
    })
}