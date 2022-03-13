require("node-absolute-path");
const inquirer = require("inquirer");

const { questionFixtures } = include("lib/fixtures");
const { watcher, executor } = require("../cores");

const createNewProject = async (options) => {
  const projectInformation = await collectProjectInformation(options);
  const { projectName, starterType } = projectInformation;
  const payload = `${projectName} ${starterType} `
  executor.execute('generate-project-files', payload);
};

const runProject = (options) => {
  const { name: projectName } = options;
  watcher.executeWatcher(projectName);
};

const generateStarterFiles = (projectName, starterType) => {
  const shellgeneratorPath = `$(npm root -g)/astrophel-cli/lib/executables/generate-project-files.sh`;
  console.log(`Generating ${projectName} files`);
  require("child_process").exec(
    `sh ${shellgeneratorPath}`,
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
  return inquirer.prompt(questionFixtures.createProjectQuestions);
};

module.exports = {
  createNewProject,
  runProject,
};
