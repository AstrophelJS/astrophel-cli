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