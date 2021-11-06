require("node-absolute-path");
const inquirer = require("inquirer");

const { questionFixtures } = include("lib/fixtures");
const { watcher } = require("../cores");

const createNewProject = (options) => {
  collectProjectInformation(options);
};

const runProject = (options) => {
  watcher.executeWatcher(watcher.onWatched);
};

const generateStarterFiles = (projectName, starterType) => {
  const shellgeneratorPath = `$(npm root -g)/astrophel-cli/lib/executables/generate-project-files.sh`;
  console.log(`Generating ${projectName} files`);
  require("child_process").exec(
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

const collectProjectInformation = async () => {
  const projectInformation = await inquirer.prompt(
    questionFixtures.createProjectQuestions
  );
  const {
    projectType,
    projectTitle,
    packageName,
    initialVersion,
    description,
    author,
    repositoryUrl,
  } = projectInformation;

  const generatorPayload = `--projectType ${projectType} --projectTitle "${projectTitle}" --packageName ${packageName} --initialVersion ${initialVersion} --description "${description}" --repositoryUrl "${repositoryUrl}" --author ${author}`;
  generateStarterFiles(projectTitle, projectType);
};

module.exports = {
  createNewProject,
  runProject,
};
