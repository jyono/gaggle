import { Task } from './tasks-runner';
import { ProjectGraphNode } from '../core/project-graph';
export declare function getCommandAsString(cliCommand: string, isYarn: boolean, task: Task): string;
export declare function getCommand(cliCommand: string, isYarn: boolean, task: Task): string[];
export declare function getOutputs(p: Record<string, ProjectGraphNode>, task: Task): any;
export declare function getOutputsForTargetAndConfiguration(task: Pick<Task, 'target' | 'overrides'>, node: ProjectGraphNode): any;
export declare function unparse(options: Object): string[];
