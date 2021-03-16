"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("@nrwl/workspace");
function removeDeprecatedJestBuilderOptions() {
    return (host) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const workspace = yield workspace_1.getWorkspace(host, workspace_1.getWorkspacePath(host));
        for (const [, projectDefinition] of workspace.projects) {
            for (const [, testTarget] of projectDefinition.targets) {
                if (testTarget.builder !== '@nrwl/jest:jest') {
                    continue;
                }
                const updatedOptions = Object.assign({}, testTarget.options);
                delete updatedOptions.setupFile;
                delete updatedOptions.tsConfig;
                testTarget.options = updatedOptions;
            }
        }
        return workspace_1.updateWorkspace(workspace);
    });
}
function update() {
    return schematics_1.chain([removeDeprecatedJestBuilderOptions(), workspace_1.formatFiles()]);
}
exports.default = update;
//# sourceMappingURL=update-10-2-0.js.map