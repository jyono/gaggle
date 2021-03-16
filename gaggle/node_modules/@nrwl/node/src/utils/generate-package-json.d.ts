import { ProjectGraph } from '@nrwl/workspace';
import { BuildNodeBuilderOptions } from './types';
/**
 * Creates a package.json in the output directory for support  to install dependencies within containers.
 *
 * If a package.json exists in the project, it will reuse that.
 *
 * @param projectName
 * @param graph
 * @param options
 * @constructor
 */
export declare function generatePackageJson(projectName: string, graph: ProjectGraph, options: BuildNodeBuilderOptions): void;
