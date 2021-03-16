import { Path } from '@angular-devkit/core';
import { Rule } from '@angular-devkit/schematics';
import { Schema } from './schema';
export interface NormalizedSchema extends Schema {
    name: string;
    prefix: string;
    fileName: string;
    projectRoot: Path;
    projectDirectory: string;
    parsedTags: string[];
}
export default function (schema: NormalizedSchema): Rule;
export declare const libraryGenerator: (host: import("../../../../../build/packages/devkit").Tree, generatorOptions: {
    [k: string]: any;
}) => Promise<any>;
