import * as yargs from 'yargs';
import { NxAffectedConfig } from '../core/shared-interfaces';
export interface RawNxArgs extends NxArgs {
    prod?: boolean;
}
export interface NxArgs {
    target?: string;
    configuration?: string;
    runner?: string;
    parallel?: boolean;
    maxParallel?: number;
    'max-parallel'?: number;
    untracked?: boolean;
    uncommitted?: boolean;
    all?: boolean;
    base?: string;
    head?: string;
    exclude?: string[];
    files?: string[];
    onlyFailed?: boolean;
    'only-failed'?: boolean;
    verbose?: boolean;
    help?: boolean;
    version?: boolean;
    quiet?: boolean;
    plain?: boolean;
    withDeps?: boolean;
    'with-deps'?: boolean;
    projects?: string[];
    select?: string;
    skipNxCache?: boolean;
    'skip-nx-cache'?: boolean;
    scan?: boolean;
}
export declare function splitArgsIntoNxArgsAndOverrides(args: yargs.Arguments, mode: 'run-one' | 'run-many' | 'affected' | 'print-affected', options?: {
    printWarnings: boolean;
}): {
    nxArgs: NxArgs;
    overrides: yargs.Arguments;
};
export declare function getAffectedConfig(): NxAffectedConfig;
