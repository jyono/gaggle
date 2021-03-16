#!/usr/bin/env node
import './src/compat/compat';
export declare function invokeCommand(command: string, root: string, commandArgs?: string[]): Promise<any>;
export declare function invokeCli(root: string, args: string[]): Promise<void>;
