Introduction
React Compiler is a new build-time tool that automatically optimizes your React app. It works with plain JavaScript, and understands the Rules of React, so you don’t need to rewrite any code to use it.

You will learn
What React Compiler does
Getting started with the compiler
Incremental adoption strategies
Debugging and troubleshooting when things go wrong
Using the compiler on your React library
Note
React Compiler is currently in Release Candidate (RC). We now recommend everyone to try the compiler and provide feedback. The latest RC release can be found with the @rc tag.

What does React Compiler do? 
React Compiler automatically optimizes your React application at build time. React is often fast enough without optimization, but sometimes you need to manually memoize components and values to keep your app responsive. This manual memoization is tedious, easy to get wrong, and adds extra code to maintain. React Compiler does this optimization automatically for you, freeing you from this mental burden so you can focus on building features.

Before React Compiler 
Without the compiler, you need to manually memoize components and values to optimize re-renders:

import { useMemo, useCallback, memo } from 'react';

const ExpensiveComponent = memo(function ExpensiveComponent({ data, onClick }) {
  const processedData = useMemo(() => {
    return expensiveProcessing(data);
  }, [data]);

  const handleClick = useCallback((item) => {
    onClick(item.id);
  }, [onClick]);

  return (
    <div>
      {processedData.map(item => (
        <Item key={item.id} onClick={() => handleClick(item)} />
      ))}
    </div>
  );
});
After React Compiler 
With React Compiler, you write the same code without manual memoization:

function ExpensiveComponent({ data, onClick }) {
  const processedData = expensiveProcessing(data);

  const handleClick = (item) => {
    onClick(item.id);
  };

  return (
    <div>
      {processedData.map(item => (
        <Item key={item.id} onClick={() => handleClick(item)} />
      ))}
    </div>
  );
}
See this example in the React Compiler Playground

React Compiler automatically applies the equivalent optimizations, ensuring your app only re-renders when necessary.

Deep Dive
What kind of memoization does React Compiler add? 

Hide Details
React Compiler’s automatic memoization is primarily focused on improving update performance (re-rendering existing components), so it focuses on these two use cases:

Skipping cascading re-rendering of components
Re-rendering <Parent /> causes many components in its component tree to re-render, even though only <Parent /> has changed
Skipping expensive calculations from outside of React
For example, calling expensivelyProcessAReallyLargeArrayOfObjects() inside of your component or hook that needs that data
Optimizing Re-renders 
React lets you express your UI as a function of their current state (more concretely: their props, state, and context). In its current implementation, when a component’s state changes, React will re-render that component and all of its children — unless you have applied some form of manual memoization with useMemo(), useCallback(), or React.memo(). For example, in the following example, <MessageButton> will re-render whenever <FriendList>’s state changes:

function FriendList({ friends }) {
  const onlineCount = useFriendOnlineCount();
  if (friends.length === 0) {
    return <NoFriends />;
  }
  return (
    <div>
      <span>{onlineCount} online</span>
      {friends.map((friend) => (
        <FriendListCard key={friend.id} friend={friend} />
      ))}
      <MessageButton />
    </div>
  );
}
See this example in the React Compiler Playground

React Compiler automatically applies the equivalent of manual memoization, ensuring that only the relevant parts of an app re-render as state changes, which is sometimes referred to as “fine-grained reactivity”. In the above example, React Compiler determines that the return value of <FriendListCard /> can be reused even as friends changes, and can avoid recreating this JSX and avoid re-rendering <MessageButton> as the count changes.

Expensive calculations also get memoized 
React Compiler can also automatically memoize expensive calculations used during rendering:

// **Not** memoized by React Compiler, since this is not a component or hook
function expensivelyProcessAReallyLargeArrayOfObjects() { /* ... */ }

// Memoized by React Compiler since this is a component
function TableContainer({ items }) {
  // This function call would be memoized:
  const data = expensivelyProcessAReallyLargeArrayOfObjects(items);
  // ...
}
See this example in the React Compiler Playground

However, if expensivelyProcessAReallyLargeArrayOfObjects is truly an expensive function, you may want to consider implementing its own memoization outside of React, because:

React Compiler only memoizes React components and hooks, not every function
React Compiler’s memoization is not shared across multiple components or hooks
So if expensivelyProcessAReallyLargeArrayOfObjects was used in many different components, even if the same exact items were passed down, that expensive calculation would be run repeatedly. We recommend profiling first to see if it really is that expensive before making code more complicated.

Should I try out the compiler? 
We encourage everyone to start using React Compiler. While the compiler is still an optional addition to React today, in the future some features may require the compiler in order to fully work.

Is it safe to use? 
React Compiler is now in RC and has been tested extensively in production. While it has been used in production at companies like Meta, rolling out the compiler to production for your app will depend on the health of your codebase and how well you’ve followed the Rules of React.

What build tools are supported? 
React Compiler can be installed across several build tools such as Babel, Vite, Metro, and Rsbuild.

React Compiler is primarily a light Babel plugin wrapper around the core compiler, which was designed to be decoupled from Babel itself. While the initial stable version of the compiler will remain primarily a Babel plugin, we are working with the swc and oxc teams to build first class support for React Compiler so you won’t have to add Babel back to your build pipelines in the future.

Next.js users can enable the swc-invoked React Compiler by using v15.3.1 and up.

What should I do about useMemo, useCallback, and React.memo? 
If you are using React Compiler, useMemo, useCallback, and React.memo can be removed. React Compiler adds automatic memoization more precisely and granularly than is possible with these hooks. If you choose to keep manual memoization, React Compiler will analyze them and determine if your manual memoization matches its automatically inferred memoization. If there isn’t a match, the compiler will choose to bail out of optimizing that component.

This is done out of caution as a common anti-pattern with manual memoization is using it for correctness.  This means your app depends on specific values being memoized to work properly. For example, in order to prevent an infinite loop, you may have memoized some values to stop a useEffect call from firing. This breaks the Rules of React, but since it can potentially be dangerous for the compiler to automatically remove manual memoization, the compiler will just bail out instead. You should manually remove your handwritten memoization and verify that your app still works as expected.

Incremental Adoption
React Compiler can be adopted incrementally, allowing you to try it on specific parts of your codebase first. This guide shows you how to gradually roll out the compiler in existing projects.

You will learn
Why incremental adoption is recommended
Using Babel overrides for directory-based adoption
Using the “use memo” directive for opt-in compilation
Using the “use no memo” directive to exclude components
Runtime feature flags with gating
Monitoring your adoption progress
Why Incremental Adoption? 
React Compiler is designed to optimize your entire codebase automatically, but you don’t have to adopt it all at once. Incremental adoption gives you control over the rollout process, letting you test the compiler on small parts of your app before expanding to the rest.

Starting small helps you build confidence in the compiler’s optimizations. You can verify that your app behaves correctly with compiled code, measure performance improvements, and identify any edge cases specific to your codebase. This approach is especially valuable for production applications where stability is critical.

Incremental adoption also makes it easier to address any Rules of React violations the compiler might find. Instead of fixing violations across your entire codebase at once, you can tackle them systematically as you expand compiler coverage. This keeps the migration manageable and reduces the risk of introducing bugs.

By controlling which parts of your code get compiled, you can also run A/B tests to measure the real-world impact of the compiler’s optimizations. This data helps you make informed decisions about full adoption and demonstrates the value to your team.

Approaches to Incremental Adoption 
There are three main approaches to adopt React Compiler incrementally:

Babel overrides - Apply the compiler to specific directories
Opt-in with “use memo” - Only compile components that explicitly opt in
Runtime gating - Control compilation with feature flags
All approaches allow you to test the compiler on specific parts of your application before full rollout.

Directory-Based Adoption with Babel Overrides 
Babel’s overrides option lets you apply different plugins to different parts of your codebase. This is ideal for gradually adopting React Compiler directory by directory.

Basic Configuration 
Start by applying the compiler to a specific directory:

// babel.config.js
module.exports = {
  plugins: [
    // Global plugins that apply to all files
  ],
  overrides: [
    {
      test: './src/modern/**/*.{js,jsx,ts,tsx}',
      plugins: [
        'babel-plugin-react-compiler'
      ]
    }
  ]
};
Expanding Coverage 
As you gain confidence, add more directories:

// babel.config.js
module.exports = {
  plugins: [
    // Global plugins
  ],
  overrides: [
    {
      test: ['./src/modern/**/*.{js,jsx,ts,tsx}', './src/features/**/*.{js,jsx,ts,tsx}'],
      plugins: [
        'babel-plugin-react-compiler'
      ]
    },
    {
      test: './src/legacy/**/*.{js,jsx,ts,tsx}',
      plugins: [
        // Different plugins for legacy code
      ]
    }
  ]
};
With Compiler Options 
You can also configure compiler options per override:

// babel.config.js
module.exports = {
  plugins: [],
  overrides: [
    {
      test: './src/experimental/**/*.{js,jsx,ts,tsx}',
      plugins: [
        ['babel-plugin-react-compiler', {
          // options ...
        }]
      ]
    },
    {
      test: './src/production/**/*.{js,jsx,ts,tsx}',
      plugins: [
        ['babel-plugin-react-compiler', {
          // options ...
        }]
      ]
    }
  ]
};
Opt-in Mode with “use memo” 
For maximum control, you can use compilationMode: 'annotation' to only compile components and hooks that explicitly opt in with the "use memo" directive.

Note
This approach gives you fine-grained control over individual components and hooks. It’s useful when you want to test the compiler on specific components without affecting entire directories.

Annotation Mode Configuration 
// babel.config.js
module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', {
      compilationMode: 'annotation',
    }],
  ],
};
Using the Directive 
Add "use memo" at the beginning of functions you want to compile:

function TodoList({ todos }) {
  "use memo"; // Opt this component into compilation

  const sortedTodos = todos.slice().sort();

  return (
    <ul>
      {sortedTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

function useSortedData(data) {
  "use memo"; // Opt this hook into compilation

  return data.slice().sort();
}
With compilationMode: 'annotation', you must:

Add "use memo" to every component you want optimized
Add "use memo" to every custom hook
Remember to add it to new components
This gives you precise control over which components are compiled while you evaluate the compiler’s impact.

Runtime Feature Flags with Gating 
The gating option enables you to control compilation at runtime using feature flags. This is useful for running A/B tests or gradually rolling out the compiler based on user segments.

How Gating Works 
The compiler wraps optimized code in a runtime check. If the gate returns true, the optimized version runs. Otherwise, the original code runs.

Gating Configuration 
// babel.config.js
module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', {
      gating: {
        source: 'ReactCompilerFeatureFlags',
        importSpecifierName: 'isCompilerEnabled',
      },
    }],
  ],
};
Implementing the Feature Flag 
Create a module that exports your gating function:

// ReactCompilerFeatureFlags.js
export function isCompilerEnabled() {
  // Use your feature flag system
  return getFeatureFlag('react-compiler-enabled');
}
Troubleshooting Adoption 
If you encounter issues during adoption:

Use "use no memo" to temporarily exclude problematic components
Check the debugging guide for common issues
Fix Rules of React violations identified by the ESLint plugin
Consider using compilationMode: 'annotation' for more gradual adoption


