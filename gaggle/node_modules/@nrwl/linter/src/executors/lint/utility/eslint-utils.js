"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lint = exports.loadESLint = void 0;
const tslib_1 = require("tslib");
const file_utils_1 = require("./file-utils");
const eslint_1 = require("eslint");
/**
 * Copied from @angular-eslint/builder source
 */
function loadESLint() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let eslint;
        try {
            eslint = yield Promise.resolve().then(() => require('eslint'));
            return eslint;
        }
        catch (_a) {
            throw new Error('Unable to find ESLint. Ensure ESLint is installed.');
        }
    });
}
exports.loadESLint = loadESLint;
/**
 * Adapted from @angular-eslint/builder source
 */
function lint(systemRoot, eslintConfigPath, options, lintedFiles, program, allPrograms) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const files = file_utils_1.getFilesToLint(systemRoot, options, program);
        const projectESLint = yield loadESLint();
        const cli = new projectESLint.CLIEngine({
            configFile: eslintConfigPath,
            useEslintrc: true,
            fix: !!options.fix,
            cache: !!options.cache,
            cacheLocation: options.cacheLocation,
        });
        const lintReports = [];
        for (const file of files) {
            if (program && allPrograms) {
                // If it cannot be found in ANY program, then this is an error.
                if (allPrograms.every((p) => p.getSourceFile(file) === undefined)) {
                    throw new Error(`File ${JSON.stringify(file)} is not part of a TypeScript project '${options.tsConfig}'.`);
                }
                else if (program.getSourceFile(file) === undefined) {
                    // The file exists in some other programs. We will lint it later (or earlier) in the loop.
                    continue;
                }
            }
            // Already linted the current file, so skip it here...
            if (lintedFiles.has(file)) {
                continue;
            }
            // Give some breathing space to other promises that might be waiting.
            yield Promise.resolve();
            const report = cli.executeOnFiles([file]);
            if (options.quiet) {
                report.results = eslint_1.CLIEngine.getErrorResults(report.results);
                report.errorCount = 0;
            }
            lintReports.push(report);
            lintedFiles.add(file);
        }
        return lintReports;
    });
}
exports.lint = lint;
//# sourceMappingURL=eslint-utils.js.map