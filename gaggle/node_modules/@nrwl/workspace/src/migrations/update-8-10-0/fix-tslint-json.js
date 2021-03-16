"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
const literals_1 = require("@angular-devkit/core/src/utils/literals");
const ast_utils_1 = require("../../utils/ast-utils");
const workspace_1 = require("../../utils/workspace");
const workspace_2 = require("@nrwl/workspace");
function fixTslints(host) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const workspace = yield workspace_1.getWorkspace(host);
        const rules = [];
        workspace.projects.forEach((proj) => {
            const tslintPath = core_1.join(core_1.normalize(proj.root), 'tslint.json');
            if (host.exists(tslintPath)) {
                rules.push(ast_utils_1.updateJsonInTree(tslintPath, (json, context) => {
                    if (Array.isArray(json.rules)) {
                        if (json.rules.length === 0) {
                            json.rules = {};
                        }
                        else {
                            context.logger.warn(`"rules" in "${tslintPath}" is an array but should be an object.`);
                        }
                    }
                    return json;
                }));
            }
        });
        rules.push(workspace_2.formatFiles());
        return schematics_1.chain(rules);
    });
}
function showInfo(host, context) {
    context.logger.info(literals_1.stripIndents `
    Nx generated invalid tslint configurations in a prior version.
    
    These invalid configurations will be fixed.
  `);
}
function default_1() {
    return schematics_1.chain([showInfo, fixTslints]);
}
exports.default = default_1;
//# sourceMappingURL=fix-tslint-json.js.map