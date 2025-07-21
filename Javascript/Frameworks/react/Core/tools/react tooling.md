## npm

See [Javascript/NodeJS/NPM/intro.md](/Javascript/NodeJS/NPM/intro.md)

## Prettier

See [Javascript/Tooling/prettier/prettier.md](/Javascript/Tooling/prettier/prettier.md)

## ESLint

See [Javascript/Tooling/eslint/eslint.md](/Javascript/Tooling/eslint/eslint.md)

## Git

See [GIT/git.md](/GIT/git.md)

## Vite

See [Javascript/Tooling/bundlers/vite/vite.md](/Javascript/Tooling/bundlers/vite/vite.md)

Okay, let's actually install React to our project.

npm install react@18.3.1 react-dom@18.3.1
We did not include the -D because React is not a development tool, it's a production dependency
React and ReactDOM are versioned together so you can assume those versions will always be the same
Finally, head to App.js and modify the following

// add to the top
import React from "react";
import { createRoot } from "react-dom/client";

// modify the createRoot call, delete "ReactDOM"
const root = createRoot(container);
Now let's set up our scripts to start Vite. In package.json, put:

// inside scripts
"dev": "vite",
"build": "vite build",
"preview": "vite preview"

Be sure to also add `"type": "module"` to your `package.json`. Vite has deprecated support for Common.js and now requires you to use ESM style modules.

> **Note:** You will get a warning from Vite like: "Files in the public directory are served at the root path. Instead of /public/style.css, use /style.css." – ignore this, we'll fix it in a bit.

`dev` will start the development server, typically on [http://localhost:5173/](http://localhost:5173/). `build` will prepare static files to be deployed (to somewhere like GitHub Pages, Vercel, Netlify, AWS S3, etc.). `preview` lets you preview your production build locally.

Note that we've changed domains here. By default, Vite uses `localhost:5173`. Fun fact: 5173 sort of spells VITE if you make the 5 its Roman Numeral version, V.

---

## Alternatives

There are a myriad of fantastic developer tools out there available. We chose Vite because the industry has been using it for a while but I have zero problem with you selecting other tools. Just trying to expose everyone to great tools.

In particular, [esbuild](https://esbuild.github.io/) is a wonderful tool to take a look at as well.
