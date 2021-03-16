"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const ast_utils_1 = require("../../utils/ast-utils");
const workspace_1 = require("@nrwl/workspace");
function default_1() {
    return schematics_1.chain([
        (host) => {
            const config = ast_utils_1.readWorkspace(host);
            const configsToUpdate = [];
            Object.keys(config.projects).forEach((name) => {
                const project = config.projects[name];
                if (project.projectType === 'library' &&
                    project.architect &&
                    project.architect.test &&
                    project.architect.test.builder === '@nrwl/jest:jest' &&
                    project.architect.test.options &&
                    project.architect.test.options.setupFile ===
                        project.sourceRoot + '/test-setup.ts') {
                    configsToUpdate.push(project.root + '/tsconfig.lib.json');
                }
            });
            configsToUpdate.forEach((config) => {
                const tsconfig = ast_utils_1.readJsonInTree(host, config);
                if (tsconfig.exclude && tsconfig.exclude[0] === 'src/test.ts') {
                    tsconfig.exclude[0] = 'src/test-setup.ts';
                    host.overwrite(config, JSON.stringify(tsconfig));
                }
            });
        },
        workspace_1.formatFiles(),
    ]);
}
exports.default = default_1;
//# sourceMappingURL=fix-tsconfig-lib-json.js.map