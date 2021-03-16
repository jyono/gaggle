"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilesToLint = void 0;
const minimatch_1 = require("minimatch");
const path = require("path");
const glob = require("glob");
/**
 * - Copied from TSLint source:
 *
 * Returns an array of all outputs that are not `undefined`
 */
function mapDefined(inputs, getOutput) {
    const out = [];
    for (const input of inputs) {
        const output = getOutput(input);
        if (output !== undefined) {
            out.push(output);
        }
    }
    return out;
}
/**
 * - Adapted from TSLint source:
 *
 * Returns a list of source file names from a TypeScript program.
 * This includes all referenced files and excludes JSON files, to avoid problems with `resolveJsonModule`.
 */
function getFileNamesFromProgram(program) {
    return mapDefined(program.getSourceFiles(), (file) => file.fileName.endsWith('.json') ||
        program.isSourceFileFromExternalLibrary(file)
        ? undefined
        : file.fileName);
}
function getFilesToLint(root, options, program) {
    const ignore = options.exclude;
    const files = options.files || [];
    if (files.length > 0) {
        return files
            .map((file) => glob.sync(file, { cwd: root, ignore, nodir: true }))
            .reduce((prev, curr) => prev.concat(curr), [])
            .map((file) => path.join(root, file));
    }
    if (!program) {
        return [];
    }
    let programFiles = getFileNamesFromProgram(program);
    if (ignore && ignore.length > 0) {
        // normalize to support ./ paths
        const ignoreMatchers = ignore.map((pattern) => new minimatch_1.Minimatch(path.normalize(pattern), { dot: true }));
        programFiles = programFiles.filter((file) => !ignoreMatchers.some((matcher) => matcher.match(path.relative(root, file))));
    }
    return programFiles;
}
exports.getFilesToLint = getFilesToLint;
//# sourceMappingURL=file-utils.js.map