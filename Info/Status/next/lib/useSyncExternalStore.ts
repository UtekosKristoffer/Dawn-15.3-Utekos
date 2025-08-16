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
