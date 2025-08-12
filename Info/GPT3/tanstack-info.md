QueryClient
The QueryClient can be used to interact with a cache:

import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
})

await queryClient.prefetchQuery({ queryKey: ['posts'], queryFn: fetchPosts })

usePrefetchQuery(options)
Options

You can pass everything to usePrefetchQuery that you can pass to queryClient.prefetchQuery. Remember that some of them are required as below:

queryKey: QueryKey

Required
The query key to prefetch during render
queryFn: (context: QueryFunctionContext) => Promise<TData>

Required, but only if no default query function has been defined See Default Query Function for more information.
Returns

The usePrefetchQuery does not return anything, it should be used just to fire a prefetch during render, before a suspense boundary that wraps a component that uses useSuspenseQuery.


hydration
dehydrate
dehydrate creates a frozen representation of a cache that can later be hydrated with HydrationBoundary or hydrate. This is useful for passing prefetched queries from server to client or persisting queries to localStorage or other persistent locations. It only includes currently successful queries by default.

tsx

import { dehydrate } from '@tanstack/react-query'

const dehydratedState = dehydrate(queryClient, {
  shouldDehydrateQuery,
  shouldDehydrateMutation,
})
Options

client: QueryClient
Required
The queryClient that should be dehydrated
options: DehydrateOptions
Optional
shouldDehydrateMutation: (mutation: Mutation) => boolean
Optional
Whether to dehydrate mutations.
The function is called for each mutation in the cache
Return true to include this mutation in dehydration, or false otherwise
Defaults to only including paused mutations
If you would like to extend the function while retaining the default behavior, import and execute defaultShouldDehydrateMutation as part of the return statement
shouldDehydrateQuery: (query: Query) => boolean
Optional
Whether to dehydrate queries.
The function is called for each query in the cache
Return true to include this query in dehydration, or false otherwise
Defaults to only including successful queries
If you would like to extend the function while retaining the default behavior, import and execute defaultShouldDehydrateQuery as part of the return statement
serializeData?: (data: any) => any A function to transform (serialize) data during dehydration.
shouldRedactErrors?: (error: unknown) => boolean
Optional
Whether to redact errors from the server during dehydration.
The function is called for each error in the cache
Return true to redact this error, or false otherwise
Defaults to redacting all errors
Returns

dehydratedState: DehydratedState
This includes everything that is needed to hydrate the queryClient at a later point
You should not rely on the exact format of this response, it is not part of the public API and can change at any time
This result is not in serialized form, you need to do that yourself if desired
Limitations
Some storage systems (such as browser Web Storage API) require values to be JSON serializable. If you need to dehydrate values that are not automatically serializable to JSON (like Error or undefined), you have to serialize them for yourself. Since only successful queries are included per default, to also include Errors, you have to provide shouldDehydrateQuery, e.g.:

tsx

// server
const state = dehydrate(client, { shouldDehydrateQuery: () => true }) // to also include Errors
const serializedState = mySerialize(state) // transform Error instances to objects

// client
const state = myDeserialize(serializedState) // transform objects back to Error instances
hydrate(client, state)
hydrate
hydrate adds a previously dehydrated state into a cache.

tsx

import { hydrate } from '@tanstack/react-query'

hydrate(queryClient, dehydratedState, options)
Options

client: QueryClient
Required
The queryClient to hydrate the state into
dehydratedState: DehydratedState
Required
The state to hydrate into the client
options: HydrateOptions
Optional
defaultOptions: DefaultOptions
Optional
mutations: MutationOptions The default mutation options to use for the hydrated mutations.
queries: QueryOptions The default query options to use for the hydrated queries.
deserializeData?: (data: any) => any A function to transform (deserialize) data before it is put into the cache.
queryClient?: QueryClient,
Use this to use a custom QueryClient. Otherwise, the one from the nearest context will be used.
Limitations
If the queries you're trying to hydrate already exist in the queryCache, hydrate will only overwrite them if the data is newer than the data present in the cache. Otherwise, it will not get applied.

HydrationBoundary
HydrationBoundary adds a previously dehydrated state into the queryClient that would be returned by useQueryClient(). If the client already contains data, the new queries will be intelligently merged based on update timestamp.

tsx

import { HydrationBoundary } from '@tanstack/react-query'

function App() {
  return <HydrationBoundary state={dehydratedState}>...</HydrationBoundary>
}
Note: Only queries can be dehydrated with an HydrationBoundary.

Options

state: DehydratedState
The state to hydrate
options: HydrateOptions
Optional
defaultOptions: QueryOptions
The default query options to use for the hydrated queries.
queryClient?: QueryClient,
Use this to use a custom QueryClient. Otherwise, the one from the nearest context will be used.



MutationCache
The MutationCache is the storage for mutations.

Normally, you will not interact with the MutationCache directly and instead use the QueryClient.

tsx

import { MutationCache } from '@tanstack/react-query'

const mutationCache = new MutationCache({
  onError: (error) => {
    console.log(error)
  },
  onSuccess: (data) => {
    console.log(data)
  },
})
Its available methods are:

getAll
subscribe
clear
Options

onError?: (error: unknown, variables: unknown, context: unknown, mutation: Mutation) => Promise<unknown> | unknown
Optional
This function will be called if some mutation encounters an error.
If you return a Promise from it, it will be awaited
onSuccess?: (data: unknown, variables: unknown, context: unknown, mutation: Mutation) => Promise<unknown> | unknown
Optional
This function will be called if some mutation is successful.
If you return a Promise from it, it will be awaited
onSettled?: (data: unknown | undefined, error: unknown | null, variables: unknown, context: unknown, mutation: Mutation) => Promise<unknown> | unknown
Optional
This function will be called if some mutation is settled (either successful or errored).
If you return a Promise from it, it will be awaited
onMutate?: (variables: unknown, mutation: Mutation) => Promise<unknown> | unknown
Optional
This function will be called before some mutation executes.
If you return a Promise from it, it will be awaited
Global callbacks
The onError, onSuccess, onSettled and onMutate callbacks on the MutationCache can be used to handle these events on a global level. They are different to defaultOptions provided to the QueryClient because:

defaultOptions can be overridden by each Mutation - the global callbacks will always be called.
onMutate does not allow returning a context value.
mutationCache.getAll
getAll returns all mutations within the cache.

Note: This is not typically needed for most applications, but can come in handy when needing more information about a mutation in rare scenarios

tsx

const mutations = mutationCache.getAll()
Returns

Mutation[]
Mutation instances from the cache
mutationCache.subscribe
The subscribe method can be used to subscribe to the mutation cache as a whole and be informed of safe/known updates to the cache like mutation states changing or mutations being updated, added or removed.

tsx

const callback = (event) => {
  console.log(event.type, event.mutation)
}

const unsubscribe = mutationCache.subscribe(callback)
Options

callback: (mutation?: MutationCacheNotifyEvent) => void
This function will be called with the mutation cache any time it is updated.
Returns

unsubscribe: Function => void
This function will unsubscribe the callback from the mutation cache.
mutationCache.clear
The clear method can be used to clear the cache entirely and start fresh.

tsx

mutationCache.clear()


import React from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const getCharacters = async (): Promise<{
  results: Array<{ id: number; name: string }>
}> => {
  await new Promise((r) => setTimeout(r, 500))
  const response = await fetch('https://rickandmortyapi.com/api/character/')
  return await response.json()
}

const getCharacter = async (selectedChar: number) => {
  await new Promise((r) => setTimeout(r, 500))
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${selectedChar}`,
  )
  return await response.json()
}

export default function Example() {
  const queryClient = useQueryClient()
  const rerender = React.useState(0)[1]
  const [selectedChar, setSelectedChar] = React.useState(1)

  const charactersQuery = useQuery({
    queryKey: ['characters'],
    queryFn: getCharacters,
  })

  const characterQuery = useQuery({
    queryKey: ['character', selectedChar],
    queryFn: () => getCharacter(selectedChar),
  })

  return (
    <div className="App">
      <p>
        Hovering over a character will prefetch it, and when it's been
        prefetched it will turn <strong>bold</strong>. Clicking on a prefetched
        character will show their stats below immediately.
      </p>
      <h2>Characters</h2>
      {charactersQuery.isPending ? (
        'Loading...'
      ) : (
        <>
          <ul>
            {charactersQuery.data?.results.map((char) => (
              <li
                key={char.id}
                onClick={() => {
                  setSelectedChar(char.id)
                }}
                onMouseEnter={async () => {
                  await queryClient.prefetchQuery({
                    queryKey: ['character', char.id],
                    queryFn: () => getCharacter(char.id),
                    staleTime: 10 * 1000, // only prefetch if older than 10 seconds
                  })

                  setTimeout(() => {
                    rerender({})
                  }, 1)
                }}
              >
                <div
                  style={
                    queryClient.getQueryData(['character', char.id])
                      ? {
                          fontWeight: 'bold',
                        }
                      : {}
                  }
                >
                  {char.id} - {char.name}
                </div>
              </li>
            ))}
          </ul>

          <h3>Selected Character</h3>
          {characterQuery.isPending ? (
            'Loading...'
          ) : (
            <>
              <pre>{JSON.stringify(characterQuery.data, null, 2)}</pre>
            </>
          )}
          <ReactQueryDevtools initialIsOpen />
        </>
      )}
    </div>
  )
}
