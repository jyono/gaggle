import * as ts from 'typescript';
export declare function readTsConfig(tsConfigPath: string): ts.ParsedCommandLine;
/**
 * Find a module based on it's import
 *
 * @param importExpr Import used to resolve to a module
 * @param filePath
 * @param tsConfigPath
 */
export declare function resolveModuleByImport(importExpr: string, filePath: string, tsConfigPath: string): string;
