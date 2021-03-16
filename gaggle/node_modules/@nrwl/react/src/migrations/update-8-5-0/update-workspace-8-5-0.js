"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("@nrwl/workspace");
function update() {
    return schematics_1.chain([
        workspace_1.updateWorkspaceInTree((config) => {
            const a = [];
            const b = [];
            Object.keys(config.schematics).forEach((name) => {
                if (name === '@nrwl/react' && config.schematics[name].application) {
                    a.push(config.schematics[name]);
                }
                if (name === '@nrwl/react:application') {
                    b.push(config.schematics[name]);
                }
            });
            a.forEach((x) => {
                delete x.application.babel;
            });
            b.forEach((x) => {
                delete x.babel;
            });
            return config;
        }),
        workspace_1.formatFiles(),
    ]);
}
exports.default = update;
//# sourceMappingURL=update-workspace-8-5-0.js.map