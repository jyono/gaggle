"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("@nrwl/workspace/src/utils/workspace");
const workspace_2 = require("@nrwl/workspace");
const convertToArray = workspace_1.updateWorkspace((workspace) => {
    workspace.projects.forEach((project) => {
        project.targets.forEach((target) => {
            if (target.builder === '@nrwl/jest:jest' &&
                target.options &&
                target.options.testPathPattern) {
                target.options.testPathPattern = [target.options.testPathPattern];
            }
        });
    });
});
function default_1() {
    return schematics_1.chain([convertToArray, workspace_2.formatFiles()]);
}
exports.default = default_1;
//# sourceMappingURL=update-8-7-0.js.map