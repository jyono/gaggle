"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withDeps = exports.onlyWorkspaceProjects = exports.getSortedProjectNodes = exports.isNpmProject = exports.isWorkspaceProject = exports.filterNodes = exports.reverse = void 0;
const project_graph_builder_1 = require("./project-graph-builder");
const reverseMemo = new Map();
function reverse(graph) {
    let result = reverseMemo.get(graph);
    if (!result) {
        const builder = new project_graph_builder_1.ProjectGraphBuilder();
        Object.values(graph.nodes).forEach((n) => {
            builder.addNode(n);
        });
        Object.values(graph.dependencies).forEach((byProject) => {
            byProject.forEach((dep) => {
                builder.addDependency(dep.type, dep.target, dep.source);
            });
        });
        result = builder.build();
        reverseMemo.set(graph, result);
        reverseMemo.set(result, graph);
    }
    return result;
}
exports.reverse = reverse;
function filterNodes(predicate) {
    return (original) => {
        const builder = new project_graph_builder_1.ProjectGraphBuilder();
        const added = new Set();
        Object.values(original.nodes).forEach((n) => {
            if (predicate(n)) {
                builder.addNode(n);
                added.add(n.name);
            }
        });
        Object.values(original.dependencies).forEach((ds) => {
            ds.forEach((d) => {
                if (added.has(d.source) && added.has(d.target)) {
                    builder.addDependency(d.type, d.source, d.target);
                }
            });
        });
        return builder.build();
    };
}
exports.filterNodes = filterNodes;
function isWorkspaceProject(project) {
    return (project.type === 'app' || project.type === 'lib' || project.type === 'e2e');
}
exports.isWorkspaceProject = isWorkspaceProject;
function isNpmProject(project) {
    return project.type === 'npm';
}
exports.isNpmProject = isNpmProject;
function getSortedProjectNodes(nodes) {
    return Object.values(nodes).sort((nodeA, nodeB) => {
        // If a or b is not a nx project, leave them in the same spot
        if (!isWorkspaceProject(nodeA) && !isWorkspaceProject(nodeB)) {
            return 0;
        }
        // sort all non-projects lower
        if (!isWorkspaceProject(nodeA) && isWorkspaceProject(nodeB)) {
            return 1;
        }
        if (isWorkspaceProject(nodeA) && !isWorkspaceProject(nodeB)) {
            return -1;
        }
        return nodeA.data.root.length > nodeB.data.root.length ? -1 : 1;
    });
}
exports.getSortedProjectNodes = getSortedProjectNodes;
exports.onlyWorkspaceProjects = filterNodes(isWorkspaceProject);
function withDeps(original, subsetNodes) {
    const builder = new project_graph_builder_1.ProjectGraphBuilder();
    const visitedNodes = [];
    const visitedEdges = [];
    Object.values(subsetNodes).forEach(recurNodes);
    Object.values(subsetNodes).forEach(recurEdges);
    return builder.build();
    // ---------------------------------------------------------------------------
    function recurNodes(node) {
        if (visitedNodes.indexOf(node.name) > -1)
            return;
        builder.addNode(node);
        visitedNodes.push(node.name);
        original.dependencies[node.name].forEach((n) => {
            recurNodes(original.nodes[n.target]);
        });
    }
    function recurEdges(node) {
        if (visitedEdges.indexOf(node.name) > -1)
            return;
        visitedEdges.push(node.name);
        const ds = original.dependencies[node.name];
        ds.forEach((n) => {
            builder.addDependency(n.type, n.source, n.target);
        });
        ds.forEach((n) => {
            recurEdges(original.nodes[n.target]);
        });
    }
}
exports.withDeps = withDeps;
//# sourceMappingURL=operators.js.map