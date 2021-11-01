require("node-absolute-path");
const inquirer = require("inquirer");
const fs = require("fs");
const yaml = require("js-yaml");

const { questionFixtures } = include("lib/fixtures");
const { executeWatcher } = require("../cores/compiler");

const createNewProject = (options) => {
  collectProjectInformation(options);
};

const execute = (executablesName, payload) => {
  const runProjectPath = `$(npm root -g)/astrophel-cli/lib/executables/${executablesName}.sh`;
  const command = `sh ${runProjectPath} ${payload}`;
  require("child_process").exec(command, (error, stdout, stderr) => {
    console.log(stdout);
    if (error !== null) {
      console.log("Error, the details are shown below", error);
    }
  });
};

const processYamlFile = (path) => {
  const splittedPath = path.split(".");
  const fileType = splittedPath[splittedPath.length - 2];

  const watchedYamlFile = fs.readFileSync(path, "utf8");
  const yamlInformation = yaml.load(watchedYamlFile);
  return {
    fileType,
    yamlInformation,
  };
};

const compileStringValue = (yamlPayload, payload) => {
  const { yamlKey, yamlValue } = yamlPayload;
  if (typeof yamlValue === "string") {
    const convertedYamlValue = yamlValue.replace(/\s/g, "%20");
    payload = payload.concat(`--${yamlKey}="${convertedYamlValue}" `);
  }

  return payload;
};

const compileObjectValue = (yamlPayload, payload) => {
  const { yamlValue } = yamlPayload;
  if (typeof yamlValue === "object") {
    yamlValue.forEach((value, i) => {
      Object.keys(value).forEach((yamlObjectKey) => {
        const yamlObjectValue = value[yamlObjectKey];
        payload = payload.concat(`${yamlObjectKey}="${yamlObjectValue}" `);
      });
    });
  }

  return payload;
};

const getFileName = (yamlPayload, payload) => {
  const { yamlKey, yamlValue } = yamlPayload;
  if (yamlKey === "name") {
    const filename = yamlValue.replace(/\s/g, "");
    payload = payload.concat(`--filename="${filename}" `);
  }

  return payload;
};

const compileYaml = (yamlInformation) => {
  Object.keys(yamlInformation).forEach((yamlKey) => {
    const yamlValue = yamlInformation[yamlKey];
    const yamlPayload = { yamlKey, yamlValue };

    if (fileType === "scene") {
      compiledPayload = getFileName(yamlPayload, compiledPayload);
      compiledPayload = compileObjectValue(yamlPayload, compiledPayload);
      compiledPayload = compileStringValue(yamlPayload, compiledPayload);
    }
  });

  return compiledPayload;
};

const onWatched = (event, path) => {
  let compiledPayload = "";
  if (event === "add" || event === "change") {
    try {
      const { yamlInformation, fileType } = processYamlFile(path);
      compiledPayload = compileYaml(yamlInformation, fileType);
      execute("compile-scene", compiledPayload);
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
