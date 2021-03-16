"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const buildable_libs_utils_1 = require("@nrwl/workspace/src/utils/buildable-libs-utils");
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const workspace_1 = require("@nrwl/workspace");
const rxjs_1 = require("rxjs");
const ts = require("typescript");
function createProgram(tsconfig, context) {
    const host = ts.createCompilerHost(tsconfig.options);
    const program = ts.createProgram({
        rootNames: tsconfig.fileNames,
        options: tsconfig.options,
        host,
    });
    return new rxjs_1.Observable((subscriber) => {
        var _a, _b;
        context.logger.info(`Compiling TypeScript files for library ${(_a = context.target) === null || _a === void 0 ? void 0 : _a.project}...`);
        try {
            const results = program.emit();
            if (results.emitSkipped) {
                const diagnostics = ts.formatDiagnosticsWithColorAndContext(results.diagnostics, {
                    getCurrentDirectory: () => ts.sys.getCurrentDirectory(),
                    getNewLine: () => ts.sys.newLine,
                    getCanonicalFileName: (name) => name,
                });
                context.logger.error(diagnostics);
                subscriber.next({ success: false });
                process.exit(1);
            }
            else {
                context.logger.info(`Done compiling TypeScript files for library ${(_b = context.target) === null || _b === void 0 ? void 0 : _b.project}`);
                subscriber.next({ success: true });
            }
        }
        catch (_c) {
            subscriber.error('Could not compile Typescript files');
        }
        finally {
            subscriber.complete();
        }
    });
}
function createWatchProgram(tsconfig) {
    const host = ts.createWatchCompilerHost(tsconfig.fileNames, tsconfig.options, ts.sys);
    ts.createWatchProgram(host);
    return new rxjs_1.Observable((subscriber) => {
        subscriber.next({ success: true });
    });
}
function compileTypeScriptFiles(options, context, libRoot, projectDependencies) {
    fs_extra_1.removeSync(options.normalizedOutputPath);
    let tsConfigPath = path_1.join(context.workspaceRoot, options.tsConfig);
    if (projectDependencies.length > 0) {
        tsConfigPath = buildable_libs_utils_1.createTmpTsConfig(tsConfigPath, context.workspaceRoot, libRoot, projectDependencies);
    }
    const tsconfig = workspace_1.readTsConfig(tsConfigPath);
    tsconfig.options.outDir = options.normalizedOutputPath;
    tsconfig.options.noEmitOnError = true;
    if (options.srcRootForCompilationRoot) {
        tsconfig.options.rootDir = options.srcRootForCompilationRoot;
    }
    else {
        tsconfig.options.rootDir = libRoot;
    }
    if (options.watch) {
        return createWatchProgram(tsconfig);
    }
    else {
        return createProgram(tsconfig, context);
    }
}
exports.default = compileTypeScriptFiles;
//# sourceMappingURL=compile-typescript-files.js.map