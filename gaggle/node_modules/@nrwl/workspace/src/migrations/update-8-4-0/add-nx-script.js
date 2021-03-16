"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ast_utils_1 = require("../../utils/ast-utils");
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("@nrwl/workspace");
const addNxScript = ast_utils_1.updateJsonInTree('package.json', (json) => {
    if (json.scripts && !json.scripts.nx) {
        json.scripts.nx = 'nx';
    }
    return json;
});
function default_1() {
    return schematics_1.chain([addNxScript, workspace_1.formatFiles()]);
}
exports.default = default_1;
//# sourceMappingURL=add-nx-script.js.map