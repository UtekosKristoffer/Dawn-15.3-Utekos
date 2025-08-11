import type { CodegenConfig } from "@graphql-codegen/cli";
const config: CodegenConfig = {
  schema: `https://erling-7921.myshopify.com/api/2025-07/graphql.json`,
  documents: "src/GraphQL/**/*.graphql",
  ignoreNoDocuments: true,
  generates: {
    "src/Lib/Server/Generated/hooks.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-query",
      ],

      config: {
        reactQueryVersion: 5,
        exposeQueryKeys: true,
        exposeMutationKeys: true,
        addInfiniteQuery: true,
        fetcher: {
          func: "@/Lib/Server/Fetches/Fetcher#Fetcher",
          isReactHook: false,
        },
      },
    },
  },

  hooks: {
    afterAllFileWrite: ["prettier --write"],
  },
};

export default config;
