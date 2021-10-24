const chokidar = require("chokidar");

const executeWatcher = (onWatched) => {
  chokidar.watch("./src").on("all", onWatched);
};

module.exports = {
    executeWatcher
};
