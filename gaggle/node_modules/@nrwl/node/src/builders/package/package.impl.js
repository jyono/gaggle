"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runNodePackageBuilder = void 0;
const architect_1 = require("@angular-devkit/architect");
const project_graph_1 = require("@nrwl/workspace/src/core/project-graph");
const buildable_libs_utils_1 = require("@nrwl/workspace/src/utils/buildable-libs-utils");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const compile_typescript_files_1 = require("./utils/compile-typescript-files");
const update_package_json_1 = require("./utils/update-package-json");
const normalize_options_1 = require("./utils/normalize-options");
const copy_asset_files_1 = require("./utils/copy-asset-files");
function runNodePackageBuilder(options, context) {
    const projGraph = project_graph_1.createProjectGraph();
    const libRoot = projGraph.nodes[context.target.project].data.root;
    const normalizedOptions = normalize_options_1.default(options, context, libRoot);
    const { target, dependencies } = buildable_libs_utils_1.calculateProjectDependencies(projGraph, context);
    return rxjs_1.of(buildable_libs_utils_1.checkDependentProjectsHaveBeenBuilt(context, dependencies)).pipe(operators_1.switchMap((result) => {
        if (result) {
            return compile_typescript_files_1.default(normalizedOptions, context, libRoot, dependencies).pipe(operators_1.tap(() => {
                update_package_json_1.default(normalizedOptions, context);
                if (dependencies.length > 0 &&
                    options.updateBuildableProjectDepsInPackageJson) {
                    buildable_libs_utils_1.updateBuildableProjectPackageJsonDependencies(context, target, dependencies, normalizedOptions.buildableProjectDepsInPackageJsonType);
                }
            }), operators_1.switchMap(() => copy_asset_files_1.default(normalizedOptions, context)));
        }
        else {
            return rxjs_1.of({ success: false });
        }
    }), operators_1.map((value) => {
        return Object.assign(Object.assign({}, value), { outputPath: normalizedOptions.outputPath });
    }));
}
exports.runNodePackageBuilder = runNodePackageBuilder;
exports.default = architect_1.createBuilder(runNodePackageBuilder);
//# sourceMappingURL=package.impl.js.map