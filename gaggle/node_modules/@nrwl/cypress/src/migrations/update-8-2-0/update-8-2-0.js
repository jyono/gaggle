"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("@nrwl/workspace");
const literals_1 = require("@angular-devkit/core/src/utils/literals");
const typescript_1 = require("typescript");
const path_1 = require("path");
const core_1 = require("@angular-devkit/core");
function updateCypressJson(host, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const rules = [];
        const workspace = yield workspace_1.getWorkspace(host);
        workspace.projects.forEach((project) => {
            project.targets.forEach((target) => {
                if (target.builder !== '@nrwl/cypress:cypress') {
                    return;
                }
                const parseConfigHost = {
                    useCaseSensitiveFileNames: true,
                    fileExists: (path) => host.exists(path),
                    readDirectory: (dir) => host.getDir(dir).subfiles,
                    readFile: (path) => host.read(path).toString(),
                };
                const updatedCypressJsons = new Set();
                updatedCypressJsons.add(target.options.cypressConfig);
                rules.push(workspace_1.updateJsonInTree(target.options.cypressConfig, (json) => {
                    function getUpdatedPath(path) {
                        if (typeof path !== 'string') {
                            return path;
                        }
                        return ('./' +
                            core_1.normalize(path_1.relative(path_1.dirname(target.options.cypressConfig), path_1.relative('./' + tsConfig.options.outDir, path_1.join(path_1.dirname(target.options.cypressConfig), path)))));
                    }
                    const tsConfig = typescript_1.parseJsonConfigFileContent(typescript_1.parseConfigFileTextToJson(target.options.tsConfig, host.read(target.options.tsConfig).toString()).config, parseConfigHost, path_1.dirname(target.options.tsConfig));
                    json.fileServerFolder = getUpdatedPath(json.fileServerFolder);
                    json.fixturesFolder = getUpdatedPath(json.fixturesFolder);
                    json.integrationFolder = getUpdatedPath(json.integrationFolder);
                    json.pluginsFile = getUpdatedPath(json.pluginsFile);
                    json.supportFile = getUpdatedPath(json.supportFile);
                    return json;
                }));
                Object.values(target.configurations).forEach((config) => {
                    if (config.cypressConfig &&
                        !updatedCypressJsons.has(config.cypressConfig)) {
                        rules.push(workspace_1.updateJsonInTree(config.cypressConfig, (json) => {
                            function getUpdatedPath(path) {
                                if (typeof path !== 'string') {
                                    return path;
                                }
                                return ('./' +
                                    path_1.relative(path_1.dirname(config.cypressConfig), path_1.relative('./' + tsConfig.options.outDir, path_1.join(path_1.dirname(config.cypressConfig), path))));
                            }
                            const tsConfig = typescript_1.parseJsonConfigFileContent(typescript_1.parseConfigFileTextToJson(config.tsConfig || target.options.tsConfig, host
                                .read(config.tsConfig || target.options.tsConfig)
                                .toString()).config, parseConfigHost, path_1.dirname(config.tsConfig || target.options.tsConfig));
                            json.fileServerFolder = getUpdatedPath(json.fileServerFolder);
                            json.fixturesFolder = getUpdatedPath(json.fixturesFolder);
                            json.integrationFolder = getUpdatedPath(json.integrationFolder);
                            json.pluginsFile = getUpdatedPath(json.pluginsFile);
                            json.supportFile = getUpdatedPath(json.supportFile);
                            return json;
                        }));
                    }
                });
            });
        });
        return schematics_1.chain(rules);
    });
}
function updatePlugins(host, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const workspace = yield workspace_1.getWorkspace(host);
        workspace.projects.forEach((project) => {
            project.targets.forEach((target) => {
                if (target.builder !== '@nrwl/cypress:cypress') {
                    return;
                }
                [target.options, ...Object.values(target.configurations)].forEach((config) => {
                    if (!config.cypressConfig) {
                        return;
                    }
                    const cypressConfig = workspace_1.readJsonInTree(host, config.cypressConfig);
                    if (typeof cypressConfig.pluginsFile !== 'string') {
                        return;
                    }
                    const pluginFile = path_1.join(path_1.dirname(config.cypressConfig), cypressConfig.pluginsFile.replace(/\.js$/, '') + '.ts');
                    const newPluginFile = pluginFile.replace(/\.ts$/, '.js');
                    if (!host.exists(pluginFile)) {
                        return;
                    }
                    const result = typescript_1.transpileModule(host.read(pluginFile).toString(), {
                        compilerOptions: {
                            module: typescript_1.ModuleKind.CommonJS,
                        },
                    });
                    host.create(newPluginFile, result.outputText);
                    host.delete(pluginFile);
                    const sourceFile = typescript_1.createSourceFile(newPluginFile, result.outputText, typescript_1.ScriptTarget.Latest);
                    const recorder = host.beginUpdate(newPluginFile);
                    recorder.insertLeft(0, `const { preprocessTypescript } = require('@nrwl/cypress/plugins/preprocessor');`);
                    sourceFile.statements.forEach((statement) => {
                        if (typescript_1.isExpressionStatement(statement) &&
                            typescript_1.isBinaryExpression(statement.expression) &&
                            typescript_1.isPropertyAccessExpression(statement.expression.left) &&
                            typescript_1.isIdentifier(statement.expression.left.expression) &&
                            statement.expression.left.expression.escapedText === 'module' &&
                            typescript_1.isIdentifier(statement.expression.left.name) &&
                            statement.expression.left.name.escapedText === 'exports' &&
                            (typescript_1.isFunctionExpression(statement.expression.right) ||
                                typescript_1.isArrowFunction(statement.expression.right)) &&
                            statement.expression.right.parameters.length >= 2) {
                            if (typescript_1.isBlock(statement.expression.right.body)) {
                                const onParamName = statement.expression.right.parameters[0].name.getText(sourceFile);
                                const configParamName = statement.expression.right.parameters[1].name.getText(sourceFile);
                                recorder.insertLeft(statement.expression.right.body.statements.end, literals_1.stripIndents `
                  ${onParamName}('file:preprocessor', preprocessTypescript(${configParamName}))
                `);
                            }
                            else {
                                context.logger.warn(literals_1.stripIndents `
                  We could not update ${pluginFile} with our new preprocessor
                `);
                            }
                        }
                    });
                    host.commitUpdate(recorder);
                });
            });
        });
    });
}
function default_1() {
    return schematics_1.chain([updateCypressJson, updatePlugins, workspace_1.formatFiles()]);
}
exports.default = default_1;
//# sourceMappingURL=update-8-2-0.js.map