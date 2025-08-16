/**
     * Returns a deferred version of the value that may “lag behind” it.
     *
     * This is commonly used to keep the interface responsive when you have something that renders immediately
     * based on user input and something that needs to wait for a data fetch.
     *
     * A good example of this is a text input.
     *
     * @param value The value that is going to be deferred
     * @param initialValue A value to use during the initial render of a component. If this option is omitted, `useDeferredValue` will not defer during the initial render, because there’s no previous version of `value` that it can render instead.
     *
     * @see {@link https://react.dev/reference/react/useDeferredValue}
     */
    export function useDeferredValue<T>(value: T, initialValue?: T): T;

    /**
     * Allows components to avoid undesirable loading states by waiting for content to load
     * before transitioning to the next screen. It also allows components to defer slower,
     * data fetching updates until subsequent renders so that more crucial updates can be
     * rendered immediately.
     *
     * The `useTransition` hook returns two values in an array.
     *
     * The first is a boolean, React’s way of informing us whether we’re waiting for the transition to finish.
     * The second is a function that takes a callback. We can use it to tell React which state we want to defer.
     *
     * **If some state update causes a component to suspend, that state update should be wrapped in a transition.**
     *
     * @see {@link https://react.dev/reference/react/useTransition}
     */
    export function useTransition(): [boolean, TransitionStartFunction];

    /**
     * Similar to `useTransition` but allows uses where hooks are not available.
     *
     * @param callback A function which causes state updates that can be deferred.
     */
    export function startTransition(scope: TransitionFunction): void;

    /**
     * Wrap any code rendering and triggering updates to your components into `act()` calls.
     *
     * Ensures that the behavior in your tests matches what happens in the browser
     * more closely by executing pending `useEffect`s before returning. This also
     * reduces the amount of re-renders done.
     *
     * @param callback A synchronous, void callback that will execute as a single, complete React commit.
     *
     * @see https://reactjs.org/blog/2019/02/06/react-v16.8.0.html#testing-hooks
     */
    // NOTES
    // - the order of these signatures matters - typescript will check the signatures in source order.
    //   If the `() => VoidOrUndefinedOnly` signature is first, it'll erroneously match a Promise returning function for users with
    //   `strictNullChecks: false`.
    // - VoidOrUndefinedOnly is there to forbid any non-void return values for users with `strictNullChecks: true`
    // While act does always return Thenable, if a void function is passed, we pretend the return value is also void to not trigger dangling Promise lint rules.
    export function act(callback: () => VoidOrUndefinedOnly): void;
    export function act<T>(callback: () => T | Promise<T>): Promise<T>;

    export function useId(): string;

    /**
     * @param effect Imperative function that can return a cleanup function
     * @param deps If present, effect will only activate if the values in the list change.
     *
     * @see {@link https://github.com/facebook/react/pull/21913}
     */
    export function useInsertionEffect(effect: EffectCallback, deps?: DependencyList): void;

    /**
     * @param subscribe
     * @param getSnapshot
     *
     * @see {@link https://github.com/reactwg/react-18/discussions/86}
     */
    // keep in sync with `useSyncExternalStore` from `use-sync-external-store`
    export function useSyncExternalStore<Snapshot>(
        subscribe: (onStoreChange: () => void) => () => void,
        getSnapshot: () => Snapshot,
        getServerSnapshot?: () => Snapshot,
    ): Snapshot;

    export function useOptimistic<State>(
        passthrough: State,
    ): [State, (action: State | ((pendingState: State) => State)) => void];
    export function useOptimistic<State, Action>(
        passthrough: State,
        reducer: (state: State, action: Action) => State,
    ): [State, (action: Action) => void];

    export type Usable<T> = PromiseLike<T> | Context<T>;

    export function use<T>(usable: Usable<T>): T;

    export function useActionState<State>(
        action: (state: Awaited<State>) => State | Promise<State>,
        initialState: Awaited<State>,
        permalink?: string,
    ): [state: Awaited<State>, dispatch: () => void, isPending: boolean];
    export function useActionState<State, Payload>(
        action: (state: Awaited<State>, payload: Payload) => State | Promise<State>,
        initialState: Awaited<State>,
        permalink?: string,
    ): [state: Awaited<State>, dispatch: (payload: Payload) => void, isPending: boolean];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    export function cache<CachedFunction extends Function>(fn: CachedFunction): CachedFunction;

    /**
     * Warning: Only available in development builds.
     *
     * @see {@link https://react.dev/reference/react/captureOwnerStack Reference docs}
     */
    function captureOwnerStack(): string | null;

    //
    // Event System
    // ----------------------------------------------------------------------
    // TODO: change any to unknown when moving to TS v3
    interface BaseSyntheticEvent<E = object, C = any, T = any> {
        nativeEvent: E;
        currentTarget: C;
        target: T;
        bubbles: boolean;
        cancelable: boolean;
        defaultPrevented: boolean;
        eventPhase: number;
        isTrusted: boolean;
        preventDefault(): void;
        isDefaultPrevented(): boolean;
        stopPropagation(): void;
        isPropagationStopped(): boolean;
        persist(): void;
        timeStamp: number;
        type: string;
    }
