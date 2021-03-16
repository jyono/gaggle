"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateJson = exports.writeJson = exports.readJson = void 0;
const stripJsonComments = require("strip-json-comments");
/**
 * Reads a document for host, removes all comments and parses JSON.
 *
 * @param host - file system tree
 * @param path - file path
 */
function readJson(host, path) {
    if (!host.exists(path)) {
        throw new Error(`Cannot find ${path}`);
    }
    const contents = stripJsonComments(host.read(path).toString('utf-8'));
    try {
        return JSON.parse(contents);
    }
    catch (e) {
        throw new Error(`Cannot parse ${path}: ${e.message}`);
    }
}
exports.readJson = readJson;
/**
 * Writes a JSON value to the file system tree

 * @param value Serializable value to write
 */
function writeJson(host, path, value) {
    host.write(path, JSON.stringify(value, null, 2));
}
exports.writeJson = writeJson;
/**
 * Updates a JSON value to the file system tree
 *
 * @param updater Function that maps the current value of a JSON document to a new value to be written to the document
 */
function updateJson(host, path, updater) {
    const updatedValue = updater(readJson(host, path));
    writeJson(host, path, updatedValue);
}
exports.updateJson = updateJson;
//# sourceMappingURL=json.js.map