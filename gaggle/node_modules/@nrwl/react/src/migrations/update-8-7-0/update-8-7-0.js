"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("@nrwl/workspace");
const literals_1 = require("@angular-devkit/core/src/utils/literals");
const path = require("path");
function update() {
    return schematics_1.chain([
        displayInformation,
        workspace_1.updatePackagesInPackageJson(path.join(__dirname, '../../../', 'migrations.json'), '8.7.0'),
        workspace_1.formatFiles(),
    ]);
}
exports.default = update;
function displayInformation(host, context) {
    const packageJson = workspace_1.readJsonInTree(host, '/package.json');
    if (packageJson['redux-starter-kit']) {
        context.logger.info(literals_1.stripIndents `
    Redux Starter Kit has a breaking change for version 0.8.0.
    
    Please update \`createSlice({ slice: ... })\` with \`createSlice({ name: ... })\`.
    
    See: https://github.com/reduxjs/redux-starter-kit/releases/tag/v0.8.0 
  `);
    }
}
//# sourceMappingURL=update-8-7-0.js.map