"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("@nrwl/workspace");
const path_1 = require("path");
function removeRootDirInTsConfig() {
    return (host, _) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const workspace = yield workspace_1.getWorkspace(host, workspace_1.getWorkspacePath(host));
        const rules = [];
        for (const [, projectDefinition] of workspace.projects) {
            for (const [, buildTarget] of projectDefinition.targets) {
                if (buildTarget.builder !== '@nrwl/node:package') {
                    continue;
                }
                const tsConfigPath = buildTarget.options.tsConfig;
                if (!host.exists(tsConfigPath)) {
                    continue;
                }
                const tsConfig = workspace_1.readJsonInTree(host, tsConfigPath);
                if (tsConfig.compilerOptions.rootDir !== './' ||
                    tsConfig.compilerOptions.rootDir !== '.') {
                    buildTarget.options.srcRootForCompilationRoot = path_1.join(projectDefinition.root, tsConfig.compilerOptions.rootDir);
                }
                rules.push(workspace_1.updateJsonInTree(tsConfigPath, (json) => {
                    delete json.compilerOptions.rootDir;
                    return json;
                }));
            }
        }
        return schematics_1.chain([workspace_1.updateWorkspace(workspace), ...rules]);
    });
}
function update() {
    return schematics_1.chain([removeRootDirInTsConfig(), workspace_1.formatFiles()]);
}
exports.default = update;
//# sourceMappingURL=remove-root-dir.js.map