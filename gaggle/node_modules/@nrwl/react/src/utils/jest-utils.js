"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateJestConfigContent = void 0;
function updateJestConfigContent(content) {
    return content.replace('transform: {', "transform: {\n    '^(?!.*\\\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',");
}
exports.updateJestConfigContent = updateJestConfigContent;
//# sourceMappingURL=jest-utils.js.map