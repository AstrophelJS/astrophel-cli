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
        default: 'cli-project',
        validate: validateProjectName
    },
    {
        type: 'list',
        name: 'projectType',
        message: 'Select starter template',
        default: 'reactProject',
        choices: [
            { name: 'React Project', value: 'react-project' }
        ]
    },
    {
        type: 'input',
        name: 'projectVersion',
        message: 'Select initial project version',
        default: '0.0.1'
    },
    {
        type: 'input',
        name: 'projectDescription',
        message: 'Put project description',
        default: ''
    }
];

module.exports = {
    createProjectQuestions,
    validateProjectName
}