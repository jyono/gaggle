"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveModuleByImport = exports.readTsConfig = void 0;
const path_1 = require("path");
const ts = require("typescript");
const app_root_1 = require("./app-root");
const normalizedAppRoot = app_root_1.appRootPath.replace(/\\/g, '/');
function readTsConfig(tsConfigPath) {
    const readResult = ts.readConfigFile(tsConfigPath, ts.sys.readFile);
    return ts.parseJsonConfigFileContent(readResult.config, ts.sys, path_1.dirname(tsConfigPath));
}
exports.readTsConfig = readTsConfig;
let compilerHost;
/**
 * Find a module based on it's import
 *
 * @param importExpr Import used to resolve to a module
 * @param filePath
 * @param tsConfigPath
 */
function resolveModuleByImport(importExpr, filePath, tsConfigPath) {
    compilerHost = compilerHost || getCompilerHost(tsConfigPath);
    const { options, host, moduleResolutionCache } = compilerHost;
    const { resolvedModule } = ts.resolveModuleName(importExpr, filePath, options, host, moduleResolutionCache);
    if (!resolvedModule) {
        return;
    }
    else {
        return resolvedModule.resolvedFileName.replace(`${normalizedAppRoot}/`, '');
    }
}
exports.resolveModuleByImport = resolveModuleByImport;
function getCompilerHost(tsConfigPath) {
    const { options } = readTsConfig(tsConfigPath);
    const host = ts.createCompilerHost(options, true);
    const moduleResolutionCache = ts.createModuleResolutionCache(app_root_1.appRootPath, host.getCanonicalFileName);
    return { options, host, moduleResolutionCache };
}
//# sourceMappingURL=typescript.js.map