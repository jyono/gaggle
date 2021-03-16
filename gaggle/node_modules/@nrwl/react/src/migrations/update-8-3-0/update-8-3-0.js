"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const literals_1 = require("@angular-devkit/core/src/utils/literals");
const workspace_1 = require("@nrwl/workspace");
const typescript_1 = require("typescript");
const ast_utils_1 = require("@nrwl/workspace/src/utils/ast-utils");
const path_1 = require("path");
const versions_1 = require("../../utils/versions");
const ignore = require('ignore');
function update() {
    return schematics_1.chain([
        displayInformation,
        updateDependencies,
        updateImports,
        workspace_1.formatFiles(),
    ]);
}
exports.default = update;
function displayInformation(host, context) {
    context.logger.info(literals_1.stripIndents `
    React Testing Library has been repackaged as \`@testing-library/react\` as of version 8.
    
    We are replacing your \`react-testing-library\` imports with \`@testing-library/react\`.
    
    See: https://github.com/testing-library/react-testing-library/releases/tag/v8.0.0
  `);
}
function updateDependencies(tree) {
    const removeOld = workspace_1.updateJsonInTree('package.json', (json, context) => {
        json.dependencies = json.dependencies || {};
        json.devDependencies = json.devDependencies || {};
        // Just in case user installed it to dependencies instead of devDependencies.
        delete json.dependencies['react-testing-library'];
        delete json.devDependencies['react-testing-library'];
        context.logger.info(`Removing \`react-testing-library\` as a dependency`);
        return json;
    });
    const packageJson = workspace_1.readJsonInTree(tree, '/package.json');
    const candidates = {
        react: '16.8.6',
        'react-dom': '16.8.6',
        'react-router-dom': '5.0.1',
        '@types/react': '16.8.23',
        '@types/react-dom': '16.8.5',
        'styled-components': '4.3.2',
        '@types/styled-components': '4.1.18',
        '@emotion/styled': '10.0.14',
    };
    const updated = Object.entries(candidates).reduce((acc, [m, v]) => {
        if (packageJson.dependencies[m]) {
            acc.dependencies[m] = v;
        }
        else if (packageJson.devDependencies[m]) {
            acc.devDependencies[m] = v;
        }
        return acc;
    }, {
        dependencies: {},
        devDependencies: {
            '@testing-library/react': versions_1.testingLibraryReactVersion,
        },
    });
    const addNew = workspace_1.updatePackageJsonDependencies(updated.dependencies, updated.devDependencies);
    return schematics_1.chain([removeOld, addNew]);
}
function updateImports(host) {
    let ig = ignore();
    if (host.exists('.gitignore')) {
        ig = ig.add(host.read('.gitignore').toString());
    }
    host.visit((path) => {
        if (ig.ignores(path_1.relative('/', path)) || !/\.tsx?$/.test(path)) {
            return;
        }
        const sourceFile = typescript_1.createSourceFile(path, host.read(path).toString(), typescript_1.ScriptTarget.Latest, true);
        const changes = [];
        sourceFile.statements.forEach((statement) => {
            if (typescript_1.isImportDeclaration(statement) &&
                typescript_1.isStringLiteral(statement.moduleSpecifier)) {
                const nodeText = statement.moduleSpecifier.getText(sourceFile);
                const modulePath = statement.moduleSpecifier
                    .getText(sourceFile)
                    .substr(1, nodeText.length - 2);
                if (modulePath === 'react-testing-library') {
                    changes.push(new ast_utils_1.ReplaceChange(path, statement.moduleSpecifier.getStart(sourceFile), nodeText, `'@testing-library/react'`));
                }
            }
        });
        workspace_1.insert(host, path, changes);
    });
}
//# sourceMappingURL=update-8-3-0.js.map