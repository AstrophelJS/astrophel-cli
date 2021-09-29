require('node-absolute-path');
const { stringUtils } = include('lib/utils');

const validateProjectName = (input) => {
    const isContainSpace = stringUtils.containsSpace(input);
    const isContainSymbol = stringUtils.containSymbol(input);
    if (isContainSpace || isContainSymbol) {
        return 'Please put a project name without space and any symbol'
    }
    return true;
}

const createProjectQuestions = [{
        type: 'input',
        name: 'projectName',
        message: 'Project name',
        default: 'astrophel-project',
        validate: validateProjectName
    },
    {
        type: 'list',
        name: 'starterType',
        message: 'Select starter template',
        default: 'emptyProject',
        choices: [
            { name: 'Empty project', value: 'empty-project' }
        ]
    },
];

module.exports = {
    createProjectQuestions,
    validateProjectName
}