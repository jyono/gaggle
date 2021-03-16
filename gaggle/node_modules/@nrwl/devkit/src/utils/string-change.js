"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyChangesToString = exports.ChangeType = void 0;
var ChangeType;
(function (ChangeType) {
    ChangeType["Delete"] = "Delete";
    ChangeType["Insert"] = "Insert";
})(ChangeType = exports.ChangeType || (exports.ChangeType = {}));
/**
 * Applies a list of changes to a string's original value.
 *
 * This is useful when working with ASTs.
 *
 * For Example, to rename a property in a method's options:
 *
 * ```
 * const code = `bootstrap({
 *   target: document.querySelector('#app')
 * })`;
 *
 * const indexOfPropertyName = 13; // Usually determined by analyzing an AST.
 * const updatedCode = applyChangesToString(code, [
 *   {
 *     type: ChangeType.Insert,
 *     index: indexOfPropertyName,
 *     text: 'element'
 *   },
 *   {
 *     type: ChangeType.Delete,
 *     start: indexOfPropertyName,
 *     length: 6
 *   },
 * ]);
 *
 * bootstrap({
 *   element: document.querySelector('#app')
 * });
 * ```
 */
function applyChangesToString(text, changes) {
    assertChangesValid(changes);
    const sortedChanges = changes.sort((a, b) => {
        const diff = getChangeIndex(a) - getChangeIndex(b);
        if (diff === 0) {
            if (a.type === b.type) {
                return 0;
            }
            else {
                // When at the same place, Insert before Delete
                return a.type === ChangeType.Insert ? -1 : 1;
            }
        }
        return diff;
    });
    let offset = 0;
    for (const change of sortedChanges) {
        const index = getChangeIndex(change) + offset;
        switch (change.type) {
            case ChangeType.Insert: {
                text = text.substr(0, index) + change.text + text.substr(index);
                offset += change.text.length;
                break;
            }
            case ChangeType.Delete: {
                text = text.substr(0, index) + text.substr(index + change.length);
                offset -= change.length;
                break;
            }
        }
    }
    return text;
}
exports.applyChangesToString = applyChangesToString;
function assertChangesValid(changes) {
    for (const change of changes) {
        switch (change.type) {
            case ChangeType.Delete: {
                if (!Number.isInteger(change.start)) {
                    throw new TypeError(`${change.start} must be an integer.`);
                }
                if (change.start < 0) {
                    throw new Error(`${change.start} must be a positive integer.`);
                }
                if (!Number.isInteger(change.length)) {
                    throw new TypeError(`${change.length} must be an integer.`);
                }
                if (change.length < 0) {
                    throw new Error(`${change.length} must be a positive integer.`);
                }
                break;
            }
            case ChangeType.Insert:
                {
                    if (!Number.isInteger(change.index)) {
                        throw new TypeError(`${change.index} must be an integer.`);
                    }
                    if (change.index < 0) {
                        throw new Error(`${change.index} must be a positive integer.`);
                    }
                    if (typeof change.text !== 'string') {
                        throw new Error(`${change.text} must be a string.`);
                    }
                }
                break;
        }
    }
}
function getChangeIndex(change) {
    switch (change.type) {
        case ChangeType.Insert: {
            return change.index;
        }
        case ChangeType.Delete: {
            return change.start;
        }
    }
}
//# sourceMappingURL=string-change.js.map