import { ProjectGraph, ProjectGraphNode } from '../core/project-graph';
import { BuilderContext } from '@angular-devkit/architect';
export declare type DependentBuildableProjectNode = {
    name: string;
    outputs: string[];
    node: ProjectGraphNode;
};
export declare function calculateProjectDependencies(projGraph: ProjectGraph, context: BuilderContext): {
    target: ProjectGraphNode;
    dependencies: DependentBuildableProjectNode[];
};
export declare function computeCompilerOptionsPaths(tsConfig: any, dependencies: any): any;
export declare function createTmpTsConfig(tsconfigPath: string, workspaceRoot: string, projectRoot: string, dependencies: DependentBuildableProjectNode[]): string;
export declare function checkDependentProjectsHaveBeenBuilt(context: BuilderContext, projectDependencies: DependentBuildableProjectNode[]): boolean;
export declare function updatePaths(dependencies: DependentBuildableProjectNode[], paths: Record<string, string[]>): void;
/**
 * Updates the peerDependencies section in the `dist/lib/xyz/package.json` with
 * the proper dependency and version
 */
export declare function updateBuildableProjectPackageJsonDependencies(context: BuilderContext, node: ProjectGraphNode, dependencies: DependentBuildableProjectNode[], typeOfDependency?: 'dependencies' | 'peerDependencies'): void;
