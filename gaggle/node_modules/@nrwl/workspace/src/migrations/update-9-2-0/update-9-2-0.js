"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("@nrwl/workspace");
const path_1 = require("path");
const updatePackages = workspace_1.updatePackagesInPackageJson(path_1.join(__dirname, '../../../', 'migrations.json'), '9.2.0');
const addCacheableOperations = workspace_1.updateJsonInTree('nx.json', (nxJson) => {
    nxJson.tasksRunnerOptions = nxJson.tasksRunnerOptions || {};
    if (!nxJson.tasksRunnerOptions.default) {
        nxJson.tasksRunnerOptions.default = {
            runner: '@nrwl/workspace/tasks-runners/default',
            options: {
                cacheableOperations: ['build', 'lint', 'test', 'e2e'],
            },
        };
        return nxJson;
    }
    else if (nxJson.tasksRunnerOptions.default &&
        (nxJson.tasksRunnerOptions.default.runner ===
            '@nrwl/workspace/src/tasks-runner/default-task-runner' ||
            nxJson.tasksRunnerOptions.default.runner ===
                '@nrwl/workspace/src/tasks-runner/tasks-runner-v2')) {
        nxJson.tasksRunnerOptions.default.runner =
            '@nrwl/workspace/tasks-runners/default';
        nxJson.tasksRunnerOptions.default.options =
            nxJson.tasksRunnerOptions.default.options || {};
        nxJson.tasksRunnerOptions.default.options.cacheableOperations =
            nxJson.tasksRunnerOptions.default.options.cacheableOperations || [];
        const cacheableOperations = new Set(nxJson.tasksRunnerOptions.default.options.cacheableOperations);
        cacheableOperations.add('build');
        cacheableOperations.add('lint');
        cacheableOperations.add('test');
        cacheableOperations.add('e2e');
        nxJson.tasksRunnerOptions.default.options.cacheableOperations = Array.from(cacheableOperations);
        return nxJson;
    }
    return nxJson;
});
function default_1() {
    return schematics_1.chain([updatePackages, addCacheableOperations, workspace_1.formatFiles()]);
}
exports.default = default_1;
//# sourceMappingURL=update-9-2-0.js.map