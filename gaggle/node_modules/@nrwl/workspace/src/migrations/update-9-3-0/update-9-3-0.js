"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("@nrwl/workspace");
const path_1 = require("path");
const updatePackages = workspace_1.updatePackagesInPackageJson(path_1.join(__dirname, '../../../', 'migrations.json'), '9.3.0');
function default_1() {
    return schematics_1.chain([updatePackages, workspace_1.formatFiles()]);
}
exports.default = default_1;
//# sourceMappingURL=update-9-3-0.js.map