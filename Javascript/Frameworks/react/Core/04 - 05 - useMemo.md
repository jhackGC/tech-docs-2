## useMemo

`useMemo` is a React Hook that allows you to optimize performance by memoizing the result of a computation.

Memoization is a technique where you cache the result of a function call and return the cached result when the same inputs occur again. This can be particularly useful for expensive calculations that don't need to be recalculated on every render.

It only recalculates the value when one of its dependencies changes, which can help avoid expensive calculations on every render.

### Example Usage

```javascript
import React, { useMemo } from "react";
const ExpensiveComponent = ({ items }) => {
  // Use useMemo to memoize the expensive calculation
  const total = useMemo(() => {
    console.log("Calculating total...");
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]); // Only recalculate when items change

  return <div>Total: {total}</div>;
};
```
