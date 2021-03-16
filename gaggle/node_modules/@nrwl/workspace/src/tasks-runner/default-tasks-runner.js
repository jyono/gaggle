"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultTasksRunner = void 0;
const tslib_1 = require("tslib");
const rxjs_1 = require("rxjs");
const tasks_runner_1 = require("./tasks-runner");
const task_orderer_1 = require("./task-orderer");
const task_orchestrator_1 = require("./task-orchestrator");
class NoopLifeCycle {
    startTask(task) { }
    endTask(task, code) { }
}
exports.defaultTasksRunner = (tasks, options, context) => {
    if (!options.lifeCycle) {
        options.lifeCycle = new NoopLifeCycle();
    }
    return new rxjs_1.Observable((subscriber) => {
        runAllTasks(tasks, options, context)
            .then((data) => data.forEach((d) => subscriber.next(d)))
            .catch((e) => {
            console.error('Unexpected error:');
            console.error(e);
            process.exit(1);
        })
            .finally(() => {
            subscriber.complete();
            // fix for https://github.com/nrwl/nx/issues/1666
            if (process.stdin['unref'])
                process.stdin.unref();
        });
    });
};
function runAllTasks(tasks, options, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const stages = new task_orderer_1.TaskOrderer(options, context.target, context.projectGraph).splitTasksIntoStages(tasks);
        const orchestrator = new task_orchestrator_1.TaskOrchestrator(context.initiatingProject, context.projectGraph, options);
        const res = [];
        for (let i = 0; i < stages.length; ++i) {
            const tasksInStage = stages[i];
            const statuses = yield orchestrator.run(tasksInStage);
            res.push(...statuses);
            // any task failed, we need to skip further stages
            if (statuses.find((s) => !s.success)) {
                res.push(...markStagesAsNotSuccessful(stages.splice(i + 1)));
                return res;
            }
        }
        return res;
    });
}
function markStagesAsNotSuccessful(stages) {
    return stages.reduce((m, c) => [...m, ...tasksToStatuses(c, false)], []);
}
function tasksToStatuses(tasks, success) {
    return tasks.map((task) => ({
        task,
        type: tasks_runner_1.AffectedEventType.TaskComplete,
        success,
    }));
}
exports.default = exports.defaultTasksRunner;
//# sourceMappingURL=default-tasks-runner.js.map