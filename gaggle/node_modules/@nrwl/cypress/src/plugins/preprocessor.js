"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebpackConfig = exports.preprocessTypescript = void 0;
const tslib_1 = require("tslib");
const wp = require("@cypress/webpack-preprocessor");
const tsconfig_paths_webpack_plugin_1 = require("tsconfig-paths-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
function preprocessTypescript(config, customizeWebpackConfig) {
    if (!config.env.tsConfig) {
        throw new Error('Please provide an absolute path to a tsconfig.json as cypressConfig.env.tsConfig');
    }
    return (...args) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const webpackOptions = customizeWebpackConfig
            ? customizeWebpackConfig(getWebpackConfig(config))
            : getWebpackConfig(config);
        return wp({ webpackOptions })(...args);
    });
}
exports.preprocessTypescript = preprocessTypescript;
function getWebpackConfig(config) {
    const extensions = ['.ts', '.tsx', '.mjs', '.js', '.jsx'];
    return {
        resolve: {
            extensions,
            plugins: [
                new tsconfig_paths_webpack_plugin_1.TsconfigPathsPlugin({
                    configFile: config.env.tsConfig,
                    extensions,
                }),
            ],
        },
        module: {
            rules: [
                {
                    test: /\.(j|t)sx?$/,
                    loader: require.resolve('ts-loader'),
                    exclude: [/node_modules/],
                    options: {
                        configFile: config.env.tsConfig,
                        // https://github.com/TypeStrong/ts-loader/pull/685
                        experimentalWatchApi: true,
                        transpileOnly: true,
                    },
                },
            ],
        },
        plugins: [
            new ForkTsCheckerWebpackPlugin({
                tsconfig: config.env.tsConfig,
                useTypescriptIncrementalApi: false,
            }),
        ],
        externals: [nodeExternals()],
    };
}
exports.getWebpackConfig = getWebpackConfig;
//# sourceMappingURL=preprocessor.js.map