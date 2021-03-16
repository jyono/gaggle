"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("@nrwl/workspace");
function default_1() {
    return (host) => {
        if (!host.exists('.eslintrc')) {
            return schematics_1.noop();
        }
        else {
            return schematics_1.chain([
                workspace_1.updateJsonInTree('.eslintrc', (json) => {
                    var _a;
                    const tsconfig = (_a = json === null || json === void 0 ? void 0 : json.parserOptions) === null || _a === void 0 ? void 0 : _a.project;
                    if (tsconfig && tsconfig === './tsconfig.base.json') {
                        json.parserOptions.project = json.parserOptions.project.replace(/tsconfig.base.json$/, 'tsconfig.*?.json');
                        return json;
                    }
                    else {
                        return json;
                    }
                }),
                workspace_1.formatFiles(),
            ]);
        }
    };
}
exports.default = default_1;
//# sourceMappingURL=migrate-eslintrc-tsconfig-wildcard.js.map