## useCallback

`useCallback` is a React Hook that returns a memoized callback function.

It is useful for optimizing performance by preventing unnecessary re-creations of functions in memory on every render, it's especially important when passing callbacks to child components that rely on reference equality to prevent re-renders.

In React, every time a component renders, any functions defined inside it are created again—meaning a new function object is made in memory. "Recreate" means this process happens on every render.

**_If you pass these functions as props to child components, the child may re-render unnecessarily because the function reference changes, the passed prop changed_**, even if the logic is the same. This can hurt performance, especially in large apps or with deeply nested components.

By using useCallback, you "memoize" the function—React will only create a new function if its dependencies change.
**_This keeps the function reference stable between renders_**, preventing unnecessary re-renders of child components and saving CPU and memory.

### Example Usage

```javascript
import React, { useState, useCallback, memo } from "react";

// Child component that receives the callback as a prop
const IncrementButton = memo(({ onIncrement }) => {
  console.log("IncrementButton rendered");
  return <button onClick={onIncrement}>Increment</button>;
});

const Counter = () => {
  // Declare a state variable 'count' and a function to update it
  const [count, setCount] = useState(0);

  // useCallback returns a memoized version of the increment function
  // The function will only be recreated if the dependencies (here, none) change
  //   create/recreate means a new function object is made in memory.
  const increment = useCallback(() => {
    // Update the count state by incrementing the previous value
    setCount((prevCount) => prevCount + 1);
  }, []); // No dependencies, so the function is created only once

  return (
    <div>
      {/* Display the current count */}
      <p>Count: {count}</p>
      {/* Pass the memoized increment function to the child component */}
      <IncrementButton onIncrement={increment} />
    </div>
  );
};
```

By default, every time a parent component re-renders, all its child components also re-render—even if their props haven't changed. The memo(...) function (React.memo) prevents this: it tells React to only re-render the child if its props actually change.

Without memo, IncrementButton would re-render every time Counter re-renders, even if onIncrement is the same function reference. With memo and useCallback, IncrementButton only re-renders when onIncrement changes, improving performance in larger apps.

Using React.memo with useCallback is a best practice for optimizing performance when passing callbacks to child components that depend on reference equality. This pattern is especially useful for preventing unnecessary re-renders in large or complex React apps.

# memo

React.memo is a higher-order component that memoizes the result of a component render. It prevents unnecessary re-renders by comparing the current props with the previous props. If the props haven't changed, React reuses the last rendered output.

## Example Usage

```javascript
import React, { useState, memo } from "react";

const ExpensiveComponent = memo(({ value }) => {
  console.log("ExpensiveComponent rendered");
  // Simulate an expensive calculation
  const result = computeExpensiveValue(value);
  return <div>{result}</div>;
});

const ParentComponent = () => {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <button onClick={() => setValue(value + 1)}>Increment Value</button>
      <p>Count: {count}</p>
      <ExpensiveComponent value={value} />
    </div>
  );
};
```

In this example, `ExpensiveComponent` will only re-render when its `value` prop changes, it will not render when the parent renders unless the "value" changed.
For example, if the user clicks the increment count, that will change the ParentComponent component's state, but `ExpensiveComponent` will not re-render because its props (value) haven't changed.
Without memo in ExpensiveComponent, a re-render of the parent would also trigger a re-render of `ExpensiveComponent`, even if its props didn't change.
This optimization can lead to significant performance improvements in larger applications.

# Remember

**_memo()_** -> memoises components, they will only re-render if their props change.
**_useCallback _**-> memoises functions, they will only be recreated (and the reference updated) if their dependencies change.
**_useMemo_** -> memoises values, they will only be recalculated (and the reference updated) if their dependencies change.

## Sources

- [React.memo – React Docs](https://react.dev/reference/react/memo)
- [useCallback – React Docs](https://react.dev/reference/react/useCallback)
- [When to useMemo and useCallback – Kent C. Dodds](https://kentcdodds.com/blog/usememo-and-usecallback)
- [Memoization in React – Josh W. Comeau](https://www.joshwcomeau.com/react/react-memo-and-usememo/)
