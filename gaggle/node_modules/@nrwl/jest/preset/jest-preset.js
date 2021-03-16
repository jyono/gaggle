"use strict";
module.exports = {
    testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
    resolver: '@nrwl/jest/plugins/resolver',
    moduleFileExtensions: ['ts', 'js', 'html'],
    coverageReporters: ['html'],
    transform: {
        '^.+\\.(ts|js|html)$': 'ts-jest',
    },
};
//# sourceMappingURL=jest-preset.js.map