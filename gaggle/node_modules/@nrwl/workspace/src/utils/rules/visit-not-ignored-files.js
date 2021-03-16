"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.visitNotIgnoredFiles = void 0;
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const ignore_1 = require("ignore");
function visitNotIgnoredFiles(visitor, dir = core_1.normalize('')) {
    return (host, context) => {
        let ig;
        if (host.exists('.gitignore')) {
            ig = ignore_1.default();
            ig.add(host.read('.gitignore').toString());
        }
        function visit(_dir) {
            if (_dir && (ig === null || ig === void 0 ? void 0 : ig.ignores(_dir))) {
                return;
            }
            const dirEntry = host.getDir(_dir);
            dirEntry.subfiles.forEach((file) => {
                if (ig === null || ig === void 0 ? void 0 : ig.ignores(core_1.join(_dir, file))) {
                    return;
                }
                const maybeRule = visitor(core_1.join(_dir, file), host, context);
                if (maybeRule) {
                    schematics_1.callRule(maybeRule, host, context).subscribe();
                }
            });
            dirEntry.subdirs.forEach((subdir) => {
                visit(core_1.join(_dir, subdir));
            });
        }
        visit(dir);
    };
}
exports.visitNotIgnoredFiles = visitNotIgnoredFiles;
//# sourceMappingURL=visit-not-ignored-files.js.map