const execute = (executablesName, compiledInformation) => {
  const runProjectPath = `$(npm root -g)/astrophel-cli/lib/executables/${executablesName}.sh`;
  const command = `sh ${runProjectPath} ${compiledInformation}`;
  require("child_process").exec(command, (error, stdout, stderr) => {
    console.log(stdout);
    if (error !== null) {
      console.log("Error, the details are shown below", error);
    }
  });
};

module.exports = {
    execute
}