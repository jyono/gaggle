"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("@nrwl/workspace");
const ts = require("typescript");
const ast_utils_1 = require("@nrwl/workspace/src/utils/ast-utils");
const workspace_2 = require("@nrwl/workspace/src/utils/workspace");
function update() {
    return schematics_1.chain([
        addPassWithNoTestsToWorkspace,
        removePassWithNoTestsFromJestConfig,
        workspace_1.formatFiles(),
    ]);
}
exports.default = update;
const addPassWithNoTestsToWorkspace = workspace_2.updateWorkspace((workspace) => {
    workspace.projects.forEach((project) => {
        project.targets.forEach((target) => {
            if (target.builder === '@nrwl/jest:jest' &&
                target.options &&
                target.options.passWithNoTests === undefined) {
                target.options.passWithNoTests = true;
            }
        });
    });
});
function removePassWithNoTestsFromJestConfig(host) {
    if (host.exists('jest.config.js')) {
        const contents = host.read('jest.config.js').toString();
        const sourceFile = ts.createSourceFile('jest.config.js', contents, ts.ScriptTarget.Latest);
        const changes = [];
        const sourceNodes = ast_utils_1.getSourceNodes(sourceFile);
        sourceNodes.forEach((node, index) => {
            if (ts.isPropertyAssignment(node) &&
                ts.isIdentifier(node.name) &&
                node.name.text === 'passWithNoTests') {
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
//# sourceMappingURL=update-9-0-1.js.map