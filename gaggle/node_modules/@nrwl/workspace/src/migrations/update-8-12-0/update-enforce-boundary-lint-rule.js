"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEnforceBuildablePackageEslintRule = exports.addEnforceBuildablePackageTslintRule = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const ast_utils_1 = require("../../utils/ast-utils");
exports.addEnforceBuildablePackageTslintRule = (host) => {
    if (host.exists('tslint.json')) {
        return ast_utils_1.updateJsonInTree('tslint.json', (json) => {
            const ruleName = 'nx-enforce-module-boundaries';
            const rule = ruleName in json.rules ? json.rules[ruleName] : null;
            if (Array.isArray(rule) && typeof rule[1] === 'object') {
                // add flag
                rule[1].enforceBuildableLibDependency = true;
            }
            return json;
        });
    }
};
exports.addEnforceBuildablePackageEslintRule = (host) => {
    if (host.exists('.eslintrc')) {
        return ast_utils_1.updateJsonInTree('.eslintrc', (json) => {
            const ruleName = '@nrwl/nx/enforce-module-boundaries';
            const rule = ruleName in json.rules ? json.rules[ruleName] : null;
            if (Array.isArray(rule) && typeof rule[1] === 'object') {
                // add flag
                rule[1].enforceBuildableLibDependency = true;
            }
            return json;
        });
    }
};
function default_1() {
    return schematics_1.chain([
        exports.addEnforceBuildablePackageTslintRule,
        exports.addEnforceBuildablePackageEslintRule,
    ]);
}
exports.default = default_1;
//# sourceMappingURL=update-enforce-boundary-lint-rule.js.map