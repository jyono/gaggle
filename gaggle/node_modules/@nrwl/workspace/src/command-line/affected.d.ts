import * as yargs from 'yargs';
import { RawNxArgs } from './utils';
export declare function affected(command: 'apps' | 'libs' | 'dep-graph' | 'print-affected' | 'affected', parsedArgs: yargs.Arguments & RawNxArgs): Promise<void>;
