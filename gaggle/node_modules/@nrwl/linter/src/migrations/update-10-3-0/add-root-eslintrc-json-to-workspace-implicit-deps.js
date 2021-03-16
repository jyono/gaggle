"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("@nrwl/workspace");
function addRootESLintrcToImplicitDependencies(host) {
    return host.exists('nx.json')
        ? workspace_1.updateJsonInTree('nx.json', (json) => {
            const implicitDependencies = json.implicitDependencies || {};
            json.implicitDependencies['.eslintrc.json'] = '*';
            return json;
        })
        : schematics_1.noop();
}
function default_1() {
    return schematics_1.chain([addRootESLintrcToImplicitDependencies, workspace_1.formatFiles()]);
}
exports.default = default_1;
//# sourceMappingURL=add-root-eslintrc-json-to-workspace-implicit-deps.js.map