import { ProjectGraph } from '../project-graph';
import { NxJson } from '../shared-interfaces';
import { Task } from '../../tasks-runner/tasks-runner';
import { HashingImp } from './hashing-impl';
export interface Hash {
    value: string;
    details: {
        command: string;
        sources: {
            [projectName: string]: string;
        };
        implicitDeps: {
            [key: string]: string;
        };
        runtime: {
            [input: string]: string;
        };
    };
}
export declare class Hasher {
    private readonly projectGraph;
    private readonly nxJson;
    private readonly options;
    static version: string;
    private implicitDependencies;
    private nodeModules;
    private runtimeInputs;
    private fileHasher;
    private projectHashes;
    private hashing;
    constructor(projectGraph: ProjectGraph, nxJson: NxJson, options: any, hashing?: HashingImp);
    hashTasks(tasks: Task[]): Promise<Hash[]>;
    private hash;
    private runtimeInputsHash;
    private implicitDepsHash;
    private nodeModulesHash;
}
