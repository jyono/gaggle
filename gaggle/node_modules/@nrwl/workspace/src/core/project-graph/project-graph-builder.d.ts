import { DependencyType, ProjectGraph, ProjectGraphDependency, ProjectGraphNode } from './project-graph-models';
export declare class ProjectGraphBuilder {
    readonly nodes: Record<string, ProjectGraphNode>;
    readonly dependencies: Record<string, Record<string, ProjectGraphDependency>>;
    constructor(g?: ProjectGraph);
    addNode(node: ProjectGraphNode): void;
    addDependency(type: DependencyType | string, sourceProjectName: string, targetProjectName: string): void;
    build(): ProjectGraph;
}
