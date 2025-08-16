// const value = use(resource);
// Call use in your component to read the value of a resource like a Promise or context.


import { use } from 'react';

function MessageComponent({ messagePromise }) {
  const message = use(messagePromise);
  const theme = use(ThemeContext);
  // ...

//use returns the context value for the context you passed.
// use can be called inside conditionals like if and loops like for. 
  // use is preferred over useContext because it is more flexible.

import { use } from 'react';

function Button() {
  const theme = use(ThemeContext);
  // ..

  function MyPage() {
  return (
    <ThemeContext value="dark">
      <Form />
    </ThemeContext>
  );
}

function Form() {
  // ... renders buttons inside ...
}

  
// use returns the context value for the context you passed.
 //To determine the context value, React searches the component tree and finds the closest
  // context provider above for that particular context.

// To pass context to a Button, wrap it or one of its parent components into the corresponding context provider.



  import { createContext, use } from 'react';

const ThemeContext = createContext(null);

export default function MyApp() {
  return (
    <ThemeContext value="dark">
      <Form />
    </ThemeContext>
  )
}

function Form() {
  return (
    <Panel title="Welcome">
      <Button show={true}>Sign up</Button>
      <Button show={false}>Log in</Button>
    </Panel>
  );
}

function Panel({ title, children }) {
  const theme = use(ThemeContext);
  const className = 'panel-' + theme;
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  )
}

function Button({ show, children }) {
  if (show) {
    const theme = use(ThemeContext);
    const className = 'button-' + theme;
    return (
      <button className={className}>
        {children}
      </button>
    );
  }
  return false
}
