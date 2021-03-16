"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const workspace_1 = require("@nrwl/workspace");
function default_1() {
    return (host) => {
        if (!host.exists('.vscode/extensions.json')) {
            return;
        }
        return workspace_1.updateJsonInTree('.vscode/extensions.json', (json) => {
            json.recommendations = json.recommendations || [];
            const extension = 'firsttris.vscode-jest-runner';
            if (!json.recommendations.includes(extension)) {
                json.recommendations.push(extension);
            }
            return json;
        });
    };
}
exports.default = default_1;
//# sourceMappingURL=add-jest-extension.js.map