import { Tree } from '@nrwl/tao/src/shared/tree';
/**
 * Returns workspace defaults. It includes defaults folders for apps and libs,
 * and the default scope.
 *
 * Example:
 *
 * `{ appsDir: 'apps', libsDir: 'libs', npmScope: 'myorg' }`
 * @param host - file system tree
 */
export declare function getWorkspaceLayout(host: Tree): {
    appsDir: string;
    libsDir: string;
    npmScope: string;
};
export declare function getWorkspacePath(host: Tree): string;
