## useContext

The `useContext` Hook allows you to access the context value provided by a Context Provider in your component tree. This is useful for sharing data like themes, user information, or settings without passing props down through every level of the component tree.

### use it sparingly

You should use `useContext` sparingly. It is a powerful tool, but it can lead to performance issues if overused or used incorrectly. Context is meant for global state that needs to be accessed by many components, not for every piece of state in your application.

Context is for app-level state. This is state that exists for your entire app. And is meant to be shared between different components that are not necessarily related in the component tree.

It's probably not the best solution for prop-drilling, although many people use it for that, which is when you pass props down through many layers of components. That would not be sharing state between DIFFERENT components, but rather passing props down to child components.

Better suited for app-level state that needs to be accessed by many components, like user authentication, theme settings, or global configuration.

The currently logged in user would be a good example of this. You wouldn't want the user to exist in just the page level because once you navigate to another page, all state of the previous page is destroyed.

You'd want that user info to persist between pages, and thus context is a good thing for that.

Context allows you to keep a global state for your app.

e.g. If you want that state to persist between pages.

Make a file called contexts.jsx. It's not a component so tend to not capitalize it.

The React docs do capitalize it. Up to you.

```jsx
import { createContext } from "react";

// Create a context for the cart
// The default value is an empty array and a function to update the cart
// This will be used to provide the cart state and a function to update it to the components
// that need it, such as Header and Order components
// The useContext hook will be used to access the cart state and the function to update it
// in the components that need it
// The CartContext will be used to share the cart state across components without having to pass props
// down manually at every level
// This is useful for larger applications where the cart state needs to be accessed by many components
// and passing props down manually would be cumbersome

// Create a state that is both mutable and readable
// that would be the definition of a hook
const cart = []; // the state of the cart, initially an empty array
const mutatingFunction = () => {};
const hook = [cart, mutatingFunction];
export const CartContext = createContext(hook);
```

That's it. Pretty simple. It's called contexts.jsx, with an "s" because if you had other contexts (like a UserContext) you could put those all in the same file.

The [[], function () {}] isn't strictly necessary; it's a default value your context would use if no context provider is there (which should never happen.)

This really only ends up being useful for TypeScript types – the type you give here is what TypeScript will use to validate it.

In theory it could be helpful for testing too.

The reason for the weird value is that it's a React hook: an array where the first value is an array (like our cart is) and the second value is a function (the setCart function).

### Using the context

To use the context in your components, you need to wrap your component tree with a Context Provider and then use the `useContext` Hook to access the context value.

```jsx
import React, { useContext } from "react";
import { CartContext } from "./contexts";

const MyComponent = () => {
  const [cart, setCart] = useContext(CartContext);

  return (
    <div>
      <h1>My Cart</h1>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};
```

To provide the context value, you need to wrap your component tree with a Context Provider. This is typically done at a high level in your app, such as in your main App component.

```jsx
import React, { useState } from "react";
import { CartContext } from "./contexts";

const App = () => {
  const [cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      <MyComponent />
    </CartContext.Provider>
  );
};
```

You can also focus the provider on a specific part of your app where you need the context value. This way, you can avoid unnecessary re-renders in components that don't need the context.

e.g.

```jsx
import React, { useState } from "react";
import { CartContext } from "./contexts";
import Header from "./Header";
import Order from "./Order";
const App = () => {
  const [cart, setCart] = useState([]);

  return (
    <Header />
    <CartContext.Provider value={[cart, setCart]}>
      <Order />
    </CartContext.Provider>
    <Footer />
  );
};
```

# Cons

- **Performance**: Using context can lead to performance issues if not used carefully. If the context value changes, all components that consume that context will re-render, which can be expensive if those components are large or complex.
- **Overuse**: It's easy to overuse context, leading to a situation where many components are tightly coupled to the context. This can make your code harder to maintain and test.
- **Debugging**: Debugging issues related to context can be challenging, especially if you have multiple contexts in your app. It can be difficult to track down where a context value is being set or changed. For example, you dont know who or what changed the context value, making it hard to identify the source of the issue. Other state management solutions like Redux or Zustand provide better debugging tools and clearer state flow.
