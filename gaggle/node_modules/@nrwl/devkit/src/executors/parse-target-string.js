"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTargetString = void 0;
function parseTargetString(targetString) {
    const [project, target, configuration] = targetString.split(':');
    if (!project || !target) {
        throw new Error(`Invalid Target String: ${targetString}`);
    }
    return {
        project,
        target,
        configuration,
    };
}
exports.parseTargetString = parseTargetString;
//# sourceMappingURL=parse-target-string.js.map