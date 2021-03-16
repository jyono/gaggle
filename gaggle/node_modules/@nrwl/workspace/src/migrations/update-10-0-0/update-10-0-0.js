"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const ast_utils_1 = require("../../utils/ast-utils");
const update_packages_in_package_json_1 = require("../../utils/update-packages-in-package-json");
const path_1 = require("path");
const updatePackages = update_packages_in_package_json_1.updatePackagesInPackageJson(path_1.join(__dirname, '../../..', 'migrations.json'), '10.0.0');
const addNxJsonAffectedConfig = ast_utils_1.updateJsonInTree('nx.json', (json) => {
    json.affected = {
        defaultBase: 'master',
    };
    return json;
});
function default_1() {
    return schematics_1.chain([updatePackages, addNxJsonAffectedConfig]);
}
exports.default = default_1;
//# sourceMappingURL=update-10-0-0.js.map