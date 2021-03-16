"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("@nrwl/workspace");
function updateLintConfigurations(host, context) {
    const workspaceJson = workspace_1.readWorkspace(host);
    Object.values(workspaceJson.projects).forEach((config) => {
        if (!config.architect || !config.architect.lint)
            return;
        if (config.architect.lint.builder === '@nrwl/linter:lint') {
            updateJson((json) => {
                // Prefix it so that previously ignored files will override the whitelist.
                json.ignorePatterns = ['!**/*', ...(json.ignorePatterns || [])];
                return json;
            }, config.architect.lint.options.config, host, context);
        }
        if (config.architect.lint.builder === '@angular-devkit/build-angular:tslint') {
            updateJson((json) => {
                json.linterOptions = Object.assign(Object.assign({}, json.linterOptions), { 
                    // Prefix it so that previously ignored files will override the whitelist.
                    exclude: [
                        '!**/*',
                        ...((json.linterOptions && json.linterOptions.exclude) || []),
                    ] });
                return json;
            }, `${config.root}/tslint.json`, host, context);
        }
    });
}
function updateJson(visitor, path, host, context) {
    try {
        if (host.exists(path)) {
            // In case tslint.json does not exist we don't want to create it.
            workspace_1.updateJsonInTree(path, visitor)(host, context);
        }
    }
    catch (_a) {
        context.logger.warn(`Could not update ${path}`);
    }
}
function default_1() {
    return schematics_1.chain([updateLintConfigurations, workspace_1.formatFiles()]);
}
exports.default = default_1;
//# sourceMappingURL=update-lint-config.js.map