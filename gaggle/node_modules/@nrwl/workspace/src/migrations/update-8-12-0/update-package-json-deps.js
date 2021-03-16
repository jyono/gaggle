"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const format_files_1 = require("@nrwl/workspace/src/utils/rules/format-files");
const path = require("path");
const update_packages_in_package_json_1 = require("../../utils/update-packages-in-package-json");
function default_1() {
    return schematics_1.chain([
        update_packages_in_package_json_1.updatePackagesInPackageJson(path.join(__dirname, '../../..', 'migrations.json'), '8120'),
        format_files_1.formatFiles(),
    ]);
}
exports.default = default_1;
//# sourceMappingURL=update-package-json-deps.js.map