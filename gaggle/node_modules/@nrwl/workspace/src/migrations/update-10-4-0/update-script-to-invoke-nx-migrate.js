"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const workspace_1 = require("@nrwl/workspace");
function update() {
    return workspace_1.updateJsonInTree('package.json', (json) => {
        if (json.scripts && json.scripts.update) {
            json.scripts.update = 'nx migrate latest';
        }
        return json;
    });
}
exports.default = update;
//# sourceMappingURL=update-script-to-invoke-nx-migrate.js.map