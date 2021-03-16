"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterAffected = void 0;
const project_graph_1 = require("../project-graph");
const file_utils_1 = require("../file-utils");
const workspace_projects_1 = require("./locators/workspace-projects");
const npm_packages_1 = require("./locators/npm-packages");
const implicit_json_changes_1 = require("./locators/implicit-json-changes");
const normalize_nx_json_1 = require("../normalize-nx-json");
const nx_json_changes_1 = require("./locators/nx-json-changes");
const workspace_json_changes_1 = require("./locators/workspace-json-changes");
const tsconfig_json_changes_1 = require("./locators/tsconfig-json-changes");
function filterAffected(graph, touchedFiles, workspaceJson = file_utils_1.readWorkspaceJson(), nxJson = file_utils_1.readNxJson(), packageJson = file_utils_1.readPackageJson()) {
    const normalizedNxJson = normalize_nx_json_1.normalizeNxJson(nxJson);
    // Additional affected logic should be in this array.
    const touchedProjectLocators = [
        workspace_projects_1.getTouchedProjects,
        workspace_projects_1.getImplicitlyTouchedProjects,
        npm_packages_1.getTouchedNpmPackages,
        implicit_json_changes_1.getImplicitlyTouchedProjectsByJsonChanges,
        nx_json_changes_1.getTouchedProjectsInNxJson,
        workspace_json_changes_1.getTouchedProjectsInWorkspaceJson,
        tsconfig_json_changes_1.getTouchedProjectsFromTsConfig,
    ];
    const touchedProjects = touchedProjectLocators.reduce((acc, f) => {
        return acc.concat(f(touchedFiles, workspaceJson, normalizedNxJson, packageJson, graph));
    }, []);
    return filterAffectedProjects(graph, {
        workspaceJson,
        nxJson: normalizedNxJson,
        touchedProjects,
    });
}
exports.filterAffected = filterAffected;
// -----------------------------------------------------------------------------
function filterAffectedProjects(graph, ctx) {
    const builder = new project_graph_1.ProjectGraphBuilder();
    const reversed = project_graph_1.reverse(graph);
    ctx.touchedProjects.forEach((p) => {
        addAffectedNodes(p, reversed, builder, []);
    });
    ctx.touchedProjects.forEach((p) => {
        addAffectedDependencies(p, reversed, builder, []);
    });
    return builder.build();
}
function addAffectedNodes(startingProject, reversed, builder, visited) {
    if (visited.indexOf(startingProject) > -1)
        return;
    if (!reversed.nodes[startingProject]) {
        throw new Error(`Invalid project name is detected: "${startingProject}"`);
    }
    visited.push(startingProject);
    builder.addNode(reversed.nodes[startingProject]);
    reversed.dependencies[startingProject].forEach(({ target }) => addAffectedNodes(target, reversed, builder, visited));
}
function addAffectedDependencies(startingProject, reversed, builder, visited) {
    if (visited.indexOf(startingProject) > -1)
        return;
    visited.push(startingProject);
    reversed.dependencies[startingProject].forEach(({ target }) => addAffectedDependencies(target, reversed, builder, visited));
    reversed.dependencies[startingProject].forEach(({ type, source, target }) => {
        // Since source and target was reversed,
        // we need to reverse it back to original direction.
        builder.addDependency(type, target, source);
    });
}
//# sourceMappingURL=affected-project-graph.js.map