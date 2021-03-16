"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDependenciesToPackageJson = void 0;
const json_1 = require("./json");
const install_packages_task_1 = require("../tasks/install-packages-task");
/**
 * Add Dependencies and Dev Dependencies to package.json
 *
 * For example, `addDependenciesToPackageJson(host, { react: 'latest' }, { jest: 'latest' })`
 * will add `react` and `jest` to the dependencies and devDependencies sections of package.json respectively
 *
 * @param dependencies Dependencies to be added to the dependencies section of package.json
 * @param devDependencies Dependencies to be added to the devDependencies section of package.json
 * @returns Callback to install dependencies only if necessary. undefined is returned if changes are not necessary.
 */
function addDependenciesToPackageJson(host, dependencies, devDependencies, packageJsonPath = 'package.json') {
    const currentPackageJson = json_1.readJson(host, packageJsonPath);
    if (requiresAddingOfPackages(currentPackageJson, dependencies, devDependencies)) {
        json_1.updateJson(host, packageJsonPath, (json) => {
            json.dependencies = Object.assign(Object.assign(Object.assign({}, (json.dependencies || {})), dependencies), (json.dependencies || {}));
            json.devDependencies = Object.assign(Object.assign(Object.assign({}, (json.devDependencies || {})), devDependencies), (json.devDependencies || {}));
            json.dependencies = sortObjectByKeys(json.dependencies);
            json.devDependencies = sortObjectByKeys(json.devDependencies);
            return json;
        });
    }
    return () => {
        install_packages_task_1.installPackagesTask(host);
    };
}
exports.addDependenciesToPackageJson = addDependenciesToPackageJson;
function sortObjectByKeys(obj) {
    return Object.keys(obj)
        .sort()
        .reduce((result, key) => {
        return Object.assign(Object.assign({}, result), { [key]: obj[key] });
    }, {});
}
/**
 * Verifies whether the given packageJson dependencies require an update
 * given the deps & devDeps passed in
 */
function requiresAddingOfPackages(packageJsonFile, deps, devDeps) {
    let needsDepsUpdate = false;
    let needsDevDepsUpdate = false;
    packageJsonFile.dependencies = packageJsonFile.dependencies || {};
    packageJsonFile.devDependencies = packageJsonFile.devDependencies || {};
    if (Object.keys(deps).length > 0) {
        needsDepsUpdate = Object.keys(deps).some((entry) => !packageJsonFile.dependencies[entry]);
    }
    if (Object.keys(devDeps).length > 0) {
        needsDevDepsUpdate = Object.keys(devDeps).some((entry) => !packageJsonFile.devDependencies[entry]);
    }
    return needsDepsUpdate || needsDevDepsUpdate;
}
//# sourceMappingURL=package-json.js.map