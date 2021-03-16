import { FileData } from '../file-utils';
import { ProjectGraph, ProjectGraphDependency, ProjectGraphNode } from '../project-graph';
import { FileMap } from '@nrwl/workspace/src/core/file-graph';
export interface ProjectGraphCache {
    version: string;
    rootFiles: FileData[];
    nodes: Record<string, ProjectGraphNode>;
    dependencies: Record<string, ProjectGraphDependency[]>;
}
export declare function readCache(): false | ProjectGraphCache;
export declare function writeCache(rootFiles: FileData[], projectGraph: ProjectGraph): void;
export declare function differentFromCache(fileMap: FileMap, c: ProjectGraphCache): {
    noDifference: boolean;
    filesDifferentFromCache: FileMap;
    partiallyConstructedProjectGraph?: ProjectGraph;
};
