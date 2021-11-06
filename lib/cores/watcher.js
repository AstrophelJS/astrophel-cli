const chokidar = require("chokidar");
const compiler = require('./compiler');

const executeWatcher = (onWatched) => {
  chokidar.watch("./src").on("all", onWatched);
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

const onWatched = (event, file) => {
  if (event === "add" || event === "change") {
    try {
      const { isAstrophelFile, fileType } = getFileInformation(file);
      if (isAstrophelFile) {
        compiler.compileFile(file, fileType);
      }
    } catch (e) {
      console.log(e);
    }
  }
};

module.exports = {
    executeWatcher,
    onWatched
}