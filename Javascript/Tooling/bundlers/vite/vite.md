Vite is a build tool put out by the Vue team that ultimately ends up wrapping Rollup which does the actual bundling.

The end result is a tool that is both easy to use and produces a great end result.

Our end result that we want from a build tool is that

We can separate files out for code organization and have a tool stitch them together for us

We can include external, third-party libraries from npm (like React!)
The tool will optimize the code for us by minifying and other optimizing techniques
Previous versions of this course used Parcel, another tool near-and-dear to my heart. It is still an amazing tool and one I recommend you check out. We ended up moving to Vite because the React community has selected it as the tool-of-choice for the moment and this course aims to give you the community norms of React. Even older versions of this course previously taught Webpack.

Vite is primarily used for building front-end applications, especially with frameworks like React, Vue, and Svelte.

## Webpack vs Vite

**Webpack** is a mature, highly configurable bundler that processes and bundles all your assets (JS, CSS, images) before serving your app. It uses a single build step, which can be slow for large projects, but offers extensive plugin and loader support for complex setups.

**Vite** is a modern build tool that leverages native ES modules in the browser for lightning-fast development startup. It serves source files directly in development and only bundles for production, resulting in much faster dev server start and hot module replacement. Vite is simpler to configure for most React projects, but may have fewer advanced plugins than Webpack.

**Summary:**

- Webpack: Powerful, flexible, slower dev builds, huge ecosystem.
- Vite: Fast dev experience, modern, simpler config, newer ecosystem.

## React

First, let's install the things we need for Vite.

```bash
npm install -D vite@5.4.2 @vitejs/plugin-react@4.3.1
```

The `@vitejs/plugin-react` is the React plugin for Vite. It provides support for React features like JSX and Fast Refresh. The `vite` package is the core Vite tool.

The former is the tool itself and the latter is all the React specific features we will need.
