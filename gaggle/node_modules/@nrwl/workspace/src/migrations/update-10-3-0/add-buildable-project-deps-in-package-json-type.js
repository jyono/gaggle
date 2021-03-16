"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const workspace_1 = require("@nrwl/workspace");
function default_1() {
    return (host) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const workspace = yield workspace_1.getWorkspace(host);
        for (let [, projectTarget] of workspace.projects) {
            for (let [, buildTarget] of projectTarget.targets) {
                if (buildTarget.builder === '@nrwl/web:package' ||
                    buildTarget.builder === '@nrwl/angular:package') {
                    if (!buildTarget.options) {
                        buildTarget.options = {};
                    }
                    buildTarget.options['buildableProjectDepsInPackageJsonType'] =
                        'dependencies';
                }
            }
        }
        return workspace_1.updateWorkspace(workspace);
    });
}
exports.default = default_1;
//# sourceMappingURL=add-buildable-project-deps-in-package-json-type.js.map