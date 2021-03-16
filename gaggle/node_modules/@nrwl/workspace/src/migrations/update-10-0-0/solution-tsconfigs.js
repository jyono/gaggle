"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("@nrwl/workspace");
const path_1 = require("path");
const visit_not_ignored_files_1 = require("../../utils/rules/visit-not-ignored-files");
function renameRootTsconfig(host) {
    if (!host.exists('tsconfig.json')) {
        throw new Error('Root tsconfig.json does not exist');
    }
    host.rename('tsconfig.json', 'tsconfig.base.json');
}
function moveIncludesToProjectTsconfig(file, extendedTsconfigPath, extendedTsconfig) {
    return workspace_1.updateJsonInTree(file, (json) => {
        var _a, _b;
        json.files =
            json.files || ((_a = extendedTsconfig.files) === null || _a === void 0 ? void 0 : _a.map((p) => path_1.relative(core_1.dirname(file), core_1.join(core_1.dirname(extendedTsconfigPath), p))));
        json.include =
            json.include || ((_b = extendedTsconfig.include) === null || _b === void 0 ? void 0 : _b.map((p) => path_1.relative(core_1.dirname(file), core_1.join(core_1.dirname(extendedTsconfigPath), p))));
        return json;
    });
}
function convertToSolutionTsconfig(tsconfigPath) {
    return workspace_1.updateJsonInTree(tsconfigPath, (json) => {
        json.files = [];
        json.include = [];
        return json;
    });
}
function addReference(extendedTsconfigPath, file) {
    return workspace_1.updateJsonInTree(extendedTsconfigPath, (json, context) => {
        json.references = json.references || [];
        const relativePath = (path_1.relative(core_1.dirname(extendedTsconfigPath), file).startsWith('../')
            ? ''
            : './') + path_1.relative(core_1.dirname(extendedTsconfigPath), file);
        context.logger.info(`Referencing ${file} in ${extendedTsconfigPath}`);
        json.references.push({
            path: relativePath,
        });
        return json;
    });
}
function updateExtend(file) {
    return workspace_1.updateJsonInTree(file, (json) => {
        json.extends = json.extends.replace(/tsconfig.json$/, 'tsconfig.base.json');
        return json;
    });
}
const originalExtendedTsconfigMap = new Map();
const changeImplicitDependency = workspace_1.updateJsonInTree('nx.json', (json) => {
    if (!json.implicitDependencies ||
        !json.implicitDependencies['tsconfig.json']) {
        return json;
    }
    json.implicitDependencies['tsconfig.base.json'] =
        json.implicitDependencies['tsconfig.json'];
    delete json.implicitDependencies['tsconfig.json'];
    return json;
});
function default_1(schema) {
    return schematics_1.chain([
        renameRootTsconfig,
        changeImplicitDependency,
        visit_not_ignored_files_1.visitNotIgnoredFiles((file, host, context) => {
            if (!file.endsWith('.json')) {
                return;
            }
            try {
                const json = workspace_1.readJsonInTree(host, file);
                if (!json.extends) {
                    return;
                }
                const extendedTsconfigPath = core_1.join(core_1.dirname(file), json.extends);
                if (extendedTsconfigPath === core_1.normalize('tsconfig.json')) {
                    return updateExtend(file);
                }
                else if (core_1.basename(json.extends) === 'tsconfig.json') {
                    let extendedTsconfig = originalExtendedTsconfigMap.get(extendedTsconfigPath);
                    if (!extendedTsconfig) {
                        extendedTsconfig = workspace_1.readJsonInTree(host, extendedTsconfigPath);
                        originalExtendedTsconfigMap.set(extendedTsconfigPath, extendedTsconfig);
                    }
                    return schematics_1.chain([
                        moveIncludesToProjectTsconfig(file, extendedTsconfigPath, extendedTsconfig),
                        convertToSolutionTsconfig(extendedTsconfigPath),
                        addReference(extendedTsconfigPath, file),
                    ]);
                }
                else {
                    return;
                }
            }
            catch (e) {
                context.logger.warn(`Could not update ${file}: Invalid JSON`);
            }
        }),
        workspace_1.formatFiles(),
    ]);
}
exports.default = default_1;
//# sourceMappingURL=solution-tsconfigs.js.map