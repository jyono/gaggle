"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("@nrwl/workspace");
const literals_1 = require("@angular-devkit/core/src/utils/literals");
const path = require("path");
const path_1 = require("path");
const ast_utils_1 = require("@nrwl/workspace/src/utils/ast-utils");
const ignore = require('ignore');
function update() {
    return schematics_1.chain([
        displayInformation,
        updateDependencies,
        updateImports,
        workspace_1.updatePackagesInPackageJson(path.join(__dirname, '../../../', 'migrations.json'), '8.9.0'),
        workspace_1.formatFiles(),
    ]);
}
exports.default = update;
function displayInformation(host, context) {
    const packageJson = workspace_1.readJsonInTree(host, '/package.json');
    if (packageJson.dependencies['redux-starter-kit']) {
        context.logger.info(literals_1.stripIndents `
    Redux Starter Kit been renamed to Redux Toolkit as of version 1.0.
    
    We are replacing your \`redux-starter-kit\` imports with \`@reduxjs/toolkit\`.
    
    See: https://github.com/reduxjs/redux-toolkit/releases/tag/v1.0.4
  `);
    }
}
function updateDependencies(host) {
    const packageJson = workspace_1.readJsonInTree(host, '/package.json');
    if (!packageJson.dependencies['redux-starter-kit']) {
        return schematics_1.noop();
    }
    const removeOld = workspace_1.updateJsonInTree('package.json', (json, context) => {
        json.dependencies = json.dependencies || {};
        delete json.dependencies['redux-starter-kit'];
        context.logger.info(`Removing \`redux-starter-kit\` as a dependency`);
        return json;
    });
    const addNew = workspace_1.updatePackageJsonDependencies({ '@reduxjs/toolkit': '1.0.4' }, {});
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
        const sourceFile = ts.createSourceFile(path, host.read(path).toString(), ts.ScriptTarget.Latest, true);
        const changes = [];
        sourceFile.statements.forEach((statement) => {
            if (ts.isImportDeclaration(statement) &&
                ts.isStringLiteral(statement.moduleSpecifier)) {
                const nodeText = statement.moduleSpecifier.getText(sourceFile);
                const modulePath = statement.moduleSpecifier
                    .getText(sourceFile)
                    .substr(1, nodeText.length - 2);
                if (modulePath === 'redux-starter-kit') {
                    changes.push(new ast_utils_1.ReplaceChange(path, statement.moduleSpecifier.getStart(sourceFile), nodeText, `'@reduxjs/toolkit'`));
                }
            }
        });
        workspace_1.insert(host, path, changes);
    });
}
//# sourceMappingURL=update-8-9-0.js.map