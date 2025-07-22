# React Components

We used components in the previous sections, but we didn't really talk about them. Let's do that now.

---

## Basic Usage

React components are the building blocks of React applications. They can be defined as functions or classes and can return JSX or React elements.

```js
React.createElement("div", null);
```

Creates a DOM element in the virtual DOM.

```js
ReactDOM.render(component, targetDomNode); // renders the component in the DOM node
```

The component can be reused as its function is like a blueprint. `React.createElement('div', null)` can receive children as the third parameter:

```js
React.createElement(
  "div",
  null,
  React.createElement(MyTitle),
  React.createElement(MyTitle),
  React.createElement(MyTitle)
);
```

Or as an array:

```js
React.createElement("div", null, [
  React.createElement(MyTitle),
  React.createElement(MyTitle),
  React.createElement(MyTitle),
]);
```

That's how you build a component tree.

Example HTML setup:

```html
<body>
  <div id="app"></div>
  <script src="../node_modules/react/umd/react.development.js"></script>
  <script src="../node_modules/react-dom/umd/react-dom.development.js"></script>
  <script>
    const MyFirstComponent = function () {
      return React.createElement(
        "div",
        null,
        React.createElement("h1", null, "This is my first component!")
      );
    };

    const MyTitle = function () {
      return React.createElement("h1", null, "This is my first component!");
    };

    const MySecondComponent = function () {
      return React.createElement("div", null, React.createElement(MyTitle));
    };

    ReactDOM.render(
      React.createElement(MySecondComponent),
      document.getElementById("app")
    );
  </script>
</body>
```

---

## Props

You can pass props from components to components:

```js
const MyTitle = function (props) {
  return React.createElement("h1", null, props.title);
};

const MySecondComponent = function () {
  return React.createElement(
    "div",
    null,
    React.createElement(MyTitle, { title: "The title by props" })
  );
};
```

---

## Functional Component

- A function with just behavior that returns other React components or JSX.

**MyTitle.js**

```js
import React from "react";

const MyTitle = function (props) {
  return React.createElement("h1", null, props.title);
};

export default MyTitle;
```

---

## Class Component (Legacy)

- A class that has state; you want to keep some info in it (e.g., an input component needs to store the user input text somewhere).
- ES6 class, JavaScript object with props and methods, must have a `render()` method.

**SearchBar.js**

```js
import React, { Component } from "react";

export default class SearchBar extends Component {
  render() {
    return <input />;
  }
}
```

## Named functions

To define components, named functions are preferred over anonymous functions for better readability and debugging.

Unnamed functions are not shown in the stack trace, making it harder to debug issues. (@TBD)

e.g.

```js
// unnamed function
export default const MyComponent = function () {
  return <div>Hello World</div>;
};
```

```js
// named function
export default function MyComponent() {
  return <div>Hello World</div>;
}
```

## reserved words

### class

Notice we're using className instead of class on the HTML element for CSS classes. This is because class is a reserved word in JS and JSX is still just JS. So instead they opted to use className which is the name of the JS API for interacting with class names.

### for

Similarly, for is a reserved word in JS so we use htmlFor instead of for on the HTML element for labels. This is the name of the JS API for interacting with label elements.

## Two way data binding

React does not implement true two-way data binding as seen in frameworks like Angular. Instead, React uses a one-way data flow: data moves from parent to child via props, and user input updates state via event handlers.

This is often called "one-way binding" or "unidirectional data flow."

### What is Two-Way Data Binding?

Two-way data binding means changes in the UI automatically update the model (state), and changes in the model automatically update the UI. In Angular, for example, this is achieved with the "ngModel" directive.

### How React Handles Data Flow

In React, data flows down from parent to child through props.

To update the UI based on user input, you use controlled components:

Here, the input's value is controlled by React state. When the user types, onChange updates the state, and the new state updates the input value. **_This is sometimes called "pseudo two-way binding," but it's not automatic—it's explicit and unidirectional._**

```jsx
import React, { useState } from "react";

const MyComponent = () => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleChange} />
      <p>{inputValue}</p>
    </div>
  );
};
export default MyComponent;
```

In the example above, the input's value is controlled by the `inputValue` state. When the user types in the input field, the `handleChange` function updates the state, which in turn updates the input's value.
This is how React achieves a similar effect to two-way binding, but it requires explicit handling of state and events.

In this next example the data flows from the parent to the child in a prop, inside the child , that prop object is immutable, is passed as value, meaning the child can not or can change it but the effect is not affected the parent prop, so here the child "cart" object can be modified but wont change the parent's cart, the data flow **_unidirectionally_**, you cant change your parent prop from the child (two way binding), you can only change the child state, and that will not affect the parent prop.

```jsx
const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD", // feel free to change to your local currency
});

export default function Cart({ cart, checkout }) {
  // whatever you do to the cart here, will not affect the parent cart
  cart.push({ id: "new_pizza", name: "New Pizza", size: "M", price: 12.99 }); // no effect on parent cart

  return (
   ...
  );
}
```

### Summary

React uses one-way data flow.
"Two-way binding" in React is achieved by explicitly wiring state and event handlers.
This approach makes data flow predictable and easier to debug.

## Rendering

Let's think about how React works: when you interact with the inputs, React detects that a DOM event happens. When that happens, React thinks something may have changed so it runs a re-render. Providing your render functions are fast, this is a very quick operation. It then diffs what's currently there and what its render pass came up with. It then updates the minimum amount of DOM necessary.

## What triggers a re-render?

The component re-renders when:

- The component's state changes.
- The component's props change.
- The component's context changes.
- The parent component re-renders.

## array keys

This is a common pattern in React to render lists of items. The `key` prop is crucial for helping React identify which items have changed, are added, or are removed.

It should be a unique identifier for each item in the list, related/tied to the item, it can't be the array index, which is unrelated to the item itself.

By using a related key the React diffing algorithm can understand and identify which items have changed or swapped positions, therefore optimize rendering and avoid unnecessary updates (e.g. re-rendering all the list as it can't identify the differences in the list), improving performance.

If the component you are rendering is complex, or the list is long, you dont want to render them all the time some changed.

```jsx
{
  pizzaTypes.map((pizza) => (
    <option key={pizza.id} value={pizza.id}>
      {pizza.name}
    </option>
  ));
}
```
