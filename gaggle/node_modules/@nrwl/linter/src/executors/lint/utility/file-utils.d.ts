import * as ts from 'typescript';
export declare function getFilesToLint(root: string, options: {
    exclude: string[];
    files: string[];
}, program?: ts.Program): string[];
