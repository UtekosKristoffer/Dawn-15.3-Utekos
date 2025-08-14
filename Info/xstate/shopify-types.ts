import { ApiClient, CustomFetchApi, ApiClientLogger, ApiClientLogContentTypes, ApiClientConfig, ApiClientRequestStream } from '@shopify/graphql-client';
export type StorefrontApiClientLogContentTypes = ApiClientLogContentTypes;
export type StorefrontApiClientConfig = ApiClientConfig & {
    clientName?: string;
} & ({
    publicAccessToken?: never;
    privateAccessToken: string;
} | {
    publicAccessToken: string;
    privateAccessToken?: never;
});
export type StorefrontApiClientOptions = Omit<StorefrontApiClientConfig, 'headers' | 'apiUrl'> & {
    customFetchApi?: CustomFetchApi;
    logger?: ApiClientLogger<StorefrontApiClientLogContentTypes>;
};
export interface StorefrontQueries {
    [key: string]: {
        variables: any;
        return: any;
    };
    [key: number | symbol]: never;
}
export interface StorefrontMutations {
    [key: string]: {
        variables: any;
        return: any;
    };
    [key: number | symbol]: never;
}
export type StorefrontOperations = StorefrontQueries & StorefrontMutations;
export type StorefrontApiClient = ApiClient<StorefrontApiClientConfig, StorefrontOperations> & {
    requestStream: ApiClientRequestStream<StorefrontOperations>;
};
//# sourceMappingURL=types.d.ts.map


import { CustomFetchApi, ApiClientLogger, ApiClientLogContentTypes, ApiClientConfig } from '@shopify/graphql-client';
export type AdminApiClientLogContentTypes = ApiClientLogContentTypes;
export type AdminApiClientConfig = ApiClientConfig & {
    accessToken: string;
    userAgentPrefix?: string;
};
export type AdminApiClientOptions = Omit<AdminApiClientConfig, 'headers' | 'apiUrl'> & {
    customFetchApi?: CustomFetchApi;
    logger?: ApiClientLogger<AdminApiClientLogContentTypes>;
    isTesting?: boolean;
};
//# sourceMappingURL=types.d.ts.map

