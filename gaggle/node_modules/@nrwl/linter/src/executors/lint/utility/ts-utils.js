"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProgram = void 0;
const fs_1 = require("fs");
const ts = require("typescript");
const path = require("path");
/**
 * - Copied from TSLint source:
 *
 * Used to exit the program and display a friendly message without the callstack.
 */
class FatalError extends Error {
    constructor(message, innerError) {
        super(message);
        this.message = message;
        this.innerError = innerError;
        this.name = FatalError.NAME;
        // Fix prototype chain for target ES5
        Object.setPrototypeOf(this, FatalError.prototype);
    }
}
FatalError.NAME = 'FatalError';
/**
 * - Adapted from TSLint source:
 *
 * Creates a TypeScript program object from a tsconfig.json file path and optional project directory.
 */
function createProgram(configFile, projectDirectory = path.dirname(configFile)) {
    const config = ts.readConfigFile(configFile, ts.sys.readFile);
    if (config.error !== undefined) {
        throw new FatalError(ts.formatDiagnostics([config.error], {
            getCanonicalFileName: (f) => f,
            getCurrentDirectory: process.cwd,
            getNewLine: () => '\n',
        }));
    }
    const parseConfigHost = {
        fileExists: fs_1.existsSync,
        readDirectory: ts.sys.readDirectory,
        readFile: (file) => fs_1.readFileSync(file, 'utf8'),
        useCaseSensitiveFileNames: true,
    };
    const parsed = ts.parseJsonConfigFileContent(config.config, parseConfigHost, path.resolve(projectDirectory), { noEmit: true });
    if (parsed.errors !== undefined) {
        // ignore warnings and 'TS18003: No inputs were found in config file ...'
        const errors = parsed.errors.filter((d) => d.category === ts.DiagnosticCategory.Error && d.code !== 18003);
        if (errors.length !== 0) {
            throw new FatalError(ts.formatDiagnostics(errors, {
                getCanonicalFileName: (f) => f,
                getCurrentDirectory: process.cwd,
                getNewLine: () => '\n',
            }));
        }
    }
    const host = ts.createCompilerHost(parsed.options, true);
    const program = ts.createProgram(parsed.fileNames, parsed.options, host);
    return program;
}
exports.createProgram = createProgram;
//# sourceMappingURL=ts-utils.js.map