"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildNpmPackageNodes = void 0;
const stripJsonComments = require("strip-json-comments");
function buildNpmPackageNodes(ctx, addNode, fileRead) {
    const packageJson = JSON.parse(stripJsonComments(fileRead('package.json')));
    const deps = Object.assign(Object.assign({}, packageJson.dependencies), packageJson.devDependencies);
    Object.keys(deps).forEach((d) => {
        addNode({
            type: 'npm',
            name: `npm:${d}`,
            data: {
                version: deps[d],
                packageName: d,
                files: [],
            },
        });
    });
}
exports.buildNpmPackageNodes = buildNpmPackageNodes;
//# sourceMappingURL=npm-packages.js.map