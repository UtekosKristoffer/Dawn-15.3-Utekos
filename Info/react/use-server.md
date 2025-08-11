NEXT.JS 15 (Latest vs.) DOCUMENTATION:
# use server

The `use server` directive designates a function or file to be executed on the **server side**. It can be used at the top of a file to indicate that all functions in the file are server-side, or inline at the top of a function to mark the function as a [Server Function](https://19.react.dev/reference/rsc/server-functions). This is a React feature.

## Using `use server` at the top of a file

The following example shows a file with a `use server` directive at the top. All functions in the file are executed on the server.

```tsx filename="app/actions.ts" highlight={1} switcher
'use server'
import { db } from '@/lib/db' // Your database client

export async function createUser(data: { name: string; email: string }) {
  const user = await db.user.create({ data })
  return user
}
```

```jsx filename="app/actions.js" highlight={1} switcher
'use server'
import { db } from '@/lib/db' // Your database client

export async function createUser(data) {
  const user = await db.user.create({ data })
  return user
}
```

### Using Server Functions in a Client Component

To use Server Functions in Client Components you need to create your Server Functions in a dedicated file using the `use server` directive at the top of the file. These Server Functions can then be imported into Client and Server Components and executed.

Assuming you have a `fetchUsers` Server Function in `actions.ts`:

```tsx filename="app/actions.ts" highlight={1} switcher
'use server'
import { db } from '@/lib/db' // Your database client

export async function fetchUsers() {
  const users = await db.user.findMany()
  return users
}
```

```jsx filename="app/actions.js" highlight={1} switcher
'use server'
import { db } from '@/lib/db' // Your database client

export async function fetchUsers() {
  const users = await db.user.findMany()
  return users
}
```

Then you can import the `fetchUsers` Server Function into a Client Component and execute it on the client-side.

```tsx filename="app/components/my-button.tsx" highlight={1,2,8} switcher
'use client'
import { fetchUsers } from '../actions'

export default function MyButton() {
  return <button onClick={() => fetchUsers()}>Fetch Users</button>
}
```

```jsx filename="app/components/my-button.js" highlight={1,2,8} switcher
'use client'
import { fetchUsers } from '../actions'

export default function MyButton() {
  return <button onClick={() => fetchUsers()}>Fetch Users</button>
}
```

## Using `use server` inline

In the following example, `use server` is used inline at the top of a function to mark it as a [Server Function](https://19.react.dev/reference/rsc/server-functions):

```tsx filename="app/posts/[id]/page.tsx" switcher highlight={8}
import { EditPost } from './edit-post'
import { revalidatePath } from 'next/cache'

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id)

  async function updatePost(formData: FormData) {
    'use server'
    await savePost(params.id, formData)
    revalidatePath(`/posts/${params.id}`)
  }

  return <EditPost updatePostAction={updatePost} post={post} />
}
```

```jsx filename="app/posts/[id]/page.js" switcher highlight={8}
import { EditPost } from './edit-post'
import { revalidatePath } from 'next/cache'

export default async function PostPage({ params }) {
  const post = await getPost(params.id)

  async function updatePost(formData) {
    'use server'
    await savePost(params.id, formData)
    revalidatePath(`/posts/${params.id}`)
  }

  return <EditPost updatePostAction={updatePost} post={post} />
}
```

## Security considerations

When using the `use server` directive, it's important to ensure that all server-side logic is secure and that sensitive data remains protected.

### Authentication and authorization

Always authenticate and authorize users before performing sensitive server-side operations.

```tsx filename="app/actions.ts" highlight={1,7,8,9,10} switcher
'use server'

import { db } from '@/lib/db' // Your database client
import { authenticate } from '@/lib/auth' // Your authentication library

export async function createUser(
  data: { name: string; email: string },
  token: string
) {
  const user = authenticate(token)
  if (!user) {
    throw new Error('Unauthorized')
  }
  const newUser = await db.user.create({ data })
  return newUser
}
```

```jsx filename="app/actions.js" highlight={1,7,8,9,10} switcher
'use server'

import { db } from '@/lib/db' // Your database client
import { authenticate } from '@/lib/auth' // Your authentication library

export async function createUser(data, token) {
  const user = authenticate(token)
  if (!user) {
    throw new Error('Unauthorized')
  }
  const newUser = await db.user.create({ data })
  return newUser
}
```

## Reference

See the [React documentation](https://react.dev/reference/rsc/use-server) for more information on `use server`.





REACT DOCUMENTATION:

'use server'
React Server Components
'use server' is for use with using React Server Components.

'use server' marks server-side functions that can be called from client-side code.

Reference
'use server'
Security considerations
Serializable arguments and return values
Usage
Server Functions in forms
Calling a Server Function outside of <form>
Reference 
'use server' 
Add 'use server' at the top of an async function body to mark the function as callable by the client. We call these functions Server Functions.

async function addToCart(data) {
  'use server';
  // ...
}
When calling a Server Function on the client, it will make a network request to the server that includes a serialized copy of any arguments passed. If the Server Function returns a value, that value will be serialized and returned to the client.

Instead of individually marking functions with 'use server', you can add the directive to the top of a file to mark all exports within that file as Server Functions that can be used anywhere, including imported in client code.

Caveats 
'use server' must be at the very beginning of their function or module; above any other code including imports (comments above directives are OK). They must be written with single or double quotes, not backticks.
'use server' can only be used in server-side files. The resulting Server Functions can be passed to Client Components through props. See supported types for serialization.
To import a Server Functions from client code, the directive must be used on a module level.
Because the underlying network calls are always asynchronous, 'use server' can only be used on async functions.
Always treat arguments to Server Functions as untrusted input and authorize any mutations. See security considerations.
Server Functions should be called in a Transition. Server Functions passed to <form action> or formAction will automatically be called in a transition.
Server Functions are designed for mutations that update server-side state; they are not recommended for data fetching. Accordingly, frameworks implementing Server Functions typically process one action at a time and do not have a way to cache the return value.
Security considerations 
Arguments to Server Functions are fully client-controlled. For security, always treat them as untrusted input, and make sure to validate and escape arguments as appropriate.

In any Server Function, make sure to validate that the logged-in user is allowed to perform that action.

Under Construction
To prevent sending sensitive data from a Server Function, there are experimental taint APIs to prevent unique values and objects from being passed to client code.

See experimental_taintUniqueValue and experimental_taintObjectReference.

Serializable arguments and return values 
Since client code calls the Server Function over the network, any arguments passed will need to be serializable.

Here are supported types for Server Function arguments:

Primitives
string
number
bigint
boolean
undefined
null
symbol, only symbols registered in the global Symbol registry via Symbol.for
Iterables containing serializable values
String
Array
Map
Set
TypedArray and ArrayBuffer
Date
FormData instances
Plain objects: those created with object initializers, with serializable properties
Functions that are Server Functions
Promises
Notably, these are not supported:

React elements, or JSX
Functions, including component functions or any other function that is not a Server Function
Classes
Objects that are instances of any class (other than the built-ins mentioned) or objects with a null prototype
Symbols not registered globally, ex. Symbol('my new symbol')
Events from event handlers
Supported serializable return values are the same as serializable props for a boundary Client Component.

Usage 
Server Functions in forms 
The most common use case of Server Functions will be calling functions that mutate data. On the browser, the HTML form element is the traditional approach for a user to submit a mutation. With React Server Components, React introduces first-class support for Server Functions as Actions in forms.

Here is a form that allows a user to request a username.

// App.js

async function requestUsername(formData) {
  'use server';
  const username = formData.get('username');
  // ...
}

export default function App() {
  return (
    <form action={requestUsername}>
      <input type="text" name="username" />
      <button type="submit">Request</button>
    </form>
  );
}
In this example requestUsername is a Server Function passed to a <form>. When a user submits this form, there is a network request to the server function requestUsername. When calling a Server Function in a form, React will supply the form’s FormData as the first argument to the Server Function.

By passing a Server Function to the form action, React can progressively enhance the form. This means that forms can be submitted before the JavaScript bundle is loaded.

Handling return values in forms 
In the username request form, there might be the chance that a username is not available. requestUsername should tell us if it fails or not.

To update the UI based on the result of a Server Function while supporting progressive enhancement, use useActionState.

// requestUsername.js
'use server';

export default async function requestUsername(formData) {
  const username = formData.get('username');
  if (canRequest(username)) {
    // ...
    return 'successful';
  }
  return 'failed';
}
// UsernameForm.js
'use client';

import { useActionState } from 'react';
import requestUsername from './requestUsername';

function UsernameForm() {
  const [state, action] = useActionState(requestUsername, null, 'n/a');

  return (
    <>
      <form action={action}>
        <input type="text" name="username" />
        <button type="submit">Request</button>
      </form>
      <p>Last submission request returned: {state}</p>
    </>
  );
}
Note that like most Hooks, useActionState can only be called in client code.

Calling a Server Function outside of <form> 
Server Functions are exposed server endpoints and can be called anywhere in client code.

When using a Server Function outside a form, call the Server Function in a Transition, which allows you to display a loading indicator, show optimistic state updates, and handle unexpected errors. Forms will automatically wrap Server Functions in transitions.

import incrementLike from './actions';
import { useState, useTransition } from 'react';

function LikeButton() {
  const [isPending, startTransition] = useTransition();
  const [likeCount, setLikeCount] = useState(0);

  const onClick = () => {
    startTransition(async () => {
      const currentCount = await incrementLike();
      setLikeCount(currentCount);
    });
  };

  return (
    <>
      <p>Total Likes: {likeCount}</p>
      <button onClick={onClick} disabled={isPending}>Like</button>;
    </>
  );
}
// actions.js
'use server';

let likeCount = 0;
export default async function incrementLike() {
  likeCount++;
  return likeCount;
}
To read a Server Function return value, you’ll need to await the promise returned.

