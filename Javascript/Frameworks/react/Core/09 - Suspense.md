# Suspense in React

## What is Suspense?

**Suspense** is a React feature that allows components to "wait" for something before rendering. It helps manage asynchronous operations like data fetching, code splitting, and lazy loading in a declarative way.

You can stream in a component after it's done doing its async workload, and the rest of the page will not be blocked, it will render the rest of the page while the component is still loading.

It's a great way to build parts of my page that are static and others are dynamic, load the static parts immediately and then the dynamic parts later, without blocking the rendering of the page.

## How to Use Suspense

To use Suspense, you wrap your components with the `<Suspense>` component and provide a fallback UI to display while the async operation is in progress.

Here's a basic example:

```javascript
import React, { Suspense, lazy } from "react";

// Lazy load a component
const LazyComponent = lazy(() => import("./LazyComponent"));

const App = () => {
  return (
    <div>
      <h1>My App</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
};
```

In this example, `LazyComponent` will be loaded asynchronously, and while it's loading, the fallback UI ("Loading...") will be displayed.
