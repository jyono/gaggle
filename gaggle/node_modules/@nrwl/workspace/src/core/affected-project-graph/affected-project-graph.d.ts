import { ProjectGraph } from '../project-graph';
import { FileChange } from '../file-utils';
import { NxJson } from '../shared-interfaces';
export declare function filterAffected(graph: ProjectGraph, touchedFiles: FileChange[], workspaceJson?: any, nxJson?: NxJson, packageJson?: any): ProjectGraph;
