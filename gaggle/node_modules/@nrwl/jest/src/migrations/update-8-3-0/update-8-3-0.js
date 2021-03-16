"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("@nrwl/workspace");
const ts = require("typescript");
const ast_utils_1 = require("@nrwl/workspace/src/utils/ast-utils");
function updateJestConfig(host) {
    if (host.exists('jest.config.js')) {
        const contents = host.read('jest.config.js').toString();
        const sourceFile = ts.createSourceFile('jest.config.js', contents, ts.ScriptTarget.Latest);
        const changes = [];
        const sourceNodes = ast_utils_1.getSourceNodes(sourceFile);
        sourceNodes.forEach((node, index) => {
            if (ts.isPropertyAssignment(node) &&
                ts.isIdentifier(node.name) &&
                node.name.text === 'collectCoverage') {
                const expectedCommaNode = sourceNodes[index + 4];
                const isFollowedByComma = expectedCommaNode.kind === ts.SyntaxKind.CommaToken;
                changes.push(new ast_utils_1.RemoveChange('jest.config.js', node.getStart(sourceFile), isFollowedByComma
                    ? node.getFullText(sourceFile)
                    : node.getText(sourceFile)));
            }
        });
        workspace_1.insert(host, 'jest.config.js', changes);
    }
}
function default_1() {
    return schematics_1.chain([updateJestConfig, workspace_1.formatFiles()]);
}
exports.default = default_1;
//# sourceMappingURL=update-8-3-0.js.map