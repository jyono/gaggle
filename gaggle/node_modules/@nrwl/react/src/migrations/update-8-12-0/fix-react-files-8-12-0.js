"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("@nrwl/workspace");
const ignore = require('ignore');
function update() {
    return schematics_1.chain([
        workspace_1.updateWorkspaceInTree(updateBuilderWebpackOption),
        workspace_1.addDepsToPackageJson({}, { '@babel/preset-react': '7.8.3' }),
        workspace_1.formatFiles(),
    ]);
}
exports.default = update;
function updateBuilderWebpackOption(json) {
    Object.keys(json.projects).map((k) => {
        const p = json.projects[k];
        if (isReactProject(p) && !p.architect.build.options.webpackConfig) {
            p.architect.build.options.webpackConfig = '@nrwl/react/plugins/webpack';
        }
    });
    return json;
}
function isReactProject(p) {
    const buildArchitect = p.architect && p.architect.build ? p.architect.build : null;
    return (buildArchitect &&
        buildArchitect.builder === '@nrwl/web:build' &&
        buildArchitect.options.main.endsWith('.tsx'));
}
//# sourceMappingURL=fix-react-files-8-12-0.js.map