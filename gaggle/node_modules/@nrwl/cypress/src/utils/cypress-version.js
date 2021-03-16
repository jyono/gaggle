"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installedCypressVersion = void 0;
const cypressPackageVersion = require('cypress/package.json').version;
function installedCypressVersion() {
    const majorVersion = cypressPackageVersion.split('.')[0];
    if (!majorVersion) {
        return 0;
    }
    return +majorVersion;
}
exports.installedCypressVersion = installedCypressVersion;
//# sourceMappingURL=cypress-version.js.map