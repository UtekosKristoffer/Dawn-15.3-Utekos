import { Removable } from './removable.cjs';
import { Subscribable } from './subscribable.cjs';

type QueryObserverListener<TData, TError> = (result: QueryObserverResult<TData, TError>) => void;
interface ObserverFetchOptions extends FetchOptions {
    throwOnError?: boolean;
}
declare class QueryObserver<TQueryFnData = unknown, TError = DefaultError, TData = TQueryFnData, TQueryData = TQueryFnData, TQueryKey extends QueryKey = QueryKey> extends Subscribable<QueryObserverListener<TData, TError>> {
    #private;
    options: QueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>;
    constructor(client: QueryClient, options: QueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>);
    protected bindMethods(): void;
    protected onSubscribe(): void;
    protected onUnsubscribe(): void;
    shouldFetchOnReconnect(): boolean;
    shouldFetchOnWindowFocus(): boolean;
    destroy(): void;
    setOptions(options: QueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>): void;
    getOptimisticResult(options: DefaultedQueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>): QueryObserverResult<TData, TError>;
    getCurrentResult(): QueryObserverResult<TData, TError>;
    trackResult(result: QueryObserverResult<TData, TError>, onPropTracked?: (key: keyof QueryObserverResult) => void): QueryObserverResult<TData, TError>;
    trackProp(key: keyof QueryObserverResult): void;
    getCurrentQuery(): Query<TQueryFnData, TError, TQueryData, TQueryKey>;
    refetch({ ...options }?: RefetchOptions): Promise<QueryObserverResult<TData, TError>>;
    fetchOptimistic(options: QueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>): Promise<QueryObserverResult<TData, TError>>;
    protected fetch(fetchOptions: ObserverFetchOptions): Promise<QueryObserverResult<TData, TError>>;
    protected createResult(query: Query<TQueryFnData, TError, TQueryData, TQueryKey>, options: QueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>): QueryObserverResult<TData, TError>;
    updateResult(): void;
    onQueryUpdate(): void;
}

interface QueryConfig<TQueryFnData, TError, TData, TQueryKey extends QueryKey = QueryKey> {
    client: QueryClient;
    queryKey: TQueryKey;
    queryHash: string;
    options?: QueryOptions<TQueryFnData, TError, TData, TQueryKey>;
    defaultOptions?: QueryOptions<TQueryFnData, TError, TData, TQueryKey>;
    state?: QueryState<TData, TError>;
}
interface QueryState<TData = unknown, TError = DefaultError> {
    data: TData | undefined;
    dataUpdateCount: number;
    dataUpdatedAt: number;
    error: TError | null;
    errorUpdateCount: number;
    errorUpdatedAt: number;
    fetchFailureCount: number;
    fetchFailureReason: TError | null;
    fetchMeta: FetchMeta | null;
    isInvalidated: boolean;
    status: QueryStatus;
    fetchStatus: FetchStatus;
}
interface FetchContext<TQueryFnData, TError, TData, TQueryKey extends QueryKey = QueryKey> {
    fetchFn: () => unknown | Promise<unknown>;
    fetchOptions?: FetchOptions;
    signal: AbortSignal;
    options: QueryOptions<TQueryFnData, TError, TData, any>;
    client: QueryClient;
    queryKey: TQueryKey;
    state: QueryState<TData, TError>;
}
interface QueryBehavior<TQueryFnData = unknown, TError = DefaultError, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey> {
    onFetch: (context: FetchContext<TQueryFnData, TError, TData, TQueryKey>, query: Query) => void;
}
type FetchDirection = 'forward' | 'backward';
interface FetchMeta {
    fetchMore?: {
        direction: FetchDirection;
    };
}
interface FetchOptions<TData = unknown> {
    cancelRefetch?: boolean;
    meta?: FetchMeta;
    initialPromise?: Promise<TData>;
}
interface FailedAction$1<TError> {
    type: 'failed';
    failureCount: number;
    error: TError;
}
interface FetchAction {
    type: 'fetch';
    meta?: FetchMeta;
}
interface SuccessAction$1<TData> {
    data: TData | undefined;
    type: 'success';
    dataUpdatedAt?: number;
    manual?: boolean;
}
interface ErrorAction$1<TError> {
    type: 'error';
    error: TError;
}
interface InvalidateAction {
    type: 'invalidate';
}
interface PauseAction$1 {
    type: 'pause';
}
interface ContinueAction$1 {
    type: 'continue';
}
interface SetStateAction<TData, TError> {
    type: 'setState';
    state: Partial<QueryState<TData, TError>>;
    setStateOptions?: SetStateOptions;
}
type Action$1<TData, TError> = ContinueAction$1 | ErrorAction$1<TError> | FailedAction$1<TError> | FetchAction | InvalidateAction | PauseAction$1 | SetStateAction<TData, TError> | SuccessAction$1<TData>;
interface SetStateOptions {
    meta?: any;
}
declare class Query<TQueryFnData = unknown, TError = DefaultError, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey> extends Removable {
    #private;
    queryKey: TQueryKey;
    queryHash: string;
    options: QueryOptions<TQueryFnData, TError, TData, TQueryKey>;
    state: QueryState<TData, TError>;
    observers: Array<QueryObserver<any, any, any, any, any>>;
    constructor(config: QueryConfig<TQueryFnData, TError, TData, TQueryKey>);
    get meta(): QueryMeta | undefined;
    get promise(): Promise<TData> | undefined;
    setOptions(options?: QueryOptions<TQueryFnData, TError, TData, TQueryKey>): void;
    protected optionalRemove(): void;
    setData(newData: TData, options?: SetDataOptions & {
        manual: boolean;
    }): TData;
    setState(state: Partial<QueryState<TData, TError>>, setStateOptions?: SetStateOptions): void;
    cancel(options?: CancelOptions): Promise<void>;
    destroy(): void;
    reset(): void;
    isActive(): boolean;
    isDisabled(): boolean;
    isStatic(): boolean;
    isStale(): boolean;
    isStaleByTime(staleTime?: StaleTime): boolean;
    onFocus(): void;
    onOnline(): void;
    addObserver(observer: QueryObserver<any, any, any, any, any>): void;
    removeObserver(observer: QueryObserver<any, any, any, any, any>): void;
    getObserversCount(): number;
    invalidate(): void;
    fetch(options?: QueryOptions<TQueryFnData, TError, TData, TQueryKey>, fetchOptions?: FetchOptions<TQueryFnData>): Promise<TData>;
}
declare function fetchState<TQueryFnData, TError, TData, TQueryKey extends QueryKey>(data: TData | undefined, options: QueryOptions<TQueryFnData, TError, TData, TQueryKey>): {
    readonly error?: null | undefined;
    readonly status?: "pending" | undefined;
    readonly fetchFailureCount: 0;
    readonly fetchFailureReason: null;
    readonly fetchStatus: "fetching" | "paused";
};
