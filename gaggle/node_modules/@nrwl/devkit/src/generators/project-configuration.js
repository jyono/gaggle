"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readProjectConfiguration = exports.updateWorkspaceConfiguration = exports.readWorkspaceConfiguration = exports.getProjects = exports.removeProjectConfiguration = exports.updateProjectConfiguration = exports.addProjectConfiguration = void 0;
const tslib_1 = require("tslib");
const workspace_1 = require("@nrwl/tao/src/shared/workspace");
const json_1 = require("../utils/json");
const get_workspace_layout_1 = require("../utils/get-workspace-layout");
/**
 * Adds project configuration to the Nx workspace.
 *
 * The project configuration is stored in workspace.json and nx.json. The utility will update
 * both files.
 *
 * @param host - the file system tree
 * @param projectName - unique name. Often directories are part of the name (e.g., mydir-mylib)
 * @param projectConfiguration - project configuration
 */
function addProjectConfiguration(host, projectName, projectConfiguration) {
    setProjectConfiguration(host, projectName, projectConfiguration, 'create');
}
exports.addProjectConfiguration = addProjectConfiguration;
/**
 * Updates the configuration of an existing project.
 *
 * The project configuration is stored in workspace.json and nx.json. The utility will update
 * both files.
 *
 * @param host - the file system tree
 * @param projectName - unique name. Often directories are part of the name (e.g., mydir-mylib)
 * @param projectConfiguration - project configuration
 */
function updateProjectConfiguration(host, projectName, projectConfiguration) {
    setProjectConfiguration(host, projectName, projectConfiguration, 'update');
}
exports.updateProjectConfiguration = updateProjectConfiguration;
/**
 * Removes the configuration of an existing project.
 *
 * The project configuration is stored in workspace.json and nx.json.
 * The utility will update both files.
 */
function removeProjectConfiguration(host, projectName) {
    setProjectConfiguration(host, projectName, undefined, 'delete');
}
exports.removeProjectConfiguration = removeProjectConfiguration;
/**
 * Get a map of all projects in a workspace.
 *
 * Use {@link readProjectConfiguration} if only one project is needed.
 */
function getProjects(host) {
    const workspace = readWorkspace(host);
    const nxJson = json_1.readJson(host, 'nx.json');
    return new Map(Object.keys(workspace.projects).map((projectName) => {
        return [
            projectName,
            getProjectConfiguration(projectName, workspace, nxJson),
        ];
    }));
}
exports.getProjects = getProjects;
/**
 * Read general workspace configuration such as the default project or cli settings
 *
 * This does _not_ provide projects configuration, use {@link readProjectConfiguration} instead.
 */
function readWorkspaceConfiguration(host) {
    const workspace = readWorkspace(host);
    delete workspace.projects;
    const nxJson = json_1.readJson(host, 'nx.json');
    delete nxJson.projects;
    return Object.assign(Object.assign({}, workspace), nxJson);
}
exports.readWorkspaceConfiguration = readWorkspaceConfiguration;
/**
 * Update general workspace configuration such as the default project or cli settings.
 *
 * This does _not_ update projects configuration, use {@link updateProjectConfiguration} or {@link addProjectConfiguration} instead.
 */
function updateWorkspaceConfiguration(host, { version, cli, defaultProject, generators, implicitDependencies, affected, npmScope, tasksRunnerOptions, workspaceLayout, }) {
    const workspace = {
        version,
        cli,
        defaultProject,
        generators,
    };
    const nxJson = {
        implicitDependencies,
        affected,
        npmScope,
        tasksRunnerOptions,
        workspaceLayout,
    };
    json_1.updateJson(host, get_workspace_layout_1.getWorkspacePath(host), (json) => {
        return Object.assign(Object.assign({}, workspace), { projects: json.projects });
    });
    json_1.updateJson(host, 'nx.json', (json) => {
        return Object.assign(Object.assign({}, nxJson), { projects: json.projects });
    });
}
exports.updateWorkspaceConfiguration = updateWorkspaceConfiguration;
/**
 * Reads a project configuration.
 *
 * The project configuration is stored in workspace.json and nx.json. The utility will read
 * both files.
 *
 * @param host - the file system tree
 * @param projectName - unique name. Often directories are part of the name (e.g., mydir-mylib)
 */
function readProjectConfiguration(host, projectName) {
    const workspace = readWorkspace(host);
    if (!workspace.projects[projectName]) {
        throw new Error(`Cannot find configuration for '${projectName}' in ${get_workspace_layout_1.getWorkspacePath(host)}.`);
    }
    const nxJson = json_1.readJson(host, 'nx.json');
    if (!nxJson.projects[projectName]) {
        throw new Error(`Cannot find configuration for '${projectName}' in nx.json`);
    }
    return getProjectConfiguration(projectName, workspace, nxJson);
}
exports.readProjectConfiguration = readProjectConfiguration;
function getProjectConfiguration(projectName, workspace, nxJson) {
    return Object.assign(Object.assign({}, readWorkspaceSection(workspace, projectName)), readNxJsonSection(nxJson, projectName));
}
function readWorkspaceSection(workspace, projectName) {
    return workspace.projects[projectName];
}
function readNxJsonSection(nxJson, projectName) {
    return nxJson.projects[projectName];
}
function setProjectConfiguration(host, projectName, projectConfiguration, mode) {
    if (mode === 'delete') {
        addProjectToNxJson(host, projectName, undefined, mode);
        addProjectToWorkspaceJson(host, projectName, undefined, mode);
        return;
    }
    if (!projectConfiguration) {
        throw new Error(`Cannot ${mode} "${projectName}" with value ${projectConfiguration}`);
    }
    const { tags, implicitDependencies } = projectConfiguration, workspaceConfiguration = tslib_1.__rest(projectConfiguration, ["tags", "implicitDependencies"]);
    addProjectToWorkspaceJson(host, projectName, workspaceConfiguration, mode);
    addProjectToNxJson(host, projectName, {
        tags,
        implicitDependencies,
    }, mode);
}
function addProjectToWorkspaceJson(host, projectName, project, mode) {
    const path = get_workspace_layout_1.getWorkspacePath(host);
    const workspaceJson = json_1.readJson(host, path);
    if (mode == 'create' && workspaceJson.projects[projectName]) {
        throw new Error(`Cannot create Project '${projectName}'. It already exists.`);
    }
    if (mode == 'update' && !workspaceJson.projects[projectName]) {
        throw new Error(`Cannot update Project '${projectName}'. It does not exist.`);
    }
    if (mode == 'delete' && !workspaceJson.projects[projectName]) {
        throw new Error(`Cannot update Project '${projectName}'. It does not exist.`);
    }
    workspaceJson.projects[projectName] = project;
    host.write(path, JSON.stringify(workspaceJson));
}
function addProjectToNxJson(host, projectName, config, mode) {
    const nxJson = json_1.readJson(host, 'nx.json');
    if (mode === 'delete') {
        delete nxJson.projects[projectName];
    }
    else {
        nxJson.projects[projectName] = Object.assign({
            tags: [],
        }, (config || {}));
    }
    host.write('nx.json', JSON.stringify(nxJson));
}
function readWorkspace(host) {
    const path = get_workspace_layout_1.getWorkspacePath(host);
    const workspaceJson = json_1.readJson(host, path);
    const originalVersion = workspaceJson.version;
    return Object.assign(Object.assign({}, workspace_1.toNewFormat(workspaceJson)), { version: originalVersion });
}
//# sourceMappingURL=project-configuration.js.map