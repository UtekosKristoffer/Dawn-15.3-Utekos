export default function getRouteFromEntrypoint(entryFile: string, app?: boolean): string | null;



/**
 * A timestamp in milliseconds elapsed since the epoch
 */
export type Timestamp = number;
export interface CacheEntry {
    /**
     * The ReadableStream can error and only have partial data so any cache
     * handlers need to handle this case and decide to keep the partial cache
     * around or not.
     */
    value: ReadableStream<Uint8Array>;
    /**
     * The tags configured for the entry excluding soft tags
     */
    tags: string[];
    /**
     * This is for the client, not used to calculate cache entry expiration
     * [duration in seconds]
     */
    stale: number;
    /**
     * When the cache entry was created [timestamp in milliseconds]
     */
    timestamp: Timestamp;
    /**
     * How long the entry is allowed to be used (should be longer than revalidate)
     * [duration in seconds]
     */
    expire: number;
    /**
     * How long until the entry should be revalidated [duration in seconds]
     */
    revalidate: number;
}
/**
 * @deprecated Use {@link CacheHandlerV2} instead.
 */
export interface CacheHandler {
    /**
     * Retrieve a cache entry for the given cache key, if available. The softTags
     * should be used to check for staleness.
     */
    get(cacheKey: string, softTags: string[]): Promise<undefined | CacheEntry>;
    /**
     * Store a cache entry for the given cache key. When this is called, the entry
     * may still be pending, i.e. its value stream may still be written to. So it
     * needs to be awaited first. If a `get` for the same cache key is called
     * before the pending entry is complete, the cache handler must wait for the
     * `set` operation to finish, before returning the entry, instead of returning
     * undefined.
     */
    set(cacheKey: string, entry: Promise<CacheEntry>): Promise<void>;
    /**
     * Next.js will call this method when `revalidateTag` or `revalidatePath()` is
     * called. It should update the tags manifest accordingly.
     */
    expireTags(...tags: string[]): Promise<void>;
    /**
     * The `receiveExpiredTags` method is called when an action request sends the
     * 'x-next-revalidated-tags' header to indicate which tags have been expired
     * by the action. The local tags manifest should be updated accordingly. As
     * opposed to `expireTags`, the tags don't need to be propagated to a tags
     * service, as this was already done by the server action.
     */
    receiveExpiredTags(...tags: string[]): Promise<void>;
}
export interface CacheHandlerV2 {
    /**
     * Retrieve a cache entry for the given cache key, if available. Will return
     * undefined if there's no valid entry, or if the given soft tags are stale.
     */
    get(cacheKey: string, softTags: string[]): Promise<undefined | CacheEntry>;
    /**
     * Store a cache entry for the given cache key. When this is called, the entry
     * may still be pending, i.e. its value stream may still be written to. So it
     * needs to be awaited first. If a `get` for the same cache key is called,
     * before the pending entry is complete, the cache handler must wait for the
     * `set` operation to finish, before returning the entry, instead of returning
     * undefined.
     */
    set(cacheKey: string, pendingEntry: Promise<CacheEntry>): Promise<void>;
    /**
     * This function may be called periodically, but always before starting a new
     * request. If applicable, it should communicate with the tags service to
     * refresh the local tags manifest accordingly.
     */
    refreshTags(): Promise<void>;
    /**
     * This function is called for each set of soft tags that are relevant at the
     * start of a request. The result is the maximum timestamp of a revalidate
     * event for the tags. Returns `0` if none of the tags were ever revalidated.
     * Returns `Infinity` if the soft tags are supposed to be passed into the
     * `get` method instead to be checked for expiration.
     */
    getExpiration(...tags: string[]): Promise<Timestamp>;
    /**
     * This function is called when tags are revalidated/expired. If applicable,
     * it should update the tags manifest accordingly.
     */
    expireTags(...tags: string[]): Promise<void>;
}
/**
 * This is (under - look down) a compatibility type to ease migration between cache handler
 * versions. Until the old `CacheHandler` type is removed, this type should be
 * used for all internal Next.js functions that deal with cache handlers to
 * ensure that we are compatible with both cache handler versions. An exception
 * is the built-in default cache handler, which implements the
 * {@link CacheHandlerV2} interface.
 */
export type CacheHandlerCompat = CacheHandler | CacheHandlerV2;



/**
 * This is the default "use cache" handler it defaults to an in-memory store.
 * In-memory caches are fragile and should not use stale-while-revalidate
 * semantics on the caches because it's not worth warming up an entry that's
 * likely going to get evicted before we get to use it anyway. However, we also
 * don't want to reuse a stale entry for too long so stale entries should be
 * considered expired/missing in such cache handlers.
 */
import type { CacheHandlerV2 } from './types';
declare const DefaultCacheHandler: CacheHandlerV2;
export default DefaultCacheHandler;

export declare const ipcForbiddenHeaders: string[];
export declare const actionsForbiddenHeaders: string[];
export declare const filterReqHeaders: (headers: Record<string, undefined | string | number | string[]>, forbiddenHeaders: string[]) => Record<string, undefined | string | string[]>;
export declare const filterInternalHeaders: (headers: Record<string, undefined | string | string[]>) => void;


import type { ClientTraceDataEntry } from './tracer';
/**
 * Takes OpenTelemetry client trace data and the `clientTraceMetadata` option configured in the Next.js config (currently
 * experimental) and returns a filtered/allowed list of client trace data entries.
 */
export declare function getTracedMetadata(traceData: ClientTraceDataEntry[], clientTraceMetadata: string[] | undefined): ClientTraceDataEntry[] | undefined;


import type { IncomingMessage } from 'http';
import type { BaseNextRequest } from '../base-http';
import type { NextRequest } from '../web/exports';
export declare function getServerActionRequestMetadata(req: IncomingMessage | BaseNextRequest | NextRequest): {
    actionId: string | null;
    isURLEncodedAction: boolean;
    isMultipartAction: boolean;
    isFetchAction: boolean;
    isPossibleServerAction: boolean;
};
export declare function getIsPossibleServerAction(req: IncomingMessage | BaseNextRequest | NextRequest): boolean;


import type { CacheHandlerValue } from '.';
import { LRUCache } from '../lru-cache';
export declare function getMemoryCache(maxMemoryCacheSize: number): LRUCache<CacheHandlerValue>;


import type { NextServer, RequestHandler, UpgradeHandler } from '../next';
import type { DevBundlerService } from './dev-bundler-service';
import type { PropagateToWorkersField } from './router-utils/types';
import type { Span } from '../../trace';
export type ServerInitResult = {
    requestHandler: RequestHandler;
    upgradeHandler: UpgradeHandler;
    server: NextServer;
    closeUpgraded: () => void;
};
export declare function clearAllModuleContexts(): Promise<void> | undefined;
export declare function clearModuleContext(target: string): Promise<void> | undefined;
export declare function getServerField(dir: string, field: PropagateToWorkersField): Promise<string | number | import("../route-matcher-managers/route-matcher-manager").RouteMatcherManager | ((err: Error) => void) | (() => import("../next-server").NodeRequestHandler) | (() => Promise<void>) | ((req: import("../base-http/node").NodeNextRequest | import("http").IncomingMessage, res: import("../base-http/node").NodeNextResponse | import("http").ServerResponse, pathname: string, query?: import("../request-meta").NextParsedUrlQuery, parsedUrl?: import("../request-meta").NextUrlWithParsedQuery, internal?: boolean) => Promise<void>) | ((req: import("../base-http/node").NodeNextRequest | import("http").IncomingMessage, res: import("../base-http/node").NodeNextResponse | import("http").ServerResponse, pathname: string, query?: import("querystring").ParsedUrlQuery) => Promise<string | null>) | ((err: Error | null, req: import("../base-http/node").NodeNextRequest | import("http").IncomingMessage, res: import("../base-http/node").NodeNextResponse | import("http").ServerResponse, pathname: string, query?: import("../request-meta").NextParsedUrlQuery, setHeaders?: boolean) => Promise<void>) | ((err: Error | null, req: import("../base-http/node").NodeNextRequest | import("http").IncomingMessage, res: import("../base-http/node").NodeNextResponse | import("http").ServerResponse, pathname: string, query?: import("querystring").ParsedUrlQuery) => Promise<string | null>) | ((req: import("../base-http/node").NodeNextRequest | import("http").IncomingMessage, res: import("../base-http/node").NodeNextResponse | import("http").ServerResponse, parsedUrl?: import("../request-meta").NextUrlWithParsedQuery, setHeaders?: boolean) => Promise<void>) | (() => Promise<void>) | (() => Promise<void>) | ((req: import("../base-http/node").NodeNextRequest, res: import("../base-http/node").NodeNextResponse, parsedUrl?: import("../request-meta").NextUrlWithParsedQuery) => Promise<void>) | (({ urlPath, revalidateHeaders, opts, }: {
    urlPath: string;
    revalidateHeaders: {
        [key: string]: string | string[];
    };
    opts: {
        unstable_onlyGenerated?: boolean;
    };
}) => Promise<void>) | ((prefix?: string) => void) | ((meta: import("../request-meta").RequestMeta) => import("../base-server").BaseRequestHandler<import("../base-http/node").NodeNextRequest, import("../base-http/node").NodeNextResponse>) | undefined>;
export declare function propagateServerField(dir: string, field: PropagateToWorkersField, value: any): Promise<void>;
declare function initializeImpl(opts: {
    dir: string;
    port: number;
    dev: boolean;
    minimalMode?: boolean;
    hostname?: string;
    keepAliveTimeout?: number;
    serverFields?: any;
    server?: any;
    experimentalTestProxy: boolean;
    experimentalHttpsServer: boolean;
    _ipcPort?: string;
    _ipcKey?: string;
    bundlerService: DevBundlerService | undefined;
    startServerSpan: Span | undefined;
    quiet?: boolean;
    onDevServerCleanup: ((listener: () => Promise<void>) => void) | undefined;
}): Promise<ServerInitResult>;
export declare function initialize(opts: Parameters<typeof initializeImpl>[0]): Promise<ServerInitResult>;
export {};


import '../node-environment';
import '../require-hook';
import { type Span } from '../../trace';
import type { ServerInitResult } from './render-server';
export type RenderServer = Pick<typeof import('./render-server'), 'initialize' | 'clearModuleContext' | 'propagateServerField' | 'getServerField'>;
export interface LazyRenderServerInstance {
    instance?: RenderServer;
}
export declare function initialize(opts: {
    dir: string;
    port: number;
    dev: boolean;
    onDevServerCleanup: ((listener: () => Promise<void>) => void) | undefined;
    server?: import('http').Server;
    minimalMode?: boolean;
    hostname?: string;
    keepAliveTimeout?: number;
    customServer?: boolean;
    experimentalHttpsServer?: boolean;
    startServerSpan?: Span;
    quiet?: boolean;
}): Promise<ServerInitResult>;

/// <reference types="node" preserve="true" />
/// <reference types="react" preserve="true" />
/// <reference types="react/experimental" preserve="true" />
/// <reference types="react-dom" preserve="true" />
/// <reference types="react-dom/experimental" preserve="true" />
import type { Agent as HttpAgent } from 'http';
import type { Agent as HttpsAgent } from 'https';
import type React from 'react';
import type { ParsedUrlQuery } from 'querystring';
import type { IncomingMessage, ServerResponse } from 'http';
import type { NextPageContext, NextComponentType, NextApiResponse, NextApiRequest, NextApiHandler } from './shared/lib/utils';
import type { GetStaticPathsFallback } from './lib/fallback';
import type { NextApiRequestCookies } from './server/api-utils';
import next from './server/next';
export type ServerRuntime = 'nodejs' | 'experimental-edge' | 'edge' | undefined;
export { NextConfig } from './server/config';
export type { Metadata, MetadataRoute, ResolvedMetadata, ResolvingMetadata, Viewport, ResolvingViewport, ResolvedViewport, } from './lib/metadata/types/metadata-interface';
export type { Instrumentation } from './server/instrumentation/types';
/**
 * Stub route type for typedRoutes before `next dev` or `next build` is run
 * @link https://nextjs.org/docs/app/api-reference/config/typescript#statically-typed-links
 * @example
 * ```ts
 * import type { Route } from 'next'
 * // ...
 * router.push(returnToPath as Route)
 * ```
 */
export type Route<RouteInferType = any> = string & {};
declare module 'react' {
    interface HtmlHTMLAttributes<T> extends React.HTMLAttributes<T> {
        amp?: string;
    }
    interface ImgHTMLAttributes<T> {
        fetchPriority?: 'high' | 'low' | 'auto' | undefined;
    }
}
export type Redirect = {
    statusCode: 301 | 302 | 303 | 307 | 308;
    destination: string;
    basePath?: false;
} | {
    permanent: boolean;
    destination: string;
    basePath?: false;
};
/**
 * `NextPage` type, use it as a guide to create `pages`.
 */
export type NextPage<Props = {}, InitialProps = Props> = NextComponentType<NextPageContext, InitialProps, Props>;
export type FileSizeSuffix = `${'k' | 'K' | 'm' | 'M' | 'g' | 'G' | 't' | 'T' | 'p' | 'P'}${'b' | 'B'}`;
export type SizeLimit = number | `${number}${FileSizeSuffix}`;
export type ResponseLimit = SizeLimit | boolean;
/**
 * `Config` type, use it for export const config
 */
export type PageConfig = {
    amp?: boolean | 'hybrid';
    api?: {
        /**
         * Configures or disables body size limit warning. Can take a number or
         * any string format supported by `bytes`, for example `1000`, `'500kb'` or
         * `'3mb'`.
         */
        responseLimit?: ResponseLimit;
        /**
         * The byte limit of the body. This is the number of bytes or any string
         * format supported by `bytes`, for example `1000`, `'500kb'` or `'3mb'`.
         */
        bodyParser?: {
            sizeLimit?: SizeLimit;
        } | false;
        /**
         * Flag to disable warning "API page resolved
         * without sending a response", due to explicitly
         * using an external API resolver, like express
         */
        externalResolver?: true;
    };
    env?: Array<string>;
    /**
     * Configures the longest time in seconds a serverless function can process an HTTP
     * request before responding.
     */
    maxDuration?: number;
    runtime?: ServerRuntime;
    unstable_runtimeJS?: false;
    unstable_JsPreload?: false;
};
export type { NextPageContext, NextComponentType, NextApiResponse, NextApiRequest, NextApiHandler, };
export type PreviewData = string | false | object | undefined;
/**
 * Context object passed into `getStaticProps`.
 * @link https://nextjs.org/docs/api-reference/data-fetching/get-static-props#context-parameter
 */
export type GetStaticPropsContext<Params extends ParsedUrlQuery = ParsedUrlQuery, Preview extends PreviewData = PreviewData> = {
    params?: Params;
    preview?: boolean;
    previewData?: Preview;
    draftMode?: boolean;
    locale?: string;
    locales?: string[];
    defaultLocale?: string;
    revalidateReason?: 'on-demand' | 'build' | 'stale';
};
/**
 * The return type of `getStaticProps`.
 * @link https://nextjs.org/docs/api-reference/data-fetching/get-static-props#getstaticprops-return-values
 */
export type GetStaticPropsResult<Props> = {
    props: Props;
    revalidate?: number | boolean;
} | {
    redirect: Redirect;
    revalidate?: number | boolean;
} | {
    notFound: true;
    revalidate?: number | boolean;
};
/**
 * Static Site Generation feature for Next.js.
 * @link https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props
 * @link https://nextjs.org/docs/pages/api-reference/config/typescript#static-generation-and-server-side-rendering
 * @example
 * ```ts
 * export const getStaticProps: GetStaticProps = async (context) => {
 *   // ...
 * }
 * ```
 */
export type GetStaticProps<Props extends {
    [key: string]: any;
} = {
    [key: string]: any;
}, Params extends ParsedUrlQuery = ParsedUrlQuery, Preview extends PreviewData = PreviewData> = (context: GetStaticPropsContext<Params, Preview>) => Promise<GetStaticPropsResult<Props>> | GetStaticPropsResult<Props>;
export type InferGetStaticPropsType<T extends (args: any) => any> = Extract<Awaited<ReturnType<T>>, {
    props: any;
}>['props'];
export type GetStaticPathsContext = {
    locales?: string[];
    defaultLocale?: string;
};
/**
 * The return type of `getStaticPaths`.
 * @link https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#getstaticpaths-return-values
 */
export type GetStaticPathsResult<Params extends ParsedUrlQuery = ParsedUrlQuery> = {
    paths: Array<string | {
        params: Params;
        locale?: string;
    }>;
    fallback: GetStaticPathsFallback;
};
/**
 * Define a list of paths to be statically generated if dynamic routes exist.
 * @link https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths
 * @link https://nextjs.org/docs/pages/api-reference/config/typescript#static-generation-and-server-side-rendering
 * @example
 * ```ts
 * export const getStaticPaths: GetStaticPaths = async () => {
 *  // ...
 * }
 * ```
 */
export type GetStaticPaths<Params extends ParsedUrlQuery = ParsedUrlQuery> = (context: GetStaticPathsContext) => Promise<GetStaticPathsResult<Params>> | GetStaticPathsResult<Params>;
/**
 * Context object passed into `getServerSideProps`.
 * @link https://nextjs.org/docs/pages/api-reference/functions/get-server-side-props#context-parameter
 */
export type GetServerSidePropsContext<Params extends ParsedUrlQuery = ParsedUrlQuery, Preview extends PreviewData = PreviewData> = {
    req: IncomingMessage & {
        cookies: NextApiRequestCookies;
    };
    res: ServerResponse;
    params?: Params;
    query: ParsedUrlQuery;
    preview?: boolean;
    previewData?: Preview;
    draftMode?: boolean;
    resolvedUrl: string;
    locale?: string;
    locales?: string[];
    defaultLocale?: string;
};
/**
 * The return type of `getServerSideProps`.
 * @link https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#getserversideprops-return-values
 */
export type GetServerSidePropsResult<Props> = {
    props: Props | Promise<Props>;
} | {
    redirect: Redirect;
} | {
    notFound: true;
};
/**
In the App Router, we can colocate our data fetching inside our React components using Server Components. This allows us to send less JavaScript to the client, while maintaining the rendered HTML from the server.

By setting the cache option to no-store, we can indicate that the fetched data should never be cached. This is similar to getServerSideProps in the pages directory.

app/dashboard/page.tsx
TypeScript

TypeScript

// `app` directory
 
// This function can be named anything
async function getProjects() {
  const res = await fetch(`https://...`, { cache: 'no-store' })
  const projects = await res.json()
 
  return projects
}
 
export default async function Dashboard() {
  const projects = await getProjects()
 
  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  )
}
Accessing Request Object
In the pages directory, you can retrieve request-based data based on the Node.js HTTP API.

For example, you can retrieve the req object from getServerSideProps and use it to retrieve the request's cookies and headers.
 * Server-side Rendering feature for Next.js.
 * @link https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props
 * @link https://nextjs.org/docs/pages/api-reference/config/typescript#static-generation-and-server-side-rendering
 * @example
 * ```ts
 * export const getServerSideProps: GetServerSideProps = async (context) => {
 *  // ...
 * }
 */
export type GetServerSideProps<Props extends {
    [key: string]: any;
} = {
    [key: string]: any;
}, Params extends ParsedUrlQuery = ParsedUrlQuery, Preview extends PreviewData = PreviewData> = (context: GetServerSidePropsContext<Params, Preview>) => Promise<GetServerSidePropsResult<Props>>;
export type InferGetServerSidePropsType<T extends (args: any) => any> = Awaited<Extract<Awaited<ReturnType<T>>, {
    props: any;
}>['props']>;
declare global {
    interface Crypto {
        readonly subtle: SubtleCrypto;
        getRandomValues<T extends Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView | null>(array: T): T;
        randomUUID(): string;
    }
    var __NEXT_HTTP_AGENT_OPTIONS: {
        keepAlive?: boolean;
    } | undefined;
    var __NEXT_UNDICI_AGENT_SET: boolean;
    var __NEXT_HTTP_AGENT: HttpAgent;
    var __NEXT_HTTPS_AGENT: HttpsAgent;
}
export default next;


export type NextApiRequestCookies = Partial<{
    [key: string]: string;
}>;
export type NextApiRequestQuery = Partial<{
    [key: string]: string | string[];
}>;
export type __ApiPreviewProps = {
    previewModeId: string;
    previewModeEncryptionKey: string;
    previewModeSigningKey: string;
};
export declare function wrapApiHandler<T extends (...args: any[]) => any>(page: string, handler: T): T;
/**
 *
 * @param res response object
 * @param statusCode `HTTP` status code of response
 */
export declare function sendStatusCode(res: NextApiResponse, statusCode: number): NextApiResponse<any>;
/**
 *
 * @param res response object
 * @param [statusOrUrl] `HTTP` status code of redirect
 * @param url URL of redirect
 */
export declare function redirect(res: NextApiResponse, statusOrUrl: string | number, url?: string): NextApiResponse<any>;
export declare function checkIsOnDemandRevalidate(req: Request | IncomingMessage | BaseNextRequest, previewProps: __ApiPreviewProps): {
    isOnDemandRevalidate: boolean;
    revalidateOnlyGenerated: boolean;
};
export declare const COOKIE_NAME_PRERENDER_BYPASS = "__prerender_bypass";
export declare const COOKIE_NAME_PRERENDER_DATA = "__next_preview_data";
export declare const RESPONSE_LIMIT_DEFAULT: number;
export declare const SYMBOL_PREVIEW_DATA: unique symbol;
export declare const SYMBOL_CLEARED_COOKIES: unique symbol;
export declare function clearPreviewData<T>(res: NextApiResponse<T>, options?: {
    path?: string;
}): NextApiResponse<T>;
/**
 * Custom error class
 */
export declare class ApiError extends Error {
    readonly statusCode: number;
    constructor(statusCode: number, message: string);
}


export {};
