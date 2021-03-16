import { Task, TasksRunner } from './tasks-runner';
export interface RemoteCache {
    retrieve: (hash: string, cacheDirectory: string) => Promise<boolean>;
    store: (hash: string, cacheDirectory: string) => Promise<boolean>;
}
export interface LifeCycle {
    startTask(task: Task): void;
    endTask(task: Task, code: number): void;
}
export interface DefaultTasksRunnerOptions {
    parallel?: boolean;
    maxParallel?: number;
    cacheableOperations?: string[];
    cacheableTargets?: string[];
    runtimeCacheInputs?: string[];
    strictlyOrderedTargets?: string[];
    cacheDirectory?: string;
    remoteCache?: RemoteCache;
    lifeCycle?: LifeCycle;
    captureStderr?: boolean;
    skipNxCache?: boolean;
}
export declare const defaultTasksRunner: TasksRunner<DefaultTasksRunnerOptions>;
export default defaultTasksRunner;
