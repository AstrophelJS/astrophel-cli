const execute = (executablesName, payload, projectName) => {
  const runProjectPath = `$(npm root -g)/astrophel-cli/lib/executables/${executablesName}.sh`;
  const command = `projectName=${projectName} sh ${runProjectPath} ${payload}`;
  console.log('Compiling the project ...')
  require("child_process").exec(command, (error, stdout, stderr) => {
    console.log(stdout);
    if (error !== null) {
      console.log("Error, the details are shown below", error);
    }
  });
};

const executeByFileType = (fileType, compiledInformation, projectName) => {
  switch(fileType) {
    case 'scene': {
      execute('compile-scenes', compiledInformation, projectName);
      break;
    }
    default:
  }
};

module.exports = {
  execute,
  executeByFileType
}