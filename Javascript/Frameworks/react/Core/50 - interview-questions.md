# Typical React Interview Questions and Answers

Below are some common React interview questions, their answers, and code examples where appropriate.

---

## 1. What is React?

**Answer:**
React is a JavaScript library for building user interfaces, primarily for single-page applications. It allows developers to create reusable UI components and manage the state of those components efficiently.

---

## 2. What are components in React?

**Answer:**
Components are the building blocks of a React application. They can be functional or class-based and encapsulate logic, structure, and styling.

**Example:**

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}
```

---

## 3. What is JSX?

**Answer:**
JSX (JavaScript XML) is a syntax extension for JavaScript that looks similar to HTML. It is used with React to describe what the UI should look like.

**Example:**

```jsx
const element = <h1>Hello, world!</h1>;
```

---

## 4. What is the Virtual DOM?

**Answer:**
The Virtual DOM is a lightweight JavaScript representation of the real DOM. React uses it to optimize updates by only re-rendering parts of the DOM that have changed.

---

## 5. What are props in React?

**Answer:**
Props (short for properties) are **_read-only_** inputs passed from parent to child components. They allow data to flow through the component tree in one direction, from parent to child.

**Example:**

```jsx
function Greeting(props) {
  return <h2>{props.message}</h2>;
}
```

---

## 6. What is state in React?

**Answer:**
State is a built-in object that stores property values that belong to a component. When the state changes, the component re-renders.

**Example (using hooks):**

```jsx
import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

---

## 7. What is the difference between controlled and uncontrolled components?

**Answer:**

- Controlled components have their form data managed by React state.
- Uncontrolled components store their own state in the DOM and are accessed via refs.

**Example (controlled):**

```jsx
function ControlledInput() {
  const [value, setValue] = useState("");
  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
}
```

**Example (uncontrolled):**

```jsx
function UncontrolledInput() {
  const inputRef = useRef();
  const handleClick = () => alert(inputRef.current.value);
  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>Show Value</button>
    </>
  );
}
```

---

## 8. What are hooks in React?

**Answer:**
Hooks are functions that let you use state and other React features in functional components. Common hooks include `useState`, `useEffect`, and `useContext`.

See [04 - 01 - hooks.md](04%20-%2001%20-%20hooks.md) for more details.

---

## 9. What is useEffect used for?

**Answer:**
`useEffect` lets you perform side effects in function components, such as data fetching, subscriptions, or manually changing the DOM.

**Example:**

```jsx
import React, { useState, useEffect } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);
  return <div>Seconds: {seconds}</div>;
}
```

---

## 10. What is the difference between useEffect and useLayoutEffect?

**Answer:**

- `useEffect` runs after the render is committed to the screen.
- `useLayoutEffect` runs synchronously after all DOM mutations but before the browser paints.

Use `useLayoutEffect` when you need to measure DOM nodes or synchronously re-render.

---

## 11. What is context in React?

**Answer:**
Context provides a way to pass data through the component tree without having to pass props down manually at every level.

**Example:**

```jsx
const ThemeContext = React.createContext("light");

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  return <ThemedButton />;
}

function ThemedButton() {
  const theme = React.useContext(ThemeContext);
  return <button className={theme}>I am styled by theme context!</button>;
}
```

---

## 12. What is prop drilling and how do you avoid it?

**Answer:**
Prop drilling is the process of passing data from a parent component to a deeply nested child component through intermediate components. You can avoid it by using **_context_** or state management libraries.

---

## 13. What is a key prop and why is it important in lists?

**Answer:**
The `key` prop is a special attribute you must include when rendering lists of elements in React. It helps React efficiently update and re-render lists by uniquely identifying each item.

When the list changes (items are added, removed, or reordered), React uses the `key` to match old and new items and only update what’s necessary.

**Why is it important?**

- Improves performance by minimizing DOM operations.
- Prevents bugs where React may reuse or lose state for list items.
- Ensures correct behavior when items are reordered or removed.

**Best practices:**

- Use a unique and stable identifier for each item (like a database ID).
- Avoid using array indexes as keys unless the list is static and will not change.

**Example:**

```jsx
const items = [
  { id: "a1", name: "Apple" },
  { id: "b2", name: "Banana" },
  { id: "c3", name: "Cherry" },
];

function FruitList() {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

**Common mistake:**

```jsx
// Don't do this if the list can change order or items can be added/removed
{
  items.map((item, index) => <li key={index}>{item.name}</li>);
}
```

Using the index as a key can cause issues when the list changes, such as incorrect item state or animations.

---

## 14. How do you handle errors in React functional components?

You can use try/catch blocks inside event handlers or async functions, and manage error state with useState.

For rendering errors, you can conditionally render fallback UI based on error state.

---

## 15. What is code splitting and how do you implement it in React?

**Answer:**
Code splitting is a technique to split your code into smaller bundles so they can be loaded on demand. In React, you can use `React.lazy` and `Suspense` for code splitting.

**Example:**

```jsx
const OtherComponent = React.lazy(() => import("./OtherComponent"));

function MyComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtherComponent />
    </Suspense>
  );
}
```

---

## 16. What is memoization in React?

**Answer:**
Memoization is an optimization technique to cache the result of expensive function calls. In React, you can use `React.memo` to memoize components, `useMemo` to memoize values, and `useCallback` to memoize functions.

---

## 17. What is the difference between useMemo and useCallback?

**Answer:**

- `useMemo` returns a memoized value.
- `useCallback` returns a memoized function.

Both are used to optimize performance by preventing unnecessary recalculations or recreations.

---

## 18. How do you optimize performance in a React app?

**Answer:**
see [10 - 01 - performance.md](10%20-%2001%20-%20performance.md) for detailed strategies.

---

## 19. How do you test React components?

**Answer:**
You can use testing libraries like **_Jest_** and **_React Testing Library_** to test React components.
Mock your dependencies with tools like **_jest.mock_** or **_msw_** (Mock Service Worker) for API calls.

**Example:**

```jsx
import { render, screen } from "@testing-library/react";
import MyComponent from "./MyComponent";

test("renders hello world", () => {
  render(<MyComponent />);
  expect(screen.getByText(/hello world/i)).toBeInTheDocument();
});
```

You can also use **_Cypress_** or any other testing library with E2E capabilities for end-to-end testing of React applications.

---

## 20. What is server-side rendering (SSR) in React?

See [11 - SSR.md](./11%20-%20SSR.md) for detailed strategies.

---
