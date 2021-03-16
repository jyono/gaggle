"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CleanCssWebpackPlugin = void 0;
const tslib_1 = require("tslib");
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const CleanCSS = require("clean-css");
const webpack_sources_1 = require("webpack-sources");
function hook(compiler, action) {
    compiler.hooks.compilation.tap('cleancss-webpack-plugin', (compilation) => {
        compilation.hooks.optimizeChunkAssets.tapPromise('cleancss-webpack-plugin', (chunks) => action(compilation, chunks));
    });
}
class CleanCssWebpackPlugin {
    constructor(options) {
        this._options = Object.assign({ sourceMap: false, test: (file) => file.endsWith('.css') }, options);
    }
    apply(compiler) {
        hook(compiler, (compilation, chunks) => {
            const cleancss = new CleanCSS({
                compatibility: 'ie9',
                level: {
                    2: {
                        skipProperties: [
                            'transition',
                            'font',
                        ],
                    },
                },
                inline: false,
                returnPromise: true,
                sourceMap: this._options.sourceMap,
            });
            const files = [...compilation.additionalChunkAssets];
            chunks.forEach((chunk) => {
                if (chunk.files && chunk.files.length > 0) {
                    files.push(...chunk.files);
                }
            });
            const actions = files
                .filter((file) => this._options.test(file))
                .map((file) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const asset = compilation.assets[file];
                if (!asset) {
                    return;
                }
                let content;
                // tslint:disable-next-line: no-any
                let map;
                if (this._options.sourceMap && asset.sourceAndMap) {
                    const sourceAndMap = asset.sourceAndMap();
                    content = sourceAndMap.source;
                    map = sourceAndMap.map;
                }
                else {
                    content = asset.source();
                }
                if (content.length === 0) {
                    return;
                }
                const output = yield cleancss.minify(content, map);
                let hasWarnings = false;
                if (output.warnings && output.warnings.length > 0) {
                    compilation.warnings.push(...output.warnings);
                    hasWarnings = true;
                }
                if (output.errors && output.errors.length > 0) {
                    output.errors.forEach((error) => compilation.errors.push(new Error(error)));
                    return;
                }
                // generally means invalid syntax so bail
                if (hasWarnings && output.stats.minifiedSize === 0) {
                    return;
                }
                let newSource;
                if (output.sourceMap) {
                    newSource = new webpack_sources_1.SourceMapSource(output.styles, file, 
                    // tslint:disable-next-line: no-any
                    output.sourceMap.toString(), content, map);
                }
                else {
                    newSource = new webpack_sources_1.RawSource(output.styles);
                }
                compilation.assets[file] = newSource;
            }));
            return Promise.all(actions);
        });
    }
}
exports.CleanCssWebpackPlugin = CleanCssWebpackPlugin;
//# sourceMappingURL=cleancss-webpack-plugin.js.map