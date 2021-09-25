require('node-absolute-path');
const { createNewProject, runProject } = require('@astrophel-cli/lib/services/projectService');

jest.mock('@astrophel-cli/lib/services/projectService', () => {
    const originalModule = jest.requireActual('@astrophel-cli/lib/services/projectService');
    return {
        __esModule: true,
        ...originalModule,
        createNewProject: jest.fn(() => 'mocked baz'),
        runProject: jest.fn(() => 'mocked baz'),
    };
});

test('should do a partial mock', () => {
    const createNewProjectResult = createNewProject(["create", "-n", "name"]);
    expect(createNewProjectResult).toBe('mocked baz');
    expect(createNewProject).toHaveBeenCalled();
    const runProjectResult = runProject(["run"]);
    expect(runProjectResult).toBe('mocked baz');
    expect(runProject).toHaveBeenCalled();
});

let path = require('path');
let exec = require('child_process').exec;

test('Code should be 0 if can run start', async() => {
    let result = await cli(['start'], '.');
    expect(result.code).toBe(0)
})

function cli(args, cwd) {
    return new Promise(resolve => {
        exec(`node ${path.resolve('bin/index.js')} ${args.join(' ')}`, { cwd },
            (error, stdout, stderr) => {
                resolve({
                    code: error && error.code ? error.code : 0,
                    error,
                    stdout,
                    stderr
                })
            })
    })
}