const inquirer = require('inquirer');
const inquirerFileTreeSelection = require('../index');
const path = require('path');
const chalk = require('chalk');

inquirer.registerPrompt('file-tree-selection', inquirerFileTreeSelection);

inquirer
  .prompt([
    {
      type: 'file-tree-selection',
      name: 'files',
      message: 'choose files',
      multiple: true,
      onlyShowValid: true,
      onValid: (input) => {
        const name = input.split(path.sep).pop();
        return name[0] !== '.';
      },
      transformer: (input) => {
        const name = input.split(path.sep).pop();
        if (name[0] == '.') {
          return chalk.grey(name);
        }
        return name;
      },
      validate: (input) => {
        if (!input) {
          return 'Sorry, need an answer to proceed.';
        }

        return true;
      },
    },
  ])
  .then((answers) => {
    console.log(JSON.stringify(answers));
  });
