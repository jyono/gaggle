import { Tree } from '@nrwl/tao/src/shared/tree';
/**
 * Reads a document for host, removes all comments and parses JSON.
 *
 * @param host - file system tree
 * @param path - file path
 */
export declare function readJson<T = any>(host: Tree, path: string): T;
/**
 * Writes a JSON value to the file system tree

 * @param value Serializable value to write
 */
export declare function writeJson<T = any>(host: Tree, path: string, value: T): void;
/**
 * Updates a JSON value to the file system tree
 *
 * @param updater Function that maps the current value of a JSON document to a new value to be written to the document
 */
export declare function updateJson<T = any, U = T>(host: Tree, path: string, updater: (value: T) => U): void;
