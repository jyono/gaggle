"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const architect_1 = require("@angular-devkit/architect");
const core_1 = require("@angular-devkit/core");
const build_webpack_1 = require("@angular-devkit/build-webpack");
const rxjs_1 = require("rxjs");
const path_1 = require("path");
const operators_1 = require("rxjs/operators");
const node_config_1 = require("../../utils/node.config");
const config_1 = require("../../utils/config");
const normalize_1 = require("../../utils/normalize");
const project_graph_1 = require("@nrwl/workspace/src/core/project-graph");
const buildable_libs_utils_1 = require("@nrwl/workspace/src/utils/buildable-libs-utils");
const ngcli_adapter_1 = require("@nrwl/devkit/ngcli-adapter");
const generate_package_json_1 = require("../../utils/generate-package-json");
try {
    require('dotenv').config();
}
catch (e) { }
exports.default = architect_1.createBuilder(run);
function run(options, context) {
    const projGraph = project_graph_1.createProjectGraph();
    if (!options.buildLibsFromSource) {
        const { target, dependencies } = buildable_libs_utils_1.calculateProjectDependencies(projGraph, context);
        options.tsConfig = buildable_libs_utils_1.createTmpTsConfig(path_1.join(context.workspaceRoot, options.tsConfig), context.workspaceRoot, target.data.root, dependencies);
        if (!buildable_libs_utils_1.checkDependentProjectsHaveBeenBuilt(context, dependencies)) {
            return { success: false };
        }
    }
    return rxjs_1.from(getRoots(context)).pipe(operators_1.map(({ sourceRoot, projectRoot }) => normalize_1.normalizeBuildOptions(options, context.workspaceRoot, sourceRoot, projectRoot)), operators_1.tap((normalizedOptions) => {
        if (normalizedOptions.generatePackageJson) {
            generate_package_json_1.generatePackageJson(context.target.project, projGraph, normalizedOptions);
        }
    }), operators_1.map((options) => {
        let config = node_config_1.getNodeWebpackConfig(options);
        if (options.webpackConfig) {
            config = require(options.webpackConfig)(config, {
                options,
                configuration: context.target.configuration,
            });
        }
        return config;
    }), operators_1.concatMap((config) => build_webpack_1.runWebpack(config, context, {
        logging: (stats) => {
            context.logger.info(stats.toString(config.stats));
        },
        webpackFactory: require('webpack'),
    })), operators_1.map((buildEvent) => {
        buildEvent.outfile = path_1.resolve(context.workspaceRoot, options.outputPath, config_1.OUT_FILENAME);
        return buildEvent;
    }));
}
function getRoots(context) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const workspaceHost = core_1.workspaces.createWorkspaceHost(new ngcli_adapter_1.NxScopedHost(core_1.normalize(context.workspaceRoot)));
        const { workspace } = yield core_1.workspaces.readWorkspace('', workspaceHost);
        const { project } = context.target;
        const { sourceRoot, root } = workspace.projects.get(project);
        if (sourceRoot && root) {
            return { sourceRoot, projectRoot: root };
        }
        context.reportStatus('Error');
        const message = `${project} does not have a sourceRoot or root. Please define both.`;
        context.logger.error(message);
        throw new Error(message);
    });
}
//# sourceMappingURL=build.impl.js.map