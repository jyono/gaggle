"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeNxJson = void 0;
function normalizeNxJson(nxJson) {
    return nxJson.implicitDependencies
        ? Object.assign(Object.assign({}, nxJson), { implicitDependencies: Object.entries(nxJson.implicitDependencies).reduce((acc, [key, val]) => {
                acc[key] = recur(val);
                return acc;
                function recur(v) {
                    if (v === '*') {
                        return Object.keys(nxJson.projects);
                    }
                    else if (Array.isArray(v)) {
                        return v;
                    }
                    else {
                        return Object.keys(v).reduce((xs, x) => {
                            xs[x] = recur(v[x]);
                            return xs;
                        }, {});
                    }
                }
            }, {}) }) : nxJson;
}
exports.normalizeNxJson = normalizeNxJson;
//# sourceMappingURL=normalize-nx-json.js.map