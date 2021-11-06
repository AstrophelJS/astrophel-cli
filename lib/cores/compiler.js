const fs = require("fs");
const yaml = require("js-yaml");

const executor = require('./executor');

const processYamlFile = (path) => {
  const watchedYamlFile = fs.readFileSync(path, "utf8");
  return yaml.load(watchedYamlFile);
};

const compileFileName = (payload, compiledPayload) => {
  const { key, value } = payload;
  if (key === "name") {
    const filename = value.replace(/\s/g, "-");
    compiledPayload = compiledPayload.concat(`--filename="${filename}.js" `);
  }

  return compiledPayload;
};

const compileStringValue = (payload, compiledPayload) => {
  const { key, value } = payload;
  if (typeof value === "string") {
    const convertedValue = value.replace(/\s/g, "%20");
    compiledPayload = compiledPayload.concat(`--${key}="${convertedValue}" `);
  }

  return compiledPayload;
};

const compileInformation = (payload, compiledInformation) => {
  compiledInformation = compileFileName(payload, compiledInformation);
  compiledInformation = compileStringValue(payload, compiledInformation);
  return compiledInformation;
};

const getCompiledInformation = (fileInformation) => {
  let compiledInformation = "";
  Object.keys(fileInformation).forEach((key) => {
    const value = fileInformation[key];
    const payload = { key, value };
    compiledInformation = compileInformation(payload, compiledInformation);
  });
  return compiledInformation;
};

const executeByFileType = (fileType, compiledInformation) => {
  switch(fileType) {
    case 'scene': {
      executor.execute('compile-scene', compiledInformation);
      break;
    }
    default:
  }
};

const compileFile = (file, fileType) => {
  const fileInformation = processYamlFile(file);
  const compiledInformation = getCompiledInformation(fileInformation);
  executeByFileType(fileType, compiledInformation);
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

module.exports = {
  compileFile
};
