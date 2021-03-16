"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const fsExtra = require("fs-extra");
const path = require("path");
const WEEK_IN_MS = 1000 * 60 * 60 * 24 * 7;
const folder = process.argv[2];
removeOld(terminalOutputs());
removeOld(cachedFiles());
function terminalOutputs() {
    try {
        return fs.readdirSync(path.join(folder, 'terminalOutputs'));
    }
    catch (e) {
        return [];
    }
}
function cachedFiles() {
    try {
        return fs.readdirSync(folder).filter((f) => !f.endsWith('terminalOutputs'));
    }
    catch (e) {
        return [];
    }
}
function removeOld(records) {
    try {
        const time = mostRecentMTime(records);
        records.forEach((r) => {
            const child = path.join(folder, r);
            try {
                const s = fs.statSync(child);
                if (time - s.mtimeMs > WEEK_IN_MS) {
                    if (s.isDirectory()) {
                        try {
                            fsExtra.removeSync(`${child}.commit`);
                        }
                        catch (e) { }
                    }
                    fsExtra.removeSync(child);
                }
            }
            catch (e) { }
        });
    }
    catch (e) { }
}
function mostRecentMTime(records) {
    let mostRecentTime = 0;
    records.forEach((r) => {
        const child = path.join(folder, r);
        try {
            const s = fs.statSync(child);
            if (s.mtimeMs > mostRecentTime) {
                mostRecentTime = s.mtimeMs;
            }
        }
        catch (e) { }
    });
    return mostRecentTime;
}
//# sourceMappingURL=remove-old-cache-records.js.map