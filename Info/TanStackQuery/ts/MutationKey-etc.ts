type MutationKey = Register extends {
    mutationKey: infer TMutationKey;
} ? TMutationKey extends Array<unknown> ? TMutationKey : TMutationKey extends Array<unknown> ? TMutationKey : ReadonlyArray<unknown> : ReadonlyArray<unknown>;
type MutationStatus = 'idle' | 'pending' | 'success' | 'error';
type MutationScope = {
    id: string;
};
type MutationMeta = Register extends {
    mutationMeta: infer TMutationMeta;
} ? TMutationMeta extends Record<string, unknown> ? TMutationMeta : Record<string, unknown> : Record<string, unknown>;
type MutationFunction<TData = unknown, TVariables = unknown> = (variables: TVariables) => Promise<TData>;
interface MutationOptions<TData = unknown, TError = DefaultError, TVariables = void, TContext = unknown> {
    mutationFn?: MutationFunction<TData, TVariables>;
    mutationKey?: MutationKey;
    onMutate?: (variables: TVariables) => Promise<TContext | undefined> | TContext | undefined;
    onSuccess?: (data: TData, variables: TVariables, context: TContext) => Promise<unknown> | unknown;
    onError?: (error: TError, variables: TVariables, context: TContext | undefined) => Promise<unknown> | unknown;
    onSettled?: (data: TData | undefined, error: TError | null, variables: TVariables, context: TContext | undefined) => Promise<unknown> | unknown;
    retry?: RetryValue<TError>;
    retryDelay?: RetryDelayValue<TError>;
    networkMode?: NetworkMode;
    gcTime?: number;
    _defaulted?: boolean;
    meta?: MutationMeta;
    scope?: MutationScope;
}
interface MutationObserverOptions<TData = unknown, TError = DefaultError, TVariables = void, TContext = unknown> extends MutationOptions<TData, TError, TVariables, TContext> {
    throwOnError?: boolean | ((error: TError) => boolean);
}
interface MutateOptions<TData = unknown, TError = DefaultError, TVariables = void, TContext = unknown> {
    onSuccess?: (data: TData, variables: TVariables, context: TContext) => void;
    onError?: (error: TError, variables: TVariables, context: TContext | undefined) => void;
    onSettled?: (data: TData | undefined, error: TError | null, variables: TVariables, context: TContext | undefined) => void;
}
type MutateFunction<TData = unknown, TError = DefaultError, TVariables = void, TContext = unknown> = (variables: TVariables, options?: MutateOptions<TData, TError, TVariables, TContext>) => Promise<TData>;
interface MutationObserverBaseResult<TData = unknown, TError = DefaultError, TVariables = void, TContext = unknown> extends MutationState<TData, TError, TVariables, TContext> {
    /**
     * The last successfully resolved data for the mutation.
     */
    data: TData | undefined;
    /**
     * The variables object passed to the `mutationFn`.
     */
    variables: TVariables | undefined;
    /**
     * The error object for the mutation, if an error was encountered.
     * - Defaults to `null`.
     */
    error: TError | null;
    /**
     * A boolean variable derived from `status`.
     * - `true` if the last mutation attempt resulted in an error.
     */
    isError: boolean;
    /**
     * A boolean variable derived from `status`.
     * - `true` if the mutation is in its initial state prior to executing.
     */
    isIdle: boolean;
    /**
     * A boolean variable derived from `status`.
     * - `true` if the mutation is currently executing.
     */
    isPending: boolean;
    /**
     * A boolean variable derived from `status`.
     * - `true` if the last mutation attempt was successful.
     */
    isSuccess: boolean;
    /**
     * The status of the mutation.
     * - Will be:
     *   - `idle` initial status prior to the mutation function executing.
     *   - `pending` if the mutation is currently executing.
     *   - `error` if the last mutation attempt resulted in an error.
     *   - `success` if the last mutation attempt was successful.
     */
    status: MutationStatus;
    /**
     * The mutation function you can call with variables to trigger the mutation and optionally hooks on additional callback options.
     * @param variables - The variables object to pass to the `mutationFn`.
     * @param options.onSuccess - This function will fire when the mutation is successful and will be passed the mutation's result.
     * @param options.onError - This function will fire if the mutation encounters an error and will be passed the error.
     * @param options.onSettled - This function will fire when the mutation is either successfully fetched or encounters an error and be passed either the data or error.
     * @remarks
     * - If you make multiple requests, `onSuccess` will fire only after the latest call you've made.
     * - All the callback functions (`onSuccess`, `onError`, `onSettled`) are void functions, and the returned value will be ignored.
     */
    mutate: MutateFunction<TData, TError, TVariables, TContext>;
    /**
     * A function to clean the mutation internal state (i.e., it resets the mutation to its initial state).
     */
    reset: () => void;
}
interface MutationObserverIdleResult<TData = unknown, TError = DefaultError, TVariables = void, TContext = unknown> extends MutationObserverBaseResult<TData, TError, TVariables, TContext> {
    data: undefined;
    variables: undefined;
    error: null;
    isError: false;
    isIdle: true;
    isPending: false;
    isSuccess: false;
    status: 'idle';
}
interface MutationObserverLoadingResult<TData = unknown, TError = DefaultError, TVariables = void, TContext = unknown> extends MutationObserverBaseResult<TData, TError, TVariables, TContext> {
    data: undefined;
    variables: TVariables;
    error: null;
    isError: false;
    isIdle: false;
    isPending: true;
    isSuccess: false;
    status: 'pending';
}
interface MutationObserverErrorResult<TData = unknown, TError = DefaultError, TVariables = void, TContext = unknown> extends MutationObserverBaseResult<TData, TError, TVariables, TContext> {
    data: undefined;
    error: TError;
    variables: TVariables;
    isError: true;
    isIdle: false;
    isPending: false;
    isSuccess: false;
    status: 'error';
}
interface MutationObserverSuccessResult<TData = unknown, TError = DefaultError, TVariables = void, TContext = unknown> extends MutationObserverBaseResult<TData, TError, TVariables, TContext> {
    data: TData;
    error: null;
    variables: TVariables;
    isError: false;
    isIdle: false;
    isPending: false;
    isSuccess: true;
    status: 'success';
}
type MutationObserverResult<TData = unknown, TError = DefaultError, TVariables = void, TContext = unknown> = MutationObserverIdleResult<TData, TError, TVariables, TContext> | MutationObserverLoadingResult<TData, TError, TVariables, TContext> | MutationObserverErrorResult<TData, TError, TVariables, TContext> | MutationObserverSuccessResult<TData, TError, TVariables, TContext>;
interface QueryClientConfig {
    queryCache?: QueryCache;
    mutationCache?: MutationCache;
    defaultOptions?: DefaultOptions;
}
interface DefaultOptions<TError = DefaultError> {
    queries?: OmitKeyof<QueryObserverOptions<unknown, TError>, 'suspense' | 'queryKey'>;
    mutations?: MutationObserverOptions<unknown, TError, unknown, unknown>;
    hydrate?: HydrateOptions['defaultOptions'];
    dehydrate?: DehydrateOptions;
}
interface CancelOptions {
    revert?: boolean;
    silent?: boolean;
}
interface SetDataOptions {
    updatedAt?: number;
}
type NotifyEventType = 'added' | 'removed' | 'updated' | 'observerAdded' | 'observerRemoved' | 'observerResultsUpdated' | 'observerOptionsUpdated';
interface NotifyEvent {
    type: NotifyEventType;
}

type TransformerFn = (data: any) => any;
interface DehydrateOptions {
    serializeData?: TransformerFn;
    shouldDehydrateMutation?: (mutation: Mutation) => boolean;
    shouldDehydrateQuery?: (query: Query) => boolean;
    shouldRedactErrors?: (error: unknown) => boolean;
}
interface HydrateOptions {
    defaultOptions?: {
        deserializeData?: TransformerFn;
        queries?: QueryOptions;
        mutations?: MutationOptions<unknown, DefaultError, unknown, unknown>;
    };
}
interface DehydratedMutation {
    mutationKey?: MutationKey;
    state: MutationState;
    meta?: MutationMeta;
    scope?: MutationScope;
}
interface DehydratedQuery {
    queryHash: string;
    queryKey: QueryKey;
    state: QueryState;
    promise?: Promise<unknown>;
    meta?: QueryMeta;
    dehydratedAt?: number;
}
interface DehydratedState {
    mutations: Array<DehydratedMutation>;
    queries: Array<DehydratedQuery>;
}
declare function defaultShouldDehydrateMutation(mutation: Mutation): boolean;
declare function defaultShouldDehydrateQuery(query: Query): boolean;
declare function dehydrate(client: QueryClient, options?: DehydrateOptions): DehydratedState;
declare function hydrate(client: QueryClient, dehydratedState: unknown, options?: HydrateOptions): void;
