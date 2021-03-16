"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRootPath = void 0;
const fileutils_1 = require("./fileutils");
const path = require("path");
exports.appRootPath = pathInner(__dirname);
function pathInner(dir) {
    if (process.env.NX_WORKSPACE_ROOT_PATH)
        return process.env.NX_WORKSPACE_ROOT_PATH;
    if (path.dirname(dir) === dir)
        return process.cwd();
    if (fileutils_1.fileExists(path.join(dir, 'workspace.json')) ||
        fileutils_1.fileExists(path.join(dir, 'angular.json'))) {
        return dir;
    }
    else {
        return pathInner(path.dirname(dir));
    }
}
//# sourceMappingURL=app-root.js.map