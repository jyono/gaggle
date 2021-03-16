export interface ReporterArgs {
    target?: string;
    configuration?: string;
    onlyFailed?: boolean;
}
export declare class DefaultReporter {
    private projectNames;
    beforeRun(projectNames: string[], args: ReporterArgs, taskOverrides: any): void;
    printResults(args: ReporterArgs, failedProjectNames: string[], startedWithFailedProjects: boolean, cachedProjectNames: string[]): void;
}
