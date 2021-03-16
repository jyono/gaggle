export interface ReporterArgs {
    target?: string;
    configuration?: string;
    onlyFailed?: boolean;
}
export declare class RunOneReporter {
    private readonly initiatingProject;
    private projectNames;
    constructor(initiatingProject: string);
    beforeRun(projectNames: string[], args: ReporterArgs, taskOverrides: any): void;
    printResults(args: ReporterArgs, failedProjectNames: string[], startedWithFailedProjects: boolean, cachedProjectNames: string[]): void;
}
