export declare const createESLintRule: <TOptions extends readonly unknown[], TMessageIds extends string, TRuleListener extends import("@typescript-eslint/experimental-utils/dist/ts-eslint/Rule").RuleListener = import("@typescript-eslint/experimental-utils/dist/ts-eslint/Rule").RuleListener>({ name, meta, defaultOptions, create, }: Readonly<{
    name: string;
    meta: {
        docs: Pick<import("@typescript-eslint/experimental-utils/dist/ts-eslint/Rule").RuleMetaDataDocs, "category" | "description" | "recommended" | "suggestion" | "requiresTypeChecking" | "extendsBaseRule">;
    } & Pick<import("@typescript-eslint/experimental-utils/dist/ts-eslint/Rule").RuleMetaData<TMessageIds>, "deprecated" | "fixable" | "messages" | "type" | "replacedBy" | "schema">;
    defaultOptions: Readonly<TOptions>;
    create: (context: Readonly<import("@typescript-eslint/experimental-utils/dist/ts-eslint/Rule").RuleContext<TMessageIds, TOptions>>, optionsWithDefault: Readonly<TOptions>) => TRuleListener;
}>) => import("@typescript-eslint/experimental-utils/dist/ts-eslint/Rule").RuleModule<TMessageIds, TOptions, TRuleListener>;
