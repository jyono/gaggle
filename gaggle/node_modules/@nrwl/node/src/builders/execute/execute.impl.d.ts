import { BuilderContext, BuilderOutput } from '@angular-devkit/architect';
import { Observable } from 'rxjs';
import { JsonObject } from '@angular-devkit/core';
export declare const enum InspectType {
    Inspect = "inspect",
    InspectBrk = "inspect-brk"
}
export interface NodeExecuteBuilderOptions extends JsonObject {
    inspect: boolean | InspectType;
    runtimeArgs: string[];
    args: string[];
    waitUntilTargets: string[];
    buildTarget: string;
    host: string;
    port: number;
    watch: boolean;
}
declare const _default: import("@angular-devkit/architect/src/internal").Builder<NodeExecuteBuilderOptions>;
export default _default;
export declare function nodeExecuteBuilderHandler(options: NodeExecuteBuilderOptions, context: BuilderContext): Observable<BuilderOutput>;
