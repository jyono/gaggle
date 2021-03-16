"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildExplicitTypeScriptDependencies = void 0;
const typescript_import_locator_1 = require("./typescript-import-locator");
const target_project_locator_1 = require("../../target-project-locator");
function buildExplicitTypeScriptDependencies(ctx, nodes, addDependency, fileRead) {
    const importLocator = new typescript_import_locator_1.TypeScriptImportLocator(fileRead);
    const targetProjectLocator = new target_project_locator_1.TargetProjectLocator(nodes, fileRead);
    Object.keys(ctx.fileMap).forEach((source) => {
        Object.values(ctx.fileMap[source]).forEach((f) => {
            importLocator.fromFile(f.file, (importExpr, filePath, type) => {
                const target = targetProjectLocator.findProjectWithImport(importExpr, f.file, ctx.nxJson.npmScope);
                if (source && target) {
                    addDependency(type, source, target);
                }
            });
        });
    });
}
exports.buildExplicitTypeScriptDependencies = buildExplicitTypeScriptDependencies;
//# sourceMappingURL=explicit-project-dependencies.js.map