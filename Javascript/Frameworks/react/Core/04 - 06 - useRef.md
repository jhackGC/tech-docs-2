## useRef

# What is a “ref”, and how do you use one?

So traditionally, refs were meant to let you directly access an html element. For instance, let’s say you needed to focus an input field. You have to bail out of React and use regular JavaScript to call .focus(). Hooks actually make this fairly simple:

```javascript
function InputField() {
  const inputRef = React.useRef();
  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>
        Click to Focus the input
      </button>
    </div>
  );
}
```

When you change a ref, it doesn’t cause a re-render. (Remember, they exist outside of the re-render cycle).

The useRef Hook allows you to persist values between renders. It can be used to store a mutable value that does not cause a re-render when updated. It can be used to access a DOM element directly.

useRef is a React Hook that lets you reference a value that’s not needed for rendering.

`useRef` is a React Hook that returns a mutable ref object whose `.current` property is initialized to the passed argument (initialValue). The returned object will persist for the full lifetime of the component.

It is primarily used to access and interact with DOM elements directly, but it can also be used to store any mutable value that does not cause re-renders when changed.

### Example Usage

```javascript
import React, { useRef } from "react";

const TextInput = () => {
  const inputRef = useRef(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
};
```

In this example, `useRef` is used to create a reference to the input element. The `focusInput` function can then be called to programmatically focus the input element when the button is clicked.

### why do we need useRef? Why would you want to access a DOM element directly?

`useRef` is useful for several reasons:

1. **Direct DOM Manipulation**: It allows you to directly manipulate DOM elements without causing re-renders, which can be more efficient for certain operations like focusing an input or measuring dimensions.
2. **Storing Mutable Values**: It can hold mutable values that you want to persist across renders without triggering a re-render when the value changes. This is useful for storing values like timers, intervals, or any other mutable state that does not need to trigger a re-render.
3. **Avoiding Re-renders**: Unlike state variables, changing a ref does not cause the component to re-render. This is particularly useful when you want to keep track of a value without affecting the rendering logic of the component.

Sources:

- [useRef – React Docs](https://react.dev/reference/react/useRef)

- [React useRef Hook – W3Schools](https://www.w3schools.com/react/react_useref.asp)
- [useRef vs useState – Kent C. Dodds](https://kentcdodds.com/blog/useref-vs-usestate)
