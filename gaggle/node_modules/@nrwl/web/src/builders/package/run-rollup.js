"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runRollup = void 0;
const rollup = require("rollup");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
function runRollup(options) {
    return rxjs_1.from(rollup.rollup(options)).pipe(operators_1.switchMap((bundle) => {
        const outputOptions = Array.isArray(options.output)
            ? options.output
            : [options.output];
        return rxjs_1.from(Promise.all(outputOptions.map((o) => bundle.write(o))));
    }), operators_1.map(() => ({ success: true })));
}
exports.runRollup = runRollup;
//# sourceMappingURL=run-rollup.js.map