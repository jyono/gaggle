"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("@nrwl/workspace");
const path = require("path");
const ignore = require('ignore');
function update() {
    return (host) => {
        const workspace = workspace_1.readWorkspace(host);
        return schematics_1.chain([
            ...Object.keys(workspace.projects).map((k) => {
                const p = workspace.projects[k];
                if (p.projectType !== 'application') {
                    return schematics_1.noop();
                }
                if (isReactProject(p)) {
                    return workspace_1.updateJsonInTree(path.join(p.root, 'tsconfig.json'), (json) => {
                        json.files = json.files.filter((f) => f.indexOf('@nrwl/react/typings/svg.d.ts') === -1);
                        return json;
                    });
                }
                else {
                    return schematics_1.noop();
                }
            }),
            workspace_1.formatFiles(),
        ]);
    };
}
exports.default = update;
function isReactProject(p) {
    const buildArchitect = p.architect && p.architect.build ? p.architect.build : null;
    return (buildArchitect &&
        buildArchitect.builder === '@nrwl/web:build' &&
        (buildArchitect.options.webpackConfig === '@nrwl/react/plugins/babel' ||
            buildArchitect.options.webpackConfig === '@nrwl/react/plugins/webpack'));
}
//# sourceMappingURL=fix-react-tsconfig-8-10-1.js.map