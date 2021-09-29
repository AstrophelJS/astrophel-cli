require('node-absolute-path');
const inquirer = require("inquirer");

const { questionFixtures } = include("lib/fixtures");

const createNewProject = (options) => {
    collectProjectInformation(options);
};

const runProject = (options) => {
    const runProjectPath = `$(npm root -g)/astrophel-cli/lib/executables/run-project.sh`;
    const exec = require("child_process").
    exec(
        `sh ${runProjectPath}`,
        (error, stdout, stderr) => {
            console.log(stdout);
            if (error !== null) {
                console.log(
                    "Failed to run the project, make sure you have already do 'npm install' first in your Astrophel project and run 'npm start' in your root project folder",
                    error
                );
            }
        }
    );
};

const generateStarterFiles = (projectName, starterType) => {
    const shellgeneratorPath = `$(npm root -g)/astrophel-cli/lib/executables/generate-project-files.sh`;
    console.log(`Generating ${projectName} files`);
    const exec = require("child_process").
    exec(
        `projectName=${projectName} starterType=${starterType} sh ${shellgeneratorPath}`,
        (error, stdout, stderr) => {
            console.log(stdout);
            if (error !== null) {
                console.log(
                    "Failed generating the starter project files, please contact retzd.tech@gmail.com",
                    error
                );
            }
        }
    );
};

const collectProjectInformation = () => {
    inquirer
        .prompt(questionFixtures.createProjectQuestions)
        .then((projectInformation) => {
            console.log("Creating your project");
            console.log("----------------------");
            const { projectName, starterType } = projectInformation;
            generateStarterFiles(projectName, starterType);
        });
};

module.exports = {
    createNewProject,
    runProject
};