"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toJS = void 0;
const typescript_1 = require("typescript");
/**
 * Rename and transpile any new typescript files created to javascript files
 */
function toJS(tree) {
    for (const c of tree.listChanges()) {
        if ((c.path.endsWith('.ts') || c.path.endsWith('tsx')) &&
            c.type === 'CREATE') {
            tree.write(c.path, typescript_1.transpile(c.content.toString('utf-8'), {
                allowJs: true,
                jsx: typescript_1.JsxEmit.Preserve,
                target: typescript_1.ScriptTarget.ESNext,
            }));
            tree.rename(c.path, c.path.replace(/\.tsx?$/, '.js'));
        }
    }
}
exports.toJS = toJS;
//# sourceMappingURL=to-js.js.map