const chokidar = require("chokidar");

const compiler = require('./compiler');
const executor = require('./executor');

const onWatched = (event, file, projectName) => {
  if (event === "add" || event === "change") {
    try {
      const { isAstrophelFile, fileType } = getFileInformation(file);
      if (isAstrophelFile) {
        let compiledInformation = compiler.compileFile(file);
        compiledInformation = compiler.getCompiledProjectName(projectName, compiledInformation);
        executor.executeByFileType(fileType, compiledInformation, projectName);
      }
    } catch (e) {
      console.log(e);
    }
  }
};

const executeWatcher = (projectName) => {
  chokidar.watch("./").on("all", (event, file) => onWatched(event, file, projectName));
};

const getFileInformation = (file) => {
  const splittedPath = file.split(".");
  const isAstrophelFile = splittedPath[1] === 'astrophel';
  const fileType = splittedPath[2];
  return {
    isAstrophelFile,
    fileType
  }
};

module.exports = {
    executeWatcher,
    onWatched
}