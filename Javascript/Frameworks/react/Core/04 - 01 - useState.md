# useState

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
