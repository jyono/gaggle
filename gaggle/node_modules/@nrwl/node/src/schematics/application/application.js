"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationGenerator = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
const workspace_1 = require("@nrwl/workspace");
const workspace_2 = require("@nrwl/workspace");
const init_1 = require("../init/init");
const ast_utils_1 = require("@nrwl/workspace/src/utils/ast-utils");
const to_js_1 = require("@nrwl/workspace/src/utils/rules/to-js");
const devkit_1 = require("@nrwl/devkit");
const ngcli_adapter_1 = require("@nrwl/devkit/ngcli-adapter");
function updateNxJson(options) {
    return workspace_1.updateJsonInTree(`/nx.json`, (json) => {
        return Object.assign(Object.assign({}, json), { projects: Object.assign(Object.assign({}, json.projects), { [options.name]: { tags: options.parsedTags } }) });
    });
}
function getBuildConfig(project, options) {
    return {
        builder: '@nrwl/node:build',
        outputs: ['{options.outputPath}'],
        options: {
            outputPath: core_1.join(core_1.normalize('dist'), options.appProjectRoot),
            main: to_js_1.maybeJs(options, core_1.join(project.sourceRoot, 'main.ts')),
            tsConfig: core_1.join(options.appProjectRoot, 'tsconfig.app.json'),
            assets: [core_1.join(project.sourceRoot, 'assets')],
        },
        configurations: {
            production: {
                optimization: true,
                extractLicenses: true,
                inspect: false,
                fileReplacements: [
                    {
                        replace: to_js_1.maybeJs(options, core_1.join(project.sourceRoot, 'environments/environment.ts')),
                        with: to_js_1.maybeJs(options, core_1.join(project.sourceRoot, 'environments/environment.prod.ts')),
                    },
                ],
            },
        },
    };
}
function getServeConfig(options) {
    return {
        builder: '@nrwl/node:execute',
        options: {
            buildTarget: `${options.name}:build`,
        },
    };
}
function updateWorkspaceJson(options) {
    return workspace_1.updateWorkspaceInTree((workspaceJson) => {
        const project = {
            root: options.appProjectRoot,
            sourceRoot: core_1.join(options.appProjectRoot, 'src'),
            projectType: 'application',
            prefix: options.name,
            architect: {},
        };
        project.architect.build = getBuildConfig(project, options);
        project.architect.serve = getServeConfig(options);
        project.architect.lint = workspace_1.generateProjectLint(core_1.normalize(project.root), core_1.join(core_1.normalize(project.root), 'tsconfig.app.json'), options.linter, [`${options.appProjectRoot}/**/*.${options.js ? 'js' : 'ts'}`]);
        workspaceJson.projects[options.name] = project;
        workspaceJson.defaultProject = workspaceJson.defaultProject || options.name;
        return workspaceJson;
    });
}
function addAppFiles(options) {
    return schematics_1.chain([
        schematics_1.mergeWith(schematics_1.apply(schematics_1.url(`./files/app`), [
            schematics_1.template({
                tmpl: '',
                name: options.name,
                root: options.appProjectRoot,
                offset: devkit_1.offsetFromRoot(options.appProjectRoot),
            }),
            schematics_1.move(options.appProjectRoot),
            options.js ? to_js_1.toJS() : schematics_1.noop(),
        ])),
        options.pascalCaseFiles
            ? (tree, context) => {
                context.logger.warn('NOTE: --pascalCaseFiles is a noop');
                return tree;
            }
            : schematics_1.noop(),
    ]);
}
function addProxy(options) {
    return (host, context) => {
        const projectConfig = workspace_2.getProjectConfig(host, options.frontendProject);
        if (projectConfig.architect && projectConfig.architect.serve) {
            const pathToProxyFile = `${projectConfig.root}/proxy.conf.json`;
            if (!host.exists(pathToProxyFile)) {
                host.create(pathToProxyFile, JSON.stringify({
                    '/api': {
                        target: 'http://localhost:3333',
                        secure: false,
                    },
                }, null, 2));
            }
            else {
                //add new entry to existing config
                const proxyFileContent = host.get(pathToProxyFile).content.toString();
                const proxyModified = Object.assign(Object.assign({}, JSON.parse(proxyFileContent)), { [`/${options.name}-api`]: {
                        target: 'http://localhost:3333',
                        secure: false,
                    } });
                host.overwrite(pathToProxyFile, JSON.stringify(proxyModified, null, 2));
            }
            workspace_1.updateWorkspaceInTree((json) => {
                projectConfig.architect.serve.options.proxyConfig = pathToProxyFile;
                json.projects[options.frontendProject] = projectConfig;
                return json;
            })(host, context);
        }
    };
}
function addJest(options) {
    return options.unitTestRunner === 'jest'
        ? schematics_1.externalSchematic('@nrwl/jest', 'jest-project', {
            project: options.name,
            setupFile: 'none',
            skipSerializers: true,
            supportTsx: options.js,
            babelJest: options.babelJest,
        })
        : schematics_1.noop();
}
function default_1(schema) {
    return (host, context) => {
        const options = normalizeOptions(host, schema);
        return schematics_1.chain([
            init_1.default(Object.assign(Object.assign({}, options), { skipFormat: true })),
            workspace_1.addLintFiles(options.appProjectRoot, options.linter),
            addAppFiles(options),
            options.js
                ? to_js_1.updateTsConfigsToJs({ projectRoot: options.appProjectRoot })
                : schematics_1.noop,
            updateWorkspaceJson(options),
            updateNxJson(options),
            addJest(options),
            options.frontendProject ? addProxy(options) : schematics_1.noop(),
            workspace_1.formatFiles(options),
        ])(host, context);
    };
}
exports.default = default_1;
function normalizeOptions(host, options) {
    const appDirectory = options.directory
        ? `${devkit_1.names(options.directory).fileName}/${devkit_1.names(options.name).fileName}`
        : devkit_1.names(options.name).fileName;
    const appProjectName = appDirectory.replace(new RegExp('/', 'g'), '-');
    const appProjectRoot = core_1.join(core_1.normalize(ast_utils_1.appsDir(host)), appDirectory);
    const parsedTags = options.tags
        ? options.tags.split(',').map((s) => s.trim())
        : [];
    return Object.assign(Object.assign({}, options), { name: devkit_1.names(appProjectName).fileName, frontendProject: options.frontendProject
            ? devkit_1.names(options.frontendProject).fileName
            : undefined, appProjectRoot,
        parsedTags });
}
exports.applicationGenerator = ngcli_adapter_1.wrapAngularDevkitSchematic('@nrwl/node', 'application');
//# sourceMappingURL=application.js.map