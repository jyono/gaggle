"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("@nrwl/workspace");
function update() {
    return schematics_1.chain([
        workspace_1.updateWorkspaceInTree((workspaceJson) => {
            Object.entries(workspaceJson.projects).forEach(([projectName, project]) => {
                Object.entries(project.architect).forEach(([targetName, targetConfig]) => {
                    if (targetConfig.builder === '@nrwl/web:build') {
                        const architect = workspaceJson.projects[projectName].architect[targetName];
                        if (architect && architect.options) {
                            architect.options.buildLibsFromSource = true;
                        }
                    }
                });
            });
            return workspaceJson;
        }),
        workspace_1.formatFiles(),
    ]);
}
exports.default = update;
//# sourceMappingURL=set-build-libs-from-source.js.map