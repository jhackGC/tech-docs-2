# React Performance Best Practices

Follow these best practices to optimize performance in your React app:

---

## 18. How do you optimize performance in a React app?

**Answer:**

- Avoid unnecessary re-renders
  How?:
  - Use React.memo to memoize components so they only re-render when props change.
  - useMemo, to memoize expensive calculations.
  - useCallback, to memoize function references. Especially when passing callbacks to child components that rely on reference equality to prevent re-renders.
- Use production builds
- Use the React Profiler to identify performance bottlenecks

## Component Optimization

- Use `React.memo` for functional components to prevent unnecessary re-renders.
  So they only re-render when props change.

### Use useCallback and useMemo

- useMemo, to memoize expensive calculations.
- useCallback, to memoize function references, that are passed as props to child components.

## Avoid Expensive Calculations in Render

Avoid performing heavy calculations directly in the render method. Move them outside or use memoization to prevent unnecessary recalculations.

**Example (using useMemo):**

```js
import { useMemo } from "react";

function ExpensiveComponent({ items }) {
  // Memoize the result of a heavy calculation
  const total = useMemo(() => items.reduce((a, b) => a + b, 0), [items]);
  return <div>Total: {total}</div>;
}
```

**Alternative approaches to useMemo:**

1. **Calculate in parent and pass as a prop:**

```js
function Parent({ items }) {
  const total = items.reduce((a, b) => a + b, 0);
  return <ExpensiveComponent total={total} />;
}

function ExpensiveComponent({ total }) {
  return <div>Total: {total}</div>;
}
```

2. **Calculate once, or only when the items change, and store in state:**

```js
import { useState, useEffect } from "react";

function ExpensiveComponent({ items }) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(items.reduce((a, b) => a + b, 0));
  }, [items]);

  return <div>Total: {total}</div>;
}
```

## Efficient State Management

- Keep state as local as possible.
- Avoid unnecessary state in parent components.

## Code Splitting

- Use dynamic `import()` and `React.lazy`/`Suspense` to load components only when needed.

## Virtualization

- Use libraries like `react-window` or `react-virtualized` for large lists.

## Avoid Inline Functions/Objects in JSX

- Define handlers and objects outside of render to avoid new references on each render.

## Optimize Images and Assets

- Use optimized image formats and lazy loading for images.

## Virtualize long lists (e.g., react-window)

- Use libraries like `react-window` or `react-virtualized` for large lists.

## Minimize Bundle Size

Minimizing bundle size helps your app load faster and reduces bandwidth usage. Remove unused dependencies and use tree-shaking to eliminate dead code.

## Monitor Performance

Monitoring performance helps you identify bottlenecks and optimize slow components. Use React DevTools Profiler and browser performance tools to analyze render times and component updates.

## Server-Side Rendering (SSR) or Static Generation

Server-Side Rendering (SSR) and Static Generation improve initial load times and SEO by rendering pages on the server or at build time. Use frameworks like Next.js for SSR or static site generation.

## Debounce User Input

Debouncing user input prevents excessive function calls, such as API requests, when users type quickly. Throttling limits the rate of function execution.

**Example (debounce with lodash):**

```js
import { useState } from "react";
import debounce from "lodash.debounce";

function SearchBox() {
  const [query, setQuery] = useState("");

  const handleInput = debounce((value) => {
    // Perform search or API call
    console.log("Searching for:", value);
  }, 300);

  return (
    <input
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        handleInput(e.target.value);
      }}
    />
  );
}
```
