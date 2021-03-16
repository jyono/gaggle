"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectType = exports.DependencyType = void 0;
var DependencyType;
(function (DependencyType) {
    DependencyType["static"] = "static";
    DependencyType["dynamic"] = "dynamic";
    DependencyType["implicit"] = "implicit";
})(DependencyType = exports.DependencyType || (exports.DependencyType = {}));
var ProjectType;
(function (ProjectType) {
    ProjectType["app"] = "app";
    ProjectType["e2e"] = "e2e";
    ProjectType["lib"] = "lib";
})(ProjectType = exports.ProjectType || (exports.ProjectType = {}));
//# sourceMappingURL=project-graph-models.js.map