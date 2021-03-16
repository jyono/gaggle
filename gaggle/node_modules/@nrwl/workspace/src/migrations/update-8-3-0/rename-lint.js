"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ast_utils_1 = require("../../utils/ast-utils");
const workspace_1 = require("@nrwl/workspace");
const schematics_1 = require("@angular-devkit/schematics");
const updateLint = ast_utils_1.updateJsonInTree('package.json', (json) => {
    if (json.scripts &&
        json.scripts.lint &&
        json.scripts.lint.indexOf('nx lint') > -1) {
        json.scripts.lint = json.scripts.lint.replace('nx lint', 'nx workspace-lint');
    }
    return json;
});
function default_1() {
    return schematics_1.chain([updateLint, workspace_1.formatFiles()]);
}
exports.default = default_1;
//# sourceMappingURL=rename-lint.js.map