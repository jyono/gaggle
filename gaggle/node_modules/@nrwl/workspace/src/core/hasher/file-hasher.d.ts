import { HashingImp } from './hashing-impl';
export declare function extractNameAndVersion(content: string): string;
export declare class FileHasher {
    private readonly hashing;
    fileHashes: {
        [path: string]: string;
    };
    workspaceFiles: any[];
    usesGitForHashing: boolean;
    constructor(hashing: HashingImp);
    init(): void;
    hashFile(path: string, transformer?: (x: string) => string | null): string;
    private getHashesFromGit;
    private processPath;
}
export declare const defaultFileHasher: FileHasher;
