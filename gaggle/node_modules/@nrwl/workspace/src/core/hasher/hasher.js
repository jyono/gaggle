"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hasher = void 0;
const tslib_1 = require("tslib");
const fs_1 = require("fs");
const file_utils_1 = require("../file-utils");
const child_process_1 = require("child_process");
const file_hasher_1 = require("./file-hasher");
const hashing_impl_1 = require("./hashing-impl");
const resolve = require('resolve');
class Hasher {
    constructor(projectGraph, nxJson, options, hashing = undefined) {
        this.projectGraph = projectGraph;
        this.nxJson = nxJson;
        this.options = options;
        if (!hashing) {
            this.hashing = hashing_impl_1.defaultHashing;
            this.fileHasher = file_hasher_1.defaultFileHasher;
        }
        else {
            this.hashing = hashing;
            this.fileHasher = new file_hasher_1.FileHasher(hashing);
        }
        this.projectHashes = new ProjectHasher(this.projectGraph, this.fileHasher, this.hashing);
    }
    hashTasks(tasks) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return Promise.all(tasks.map((t) => this.hash(t)));
        });
    }
    hash(task) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const command = this.hashing.hashArray([
                task.target.project || '',
                task.target.target || '',
                task.target.configuration || '',
                JSON.stringify(task.overrides),
            ]);
            const values = (yield Promise.all([
                this.projectHashes.hashProject(task.target.project, [
                    task.target.project,
                ]),
                this.implicitDepsHash(),
                this.runtimeInputsHash(),
                this.nodeModulesHash(),
            ]));
            const value = this.hashing.hashArray([
                Hasher.version,
                command,
                ...values.map((v) => v.value),
            ]);
            return {
                value,
                details: {
                    command,
                    sources: values[0].sources,
                    implicitDeps: values[1].sources,
                    runtime: values[2].runtime,
                },
            };
        });
    }
    runtimeInputsHash() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.runtimeInputs)
                return this.runtimeInputs;
            const inputs = this.options && this.options.runtimeCacheInputs
                ? this.options.runtimeCacheInputs
                : [];
            if (inputs.length > 0) {
                try {
                    const values = (yield Promise.all(inputs.map((input) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        const value = child_process_1.execSync(input).toString().trim();
                        return { input, value };
                    }))));
                    const value = this.hashing.hashArray(values.map((v) => v.value));
                    const runtime = values.reduce((m, c) => ((m[c.input] = c.value), m), {});
                    return { value, runtime };
                }
                catch (e) {
                    throw new Error(`Nx failed to execute runtimeCacheInputs defined in nx.json failed:\n${e.message}`);
                }
            }
            else {
                this.runtimeInputs = Promise.resolve({ value: '', runtime: {} });
            }
            return this.runtimeInputs;
        });
    }
    implicitDepsHash() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.implicitDependencies)
                return this.implicitDependencies;
            const fileNames = [
                ...Object.keys(this.nxJson.implicitDependencies || {}),
                ...file_utils_1.rootWorkspaceFileNames(),
                'package-lock.json',
                'yarn.lock',
                'pnpm-lock.yaml',
            ];
            this.implicitDependencies = Promise.resolve().then(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const fileHashes = fileNames.map((file) => {
                    const hash = this.fileHasher.hashFile(file);
                    return { file, hash };
                });
                const combinedHash = this.hashing.hashArray(fileHashes.map((v) => v.hash));
                return {
                    value: combinedHash,
                    sources: fileHashes.reduce((m, c) => ((m[c.file] = c.hash), m), {}),
                };
            }));
            return this.implicitDependencies;
        });
    }
    nodeModulesHash() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.nodeModules)
                return this.nodeModules;
            this.nodeModules = Promise.resolve().then(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
                try {
                    const j = JSON.parse(fs_1.readFileSync('package.json').toString());
                    const allPackages = [
                        ...Object.keys(j.dependencies),
                        ...Object.keys(j.devDependencies),
                    ];
                    const packageJsonHashes = allPackages.map((d) => {
                        try {
                            const path = resolve.sync(`${d}/package.json`, {
                                basedir: process.cwd(),
                            });
                            return this.fileHasher.hashFile(path, file_hasher_1.extractNameAndVersion);
                        }
                        catch (e) {
                            return '';
                        }
                    });
                    return { value: this.hashing.hashArray(packageJsonHashes) };
                }
                catch (e) {
                    return { value: '' };
                }
            }));
            return this.nodeModules;
        });
    }
}
exports.Hasher = Hasher;
Hasher.version = '1.0';
class ProjectHasher {
    constructor(projectGraph, fileHasher, hashing) {
        this.projectGraph = projectGraph;
        this.fileHasher = fileHasher;
        this.hashing = hashing;
        this.sourceHashes = {};
    }
    hashProject(projectName, visited) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return Promise.resolve().then(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const deps = this.projectGraph.dependencies[projectName] || [];
                const depHashes = (yield Promise.all(deps.map((d) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    if (visited.indexOf(d.target) > -1) {
                        return null;
                    }
                    else {
                        visited.push(d.target);
                        return yield this.hashProject(d.target, visited);
                    }
                })))).filter((r) => !!r);
                const projectHash = yield this.hashProjectNodeSource(projectName);
                const sources = depHashes.reduce((m, c) => {
                    return Object.assign(Object.assign({}, m), c.sources);
                }, { [projectName]: projectHash });
                const value = this.hashing.hashArray([
                    ...depHashes.map((d) => d.value),
                    projectHash,
                ]);
                return { value, sources };
            }));
        });
    }
    hashProjectNodeSource(projectName) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.sourceHashes[projectName]) {
                this.sourceHashes[projectName] = new Promise((res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const p = this.projectGraph.nodes[projectName];
                    const fileNames = p.data.files.map((f) => f.file);
                    const values = yield Promise.all(fileNames.map((f) => this.fileHasher.hashFile(f)));
                    res(this.hashing.hashArray([...fileNames, ...values]));
                }));
            }
            return this.sourceHashes[projectName];
        });
    }
}
//# sourceMappingURL=hasher.js.map