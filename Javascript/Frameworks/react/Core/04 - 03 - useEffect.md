## useEffect

The `useEffect` Hook lets you perform side effects in your components, such as data fetching, subscriptions, or manually changing the DOM.

IMPORTANT
For useEffect (and similar hooks like useLayoutEffect), the effect callback runs after the render is committed to the screen, which is why you can safely interact with the DOM there, so they can read the DOM and perform side effects.

```jsx
import React, { useState, useEffect } from "react";
const MyComponent = () => {
  const [data, setData] = useState(null);

  // Fetch pizza types from the API when the component mounts
  // This is a side effect, so we use useEffect to handle it
  // We also set loading to false once the data is fetched
  // to indicate that the data is ready to be displayed
  // This is a common pattern in React to handle data fetching
  // and to avoid showing loading state indefinitely
  useEffect(() => {
    fetchPizzaTypes();
  }, []); // Empty dependency array means it runs once after the initial render

  async function fetchPizzaTypes() {
    const pizzasRes = await fetch("/api/pizzas");
    const pizzasJson = await pizzasRes.json();
    setPizzaTypes(pizzasJson);
    setLoading(false);
  }

  return <div>{data ? JSON.stringify(data) : "Loading..."}</div>;
};
```

If you would like to run something at the end of the component lifecycle, you can use the return.
e.g. you can return a cleanup function from useEffect

```jsx
useEffect(() => {
  fetchPizzaTypes();
  return () => {
    // cleanup code here, if needed
    // for example, you can cancel the fetch request if it's still pending
    // or clear any timers or subscriptions
    // this is useful to avoid memory leaks or unwanted side effects
    clearTimeout(timeoutId);
  };
}, []);
```
