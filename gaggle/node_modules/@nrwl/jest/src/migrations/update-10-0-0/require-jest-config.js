"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJestObject = void 0;
// export so that we can mock this return value
function getJestObject(path) {
    return require(path);
}
exports.getJestObject = getJestObject;
//# sourceMappingURL=require-jest-config.js.map