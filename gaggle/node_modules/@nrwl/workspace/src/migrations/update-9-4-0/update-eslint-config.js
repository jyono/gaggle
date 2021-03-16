"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const format_files_1 = require("../../utils/rules/format-files");
const ast_utils_1 = require("../../utils/ast-utils");
function removeEslintConfigOption(host, context) {
    return ast_utils_1.updateWorkspaceInTree((json) => {
        Object.values(json.projects).forEach((project) => {
            if (!project.architect) {
                return;
            }
            Object.values(project.architect).forEach((target) => {
                var _a;
                if (target.builder !== '@nrwl/linter:lint') {
                    return;
                }
                if (((_a = target === null || target === void 0 ? void 0 : target.options) === null || _a === void 0 ? void 0 : _a.config) === `${project.root}/.eslintrc`) {
                    delete target.options.config;
                }
                if (!target.configurations) {
                    return;
                }
                Object.values(target.configurations).forEach((options) => {
                    if (options.config === `${project.root}/.eslintrc`) {
                        delete options.config;
                    }
                });
            });
        });
        return json;
    });
}
function default_1() {
    return schematics_1.chain([removeEslintConfigOption, format_files_1.formatFiles()]);
}
exports.default = default_1;
//# sourceMappingURL=update-eslint-config.js.map