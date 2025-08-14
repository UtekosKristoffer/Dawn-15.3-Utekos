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
/**
 * A React hook that subscribes to the `atom` and returns the current value of
 * the atom.
 *
 * @example
 *
 * ```ts
 * const atom = createAtom(0);
 *
 * const Component = () => {
 *   const count = useAtom(atom);
 *
 *   return (
 *     <div>
 *       <div>{count}</div>
 *       <button onClick={() => atom.set((c) => c + 1)}>Increment</button>
 *     </div>
 *   );
 * };
 * ```
 *
 * @param atom The atom, created from `createAtom(…)`
 * @param selector An optional function which takes in the `snapshot` and
 *   returns a selected value
 * @param compare An optional function which compares the selected value to the
 *   previous value
 */
export declare function useAtom<T>(atom: BaseAtom<T>): T;
export declare function useAtom<T, S>(atom: BaseAtom<T>, selector: (snapshot: T) => S, compare?: (a: S, b: S) => boolean): S;


import { AnyActorRef } from 'xstate';
export declare function useSelector<TActor extends Pick<AnyActorRef, 'subscribe' | 'getSnapshot'> | undefined, T>(actor: TActor, selector: (snapshot: TActor extends {
    getSnapshot(): infer TSnapshot;
} ? TSnapshot : undefined) => T, compare?: (a: T, b: T) => boolean): T;


//Pick

/**
 * Construct a type with a set of properties K of type T
 */
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
