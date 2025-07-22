# REACT - JSX

So far we've been writing React without JSX, something that I don't know anyone that actually does with their apps. Everyone uses JSX. I've shown you the createElement way so you'll understand what JSX is actually doing. It doesn't do hardly anything. It just makes your code a bit more readable.

If I write `React.createElement("h1", { id: "main-title" }, "My Website");`, what am I actually trying to have rendered out? `<h1 id="main-title">My Website</h1>`, right? What JSX tries to do is to shortcut this translation layer in your brain so you can just write what you mean.

Make a new file called `Pizza.jsx`.

Make sure you call it `.jsx` and not `.js`. Vite won't do JSX transpilation if it's not named with a JSX file extension.

```jsx
const Pizza = (props) => {
  return (
    <div className="pizza">
      <h1>{props.name}</h1>
      <p>{props.description}</p>
    </div>
  );
};

export default Pizza;
```

I don't know about you, but I find this far more readable. And if it feels uncomfortable to you to introduce HTML into your JavaScript, I invite you to give it a shot until the end of the workshop. By then it should feel a bit more comfortable. And you can always go back to the old way.

However, now you know what JSX is doing for you. It's just translating those HTML tags into `React.createElement` calls. That's it. Really. No more magic here. JSX does nothing else. Many people who learn React don't learn this.

npm i -D eslint-plugin-react@7.37.1

Notice the strange `{props.name}` syntax: this is how you output JavaScript expressions in JSX. An expression is anything that can be the right side of an assignment operator in JavaScript, e.g. `const x = <anything that can go here>`. If you take away the `{}` it will literally output `props.name` to the DOM.

Notice we don't have to do `import React from 'react'` here like we used to. The latest version of JSX handles that for you so you only need to explicitly import the React package when you need to use something from it; otherwise feel free to do JSX without having to import React!

---

## ESLint for JSX

Let's fix our ESLint as JSX adds new twists and turns we need help with. Please install:

```bash
npm i -D eslint-plugin-react
```

Then in your `eslint.config.mjs`:

```js
// at top, import the ESLint reactPlugin
import reactPlugin from "eslint-plugin-react";

// under js.configs.recommended line
{
  ...reactPlugin.configs.flat.recommended,
  settings: {
    react: {
      version: "detect",
    },
  },
},
reactPlugin.configs.flat["jsx-runtime"],

// add to files
files: ["**/*.js", "**/*.jsx"], // add JSX

// after the languageOptions object:
rules: {
  "react/no-unescaped-entities": "off",
  "react/prop-types": "off",
},
```

You can also copy the full config from the repo.

We have to add two configs: one to allow ESLint to understand React and add some basic React rules, and one to modernize it as React 17 changed a bit how ESLint interacts with React.

We're also turning off two rules that I don't find particularly useful: unescaped entities (which make you change things like `'` into `&apos;`) and prop types which no one has used in a decade at this point. Otherwise we should be good to go.

---

## Back to JSX

```jsx
const App = () => {
  return (
    <div>
      <h1>Padre Gino's Pizza – Order Now</h1>
      <Pizza name="Pepperoni" description="Mozzarella Cheese, Pepperoni" />
      <Pizza
        name="The Hawaiian Pizza"
        description="Sliced Ham, Pineapple, Mozzarella Cheese"
      />
      <Pizza
        name="The Big Meat Pizza"
        description="Bacon, Pepperoni, Italian Sausage, Chorizo Sausage"
      />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
```

```html
<script type="module" src="./src/App.jsx"></script>
```

The source is now coming from App.jsx, which is a JSX file.

Notice we have `Pizza` as a component. Notice that the `P` in `Pizza` is capitalized. It must be. If you make it lowercase, it will try to have `pizza` as a web component and not a React component.

We now pass props down as we add attributes to an HTML tag.

## Self closing

All tags have to be closed, like xml.
