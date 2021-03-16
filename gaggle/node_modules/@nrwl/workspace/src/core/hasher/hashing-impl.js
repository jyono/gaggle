"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultHashing = exports.HashingImp = void 0;
const crypto = require("crypto");
const fs_1 = require("fs");
class HashingImp {
    hashArray(input) {
        const hasher = crypto.createHash('sha256');
        for (const part of input) {
            hasher.update(part);
        }
        const hash = hasher.digest().buffer;
        return Buffer.from(hash).toString('hex');
    }
    hashFile(path) {
        const hasher = crypto.createHash('sha256');
        const file = fs_1.readFileSync(path);
        hasher.update(file);
        const hash = hasher.digest().buffer;
        return Buffer.from(hash).toString('hex');
    }
}
exports.HashingImp = HashingImp;
exports.defaultHashing = new HashingImp();
//# sourceMappingURL=hashing-impl.js.map