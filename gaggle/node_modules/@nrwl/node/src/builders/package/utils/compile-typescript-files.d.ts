import { BuilderContext, BuilderOutput } from '@angular-devkit/architect';
import { DependentBuildableProjectNode } from '@nrwl/workspace/src/utils/buildable-libs-utils';
import { NormalizedBuilderOptions } from './models';
import { Observable } from 'rxjs';
export default function compileTypeScriptFiles(options: NormalizedBuilderOptions, context: BuilderContext, libRoot: string, projectDependencies: DependentBuildableProjectNode[]): Observable<BuilderOutput>;
