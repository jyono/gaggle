"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("@nrwl/workspace");
const path = require("path");
function update() {
    return schematics_1.chain([
        workspace_1.updatePackagesInPackageJson(path.join(__dirname, '../../../', 'migrations.json'), '8.12.0'),
        workspace_1.formatFiles(),
    ]);
}
exports.default = update;
//# sourceMappingURL=update-8-12-0.js.map