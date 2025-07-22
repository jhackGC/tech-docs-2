# React Hooks

https://react.dev/learn#using-hooks
https://react.dev/reference/react/hooks

Hooks are special functions that run reused logic in your components.

Hooks are more restrictive than other functions. You can only call Hooks at the top of your components (or other Hooks). If you want to use useState in a condition or a loop, extract a new component and put it there.

A hook that gets caught every time the render function gets called.
Because the hooks get called in the same order every single time, they'll always point to the same piece of state.

Because of that they can be stateful: you can keep pieces of mutable state using hooks and then modify them later using their provided updater functions.

**_An absolutely key concept for you to grasp is hooks rely on this strict ordering._**

As such, do not put hooks inside if statements or loops. If you do, you'll have insane bugs that involve useState returning the wrong state.

## rules

https://react.dev/warnings/invalid-hook-call-warning#breaking-rules-of-hooks

- Only call Hooks at the top level of your React function components
- Only call Hooks from React function components or custom Hooks
- Do not use it inside loops, conditions, or nested functions, beacuse the order of Hooks calls matters. If you call a Hook inside a condition, it might not be called on every render.

Some linting tools can help you enforce these rules.

## useState

The `useState` Hook lets you add state to your functional components. It returns an array with two elements: the current state value and a function to update it.

Every hook must run every time in the same order.

The argument given to useState is the default value. In our case, we could give it "" as our default value to make the user have to select something first but in our case we want to default to pepperoni pizza and medium size.

IMPORTANT
For most hooks, like useState and useContext, they run during rendering, not after.

```jsx
import React, { useState } from "react";

const MyComponent = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};
```

You can use useState as many times as you need for various pieces of state! Again, this is why ordering is important because React relies on useState to be called in strictly the same order every time so it can give you the same piece of state.

## useEffect

The `useEffect` Hook lets you perform side effects in your components, such as data fetching, subscriptions, or manually changing the DOM.

IMPORTANT
For useEffect (and similar hooks like useLayoutEffect), the effect callback runs after the render is committed to the screen, which is why you can safely interact with the DOM there, so they can read the DOM and perform side effects.

```jsx
import React, { useState, useEffect } from "react";
const MyComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://api.example.com/data")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []); // Empty dependency array means it runs once after the initial render

  return <div>{data ? JSON.stringify(data) : "Loading..."}</div>;
};
```
