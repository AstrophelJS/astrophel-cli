require('node-absolute-path');
const inquirer = require("inquirer");

const { questionFixtures } = include("lib/fixtures");

const generateNewProject = (options) => {
    collectProjectInformation(options);
};

const generateStarterFiles = (projectName, projectType) => {
    const shellGeneratorPath = `$(npm root -g)/btpn-cli/lib/executables/generate-project-files.sh`;
    console.log(`Generating ${projectName} files`);
    const process = require("child_process");
    process.exec(
        `projectName=${projectName} projectType=${projectType} sh ${shellGeneratorPath}`,
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

const collectProjectInformation = async() => {
    const projectInformation = await inquirer.prompt(questionFixtures.createProjectQuestions);
    const {
        projectName,
        projectType,
        projectVersion,
        projectDescription,
    } = projectInformation;

    const generatorPayload = `--projectName ${projectName} --projectType ${projectType} --projectVersion ${projectVersion} --projectDescription ${projectDescription}`
    generateStarterFiles(projectName, projectType);
};

module.exports = {
    generateNewProject
};