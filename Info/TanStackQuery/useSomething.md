useQueryClient
The useQueryClient hook returns the current QueryClient instance.

tsx

import { useQueryClient } from '@tanstack/react-query'

const queryClient = useQueryClient(queryClient?: QueryClient)
Options

queryClient?: QueryClient,
Use this to use a custom QueryClient. Otherwise, the one from the nearest context will be used.

usePrefetchQuery
tsx

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

useIsFetching
useIsFetching is an optional hook that returns the number of the queries that your application is loading or fetching in the background (useful for app-wide loading indicators).

tsx

import { useIsFetching } from '@tanstack/react-query'
// How many queries are fetching?
const isFetching = useIsFetching()
// How many queries matching the posts prefix are fetching?
const isFetchingPosts = useIsFetching({ queryKey: ['posts'] })
Options

filters?: QueryFilters: Query Filters
queryClient?: QueryClient,
Use this to use a custom QueryClient. Otherwise, the one from the nearest context will be used.
Returns

isFetching: number
Will be the number of the queries that your application is currently loading or fetching in the background.
