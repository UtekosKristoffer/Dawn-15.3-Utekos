import { StoreContext, EventPayloadMap, StoreConfig, Store, ExtractEvents, Readable, BaseAtom } from "./types.js";
/**
 * A React hook that subscribes to the `store` and selects a value from the
 * store's snapshot, with an optional compare function.
 *
 * @example
 *
 * ```ts
 * function Component() {
 *   const count = useSelector(store, (s) => s.count);
 *
 *   return <div>{count}</div>;
 * }
 * ```
 *
 * @param store The store, created from `createStore(…)`
 * @param selector A function which takes in the `snapshot` and returns a
 *   selected value
 * @param compare An optional function which compares the selected value to the
 *   previous value
 * @returns The selected value
 */
export declare function useSelector<TStore extends Readable<any>, T>(store: TStore, selector: (snapshot: TStore extends Readable<infer T> ? T : never) => T, compare?: (a: T | undefined, b: T) => boolean): T;
export declare const useStore: {
    <TContext extends StoreContext, TEventPayloadMap extends EventPayloadMap, TEmitted extends EventPayloadMap>(definition: StoreConfig<TContext, TEventPayloadMap, TEmitted>): Store<TContext, ExtractEvents<TEventPayloadMap>, ExtractEvents<TEmitted>>;
    <TContext extends StoreContext, TEventPayloadMap extends EventPayloadMap, TEmitted extends EventPayloadMap>(definition: StoreConfig<TContext, TEventPayloadMap, TEmitted>): Store<TContext, ExtractEvents<TEventPayloadMap>, ExtractEvents<TEmitted>>;
};
