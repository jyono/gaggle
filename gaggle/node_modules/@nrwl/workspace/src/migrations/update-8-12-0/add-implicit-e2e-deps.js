"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const literals_1 = require("@angular-devkit/core/src/utils/literals");
const ast_utils_1 = require("../../utils/ast-utils");
const format_files_1 = require("@nrwl/workspace/src/utils/rules/format-files");
const addE2eImplicitDependencies = ast_utils_1.updateJsonInTree('nx.json', (json) => {
    Object.keys(json.projects).forEach((proj) => {
        const implicitE2eName = proj.replace(/-e2e$/, '');
        if (proj.endsWith('-e2e') && json.projects[implicitE2eName]) {
            json.projects[proj].implicitDependencies =
                json.projects[proj].implicitDependencies || [];
            if (!json.projects[proj].implicitDependencies.includes(implicitE2eName)) {
                json.projects[proj].implicitDependencies.push(implicitE2eName);
            }
        }
    });
    return json;
});
function showInfo(host, context) {
    context.logger.info(literals_1.stripIndents `
    Nx no longer infers implicit dependencies between e2e projects and their source projects based on name.
    
    These dependencies have been added to nx.json.
  `);
}
function default_1() {
    return schematics_1.chain([showInfo, addE2eImplicitDependencies, format_files_1.formatFiles()]);
}
exports.default = default_1;
//# sourceMappingURL=add-implicit-e2e-deps.js.map