# REACT - FRONT END MASTER COURSE

https://react-v9.holt.courses/

## Tools

### npm

See [Javascript/NodeJS/NPM/intro.md](/Javascript/NodeJS/NPM/intro.md)

### Prettier

See [Javascript/Tooling/prettier/prettier.md](/Javascript/Tooling/prettier/prettier.md)

### ESLint

See [Javascript/Tooling/eslint/eslint.md](/Javascript/Tooling/eslint/eslint.md)

### Git

See [GIT/git.md](/GIT/git.md)

### Vite

See [Javascript/Tooling/bundlers/vite/vite.md](/Javascript/Tooling/bundlers/vite/vite.md)

# Tooling

## Vite

Build your app with React modules bundled with Vite.

<!-- delete the two react unpkg script lines -->

```html
<script src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
```

Vite will take care of adding the React code to your code.

We need to add type="module" to the App script tag so that the browser knows it's working with modern browser technology that allows you in development mode to use modules directly.

Instead of having to reload the whole bundle every time, your browser can just reload the JS that has changed. It allows the browser to crawl the dependency graph itself which means Vite can run lightning fast in dev mode. It will still package it up for production so we can support a range of browsers.

```html
<script type="module" src="./src/App.js"></script>
```

Next, let's make our config file. Make a file in the root of your project called vite.config.js and stick this in there:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
```

By default, Vite will look for the index.html file in the root directory and treat it as the head of a source graph.

It'll crawl all your HTML, CSS, and JavaScript you link to from there and create your project for you. We don't have to do any more configuration than that. Vite will take care of the rest.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React with Vite</title>
  </head>
  <body>
    <div id="root">not rendered</div>
    <script type="module" src="./src/App.js"></script>
  </body>
</html>
```

## JSX

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
npm i -D eslint-plugin-react@7.37.1
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

So now JSX is demystified a bit, let's go convert `App.js`.

// rename the file App.jsx
// delete the React import
import { createRoot } from "react-dom/client";
import Pizza from "./Pizza";

// delete the Pizza component

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

Also head over to `index.html` and change the script tag:

```html
<script type="module" src="./src/App.jsx"></script>
```

Notice we have `Pizza` as a component. Notice that the `P` in `Pizza` is capitalized. It must be. If you make it lowercase, it will try to have `pizza` as a web component and not a React component.

We now pass props down as we add attributes to an HTML tag. Pretty cool.

You can test your app by running `npm run dev` and opening the URL shown in the terminal. It's typically [http://localhost:5173/](http://localhost:5173/)

---

## The API / Image Server

For this course we will use a little Fastify server I built for you. It's in the `api` directory. We are going to use Vite.js to proxy to this API server. This is a useful trick to do for local development if you have a separate frontend and backend. Normally you'd have something like NGINX routing traffic to separate frontend and backend servers. For now we'll just use Vite.

> **Note:** This means you'll need to have **TWO** terminal windows running. One terminal for the API server (which you won't have to touch once it's running). The other terminal is our Vite server for our web app.

Add this to your `vite.config.js`:

```js
// replace export
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/public": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
```

### Run the API Server

If you didn't do this earlier in the course, download or clone the `citr-v9-project` repo. You only need the `api` directory for the API server.

Open a new terminal and navigate to the `api` directory. Note that this server is outside your project directory.

Using Node 20 or higher, go into the `api` directory, install the dependencies, and run the server:

```bash
cd citr-v9-project/api
npm install
npm run dev
```

The server should start on port 3000. To verify it's working, visit [http://localhost:3000/api/pizzas](http://localhost:3000/api/pizzas) and you should see the pizza JSON data.

You need both servers running at the same time. With the Vite proxy configuration from above, your Vite server will intercept `/api` and `/public` calls in the React application and reroute them to your API server!

---

## Now let's add images to our Pizza

// return inside Pizza, inside div, under <p>

```jsx
<img src={props.image} alt={props.name} />
```

Now in `App.jsx`:

// add to first Pizza

```jsx
image={"/public/pizzas/pepperoni.webp"}
```

// add to second Pizza

```jsx
image={"/public/pizzas/hawaiian.webp"}
```

// add to third Pizza

```jsx
image={"/public/pizzas/big_meat.webp"}
```

And now you should have images!

---

🏁 Click here to see the state of the project up until now: 03-jsx
