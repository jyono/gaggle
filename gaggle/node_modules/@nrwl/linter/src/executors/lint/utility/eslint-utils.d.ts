import { Schema } from '../schema';
/**
 * Copied from @angular-eslint/builder source
 */
export declare function loadESLint(): Promise<any>;
/**
 * Adapted from @angular-eslint/builder source
 */
export declare function lint(systemRoot: string, eslintConfigPath: string, options: Schema, lintedFiles: Set<string>, program?: any, allPrograms?: any[]): Promise<any[]>;
