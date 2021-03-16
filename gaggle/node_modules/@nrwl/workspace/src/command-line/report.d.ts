export declare const packagesWeCareAbout: string[];
export declare const report: {
    command: string;
    describe: string;
    builder: (yargs: any) => any;
    handler: typeof reportHandler;
};
/**
 * Reports relevant version numbers for adding to an Nx issue report
 *
 * @remarks
 *
 * Must be run within an Nx workspace
 *
 */
declare function reportHandler(): void;
export {};
