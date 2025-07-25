# SSR - Server Side Rendering in React

SSR is the process of rendering React components on the server and sending the HTML to the client.

This improves performance and SEO. SSR allows the initial HTML to be generated on the server, so search engines and users see content faster, and internet crawlers can index your pages more effectively.

## Benefits of SSR

- **Faster initial page load**: The browser receives a fully rendered HTML page from the server.
- **Better SEO**: Search engines can crawl and index content more easily.
- **Improved social sharing**: Social media platforms can generate previews from server-rendered HTML.

## How SSR Works in React

1. The server receives a request for a page.
2. React components are rendered to HTML on the server.
3. The server sends the HTML to the client.
4. The client "hydrates" the page, attaching React event handlers and making it interactive.

## SSR with Next.js (Recommended)

Next.js is the most popular React framework for SSR. It handles routing, data fetching, and server rendering out of the box.

### Example: SSR Page in Next.js

```jsx
// pages/index.js
export async function getServerSideProps() {
  // Fetch data from an API or database
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();
  return { props: { users } };
}

export default function Home({ users }) {
  return (
    <div>
      <h1>User List (SSR)</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### How to Run

1. Install Next.js: `npm install next react react-dom`
2. Add a page to the `pages/` directory as above.
3. Run: `npm run dev`

## Basic SSR with React (Without Next.js)

You can use `react-dom/server` to render React components to HTML on the server. This is more manual and less common for production apps, but is useful for learning and custom setups.

### Example: Express + Plain React SSR

**File: App.js**

```jsx
import React from "react";

export default function App() {
  return (
    <div>
      <h1>Hello from SSR!</h1>
      <p>This page was rendered on the server.</p>
    </div>
  );
}
```

**File: server.js**

```js
import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App.js";

const server = express();

server.get("/", (req, res) => {
  const html = renderToString(<App />);
  res.send(`
    <!DOCTYPE html>
    <html>
      <head><title>SSR Example</title></head>
      <body>
        <div id="root">${html}</div>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `);
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
```

**File: client.js**

```js
import React from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./App.js";

hydrateRoot(document.getElementById("root"), <App />);
```

### How to Deploy Plain React SSR

1. **Bundle your client code**: Use a bundler like Webpack or Vite to create `bundle.js` from `client.js` and your React components.
2. **Run your server**: Start your Node.js server (e.g., `node server.js`).
3. **Deploy to a Node.js hosting provider**: You can deploy your SSR app to platforms like:
   - [Vercel](https://vercel.com/) (custom Node.js server)
   - [Heroku](https://www.heroku.com/)
   - [Render](https://render.com/)
   - [AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/)
   - Any VPS or cloud VM running Node.js

**Steps:**

- Push your code to a Git repository.
- Set up your build and start scripts in `package.json` (e.g., `build` for bundling, `start` for running the server).
- Configure your hosting provider to run `npm run build` and then `npm start`.

**Note:**
SSR with plain React requires you to handle routing, data fetching, and hydration manually. For most production apps, frameworks like Next.js are recommended for their built-in features and optimizations.

## References

- [Next.js Documentation](https://nextjs.org/docs)
- [ReactDOMServer – React Docs](https://react.dev/reference/react-dom/server)
