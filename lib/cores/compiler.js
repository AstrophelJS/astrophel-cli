const chokidar = require("chokidar");

const executeWatcher = (onWatched) => {
  chokidar.watch("./src/Scenes").on("all", onWatched);
};

module.exports = {
    executeWatcher
};
