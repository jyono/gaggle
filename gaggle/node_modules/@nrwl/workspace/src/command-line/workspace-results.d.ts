import { ProjectGraphNode } from '../core/project-graph';
export declare class WorkspaceResults {
    private command;
    private projects;
    startedWithFailedProjects: boolean;
    private commandResults;
    get failedProjects(): string[];
    get hasFailure(): boolean;
    constructor(command: string, projects: Record<string, ProjectGraphNode>);
    getResult(projectName: string): boolean;
    saveResults(): void;
    setResult(projectName: string, result: boolean): void;
    private invalidateOldResults;
}
