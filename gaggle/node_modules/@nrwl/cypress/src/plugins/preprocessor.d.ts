import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
export declare function preprocessTypescript(config: any, customizeWebpackConfig?: (webpackConfig: any) => any): (...args: any[]) => Promise<any>;
export declare function getWebpackConfig(config: any): {
    resolve: {
        extensions: string[];
        plugins: TsconfigPathsPlugin[];
    };
    module: {
        rules: {
            test: RegExp;
            loader: string;
            exclude: RegExp[];
            options: {
                configFile: any;
                experimentalWatchApi: boolean;
                transpileOnly: boolean;
            };
        }[];
    };
    plugins: ForkTsCheckerWebpackPlugin[];
    externals: any[];
};
