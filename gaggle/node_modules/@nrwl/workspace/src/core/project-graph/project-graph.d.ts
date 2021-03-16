import { FileRead } from '../file-utils';
import { ProjectGraph } from './project-graph-models';
import { ProjectGraphCache } from '../nx-deps/nx-deps-cache';
import { NxJson } from '../shared-interfaces';
export declare function createProjectGraph(workspaceJson?: any, nxJson?: NxJson<string[] | "*">, workspaceFiles?: import("../file-utils").FileData[], fileRead?: FileRead, cache?: false | ProjectGraphCache, shouldCache?: boolean): ProjectGraph;
