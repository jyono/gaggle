import { Tree } from '@nrwl/tao/src/shared/tree';
import { GeneratorCallback } from '@nrwl/tao/src/shared/workspace';
/**
 * Add Dependencies and Dev Dependencies to package.json
 *
 * For example, `addDependenciesToPackageJson(host, { react: 'latest' }, { jest: 'latest' })`
 * will add `react` and `jest` to the dependencies and devDependencies sections of package.json respectively
 *
 * @param dependencies Dependencies to be added to the dependencies section of package.json
 * @param devDependencies Dependencies to be added to the devDependencies section of package.json
 * @returns Callback to install dependencies only if necessary. undefined is returned if changes are not necessary.
 */
export declare function addDependenciesToPackageJson(host: Tree, dependencies: Record<string, string>, devDependencies: Record<string, string>, packageJsonPath?: string): GeneratorCallback;
