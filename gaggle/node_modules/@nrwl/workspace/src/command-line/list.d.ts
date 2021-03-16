import * as yargs from 'yargs';
export interface YargsListArgs extends yargs.Arguments, ListArgs {
}
interface ListArgs {
    plugin?: string;
}
export declare const list: {
    command: string;
    describe: string;
    builder: (yargs: yargs.Argv<{}>) => yargs.Argv<{
        plugin: any;
    }>;
    handler: typeof listHandler;
};
/**
 * List available plugins or capabilities within a specific plugin
 *
 * @remarks
 *
 * Must be run within an Nx workspace
 *
 */
declare function listHandler(args: YargsListArgs): Promise<void>;
export {};
