"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const workspace_1 = require("@nrwl/workspace");
const schematics_1 = require("@angular-devkit/schematics");
const updateCypress = workspace_1.updateJsonInTree('package.json', (json) => {
    json.devDependencies = json.devDependencies || {};
    if (json.devDependencies['cypress']) {
        json.devDependencies['cypress'] = '3.4.0';
    }
    return json;
});
function default_1() {
    return schematics_1.chain([updateCypress, workspace_1.addInstallTask(), workspace_1.formatFiles()]);
}
exports.default = default_1;
//# sourceMappingURL=update-cypress-to-34.js.map