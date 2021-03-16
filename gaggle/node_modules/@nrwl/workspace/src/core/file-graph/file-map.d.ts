import { FileData } from '../file-utils';
export interface FileMap {
    [projectName: string]: FileData[];
}
export declare function createFileMap(workspaceJson: any, files: FileData[]): FileMap;
