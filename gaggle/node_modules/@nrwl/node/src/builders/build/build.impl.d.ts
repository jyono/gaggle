import { JsonObject } from '@angular-devkit/core';
import { BuildResult } from '@angular-devkit/build-webpack';
import { BuildNodeBuilderOptions } from '../../utils/types';
export declare type NodeBuildEvent = BuildResult & {
    outfile: string;
};
declare const _default: import("@angular-devkit/architect/src/internal").Builder<JsonObject & BuildNodeBuilderOptions>;
export default _default;
