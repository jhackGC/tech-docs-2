## Custom Hooks

A reusable function that calls other hooks.

Pieces of code, logic, or stateful **_behavior_** to share between components.

Custom hooks are a way to extract and reuse logic across multiple components in React. They allow you to encapsulate stateful logic and side effects, making your components cleaner and more maintainable.

They are different from util functions because they can use other hooks, like `useState` or `useEffect`, and they can return stateful values or functions (they can store state, and they can perform side effects).

They do not share state, each component using the hook gets its own state. Custom hooks help you organize, reuse, and abstract logic, but the data and state remain local to each component instance.

Each component gets its own independent copy of the state managed by the hook. The state is scoped to the component instance, not to the hook function itself.
If you want to share state between components, you need to use context or a state management library.

### Creating a Custom Hook

To create a custom hook, you can define a function that uses built-in hooks (like `useState` or `useEffect`) and then return the desired state or behavior.

Here's an example of a custom hook that fetches data from an API:

```jsx
import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        setData(json);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}
```

### Using a Custom Hook

You can use your custom hook in any functional component just like a built-in hook:

```jsx
import React from "react";
import useFetch from "./useFetch";

const MyComponent = () => {
  const { data, loading, error } = useFetch("/api/data");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>Data: {JSON.stringify(data)}</div>;
};
```

### Benefits of Custom Hooks

- **Reusability**: Share logic between components without duplicating code.
- **Abstraction**: Hide complex logic behind a simple API.
- **Composition**: Combine multiple hooks to create more powerful abstractions.

## When to Use Custom Hooks

One thinking current says that most effects should be in custom hooks, if they are shared or needs to be tested, its much easier to test custom hooks than components.

## Custom hook behavior

See the example below

The custom hook

```jsx
import { useState, useEffect, useDebugValue } from "react";

export const usePizzaOfTheDay = () => {
  const [pizzaOfTheDay, setPizzaOfTheDay] = useState(null);

  useDebugValue(pizzaOfTheDay ? `${pizzaOfTheDay.name}` : "Loading...");

  useEffect(() => {
    async function fetchPizzaOfTheDay() {
      const response = await fetch("/api/pizza-of-the-day");
      const data = await response.json();
      setPizzaOfTheDay(data);
    }

    fetchPizzaOfTheDay();
  }, []);

  return pizzaOfTheDay;
};
```

The consumer of the custom hook

```jsx
import { usePizzaOfTheDay } from "./usePizzaOfTheDay";

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const PizzaOfTheDay = () => {
  const pizzaOfTheDay = usePizzaOfTheDay();

  if (!pizzaOfTheDay) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pizza-of-the-day">
      <h2>Pizza of the Day</h2>
      <div>
        <div className="pizza-of-the-day-info">
          <h3>{pizzaOfTheDay.name}</h3>
          <p>{pizzaOfTheDay.description}</p>
          <p className="pizza-of-the-day-price">
            From: <span>{intl.format(pizzaOfTheDay.sizes.S)}</span>
          </p>
        </div>
        <img
          className="pizza-of-the-day-image"
          src={pizzaOfTheDay.image}
          alt={pizzaOfTheDay.name}
        />
      </div>
    </div>
  );
};

export default PizzaOfTheDay;
```

When we analise the execution this happens:

```jsx
// this execution is synchronous, no await.
const pizzaOfTheDay = usePizzaOfTheDay();
```

it will get into the custom hook and set the initial state to null.

```jsx
const [pizzaOfTheDay, setPizzaOfTheDay] = useState(null);
```

Then it will schedule the effect to be run after render

```jsx
useEffect(() => {
  async function fetchPizzaOfTheDay() {
    const response = await fetch("/api/pizza-of-the-day");
    const data = await response.json();
    setPizzaOfTheDay(data);
  }

  fetchPizzaOfTheDay();
}, []);
```

So in the first run, the hook will return the initial state, which is null.

And the parent will render accordingly (Loading...), based on the early return pattern (if (!pizzaOfTheDay)).

After the render, it will run the effect, which will fetch the data and update the state with the fetched pizza of the day.

When the state is updated, it will trigger a re-render of the component that uses the custom hook, and this time it will have the pizza of the day data available.

# useDebugValue

In the hook we used
useDebugValue(pizzaOfTheDay ? `${pizzaOfTheDay.name}` : "Loading...");

This is a special hook that allows you to display a label for your custom hook in React DevTools. It helps you understand the state of your custom hook when debugging.

The reuslt will be visible in React DevTools under the "Hooks" section for the component that uses the custom hook.

```json
[
  {
    "name": "PizzaOfTheDay",
    "value": "The Chicken Pesto Pizza",
    "subHooks": [
      {
        "name": "State",
        "value": {
          "id": "ckn_pesto",
          "name": "The Chicken Pesto Pizza",
          "category": "Chicken",
          "description": "Chicken, Tomatoes, Red Peppers, Spinach, Garlic, Pesto Sauce",
          "image": "/public/pizzas/ckn_pesto.webp",
          "sizes": "{L: 20.75, M: 16.75, S: 12.75}"
        },
        "subHooks": [],
        "debugInfo": null,
        "hookSource": {
          "lineNumber": 20,
          "functionName": "usePizzaOfTheDay",
          "fileName": "http://localhost:5173/src/usePizzaOfTheDay.jsx",
          "columnNumber": 45
        }
      },
      {
        "name": "Effect",
        "value": "() => {}",
        "subHooks": [],
        "debugInfo": null,
        "hookSource": {
          "lineNumber": 22,
          "functionName": "usePizzaOfTheDay",
          "fileName": "http://localhost:5173/src/usePizzaOfTheDay.jsx",
          "columnNumber": 3
        }
      }
    ],
    "debugInfo": null,
    "hookSource": {
      "lineNumber": 25,
      "columnNumber": 25,
      "functionName": "PizzaOfTheDay",
      "fileName": "http://localhost:5173/src/PizzaOfTheDay.jsx"
    }
  }
]
```
