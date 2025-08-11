Inspection

The Inspect API is a way to inspect the state transitions of your state machines and every aspect of actors in an actor system. Including:

Blog-post from David Khourshid (former Microsoft leader and now founder of stately.ai) at the end

Actor lifecycle
Actor event communication
Actor snapshot updates
We’ve recently released Stately Inspector, a universal tool that enables you to visually inspect the state of any application, frontend or backend, with the visualization of Stately’s editor.

Stately Inspector
Stately Inspector is a tool that allows you to inspect your application’s state visually. It primarily works with frontend applications using XState but can also work with backend code and code that uses any state management solution.

Read about our recent release of Stately Inspector on our blog.

Install Stately Inspector
To inspect applications with Stately Inspector, install Stately Inspect from npm via @statelyai/inspect:

npm install @statelyai/inspect

Then import the relevant inspector creator into your app. The creator is used to create an inspector (e.g., a browser or WebSocket inspector) that you can use to either connect to XState actors and/or manually send inspection events to Stately Inspector:

import { createActor } from 'xstate';
import { createBrowserInspector } from '@statelyai/inspect';
import { machine } from './machine';

const { inspect } = createBrowserInspector();

// ...

const actor = createActor(machine, {
  inspect,
  // ... other actor options
});

actor.start();

When you run your app, a new tab or popup window will open with the Inspector.

When using the browser inspector, ensure that the popup window is not blocked by your browser’s popup blocker.

Inspector options
You can pass the following options to the browser inspector:

filter - a function that takes an inspection event and returns true if the event should be sent to the Stately Inspector.
serialize - a function that takes an inspection event and allows you to serialize it before sending it to the Stately Inspector.
autoStart - whether to automatically start the inspector. Defaults to true.
If autoStart: false, you can start the inspector by calling inspector.start().
url - the URL of the Stately Inspector to open. Defaults to https://stately.ai/inspector.
iframe - the <iframe> element to use for the inspector. Defaults to null.
Example usage:

import { createBrowserInspector } from '@statelyai/inspect';

const inspector = createBrowserInspector({
  filter: (inspEvent) => {
    if (inspEvent.type === '@xstate.event') {
      // Skip mouse drag events
      return inspEvent.event.type !== 'mouse.drag';
    }
    return true;
  },
  iframe: document.getElementById('inspector-iframe'),
});

Sending inspection events
The @statelyai/inspect package will send inspection events to the connected Stately Inspector. There are currently three kinds of events sent:

Actor creation events
Actor-to-actor communication events
Actor snapshot changes
When you pass in the inspect option to the actor options in XState’s createActor(machine, options) function, it will automatically send all of these inspection events.

For usage with other state management solutions, you can manually send inspection events using the following methods:

inspector.actor(actor, snapshot, info) - send actor creation events
inspector.event(actor, event, info) - send actor-to-actor communication events
inspector.snapshot(actor, snapshot, info) - send actor snapshot changes
import { createBrowserInspector } from '@statelyai/inspect';

const inspector = createBrowserInspector();

// Imagine a todo app...
inspector.actor('todos');

// When a todo is created
inspector.actor('todo-1', {
  context: { status: 'active' },
});

// When a user completes a todo
inspector.event('todo-1', { type: 'todo.complete' });

// When a todo changes
inspector.snapshot('todo-1', {
  context: { status: 'completed' },
});

// When the todos actor (not the user) sends an event to a todo
inspector.event(
  'todo-1',
  { type: 'todo.update' },
  {
    source: 'todos',
  },
);

// ... etc.

The three types of inspection events contain everything that Stately Inspector needs to generate two kinds of real-time diagrams automatically:

State machine diagrams (if a state machine definition is provided)
Sequence diagrams

The Inspect API lets you attach an “inspector,” an observer that observes inspection events, to the root of an actor system:

const actor = createActor(machine, {
  inspect: (inspectionEvent) => {
    // type: '@xstate.actor' or
    // type: '@xstate.snapshot' or
    // type: '@xstate.event'
    console.log(inspectionEvent);
  },
});

The inspector will receive inspection events for every actor in the system, giving you granular visibility into everything happening, from how an individual actor is changing to how actors communicate with each other.

Inspection events
Inspection events are event objects that have a type property that indicates the type of inspection event. There are three types of inspection events:

@xstate.actor for Actor inspection events
@xstate.event for Event inspection events
@xstate.snapshot for Snapshot inspection events
Actor inspection events
The actor inspection event (@xstate.actor) is emitted when an actor in the system is created. It contains the following properties:

type - the type of inspection event, always '@xstate.actor'
actorRef - the reference to the actor
rootId - the session ID of the root actor of the system
Example of an actor inspection event:

{
  type: '@xstate.actor',
  actorRef: {/* Actor reference */},
  rootId: 'x:0',
}

Event inspection events
The event inspection event (@xstate.event) is emitted when an event is sent to an actor. It contains the following properties:

type - the type of inspection event, always '@xstate.event'
actorRef - the reference to the target actor of the event
rootId - the session ID of the root actor of the system
event - the event object that was sent
sourceRef - the reference to the source actor that sent the event, or undefined if the source is not known or an event was sent directly to the actor
Example of an event inspection event:

{
  type: '@xstate.event',
  actorRef: {/* Actor reference */},
  rootId: 'x:0',
  event: {
    type: 'someEvent',
    message: 'hello'
  },
  sourceRef: {/* Actor reference */},
}

Snapshot inspection events
The snapshot inspection event (@xstate.snapshot) is emitted when an actor's snapshot is updated. It contains the following properties:

type - the type of inspection event, always '@xstate.snapshot'
actorRef - the reference to the actor
rootId - the session ID of the root actor of the system
snapshot - the most recent snapshot of the actor
event - the event that caused the snapshot to be updated
Example of a snapshot inspection event:

{
  type: '@xstate.snapshot',
  actorRef: {/* Actor reference */},
  rootId: 'x:0',
  snapshot: {
    status: 'active',

    context: { count: 31 },
    // ...
  },
  event: {
    type: 'increment'
  }
}


ne of the most popular features of our legacy Stately Viz was its ability to inspect your app in real-time using the previous @xstate/inspect and Stately Viz tools. We wanted to bring this functionality into a universal tool that enables you to visually inspect the state of any application, frontend or backend, with the visualization of Stately’s editor. So we built Stately Inspector.

What is Stately Inspector?
Stately Inspector is a tool that allows you to inspect your application’s state visually. It primarily works with frontend applications using XState but can also work with backend code and code that uses any state management solution.

Watch a demo of Stately Inspector in our most recent office hours:


Installing Stately Inspect
To inspect applications with Stately Inspector, install Stately Inspect from npm via @statelyai/inspect:

npm install @statelyai/inspect

Then, import the relevant inspector creator into your app. The creator is used to create an inspector (e.g., a browser or WebSocket inspector) to connect to XState actors and/or manually send inspection events to Stately Inspector:

import { createActor } from 'xstate';
import { createBrowserInspector } from '@statelyai/inspect';
import { machine } from './machine';

const inspector = createBrowserInspector();

// ...

const actor = createActor(machine, {
  inspect: inspector.inspect,
  // ... other actor options
});

actor.start();

Now, when you run your app, you should see a new tab or popup open in your browser that looks something like this:

The Stately Inspector view, showing a state machine for the pizza ordering process. The current state and available event is highlighted in green.

Sending inspection events
The @statelyai/inspect package will send inspection events to the connected Stately Inspector. There are currently three kinds of events sent:

Actor creation events
Actor-to-actor communication events
Actor snapshot changes
When you pass in the inspect option to the actor options in XState’s createActor(machine, options) function, it will automatically send all of these inspection events.

For usage with other state management solutions, you can manually send inspection events using the following methods:

inspector.actor(actor, snapshot, info) - send actor creation events
inspector.event(actor, event, info) - send actor-to-actor communication events
inspector.snapshot(actor, snapshot, info) - send actor snapshot changes
import { createBrowserInspector } from '@statelyai/inspect';

const inspector = createBrowserInspector();

// Imagine a todo app...
inspector.actor('todos');

// When a todo is created
inspector.actor('todo-1', {
  context: { status: 'active' },
});

// When a user completes a todo
inspector.event('todo-1', { type: 'todo.complete' });

// When a todo changes
inspector.snapshot('todo-1', {
  context: { status: 'completed' },
});

// When the todos actor (not the user) sends an event to a todo
inspector.event(
  'todo-1',
  { type: 'todo.update' },
  {
    source: 'todos',
  },
);

// ... etc.

The above is a contrived example demonstrating how you can instrument inspector events at any time from any part of your app. The three types of inspection events contain everything that Stately Inspector needs to generate two kinds of real-time diagrams automatically:

State machine diagrams (if a state machine definition is provided)
Sequence diagrams
The Stately Inspector view, showing a state machine and a sequence diagram for the pizza ordering process side-by-side.

Coming soon
The goal of Stately Inspector is to be a universal tool that enables you to visually inspect the state of any application, frontend or backend. Right now, it’s optimized for XState (with inspector.inspect) or non-XState (with inspector.actor(...), inspector.event(...), inspector.snapshot(...)) state management solutions in frontend applications. We would love your feedback so that we can prioritize:

A websocket inspector creator: inspect frontend and/or backend applications remotely.
Bidirectional communication: send events from Stately Inspector to your live application.
Middleware for popular libraries: e.g., Redux, MobX, Zustand, and more.
Sync with Stately Studio: enrich inspected machines with information (layouts, colors, assets, annotations, etc.) from Stately Studio.
Analytics: view real-time analytics of flows in your application.
Let us know your thoughts on our Discord server or submit a feature request on our GitHub board. Want to be the first to know about upcoming features? Subscribe to our YouTube channel or follow us on LinkedIn to avoid missing our next office hours live stream.

