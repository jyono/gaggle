"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const format_files_1 = require("../../utils/rules/format-files");
const versions_1 = require("../../utils/versions");
const ast_utils_1 = require("../../utils/ast-utils");
function update() {
    return schematics_1.chain([
        ast_utils_1.updateJsonInTree('package.json', (json) => {
            json.dependencies = json.dependencies || {};
            json.devDependencies = json.devDependencies || {};
            delete json.dependencies['@nrwl/cli'];
            json.devDependencies['@nrwl/cli'] = versions_1.nxVersion;
            json.dependencies = ast_utils_1.sortObjectByKeys(json.dependencies);
            json.devDependencies = ast_utils_1.sortObjectByKeys(json.devDependencies);
            return json;
        }),
        format_files_1.formatFiles(),
    ]);
}
exports.default = update;
//# sourceMappingURL=add-cli-dependency.js.map