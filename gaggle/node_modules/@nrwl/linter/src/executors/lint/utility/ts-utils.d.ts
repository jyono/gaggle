import * as ts from 'typescript';
/**
 * - Adapted from TSLint source:
 *
 * Creates a TypeScript program object from a tsconfig.json file path and optional project directory.
 */
export declare function createProgram(configFile: string, projectDirectory?: string): ts.Program;
