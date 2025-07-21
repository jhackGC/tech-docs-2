## npm

See Javascript/NodeJS/NPM/intro.md

## Prettier

See Javascript/NodeJS/NPM/intro.md

Once installed, run

```bash
prettier src/App.js
```

This will output the formatted version of your file.

If you want to actually write the file, run

```bash
prettier --write src/App.js
```

Go check src/App.js and see it has been reformatted a bit. I will say for non-JSX React, prettier makes your code less readable. Luckily Prettier supports JSX! We'll get to that shortly.

## ESLint

On top of Prettier which takes of all the formatting, you may want to enforce some code styles which pertain more to usage: for example you may want to force people to never use with which is valid JS but ill advised to use. ESLint comes into play here. It will lint for these problems.

First of all, run npm install -D eslint@9.9.1 eslint-config-prettier@9.1.0 globals@15.9.0 to install ESLint in your project development dependencies. Then you may configure it.

There are dozens of preset configs for ESLint and you're welcome to use any one of them. The Airbnb config is very popular, as is the standard config (both of which I taught in previous versions of this class). I'm going to use a looser one for this class: the recommended JS config from ESLint. Let's create an eslint.config.mjs file to start linting our project.

We're using .mjs (module JS) because we want to use import/export for modules instead of require.

Add this to the eslint.config.mjs file:

import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} \*/
export default [
js.configs.recommended,
{
files: ["**/_.js"],
languageOptions: {
globals: { ...globals.browser, ...globals.node },
parserOptions: {
ecmaFeatures: {
jsx: true,
},
},
},
},
prettier,
];
ESLint changed a lot with version 9. In previous versions of this course we used the JSON version of configuration which is no longer supported. You have to do their newer "flat" version of config (honestly it is better.)
The /\*\* @type {import('eslint').Linter.Config[]} _/ is a VS Code / TypeScript trick to be able to do auto-completions on the config object. Super helpful to have the types available right in VS Code. It's not required.
globals is a package that is just a big JSON file of what's available in each environment. We're going to be in Node.js and Browser environments so we grabbed those two. If I was being a bit more discerning I'd carefully only apply browser configs to browser files and Node configs to Node.js files.
The config objects are applied in order. We did ESLint's JS config first, and then our custom one so we can overwrite it where we want to, and then the Prettier one should always come last as all it does is turn off rules that Prettier itself does; it doesn't add anything.
This is a combination of the recommended configs of ESLint and Prettier. This will lint for both normal JS stuff as well as JSX stuff. Let's add ESLint to our scripts:

"lint": "eslint",
Run npm run lint now and you should see we have a few errors.

🚨 ESLint will have a bunch of errors right now. Ignore them; we'll fix them in a sec.

Worth adding three things here:

With npm scripts, you can pass additional parameters to the command if you want. Just add a -- and then put whatever else you want to tack on after that. For example, if I wanted to get the debug output from ESLint, I could run npm run lint -- --debug which would translate to eslint --debug.
We can use our fix trick this way: npm run lint -- --fix.
We're going to use both JS and JSX.
ESLint is a cinch to get working with Visual Studio Code. Just download the extension.

oxlint and Biome
Two projects to watch going forward here: Biome (formerly called Rome) and oxlint. Both are written in Rust and designed to be faster than ESLint (which is written in JavaScript). ESLint at huge scale can be a bit slow and these two projects aim to fix that bottleneck. I'd still say it's early days on these projects and 99% of the time ESLint is fast enough. Still, good to keep an eye on both of the projects. Eventually both projects aim to replace Prettier as well.

Git
Git is a critical part of any project and probably something many of you are already familiar with. Install Git if you don't already have it installed. Then initialize your project as a git repo with git init in the root of your project (VSCode and any other number of tools can do this as well.)

If you haven't already, create a .gitignore at the root of your project to ignore the stuff we don't want to commit. Go ahead and put this in there:

node_modules
dist/
.env
.DS_Store
coverage/
.vscode/
This will make it so these things won't get added to our repo.

Vite
The build tool we are going to be using today is called Vite. Vite (pronounced "veet", meaning quick in French) is a tool put out by the Vue team that ultimately ends up wrapping Rollup which does the actual bundling. The end result is a tool that is both easy to use and produces a great end result.

Fun fact: there's a new project being developed called Rolldown which is written in Rust and aims to replace Rollup.

Our end result that we want from a build tool is that

We can separate files out for code organization and have a tool stitch them together for us
We can include external, third-party libraries from npm (like React!)
The tool will optimize the code for us by minifying and other optimizing techniques
Previous versions of this course used Parcel, another tool near-and-dear to my heart. It is still an amazing tool and one I recommend you check out. We ended up moving to Vite because the React community has selected it as the tool-of-choice for the moment and this course aims to give you the community norms of React. Even older versions of this course previously taught Webpack.

## Webpack vs Vite

**Webpack** is a mature, highly configurable bundler that processes and bundles all your assets (JS, CSS, images) before serving your app. It uses a single build step, which can be slow for large projects, but offers extensive plugin and loader support for complex setups.

**Vite** is a modern build tool that leverages native ES modules in the browser for lightning-fast development startup. It serves source files directly in development and only bundles for production, resulting in much faster dev server start and hot module replacement. Vite is simpler to configure for most React projects, but may have fewer advanced plugins than Webpack.

**Summary:**

- Webpack: Powerful, flexible, slower dev builds, huge ecosystem.
- Vite: Fast dev experience, modern, simpler config, newer ecosystem.

First, let's install the things we need for Vite.

npm install -D vite@5.4.2 @vitejs/plugin-react@4.3.1
The former is the tool itself and the latter is all the React specific features we will need. Now that we have those installed, we need to modify our index.html just a little bit.

<!-- delete the two unpkg script lines -->
<script type="module" src="./src/App.js"></script>

We need to add module to the script tag so that the browser knows it's working with modern browser technology that allows you in development mode to use modules directly. Instead of having to reload the whole bundle every time, your browser can just reload the JS that has changed. It allows the browser to crawl the dependency graph itself which means Vite can run lightning fast in dev mode. It will still package it up for production so we can support a range of browsers.

Next, let's make our config file. Make a file in the root of your project called vite.config.js and stick this in there:

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
plugins: [react()],
});
By default, Vite will look for the index.html file in the root directory and treat it as the head of a source graph. It'll crawl all your HTML, CSS, and JavaScript you link to from there and create your project for you. We don't have to do any more configuration than that. Vite will take care of the rest.

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
