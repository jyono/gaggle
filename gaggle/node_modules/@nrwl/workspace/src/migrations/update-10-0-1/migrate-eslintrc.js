"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("@nrwl/workspace");
const visit_not_ignored_files_1 = require("../../utils/rules/visit-not-ignored-files");
function default_1(schema) {
    return schematics_1.chain([
        visit_not_ignored_files_1.visitNotIgnoredFiles((file, host, context) => {
            if (core_1.basename(file) !== '.eslintrc') {
                return;
            }
            return (host, context) => {
                try {
                    workspace_1.updateJsonInTree(file, (json) => {
                        var _a;
                        const tsconfig = (_a = json === null || json === void 0 ? void 0 : json.parserOptions) === null || _a === void 0 ? void 0 : _a.project;
                        if (tsconfig) {
                            const tsconfigPath = core_1.join(core_1.dirname(file), tsconfig);
                            if (tsconfigPath === 'tsconfig.json') {
                                json.parserOptions.project = json.parserOptions.project.replace(/tsconfig.json$/, 'tsconfig.base.json');
                            }
                            return json;
                        }
                        else {
                            return json;
                        }
                    })(host, context);
                }
                catch (e) {
                    context.logger.warn(`${file} could not be migrated because it is not valid JSON`);
                    context.logger.error(e);
                }
            };
        }),
        workspace_1.formatFiles(),
    ]);
}
exports.default = default_1;
//# sourceMappingURL=migrate-eslintrc.js.map