"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("@nrwl/workspace");
const versions_1 = require("../../utils/versions");
function updateDependencies() {
    return workspace_1.updateJsonInTree('package.json', (json) => {
        delete json.dependencies['@nrwl/node'];
        json.devDependencies['@nrwl/node'] = versions_1.nxVersion;
        return json;
    });
}
function default_1(schema) {
    return schematics_1.chain([
        workspace_1.setDefaultCollection('@nrwl/node'),
        schema.unitTestRunner === 'jest'
            ? workspace_1.addPackageWithInit('@nrwl/jest')
            : schematics_1.noop(),
        updateDependencies(),
        workspace_1.formatFiles(schema),
    ]);
}
exports.default = default_1;
//# sourceMappingURL=init.js.map