import { Rule, Tree } from '@angular-devkit/schematics';
import { Architect } from '@angular-devkit/architect';
import { TestingArchitectHost } from '@angular-devkit/architect/testing';
import { MockBuilderContext } from '@nrwl/workspace/testing';
export declare function runSchematic<T = any>(schematicName: string, options: T, tree: Tree): Promise<import("@angular-devkit/schematics/testing").UnitTestTree>;
export declare function callRule(rule: Rule, tree: Tree): Promise<import("@angular-devkit/schematics/src/tree/interface").Tree>;
export declare function getTestArchitect(): Promise<[Architect, TestingArchitectHost]>;
export declare function getMockContext(): Promise<MockBuilderContext>;
