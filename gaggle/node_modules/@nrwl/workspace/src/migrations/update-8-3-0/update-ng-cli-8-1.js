"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const workspace_1 = require("@nrwl/workspace");
const schematics_1 = require("@angular-devkit/schematics");
const semver_1 = require("semver");
const updateCLI = workspace_1.updateJsonInTree('package.json', (json) => {
    json.devDependencies = json.devDependencies || {};
    const cliVersion = json.devDependencies['@angular/cli'];
    const cleanCliVersion = workspace_1.checkAndCleanWithSemver('@angular/cli', cliVersion);
    if (cleanCliVersion && semver_1.gt(cleanCliVersion, '8.1.1')) {
        return json;
    }
    if (json['devDependencies']['@angular/cli']) {
        json['devDependencies']['@angular/cli'] = '8.1.1';
    }
    if (json['devDependencies']['@angular-devkit/build-angular']) {
        json['devDependencies']['@angular-devkit/build-angular'] = '^0.801.1';
    }
    if (json['devDependencies']['@angular-devkit/build-ng-packagr']) {
        json['devDependencies']['@angular-devkit/build-ng-packagr'] = '~0.801.1';
    }
    return json;
});
function default_1() {
    return schematics_1.chain([updateCLI, workspace_1.addInstallTask()]);
}
exports.default = default_1;
//# sourceMappingURL=update-ng-cli-8-1.js.map