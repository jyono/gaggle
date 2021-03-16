"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("@nrwl/workspace");
const ts = require("typescript");
const path = require("path");
const ast_utils_1 = require("@nrwl/workspace/src/utils/ast-utils");
const literals_1 = require("@angular-devkit/core/src/utils/literals");
function update() {
    return schematics_1.chain([
        displayInformation,
        workspace_1.updatePackagesInPackageJson(path.join(__dirname, '../../../', 'migrations.json'), '9.0.0'),
        updateJestConfigs,
        workspace_1.formatFiles(),
    ]);
}
exports.default = update;
function displayInformation(host, context) {
    const config = ast_utils_1.readJsonInTree(host, 'package.json');
    if (config.devDependencies && config.devDependencies['jest-preset-angular']) {
        context.logger.info(literals_1.stripIndents `
    \`jest-preset-angular\` 8.0.0 has restructured folders, introducing breaking changes to 
    jest.config.js files.
    
    We are updating snapshotSerializers in each Angular project to include appropriate paths.
    
    See: https://github.com/thymikee/jest-preset-angular/releases/tag/v8.0.0
  `);
    }
}
function updateJestConfigs(host) {
    const config = ast_utils_1.readJsonInTree(host, 'package.json');
    if (config.devDependencies && config.devDependencies['jest-preset-angular']) {
        const workspaceConfig = workspace_1.readWorkspace(host);
        const jestConfigsToUpdate = [];
        Object.values(workspaceConfig.projects).forEach((project) => {
            if (!project.architect) {
                return;
            }
            Object.values(project.architect).forEach((target) => {
                if (target.builder !== '@nrwl/jest:jest') {
                    return;
                }
                if (target.options.jestConfig) {
                    jestConfigsToUpdate.push(target.options.jestConfig);
                }
                if (target.configurations) {
                    Object.values(target.configurations).forEach((config) => {
                        if (config.jestConfig) {
                            jestConfigsToUpdate.push(config.jestConfig);
                        }
                    });
                }
            });
        });
        jestConfigsToUpdate.forEach((configPath) => {
            if (host.exists(configPath)) {
                const contents = host.read(configPath).toString();
                const sourceFile = ts.createSourceFile(configPath, contents, ts.ScriptTarget.Latest);
                const changes = [];
                ast_utils_1.getSourceNodes(sourceFile).forEach((node) => {
                    if (node && ts.isStringLiteral(node)) {
                        const nodeText = node.text;
                        if (nodeText === 'jest-preset-angular/AngularSnapshotSerializer.js') {
                            // add new serializer from v8 of jest-preset-angular
                            changes.push(new ast_utils_1.InsertChange(configPath, node.getStart(sourceFile), `'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',\n`));
                            changes.push(new ast_utils_1.ReplaceChange(configPath, node.getStart(sourceFile) + 1, nodeText, 'jest-preset-angular/build/AngularSnapshotSerializer.js'));
                        }
                        if (nodeText === 'jest-preset-angular/HTMLCommentSerializer.js') {
                            changes.push(new ast_utils_1.ReplaceChange(configPath, node.getStart(sourceFile) + 1, nodeText, 'jest-preset-angular/build/HTMLCommentSerializer.js'));
                        }
                    }
                });
                workspace_1.insert(host, configPath, changes.sort((a, b) => (a.order > b.order ? -1 : 1)));
            }
        });
    }
}
//# sourceMappingURL=update-9-0-0.js.map