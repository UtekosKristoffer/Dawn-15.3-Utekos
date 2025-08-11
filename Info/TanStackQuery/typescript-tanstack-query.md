TypeScript
React Query is now written in TypeScript to make sure the library and your projects are type-safe!

Things to keep in mind:

Types currently require using TypeScript v4.7 or greater
Changes to types in this repository are considered non-breaking and are usually released as patch semver changes (otherwise every type enhancement would be a major version!).
It is highly recommended that you lock your react-query package version to a specific patch release and upgrade with the expectation that types may be fixed or upgraded between any release
The non-type-related public API of React Query still follows semver very strictly.
Type Inference
Types in React Query generally flow through very well so that you don't have to provide type annotations for yourself

tsx

const { data } = useQuery({
  //    ^? const data: number | undefined
  queryKey: ['test'],
  queryFn: () => Promise.resolve(5),
})
typescript playground

tsx

const { data } = useQuery({
  //      ^? const data: string | undefined
  queryKey: ['test'],
  queryFn: () => Promise.resolve(5),
  select: (data) => data.toString(),
})
typescript playground

This works best if your queryFn has a well-defined returned type. Keep in mind that most data fetching libraries return any per default, so make sure to extract it to a properly typed function:

tsx

const fetchGroups = (): Promise<Group[]> =>
  axios.get('/groups').then((response) => response.data)

const { data } = useQuery({ queryKey: ['groups'], queryFn: fetchGroups })
//      ^? const data: Group[] | undefined
typescript playground

Type Narrowing
React Query uses a discriminated union type for the query result, discriminated by the status field and the derived status boolean flags. This will allow you to check for e.g. success status to make data defined:

tsx

const { data, isSuccess } = useQuery({
  queryKey: ['test'],
  queryFn: () => Promise.resolve(5),
})

if (isSuccess) {
  data
  //  ^? const data: number
}
typescript playground

Typing the error field
The type for error defaults to Error, because that is what most users expect.

tsx

const { error } = useQuery({ queryKey: ['groups'], queryFn: fetchGroups })
//      ^? const error: Error
typescript playground

If you want to throw a custom error, or something that isn't an Error at all, you can specify the type of the error field:

tsx

const { error } = useQuery<Group[], string>(['groups'], fetchGroups)
//      ^? const error: string | null
However, this has the drawback that type inference for all other generics of useQuery will not work anymore. It is generally not considered a good practice to throw something that isn't an Error, so if you have a subclass like AxiosError you can use type narrowing to make the error field more specific:

tsx

import axios from 'axios'

const { error } = useQuery({ queryKey: ['groups'], queryFn: fetchGroups })
//      ^? const error: Error | null

if (axios.isAxiosError(error)) {
  error
  // ^? const error: AxiosError
}
typescript playground

Registering a global Error
TanStack Query v5 allows for a way to set a global Error type for everything, without having to specify generics on call-sides, by amending the Register interface. This will make sure inference still works, but the error field will be of the specified type:

tsx

import '@tanstack/react-query'

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError
  }
}

const { error } = useQuery({ queryKey: ['groups'], queryFn: fetchGroups })
//      ^? const error: AxiosError | null
Typing meta
Registering global Meta
Similarly to registering a global error type you can also register a global Meta type. This ensures the optional meta field on queries and mutations stays consistent and is type-safe. Note that the registered type must extend Record<string, unknown> so that meta remains an object.

ts

import '@tanstack/react-query'

interface MyMeta extends Record<string, unknown> {
  // Your meta type definition.
}

declare module '@tanstack/react-query' {
  interface Register {
    queryMeta: MyMeta
    mutationMeta: MyMeta
  }
}
Typing query and mutation keys
Registering the query and mutation key types
Also similarly to registering a global error type, you can also register a global QueryKey and MutationKey type. This allows you to provide more structure to your keys, that matches your application's hierarchy, and have them be typed across all of the library's surface area. Note that the registered type must extend the Array type, so that your keys remain an array.

ts

import '@tanstack/react-query'

type QueryKey = ['dashboard' | 'marketing', ...ReadonlyArray<unknown>]

declare module '@tanstack/react-query' {
  interface Register {
    queryKey: QueryKey
    mutationKey: QueryKey
  }
}
Typing Query Options
If you inline query options into useQuery, you'll get automatic type inference. However, you might want to extract the query options into a separate function to share them between useQuery and e.g. prefetchQuery. In that case, you'd lose type inference. To get it back, you can use the queryOptions helper:

ts

import { queryOptions } from '@tanstack/react-query'

function groupOptions() {
  return queryOptions({
    queryKey: ['groups'],
    queryFn: fetchGroups,
    staleTime: 5 * 1000,
  })
}

useQuery(groupOptions())
queryClient.prefetchQuery(groupOptions())
Further, the queryKey returned from queryOptions knows about the queryFn associated with it, and we can leverage that type information to make functions like queryClient.getQueryData aware of those types as well:

ts

function groupOptions() {
  return queryOptions({
    queryKey: ['groups'],
    queryFn: fetchGroups,
    staleTime: 5 * 1000,
  })
}

const data = queryClient.getQueryData(groupOptions().queryKey)
//     ^? const data: Group[] | undefined
Without queryOptions, the type of data would be unknown, unless we'd pass a generic to it:

ts

const data = queryClient.getQueryData<Group[]>(['groups'])
Typing Mutation Options
Similarly to queryOptions, you can use mutationOptions to extract mutation options into a separate function:

ts

function groupMutationOptions() {
  return mutationOptions({
    mutationKey: ['addGroup'],
    mutationFn: addGroup,
  })
}

useMutation({
  ...groupMutationOptions()
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['groups'] })
})
useIsMutating(groupMutationOptions())
queryClient.isMutating(groupMutationOptions())
Further Reading
For tips and tricks around type inference, have a look at React Query and TypeScript from the Community Resources. To find out how to get the best possible type-safety, you can read Type-safe React Query.

Typesafe disabling of queries using skipToken
If you are using TypeScript, you can use the skipToken to disable a query. This is useful when you want to disable a query based on a condition, but you still want to keep the query to be type safe. Read more about it in the Disabling Queries guide.
