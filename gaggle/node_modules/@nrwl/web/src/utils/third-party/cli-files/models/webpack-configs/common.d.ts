import { Configuration } from 'webpack';
import { WebpackConfigOptions } from '../build-options';
export declare const GLOBAL_DEFS_FOR_TERSER: {
    ngDevMode: boolean;
    ngI18nClosureMode: boolean;
};
export declare const GLOBAL_DEFS_FOR_TERSER_WITH_AOT: {
    ngJitMode: boolean;
    ngDevMode: boolean;
    ngI18nClosureMode: boolean;
};
export declare function getCommonConfig(wco: WebpackConfigOptions): Configuration;
