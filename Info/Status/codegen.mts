// Fil: codegen.ts
import type { CodegenConfig } from "@graphql-codegen/cli";
import "dotenv/config"; // Importer for å laste .env-variabler

const config: CodegenConfig = {
  schema: {
    [`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/${process.env.SHOPIFY_STOREFRONT_API_VERSION}/graphql.json`]:
      {
        headers: {
          "X-Shopify-Storefront-Access-Token":
            process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
        },
      },
  },
  documents: "src/GraphQL/**/*.graphql",
  ignoreNoDocuments: true,
  generates: {
    "src/Types/types.ts": {
      plugins: ["typescript"],
    },
    "src/GraphQL/": {
      preset: "near-operation-file",
      presetConfig: {
        baseTypesPath: "~@/Types/types",
        extension: ".generated.ts",
      },
      plugins: ["typescript-operations", "typescript-react-query"],
      config: {
        fetcher: {
          func: "@/Lib/Clients/ShopifyRequestClient#ShopifyRequestClient",
          isReactHook: false,
        },
        reactQueryVersion: 5,
        exposeQueryKeys: true,
        exposeMutationKeys: true,
        addInfiniteQuery: true,
        legacyMode: false,
      },
    },
  },
  config: {
    useTypeImports: true,
  },
  hooks: {
    afterAllFileWrite: ["prettier --write"],
  },
};

export default config;
