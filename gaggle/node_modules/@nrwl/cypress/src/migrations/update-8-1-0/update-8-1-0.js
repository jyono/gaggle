"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("@nrwl/workspace");
const literals_1 = require("@angular-devkit/core/src/utils/literals");
function displayInformation(host, context) {
    context.logger.info(literals_1.stripIndents `Cypress has been updated to a version that improves network speed by 300%!

      Additionally, this resolves an issue where '@types/jquery' needed to be temporarily included in your 'package.json'.
      If you're not using '@types/jquery' in your project otherwise, you may now remove it from your 'devDependencies'.`);
}
function default_1() {
    return schematics_1.chain([
        workspace_1.updateJsonInTree('package.json', (json) => {
            json.devDependencies = json.devDependencies || {};
            json.devDependencies = Object.assign(Object.assign({}, json.devDependencies), { cypress: '~3.3.1' });
            return json;
        }),
        displayInformation,
        workspace_1.formatFiles(),
    ]);
}
exports.default = default_1;
//# sourceMappingURL=update-8-1-0.js.map