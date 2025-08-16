import { IncrementalCacheKind, type IncrementalResponseCacheEntry, type ResponseCacheEntry } from './types';
import { RouteKind } from '../route-kind';
export declare function fromResponseCacheEntry(cacheEntry: ResponseCacheEntry): Promise<IncrementalResponseCacheEntry>;
export declare function toResponseCacheEntry(response: IncrementalResponseCacheEntry | null): Promise<ResponseCacheEntry | null>;
export declare function routeKindToIncrementalCacheKind(routeKind: RouteKind): Exclude<IncrementalCacheKind, IncrementalCacheKind.FETCH>;


export { unstable_cache } from 'next/dist/server/web/spec-extension/unstable-cache'

export {
  revalidatePath,
  revalidateTag,
  unstable_expirePath,
  unstable_expireTag,
} from 'next/dist/server/web/spec-extension/revalidate'

export { unstable_noStore } from 'next/dist/server/web/spec-extension/unstable-no-store'

export { cacheTag as unstable_cacheTag } from 'next/dist/server/use-cache/cache-tag'

/**
 * Cache this `"use cache"` for a timespan defined by the `"default"` profile.
 * ```
 *   stale:      300 seconds (5 minutes)
 *   revalidate: 900 seconds (15 minutes)
 *   expire:     never
 * ```
 *
 * This cache may be stale on clients for 5 minutes before checking with the server.
 * If the server receives a new request after 15 minutes, start revalidating new values in the background.
 * It lives for the maximum age of the server cache. If this entry has no traffic for a while, it may serve an old value the next request.
 */
export function unstable_cacheLife(profile: 'default'): void

/**
 * Cache this `"use cache"` for a timespan defined by the `"seconds"` profile.
 * ```
 *   stale:      0 seconds
 *   revalidate: 1 seconds
 *   expire:     1 minute
 * ```
 *
 * This cache may be stale on clients for 0 seconds before checking with the server.
 * If the server receives a new request after 1 second, start revalidating new values in the background.
 * If this entry has no traffic for 1 minute it will expire. The next request will recompute it.
 */
export function unstable_cacheLife(profile: 'seconds'): void

/**
 * Cache this `"use cache"` for a timespan defined by the `"minutes"` profile.
 * ```
 *   stale:      300 seconds (5 minutes)
 *   revalidate: 60 seconds (1 minute)
 *   expire:     3600 seconds (1 hour)
 * ```
 *
 * This cache may be stale on clients for 5 minutes before checking with the server.
 * If the server receives a new request after 1 minute, start revalidating new values in the background.
 * If this entry has no traffic for 1 hour it will expire. The next request will recompute it.
 */
export function unstable_cacheLife(profile: 'minutes'): void

/**
 * Cache this `"use cache"` for a timespan defined by the `"hours"` profile.
 * ```
 *   stale:      300 seconds (5 minutes)
 *   revalidate: 3600 seconds (1 hour)
 *   expire:     86400 seconds (1 day)
 * ```
 *
 * This cache may be stale on clients for 5 minutes before checking with the server.
 * If the server receives a new request after 1 hour, start revalidating new values in the background.
 * If this entry has no traffic for 1 day it will expire. The next request will recompute it.
 */
export function unstable_cacheLife(profile: 'hours'): void

/**
 * Cache this `"use cache"` for a timespan defined by the `"days"` profile.
 * ```
 *   stale:      300 seconds (5 minutes)
 *   revalidate: 86400 seconds (1 day)
 *   expire:     604800 seconds (1 week)
 * ```
 *
 * This cache may be stale on clients for 5 minutes before checking with the server.
 * If the server receives a new request after 1 day, start revalidating new values in the background.
 * If this entry has no traffic for 1 week it will expire. The next request will recompute it.
 */
export function unstable_cacheLife(profile: 'days'): void

/**
 * Cache this `"use cache"` for a timespan defined by the `"weeks"` profile.
 * ```
 *   stale:      300 seconds (5 minutes)
 *   revalidate: 604800 seconds (1 week)
 *   expire:     2592000 seconds (30 days)
 * ```
 *
 * This cache may be stale on clients for 5 minutes before checking with the server.
 * If the server receives a new request after 1 week, start revalidating new values in the background.
 * If this entry has no traffic for 30 days it will expire. The next request will recompute it.
 */
export function unstable_cacheLife(profile: 'weeks'): void

/**
 * Cache this `"use cache"` for a timespan defined by the `"max"` profile.
 * ```
 *   stale:      300 seconds (5 minutes)
 *   revalidate: 2592000 seconds (30 days)
 *   expire:     never
 * ```
 *
 * This cache may be stale on clients for 5 minutes before checking with the server.
 * If the server receives a new request after 30 days, start revalidating new values in the background.
 * It lives for the maximum age of the server cache. If this entry has no traffic for a while, it may serve an old value the next request.
 */
export function unstable_cacheLife(profile: 'max'): void

/**
 * Cache this `"use cache"` using a custom profile "...".
 * ```
 *   stale: ... // seconds
 *   revalidate: ... // seconds
 *   expire: ... // seconds
 * ```
 *
 * You can define custom profiles in `next.config.ts`.
 */
export function unstable_cacheLife(profile: string): void

/**
 * Cache this `"use cache"` using a custom timespan.
 * ```
 *   stale: ... // seconds
 *   revalidate: ... // seconds
 *   expire: ... // seconds
 * ```
 *
 * This is similar to Cache-Control: max-age=`stale`,s-max-age=`revalidate`,stale-while-revalidate=`expire-revalidate`
 *
 * If a value is left out, the lowest of other cacheLife() calls or the default, is used instead.
 */
export function unstable_cacheLife(profile: {
  /**
   * This cache may be stale on clients for ... seconds before checking with the server.
   */
  stale?: number
  /**
   * If the server receives a new request after ... seconds, start revalidating new values in the background.
   */
  revalidate?: number
  /**
   * If this entry has no traffic for ... seconds it will expire. The next request will recompute it.
   */
  expire?: number
}): void


import type { OutgoingHttpHeaders } from 'http';
import type RenderResult from '../render-result';
import type { CacheControl, Revalidate } from '../lib/cache-control';
import type { RouteKind } from '../route-kind';
export interface ResponseCacheBase {
    get(key: string | null, responseGenerator: ResponseGenerator, context: {
        isOnDemandRevalidate?: boolean;
        isPrefetch?: boolean;
        incrementalCache: IncrementalCache;
        /**
         * This is a hint to the cache to help it determine what kind of route
         * this is so it knows where to look up the cache entry from. If not
         * provided it will test the filesystem to check.
         */
        routeKind: RouteKind;
        /**
         * True if this is a fallback request.
         */
        isFallback?: boolean;
        /**
         * True if the route is enabled for PPR.
         */
        isRoutePPREnabled?: boolean;
    }): Promise<ResponseCacheEntry | null>;
}
export interface ServerComponentsHmrCache {
    get(key: string): CachedFetchData | undefined;
    set(key: string, data: CachedFetchData): void;
}
export type CachedFetchData = {
    headers: Record<string, string>;
    body: string;
    url: string;
    status?: number;
};
export declare const enum CachedRouteKind {
    APP_PAGE = "APP_PAGE",
    APP_ROUTE = "APP_ROUTE",
    PAGES = "PAGES",
    FETCH = "FETCH",
    REDIRECT = "REDIRECT",
    IMAGE = "IMAGE"
}
export interface CachedFetchValue {
    kind: CachedRouteKind.FETCH;
    data: CachedFetchData;
    tags?: string[];
    revalidate: number;
}
export interface CachedRedirectValue {
    kind: CachedRouteKind.REDIRECT;
    props: Object;
}
export interface CachedAppPageValue {
    kind: CachedRouteKind.APP_PAGE;
    html: RenderResult;
    rscData: Buffer | undefined;
    status: number | undefined;
    postponed: string | undefined;
    headers: OutgoingHttpHeaders | undefined;
    segmentData: Map<string, Buffer> | undefined;
}
export interface CachedPageValue {
    kind: CachedRouteKind.PAGES;
    html: RenderResult;
    pageData: Object;
    status: number | undefined;
    headers: OutgoingHttpHeaders | undefined;
}
export interface CachedRouteValue {
    kind: CachedRouteKind.APP_ROUTE;
    body: Buffer;
    status: number;
    headers: OutgoingHttpHeaders;
}
export interface CachedImageValue {
    kind: CachedRouteKind.IMAGE;
    etag: string;
    upstreamEtag: string;
    buffer: Buffer;
    extension: string;
    isMiss?: boolean;
    isStale?: boolean;
}
export interface IncrementalCachedAppPageValue {
    kind: CachedRouteKind.APP_PAGE;
    html: string;
    rscData: Buffer | undefined;
    headers: OutgoingHttpHeaders | undefined;
    postponed: string | undefined;
    status: number | undefined;
    segmentData: Map<string, Buffer> | undefined;
}
export interface IncrementalCachedPageValue {
    kind: CachedRouteKind.PAGES;
    html: string;
    pageData: Object;
    headers: OutgoingHttpHeaders | undefined;
    status: number | undefined;
}
export interface IncrementalResponseCacheEntry {
    cacheControl?: CacheControl;
    /**
     * timestamp in milliseconds to revalidate after
     */
    revalidateAfter?: Revalidate;
    /**
     * `-1` here dictates a blocking revalidate should be used
     */
    isStale?: boolean | -1;
    isMiss?: boolean;
    value: Exclude<IncrementalCacheValue, CachedFetchValue> | null;
}
export interface IncrementalFetchCacheEntry {
    /**
     * `-1` here dictates a blocking revalidate should be used
     */
    isStale?: boolean | -1;
    value: CachedFetchValue;
}
export type IncrementalCacheEntry = IncrementalResponseCacheEntry | IncrementalFetchCacheEntry;
export type IncrementalCacheValue = CachedRedirectValue | IncrementalCachedPageValue | IncrementalCachedAppPageValue | CachedImageValue | CachedFetchValue | CachedRouteValue;
export type ResponseCacheValue = CachedRedirectValue | CachedPageValue | CachedAppPageValue | CachedImageValue | CachedRouteValue;
export type ResponseCacheEntry = {
    cacheControl?: CacheControl;
    value: ResponseCacheValue | null;
    isStale?: boolean | -1;
    isMiss?: boolean;
};
/**
 * @param hasResolved whether the responseGenerator has resolved it's promise
 * @param previousCacheEntry the previous cache entry if it exists or the current
 */
export type ResponseGenerator = (state: {
    hasResolved: boolean;
    previousCacheEntry?: IncrementalResponseCacheEntry | null;
    isRevalidating?: boolean;
    span?: any;
}) => Promise<ResponseCacheEntry | null>;
export declare const enum IncrementalCacheKind {
    APP_PAGE = "APP_PAGE",
    APP_ROUTE = "APP_ROUTE",
    PAGES = "PAGES",
    FETCH = "FETCH",
    IMAGE = "IMAGE"
}
export interface GetIncrementalFetchCacheContext {
    kind: IncrementalCacheKind.FETCH;
    revalidate?: Revalidate;
    fetchUrl?: string;
    fetchIdx?: number;
    tags?: string[];
    softTags?: string[];
}
export interface GetIncrementalResponseCacheContext {
    kind: Exclude<IncrementalCacheKind, IncrementalCacheKind.FETCH>;
    /**
     * True if the route is enabled for PPR.
     */
    isRoutePPREnabled?: boolean;
    /**
     * True if this is a fallback request.
     */
    isFallback: boolean;
}
export interface SetIncrementalFetchCacheContext {
    fetchCache: true;
    fetchUrl?: string;
    fetchIdx?: number;
    tags?: string[];
    isImplicitBuildTimeCache?: boolean;
}
export interface SetIncrementalResponseCacheContext {
    fetchCache?: false;
    cacheControl?: CacheControl;
    /**
     * True if the route is enabled for PPR.
     */
    isRoutePPREnabled?: boolean;
    /**
     * True if this is a fallback request.
     */
    isFallback?: boolean;
}
export interface IncrementalResponseCache {
    get(cacheKey: string, ctx: GetIncrementalResponseCacheContext): Promise<IncrementalResponseCacheEntry | null>;
    set(key: string, data: Exclude<IncrementalCacheValue, CachedFetchValue> | null, ctx: SetIncrementalResponseCacheContext): Promise<void>;
}
export interface IncrementalCache extends IncrementalResponseCache {
    get(cacheKey: string, ctx: GetIncrementalFetchCacheContext): Promise<IncrementalFetchCacheEntry | null>;
    get(cacheKey: string, ctx: GetIncrementalResponseCacheContext): Promise<IncrementalResponseCacheEntry | null>;
    set(key: string, data: CachedFetchValue | null, ctx: SetIncrementalFetchCacheContext): Promise<void>;
    set(key: string, data: Exclude<IncrementalCacheValue, CachedFetchValue> | null, ctx: SetIncrementalResponseCacheContext): Promise<void>;
}
