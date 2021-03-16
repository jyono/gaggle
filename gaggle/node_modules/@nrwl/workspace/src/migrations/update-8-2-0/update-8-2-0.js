"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const workspace_1 = require("../../utils/workspace");
const core_1 = require("@angular-devkit/core");
const workspace_2 = require("@nrwl/workspace");
const schematics_1 = require("@angular-devkit/schematics");
const addExcludes = workspace_1.updateWorkspace((workspace) => {
    workspace.projects.forEach((project) => {
        project.targets.forEach((target) => {
            if (target.builder !== '@angular-devkit/build-angular:tslint') {
                return;
            }
            const exceptRootGlob = '!' + core_1.join(core_1.normalize(project.root), '**/*');
            if (!target.options.exclude) {
                target.options.exclude = [];
            }
            if (!target.options.exclude.includes(exceptRootGlob)) {
                target.options.exclude.push(exceptRootGlob);
            }
        });
    });
});
function default_1() {
    return schematics_1.chain([addExcludes, workspace_2.formatFiles()]);
}
exports.default = default_1;
//# sourceMappingURL=update-8-2-0.js.map