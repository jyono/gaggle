import { Target } from '@nrwl/tao/src/commands/run';
import { ExecutorContext } from '@nrwl/tao/src/shared/workspace';
export declare function readTargetOptions<T = any>({ project, target, configuration }: Target, context: ExecutorContext): T;
