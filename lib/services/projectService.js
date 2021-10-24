require("node-absolute-path");
const { request } = require("http");
const inquirer = require("inquirer");
const fs = require("fs");
const yaml = require("js-yaml");

const { questionFixtures } = include("lib/fixtures");
const { executeWatcher } = require("../cores/compiler");

const createNewProject = (options) => {
  collectProjectInformation(options);
};

const execute = (executablesName, payload, filename) => {
  const runProjectPath = `$(npm root -g)/astrophel-cli/lib/executables/${executablesName}.sh`;
  require("child_process").exec(
    `filename="${filename}" payload="${payload}" sh ${runProjectPath}`,
    (error, stdout, stderr) => {
      console.log(stdout);
      if (error !== null) {
        console.log("Error, the details are shown below", error);
      }
    }
  );
};

const onWatched = (event, path) => {
  if (event === "add" || event === "change") {
    try {
      const watchedYamlFile = fs.readFileSync(path, "utf8");
      const yamlInformation = yaml.load(watchedYamlFile);

      let scenesPayload = "";
      let filename = "filename";
      // let objectsPayload = "";
      Object.keys(yamlInformation).forEach((yamlKey) => {
        const yamlValue = yamlInformation[yamlKey];

        // if (typeof yamlValue === "object") {
        //   console.log("Object");
        //   yamlValue.forEach((value, i) => {
        //     Object.keys(value).forEach((yamlObjectKey) => {
        //       const yamlObjectValue = value[yamlObjectKey];
        //       objectsPayload = objectsPayload.concat(
        //         `${yamlObjectKey}="${yamlObjectValue}" `
        //       );
        //     });
        //   });
        // }

        if (typeof yamlValue === "string") {
          if (yamlKey === "name") {
            filename = yamlValue.replace(/\s/g, "");
          }
          scenesPayload = scenesPayload.concat(`--${yamlKey}="${yamlValue}" `);
        }
      });
      execute("compile-scene", scenesPayload, filename);
    } catch (e) {
      console.log(e);
    }
  }
};

const runProject = (options) => {
  executeWatcher(onWatched);
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
