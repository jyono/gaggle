import { BuilderContext } from '@angular-devkit/architect';
import { NodePackageBuilderOptions, NormalizedBuilderOptions } from './models';
export default function normalizeOptions(options: NodePackageBuilderOptions, context: BuilderContext, libRoot: string): NormalizedBuilderOptions;
