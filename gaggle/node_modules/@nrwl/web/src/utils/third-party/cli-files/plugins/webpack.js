"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RawCssLoader = exports.PostcssCliResources = exports.NamedChunksPlugin = exports.RemoveHashPlugin = exports.SuppressExtractedTextChunksWebpackPlugin = exports.ScriptsWebpackPlugin = exports.BundleBudgetPlugin = exports.CleanCssWebpackPlugin = void 0;
// Exports the webpack plugins we use internally.
var cleancss_webpack_plugin_1 = require("./cleancss-webpack-plugin");
Object.defineProperty(exports, "CleanCssWebpackPlugin", { enumerable: true, get: function () { return cleancss_webpack_plugin_1.CleanCssWebpackPlugin; } });
var bundle_budget_1 = require("./bundle-budget");
Object.defineProperty(exports, "BundleBudgetPlugin", { enumerable: true, get: function () { return bundle_budget_1.BundleBudgetPlugin; } });
var scripts_webpack_plugin_1 = require("./scripts-webpack-plugin");
Object.defineProperty(exports, "ScriptsWebpackPlugin", { enumerable: true, get: function () { return scripts_webpack_plugin_1.ScriptsWebpackPlugin; } });
var suppress_entry_chunks_webpack_plugin_1 = require("./suppress-entry-chunks-webpack-plugin");
Object.defineProperty(exports, "SuppressExtractedTextChunksWebpackPlugin", { enumerable: true, get: function () { return suppress_entry_chunks_webpack_plugin_1.SuppressExtractedTextChunksWebpackPlugin; } });
var remove_hash_plugin_1 = require("./remove-hash-plugin");
Object.defineProperty(exports, "RemoveHashPlugin", { enumerable: true, get: function () { return remove_hash_plugin_1.RemoveHashPlugin; } });
var named_chunks_plugin_1 = require("./named-chunks-plugin");
Object.defineProperty(exports, "NamedChunksPlugin", { enumerable: true, get: function () { return named_chunks_plugin_1.NamedLazyChunksPlugin; } });
var postcss_cli_resources_1 = require("./postcss-cli-resources");
Object.defineProperty(exports, "PostcssCliResources", { enumerable: true, get: function () { return postcss_cli_resources_1.default; } });
const path_1 = require("path");
exports.RawCssLoader = require.resolve(path_1.join(__dirname, 'raw-css-loader'));
//# sourceMappingURL=webpack.js.map