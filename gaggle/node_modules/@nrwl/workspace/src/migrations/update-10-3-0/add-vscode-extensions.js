"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular-devkit/core");
const workspace_1 = require("@nrwl/workspace");
function default_1() {
    return (host) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (host.exists('.vscode/extensions.json')) {
            return;
        }
        const workspace = yield workspace_1.getWorkspace(host);
        let needsAngularExtension = false;
        for (let [, project] of workspace.projects) {
            needsAngularExtension = Array.from(project.targets).some(([, targetDefinition]) => targetDefinition.builder.startsWith('@angular-devkit'));
            if (needsAngularExtension)
                break;
        }
        const extensions = [
            'nrwl.angular-console',
            'ms-vscode.vscode-typescript-tslint-plugin',
            'esbenp.prettier-vscode',
        ];
        if (needsAngularExtension) {
            extensions.push('angular.ng-template');
        }
        host.create('.vscode/extensions.json', core_1.tags.stripIndents ` 
{
 "recommendations": ${workspace_1.serializeJson(extensions)}
} 
    `);
    });
}
exports.default = default_1;
//# sourceMappingURL=add-vscode-extensions.js.map