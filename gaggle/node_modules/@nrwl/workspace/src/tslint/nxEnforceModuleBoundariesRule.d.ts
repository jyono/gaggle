import * as Lint from 'tslint';
import { IOptions } from 'tslint';
import * as ts from 'typescript';
import { ProjectGraph } from '../core/project-graph';
import { TargetProjectLocator } from '../core/target-project-locator';
export declare class Rule extends Lint.Rules.AbstractRule {
    private readonly projectPath?;
    private readonly npmScope?;
    private readonly projectGraph?;
    private readonly targetProjectLocator?;
    constructor(options: IOptions, projectPath?: string, npmScope?: string, projectGraph?: ProjectGraph, targetProjectLocator?: TargetProjectLocator);
    apply(sourceFile: ts.SourceFile): Lint.RuleFailure[];
}
