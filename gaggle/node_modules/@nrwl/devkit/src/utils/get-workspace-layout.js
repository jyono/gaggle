"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkspacePath = exports.getWorkspaceLayout = void 0;
const json_1 = require("./json");
/**
 * Returns workspace defaults. It includes defaults folders for apps and libs,
 * and the default scope.
 *
 * Example:
 *
 * `{ appsDir: 'apps', libsDir: 'libs', npmScope: 'myorg' }`
 * @param host - file system tree
 */
function getWorkspaceLayout(host) {
    const nxJson = json_1.readJson(host, 'nx.json');
    const layout = nxJson.workspaceLayout
        ? nxJson.workspaceLayout
        : { appsDir: 'apps', libsDir: 'libs' };
    const npmScope = nxJson.npmScope;
    return Object.assign(Object.assign({}, layout), { npmScope });
}
exports.getWorkspaceLayout = getWorkspaceLayout;
function getWorkspacePath(host) {
    const possibleFiles = ['/angular.json', '/workspace.json'];
    return possibleFiles.filter((path) => host.exists(path))[0];
}
exports.getWorkspacePath = getWorkspacePath;
//# sourceMappingURL=get-workspace-layout.js.map