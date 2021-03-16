import { FileRead } from './file-utils';
import { ProjectGraphNodeRecords } from './project-graph/project-graph-models';
export declare class TargetProjectLocator {
    private nodes;
    private fileRead;
    private sortedProjects;
    private sortedWorkspaceProjects;
    private npmProjects;
    private tsConfigPath;
    private absTsConfigPath;
    private paths;
    private typescriptResolutionCache;
    private npmResolutionCache;
    constructor(nodes: ProjectGraphNodeRecords, fileRead?: FileRead);
    /**
     * Find a project based on its import
     *
     * @param importExpr
     * @param filePath
     * @param npmScope
     *  Npm scope shouldn't be used finding a project, but, to improve backward
     *  compatibility, we fallback to checking the scope.
     *  This happens in cases where someone has the dist output in their tsconfigs
     *  and typescript will find the dist before the src.
     */
    findProjectWithImport(importExpr: string, filePath: string, npmScope: string): string;
    private findNpmPackage;
    private findProjectOfResolvedModule;
    private getRootTsConfigPath;
}
