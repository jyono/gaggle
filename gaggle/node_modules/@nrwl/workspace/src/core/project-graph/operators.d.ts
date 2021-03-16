import { ProjectGraph, ProjectGraphNode, ProjectGraphNodeRecords } from './project-graph-models';
export declare function reverse(graph: ProjectGraph): ProjectGraph;
export declare function filterNodes(predicate: (n: ProjectGraphNode) => boolean): (p: ProjectGraph) => ProjectGraph;
export declare function isWorkspaceProject(project: ProjectGraphNode): boolean;
export declare function isNpmProject(project: ProjectGraphNode): project is ProjectGraphNode<{
    packageName: string;
    version: string;
}>;
export declare function getSortedProjectNodes(nodes: ProjectGraphNodeRecords): ProjectGraphNode<{}>[];
export declare const onlyWorkspaceProjects: (p: ProjectGraph) => ProjectGraph;
export declare function withDeps(original: ProjectGraph, subsetNodes: ProjectGraphNode[]): ProjectGraph;
