# SSR vs React Server Components in Next.js

## 1. Server-Side Rendering (SSR) with a Node Server

**What is it?**

- SSR means rendering React components to HTML on the server (Node.js) for each request, then sending the HTML to the browser.
- The browser receives a fully rendered HTML page, which is then hydrated (made interactive) by React on the client.
- In Next.js, this is typically done using `getServerSideProps` or the older custom server setup.

**How it works:**

- User requests a page.
- Node server runs the React code, fetches data, and renders the component tree to HTML.
- The HTML is sent to the browser, which displays content immediately.
- React JS bundle is loaded and hydrates the page, attaching event listeners and making it interactive.

**Pros:**

- Fast first paint (good for SEO and perceived performance).
- Always up-to-date data (rendered per request).

**Cons:**

- Server must run React for every request (higher server load).
- Hydration can be slow for large pages.
- All components must be serializable to the client (no server-only logic).

---

## 2. React Server Components (RSC)

**What is it?**

- RSC is a new React feature (supported in Next.js App Router) that allows you to write components that run only on the server.
- Server Components can fetch data, access secrets, and never get sent to the client. They output HTML and props for Client Components.
- Client Components (marked with `"use client"`) are still hydrated and run in the browser.

**How it works:**

- Server Components are rendered on the server, can fetch data, and output HTML/props for their children.
- Only the minimal necessary code is sent to the client (Client Components and their props).
- No hydration is needed for Server Components (they are static HTML on the client).

**Pros:**

- Server-only code (can access backend resources, secrets, etc.).
- Smaller JS bundles (less code sent to the client).
- No hydration cost for Server Components.
- Can mix and match with Client Components for interactivity.

**Cons:**

- Still experimental; not all libraries support RSC.
- Some patterns (like context, hooks) work differently between server and client.
- Requires Next.js App Router or similar framework support.

---

## 3. Key Differences

| Feature             | SSR (Node Server)             | React Server Components (RSC)        |
| ------------------- | ----------------------------- | ------------------------------------ |
| Runs on             | Node.js server (per request)  | Server (build or request, per RSC)   |
| Data fetching       | Per request, in SSR functions | In Server Components, per render     |
| Code sent to client | All components (hydrated)     | Only Client Components               |
| Hydration           | Yes (all components)          | Only Client Components               |
| Access to secrets   | No (must serialize to client) | Yes (server-only code)               |
| Interactivity       | All components                | Only Client Components               |
| Use cases           | SEO, dynamic data, legacy SSR | Modern data fetching, perf, security |

---

## 4. Summary

- **SSR**: Renders the whole page on the server for every request, then hydrates on the client. All code must be serializable and sent to the browser.
- **RSC**: Lets you write components that run only on the server, never sent to the client, and can access backend resources. Only Client Components are hydrated and interactive.

**Further reading:**

- [Next.js SSR Docs](https://nextjs.org/docs/pages/building-your-application/rendering/server-side-rendering)
- [React Server Components](https://react.dev/reference/rsc)
- [Next.js App Router and RSC](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

---

## 5. Interactivity in React Server Components

With RSC, you can explicitly choose which components are interactive (Client Components) and which are static (Server Components):

- **Server Components** (default): Run only on the server, never sent to the client, and have no interactivity or browser APIs. Great for data fetching, rendering static content, and accessing backend resources.
- **Client Components** (marked with `"use client"`): Sent to the browser, hydrated, and fully interactive. Use these for event handlers, state, and anything that needs to run in the browser.

This lets you optimize your app by keeping most of your code server-only and only making the parts that need interactivity into Client Components.

# Examples
