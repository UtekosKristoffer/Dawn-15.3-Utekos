Guide: React and Vue
GraphQL Code Generator provides a unified way to get TypeScript types from GraphQL operations for most modern GraphQL clients and frameworks.

This guide is built using the Star wars films demo API.

We will build a simple GraphQL front-end app using the following Query to fetch the list of Star Wars films:

query allFilmsWithVariablesQuery($first: Int!) {
  allFilms(first: $first) {
    edges {
      node {
        ...FilmItem
      }
    }
  }
}

and its FilmItem Fragment definition:

fragment FilmItem on Film {
  id
  title
  releaseDate
  producers
}

All the below code examples are available in our repository examples folder.

Installation
For most GraphQL clients and frameworks (React, Vue), install the following packages:

npm install graphql
npm install --dev typescript @graphql-codegen/cli @parcel/watcher


Then provide the corresponding framework-specific configuration:

codegen.ts

import type { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  schema: 'https://graphql.org/graphql/',
  documents: ['src/**/*.tsx'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './src/gql/': {
      preset: 'client'
    }
  }
}
 
export default config
Note: For React Query, please refer to our dedicated guide.


Writing GraphQL Queries
First, start GraphQL Code Generator in watch mode:

npm run graphql-codegen --watch

Using GraphQL Code Generator will type your GraphQL Query and Mutations as you write them ⚡️

Now, we can start implementing our first query with the graphql() function, generated in src/gql/:

src/App.tsx

import React from 'react'
import { useQuery } from '@apollo/client'
 
import './App.css'
import Film from './Film'
import { graphql } from '../src/gql'
 
const allFilmsWithVariablesQueryDocument = graphql(/* GraphQL */ `
  query allFilmsWithVariablesQuery($first: Int!) {
    allFilms(first: $first) {
      edges {
        node {
          ...FilmItem
        }
      }
    }
  }
`)
 
function App() {
  // `data` is typed!
  const { data } = useQuery(allFilmsWithVariablesQueryDocument, { variables: { first: 10 } })
  return (
    <div className="App">
      {data && <ul>{data.allFilms?.edges?.map((e, i) => e?.node && <Film film={e?.node} key={`film-${i}`} />)}</ul>}
    </div>
  )
}
 
export default App
Be cautious, anonymous Queries and Mutations will be ignored.

Simply use the provided graphql() function (from ../src/gql/) to define your GraphQL Query or Mutation, then, get instantly typed-variables and result just by passing your GraphQL document to your favorite client ✨

Let’s now take a look at how to define our <Film> component using the FilmItem fragment and its corresponding TypeScript type.

Writing GraphQL Fragments
As showcased in one of our recent blog posts, GraphQL Fragments help build better isolated and reusable UI components.

Let’s look at the implementation of our Film UI component in React or Vue:

src/Film.tsx

import { FragmentType, useFragment } from './gql/fragment-masking'
import { graphql } from '../src/gql'
 
export const FilmFragment = graphql(/* GraphQL */ `
  fragment FilmItem on Film {
    id
    title
    releaseDate
    producers
  }
`)
 
const Film = (props: {
  /* `film` property has the correct type 🎉 */
  film: FragmentType<typeof FilmFragment>
}) => {
  const film = useFragment(FilmFragment, props.film)
  return (
    <div>
      <h3>{film.title}</h3>
      <p>{film.releaseDate}</p>
    </div>
  )
}
 
export default Film
Examples for SWR (React), graphql-request and Villus (Vue) are available in our repository examples folder.

You will notice that our <FilmItem> component leverages 2 imports from our generated code (from ../src/gql): the FragmentType<T> type helper and the useFragment() function.

we use FragmentType<typeof FilmFragment> to get the corresponding Fragment TypeScript type
later on, we use useFragment() to retrieve the film property
Leveraging FragmentType<typeof FilmFragment> and useFragment() helps keep your UI component isolated and avoids inheriting the parent GraphQL Query’s typings.


By using GraphQL Fragments, you are explicitly declaring your UI component’s data dependencies and safely accessing only the data it needs.


Finally, unlike most GraphQL Client setups, you don’t need to append the Fragment definition document to the related Query. You simply need to reference it in your GraphQL Query, as shown below:

const allFilmsWithVariablesQueryDocument = graphql(/* GraphQL */ `
  query allFilmsWithVariablesQuery($first: Int!) {
    allFilms(first: $first) {
      edges {
        node {
          ...FilmItem
        }
      }
    }
  }
`)


Congratulations, you now have the best GraphQL front-end experience with fully-typed Queries and Mutations!

From simple Queries to more advanced Fragments-based ones, GraphQL Code Generator has you covered with a simple TypeScript configuration file, and without impact on your application bundle size! 🚀

What’s next?

To get the best GraphQL development experience, we recommend installing the GraphQLSP package to get:

syntax highlighting
autocomplete suggestions
validation against schema
quick-info on hover
GraphQLSP

GraphQLSPs a TypeScript LSP plugin for GraphQL, to get it working, we need to add the following to your tsconfig.json after installing the package (npm i -D @0no-co/graphqlsp):

tsconfig.json

{
  "compilerOptions": {
    "plugins": [
      {
        "name": "@0no-co/graphqlsp",
        "schema": "./schema.graphql"
      }
    ]
  }
}
Last but not least you need to ensure that when you’re using VSCode that the workspace version of TS is used, the following config will make a prompt appear to switch it when visiting a TS file

.vscode/settings.json

{
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
Also, make sure to follow GraphQL best practices by using graphql-eslint and the ESLint VSCode extension to visualize errors and warnings inlined in your code correctly.

Feel free to continue playing with this demo project, available in all flavors, in our repository examples folder.



Config API
The client preset allows the following config options:

scalars: Extends or overrides the built-in scalars and custom GraphQL scalars to a custom type.
defaultScalarType: Allows you to override the type that unknown scalars will have. Defaults to any.
strictScalars: If scalars are found in the schema that are not defined in scalars an error will be thrown during codegen.
namingConvention: Available case functions in change-case-all are camelCase, capitalCase, constantCase, dotCase, headerCase, noCase, paramCase, pascalCase, pathCase, sentenceCase, snakeCase, lowerCase, localeLowerCase, lowerCaseFirst, spongeCase, titleCase, upperCase, localeUpperCase and upperCaseFirst.
useTypeImports: Will use import type {} rather than import {} when importing only types. This gives compatibility with TypeScript’s "importsNotUsedAsValues": "error" option.
skipTypename: Does not add __typename to the generated types, unless it was specified in the selection set.
arrayInputCoercion: The GraphQL spec allows arrays and a single primitive value for list input. This allows to deactivate that behavior to only accept arrays instead of single values.
enumsAsTypes: Generates enum as TypeScript string union type instead of an enum. Useful if you wish to generate .d.ts declaration file instead of .ts, or if you want to avoid using TypeScript enums due to bundle size concerns.
enumsAsConst: Generates enum as TypeScript const assertions instead of enum. This can even be used to enable enum-like patterns in plain JavaScript code if you choose not to use TypeScript’s enum construct.
enumValues: Overrides the default value of enum values declared in your GraphQL schema. You can also map the entire enum to an external type by providing a string that of module#type.
dedupeFragments: Removes fragment duplicates for reducing data transfer. It is done by removing sub-fragments imports from fragment definition.
nonOptionalTypename: Automatically adds __typename field to the generated types, even when they are not specified in the selection set, and makes it non-optional.
avoidOptionals: This will cause the generator to avoid using TypeScript optionals (?) on types.

