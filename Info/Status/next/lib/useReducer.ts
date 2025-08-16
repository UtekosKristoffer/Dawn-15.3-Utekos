/**
     * An alternative to `useState`.
     *
     * `useReducer` is usually preferable to `useState` when you have complex state logic that involves
     * multiple sub-values. It also lets you optimize performance for components that trigger deep
     * updates because you can pass `dispatch` down instead of callbacks.
     *
     * @version 16.8.0
     * @see {@link https://react.dev/reference/react/useReducer}
     */
    function useReducer<S, A extends AnyActionArg>(
        reducer: (prevState: S, ...args: A) => S,
        initialState: S,
    ): [S, ActionDispatch<A>];
    /**
     * An alternative to `useState`.
     *
     * `useReducer` is usually preferable to `useState` when you have complex state logic that involves
     * multiple sub-values. It also lets you optimize performance for components that trigger deep
     * updates because you can pass `dispatch` down instead of callbacks.
     *
     * @version 16.8.0
     * @see {@link https://react.dev/reference/react/useReducer}
     */
    function useReducer<S, I, A extends AnyActionArg>(
        reducer: (prevState: S, ...args: A) => S,
        initialArg: I,
        init: (i: I) => S,
    ): [S, ActionDispatch<A>];
