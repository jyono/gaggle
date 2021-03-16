"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatFiles = void 0;
const tslib_1 = require("tslib");
const path = require("path");
const get_workspace_layout_1 = require("../utils/get-workspace-layout");
const workspace_1 = require("@nrwl/tao/src/shared/workspace");
const stripJsonComments = require("strip-json-comments");
let prettier;
try {
    prettier = require('prettier');
}
catch (e) { }
/**
 * Formats all the created or updated files using Prettier
 * @param host - the file system tree
 */
function formatFiles(host) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        updateWorkspaceJsonToMatchFormatVersion(host);
        if (!prettier)
            return;
        const files = new Set(host.listChanges().filter((file) => file.type !== 'DELETE'));
        yield Promise.all(Array.from(files).map((file) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const systemPath = path.join(host.root, file.path);
            let options = {
                filepath: systemPath,
            };
            const resolvedOptions = yield prettier.resolveConfig(systemPath);
            if (!resolvedOptions) {
                return;
            }
            options = Object.assign(Object.assign({}, options), resolvedOptions);
            const support = yield prettier.getFileInfo(systemPath, options);
            if (support.ignored || !support.inferredParser) {
                return;
            }
            try {
                host.write(file.path, prettier.format(file.content.toString(), options));
            }
            catch (e) {
                console.warn(`Could not format ${file.path}. Error: "${e.message}"`);
            }
        })));
    });
}
exports.formatFiles = formatFiles;
function updateWorkspaceJsonToMatchFormatVersion(host) {
    const path = get_workspace_layout_1.getWorkspacePath(host);
    if (!path) {
        return;
    }
    try {
        const workspaceJson = JSON.parse(stripJsonComments(host.read(path).toString()));
        const reformatted = workspace_1.reformattedWorkspaceJsonOrNull(workspaceJson);
        if (reformatted) {
            host.write(path, JSON.stringify(reformatted, null, 2));
        }
    }
    catch (e) {
        console.error(`Failed to format: ${path}`);
        console.error(e);
    }
}
//# sourceMappingURL=format-files.js.map