"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const format_files_1 = require("../../utils/rules/format-files");
const workspace_1 = require("../../utils/workspace");
function updateExcludePattern(host, context) {
    const builders = [
        '@nrwl/linter:lint',
        '@angular-devkit/build-angular:tslint',
    ];
    return workspace_1.updateBuilderConfig((options, target, project) => {
        if (!(options === null || options === void 0 ? void 0 : options.exclude)) {
            return options;
        }
        const faultyPattern = `!${project.root}/**`;
        if ((options === null || options === void 0 ? void 0 : options.exclude).includes(faultyPattern)) {
            const index = (options === null || options === void 0 ? void 0 : options.exclude).indexOf(faultyPattern);
            (options === null || options === void 0 ? void 0 : options.exclude)[index] = faultyPattern + '/*';
        }
        return options;
    }, ...builders);
}
function default_1() {
    return schematics_1.chain([updateExcludePattern, format_files_1.formatFiles()]);
}
exports.default = default_1;
//# sourceMappingURL=update-linters-exclude.js.map