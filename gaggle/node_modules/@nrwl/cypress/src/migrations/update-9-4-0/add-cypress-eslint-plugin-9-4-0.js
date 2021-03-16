"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("@nrwl/workspace");
function addCypressPluginToEslintrc(host) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const rules = [];
        const { devDependencies } = workspace_1.readJsonInTree(host, 'package.json');
        const eslintrcFilePaths = [];
        if (devDependencies && devDependencies['@nrwl/cypress']) {
            const workspace = workspace_1.readWorkspace(host);
            Object.values(workspace.projects).forEach((project) => {
                Object.values(project.architect).forEach((target) => {
                    if (target.builder !== '@nrwl/cypress:cypress') {
                        return;
                    }
                    if (host.exists(`${project.root}/.eslintrc`)) {
                        eslintrcFilePaths.push(`${project.root}/.eslintrc`);
                    }
                });
            });
            eslintrcFilePaths.forEach((eslintrcFilePath) => {
                rules.push(workspace_1.updateJsonInTree(eslintrcFilePath, (json) => {
                    if (json.extends) {
                        if (!Array.isArray(json.extends)) {
                            json.extends = [json.extends];
                        }
                        json.extends.push('plugin:cypress/recommended');
                    }
                    return json;
                }));
            });
        }
        return schematics_1.chain(rules);
    });
}
exports.default = () => {
    return (host) => {
        var _a, _b;
        const packageJson = workspace_1.readJsonInTree(host, 'package.json');
        if (((_a = packageJson.devDependencies) === null || _a === void 0 ? void 0 : _a.eslint) || ((_b = packageJson.dependencies) === null || _b === void 0 ? void 0 : _b.eslint)) {
            return schematics_1.chain([
                workspace_1.addDepsToPackageJson({}, { 'eslint-plugin-cypress': '^2.10.3' }),
                addCypressPluginToEslintrc,
                workspace_1.formatFiles(),
            ]);
        }
        else {
            return schematics_1.noop();
        }
    };
};
//# sourceMappingURL=add-cypress-eslint-plugin-9-4-0.js.map