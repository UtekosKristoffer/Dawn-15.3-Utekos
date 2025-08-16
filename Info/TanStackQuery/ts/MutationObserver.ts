type MutationObserverListener<TData, TError, TVariables, TContext> = (result: MutationObserverResult<TData, TError, TVariables, TContext>) => void;
declare class MutationObserver<TData = unknown, TError = DefaultError, TVariables = void, TContext = unknown> extends Subscribable<MutationObserverListener<TData, TError, TVariables, TContext>> {
    #private;
    options: MutationObserverOptions<TData, TError, TVariables, TContext>;
    constructor(client: QueryClient, options: MutationObserverOptions<TData, TError, TVariables, TContext>);
    protected bindMethods(): void;
    setOptions(options: MutationObserverOptions<TData, TError, TVariables, TContext>): void;
    protected onUnsubscribe(): void;
    onMutationUpdate(action: Action<TData, TError, TVariables, TContext>): void;
    getCurrentResult(): MutationObserverResult<TData, TError, TVariables, TContext>;
    reset(): void;
    mutate(variables: TVariables, options?: MutateOptions<TData, TError, TVariables, TContext>): Promise<TData>;
}

interface MutationCacheConfig {
    onError?: (error: DefaultError, variables: unknown, context: unknown, mutation: Mutation<unknown, unknown, unknown>) => Promise<unknown> | unknown;
    onSuccess?: (data: unknown, variables: unknown, context: unknown, mutation: Mutation<unknown, unknown, unknown>) => Promise<unknown> | unknown;
    onMutate?: (variables: unknown, mutation: Mutation<unknown, unknown, unknown>) => Promise<unknown> | unknown;
    onSettled?: (data: unknown | undefined, error: DefaultError | null, variables: unknown, context: unknown, mutation: Mutation<unknown, unknown, unknown>) => Promise<unknown> | unknown;
}
