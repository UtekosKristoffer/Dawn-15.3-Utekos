/**
 * Execute getter function only if its needed
 * @param LazyProps `req` and `params` for lazyProp
 * @param prop name of property
 * @param getter function to get data
 */
export declare function setLazyProp<T>({ req }: LazyProps, prop: string, getter: () => T): void;
