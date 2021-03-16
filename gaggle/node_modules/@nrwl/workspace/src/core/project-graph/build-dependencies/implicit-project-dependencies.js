"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildImplicitProjectDependencies = void 0;
const project_graph_models_1 = require("../project-graph-models");
function buildImplicitProjectDependencies(ctx, nodes, addDependency) {
    Object.keys(ctx.nxJson.projects).forEach((source) => {
        const p = ctx.nxJson.projects[source];
        if (p.implicitDependencies && p.implicitDependencies.length > 0) {
            p.implicitDependencies.forEach((target) => {
                addDependency(project_graph_models_1.DependencyType.implicit, source, target);
            });
        }
        // TODO(v10): remove this because implicit dependencies are generated now..
        if (source.endsWith('-e2e')) {
            const target = source.replace(/-e2e$/, '');
            // Only add if expected source actually exists, otherwise this will error out.
            if (nodes[target]) {
                addDependency(project_graph_models_1.DependencyType.implicit, source, target);
            }
        }
    });
}
exports.buildImplicitProjectDependencies = buildImplicitProjectDependencies;
//# sourceMappingURL=implicit-project-dependencies.js.map