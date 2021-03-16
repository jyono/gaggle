import { BuilderContext } from '@angular-devkit/architect';
import { NodePackageBuilderOptions } from './utils/models';
export declare function runNodePackageBuilder(options: NodePackageBuilderOptions, context: BuilderContext): import("rxjs").Observable<{
    outputPath: string;
    success: boolean;
}>;
declare const _default: import("@angular-devkit/architect/src/internal").Builder<NodePackageBuilderOptions>;
export default _default;
