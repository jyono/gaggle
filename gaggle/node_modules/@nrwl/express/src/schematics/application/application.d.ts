import { Rule } from '@angular-devkit/schematics';
import { Schema } from './schema';
export default function (schema: Schema): Rule;
export declare const applicationGenerator: (host: import("../../../../../build/packages/devkit").Tree, generatorOptions: {
    [k: string]: any;
}) => Promise<any>;
