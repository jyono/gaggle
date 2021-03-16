"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
const workspace_1 = require("@nrwl/workspace");
const fileutils_1 = require("@nrwl/workspace/src/utilities/fileutils");
const path_1 = require("path");
function updatePackageJson(options, context) {
    const mainFile = path_1.basename(options.main).replace(/\.[tj]s$/, '');
    const typingsFile = `${mainFile}.d.ts`;
    const mainJsFile = `${mainFile}.js`;
    const packageJson = workspace_1.readJsonFile(path_1.join(context.workspaceRoot, options.packageJson));
    packageJson.main = core_1.normalize(`./${options.relativeMainFileOutput}/${mainJsFile}`);
    packageJson.typings = core_1.normalize(`./${options.relativeMainFileOutput}/${typingsFile}`);
    fileutils_1.writeJsonFile(`${options.outputPath}/package.json`, packageJson);
}
exports.default = updatePackageJson;
//# sourceMappingURL=update-package-json.js.map