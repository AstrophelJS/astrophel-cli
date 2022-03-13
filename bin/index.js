#!/usr/bin/env node

require('node-absolute-path');

const program = require('commander');
const { generateNewProject } = include('lib/services/projectService');

program
    .command('generate')
    .option('-n, --name <project-name>', 'Name of the project', 'btpn-project')
    .description('Generate new project')
    .action((options) => {
        generateNewProject(options);
    });

program.parse(process.argv);