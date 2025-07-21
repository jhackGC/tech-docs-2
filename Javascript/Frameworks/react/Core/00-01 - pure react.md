# React with No Tooling or Build

A simple HTML page importing React and ReactDOM libraries:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React with no tooling or build</title>
  </head>
  <body>
    <div id="root">not rendered</div>
    <script src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
  </body>
</html>
```

Run it with [vercel/serve](https://github.com/vercel/serve):

```bash
npx serve
```

That command will return something like:

```bash
┌──────────────────────────────────────────────────┐
│                                                  │
│   Serving!                                       │
│                                                  │
│   - Local:    http://localhost:59300             │
│   - Network:  http://192.168.50.206:59300        │
│                                                  │
│   This port was picked because 3000 is in use.   │
│                                                  │
│   Copied local address to clipboard!             │
│                                                  │
└──────────────────────────────────────────────────┘
```

And check it out here:

```
http://localhost:<the port the serve service has started, usually 3000, but check the terminal output to get it>/Javascript/Frameworks/react/Core/00-01 - pure react example/00-01 - pure react example.html
```

We're adding a root div. We'll render our React app here in a sec. It doesn't have to be called `root`, just a common practice.

We have two script tags:

- The first is the React library. This library is the interface of how to interact with React; all the methods (except one) will be via this library. It contains no way of rendering itself though; it's just the API.
- The second library is the rendering layer. Since we're rendering to the browser, we're using React DOM. There are other React libraries like React Native, React Unity, React Babylon.js, React Email, React Figma, React Blessed, and others. You need both script tags. The order is not important.

The last script tag is where we're going to put our code. You don't typically do this but I wanted to start as simple as possible. This script tag must come after the other two.

Make a new directory called `src` and a new file called `App.js` in that directory and put this in there:

```javascript
const App = () => {
  return React.createElement(
    "div",
    {},
    React.createElement("h1", {}, "Pixel Perfect Pizzas")
  );
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
```

This is about the simplest React app you can build.

The first thing we do is make our own component, `App`.

React is all about making components. And then taking those components and making more components out of those.

There are two types of components: function components and class components. This is a function component.

A function component must return markup (which is what `React.createElement` generates).

These component render functions have to be fast. This function is going to be called a lot. It's a hot code path.

Inside of the render function, you cannot modify any sort of state.

Put in functional terms, this function must be pure.
You don't know how or when the function will be called so it can't modify any ambient state.

`React.createElement` creates one instance of some component. If you pass it a string, it will create a DOM tag with that as the string. We used `h1` and `div`, those tags are output to the DOM. If we put `x-custom-date-picker`, it'll output that (so web components are possible too.)

The second empty object (you can put `null` too) is attributes we're passing to the tag or component.

Whatever we put in this will be output to the element (like `id` or `style`).

First we're using `document.getElementById` to grab an existing div out of the HTML document.
Then we take that element (which we called `container`) and pass that into `ReactDOM.createRoot`.
This is how we signal to React where we want it to render our app.
Note later we can `root.render` again to change what the root of our React app looks like (I rarely need to do that.)

Notice we're using `React.createElement` with `App` as a parameter to `root.render`.

We need an instance of `App` to render out.
`App` is a class of components and we need to render one instance of a class.
That's what `React.createElement` does: it makes an instance of a class.

`ReactDOM.createRoot` is a new API as of React v18.
The old `ReactDOM.render` is still available (and deprecated) but it'll render your app in "legacy" mode which won't use all the fun new features packed into React v18.

After run it will render:

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React with no tooling or build</title>
  </head>
  <body>
    <div id="root">
      <div><h1>Pixel Perfect Pizzas</h1></div>
    </div>
    <script src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
    <script src="./src/App.js"></script>
  </body>
</html>
```

---

## Vanilla React Components

Now that we've done that, let's separate this out from a script tag on the DOM to its own script file (best practice).

Modify your code in `App.js` so it looks like:

```javascript
const Pizza = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "The Pepperoni Pizza"),
    React.createElement("p", {}, "Mozzarella Cheese, Pepperoni"),
  ]);
};

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Pixel Perfect Pizzas"),
    React.createElement(Pizza),
    React.createElement(Pizza),
    React.createElement(Pizza),
  ]);
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
```

🚨 You will be seeing a console warning:

> Warning: Each child in a list should have a unique "key" prop.

in your browser console. React's dev warnings are trying to help your code run faster. Basically, React tries to keep track of components that are swapped in order. In a list, it does that by you giving it a unique key it can track. If it sees two things have swapped, it'll just move the components instead of re-rendering.

To make an element have multiple children, just pass it an array of elements.

We created a second new component, the `Pizza` component. This component represents one pizza. When you have distinct ideas represented as markup, that's a good idea to separate that into a component like we did here.

Since we have a new `Pizza` component, we can use it multiple times! We just use multiple calls to `React.createElement`.

In `createElement`, the last two parameters are optional. Since `Pizza` has no props or children (it could, we just didn't make it use them yet) we can just leave them off.

Okay so we can have multiple pizzas but it's not a useful component yet since not all pizza will be a pepperoni pizza. Let's make it a bit more complicated.

```javascript
const Pizza = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("p", {}, props.description),
  ]);
};

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Pixel Perfect Pizzas"),
    React.createElement(Pizza, {
      name: "The Pepperoni Pizza",
      description: "Mozzarella Cheese, Pepperoni",
    }),
    React.createElement(Pizza, {
      name: "The Hawaiian Pizza",
      description: "Sliced Ham, Pineapple, Mozzarella Cheese",
    }),
    React.createElement(Pizza, {
      name: "The Big Meat Pizza",
      description: "Bacon, Pepperoni, Italian Sausage, Chorizo Sausage",
    }),
  ]);
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
```

Now we have a more flexible component that accepts props from its parent. Props are variables that a parent (`App`) passes to its children (the instances of `Pizza`). Now each one can be different! Now that is far more useful than it was since this `Pizza` component can represent not just a pepperoni, but any Pizza. This is the power of React! We can make multiple, re-usable components. We can then use these components to build larger components, which in turn make up yet-larger components. This is how React apps are made!

---

## Conclusion

React broke away from the MVC approach at the time, favoring a component-based architecture that promotes reusability and Single Responsibility Principle (SRP). All the view, model, and controller logic is encapsulated within components, making it easier to manage and much more productive.

React components do encapsulate aspects of Model, View, and Controller, but not in the traditional MVC sense. In React:

- **View**: The JSX (or the return value of the render function) defines what is displayed—this is the "View".
- **Model**: The component's state (using `useState`, `useReducer`, or class state) holds the data—this is the "Model".
- **Controller**: The event handlers and functions inside the component (such as `onClick`, `handleChange`, etc.) act as the "Controller", managing user input and updating state.

**In summary:**

- The **View** is the rendered output.
- The **Model** is the state/data managed by the component.
- The **Controller** is the logic (event handlers) that updates the state in response to user actions.

React components blend these roles together, making each component self-contained and responsible for its own data, UI, and logic. This is a key difference from classic MVC, where these concerns are separated into different layers.
