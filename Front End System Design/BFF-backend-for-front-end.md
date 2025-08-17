# Backend for Frontend (BFF) Pattern

Backend for Frontend (BFF) is an architectural pattern where you create **separate backend services tailored specifically for different frontend applications or client types**, rather than having a single monolithic backend serve all clients.

---

## Core Concept

Instead of forcing all frontends (web, mobile, desktop) to use the same generic API, **each frontend gets its own dedicated backend service** that's optimized for its specific needs, data requirements, and constraints.

---

## How It Works

Each BFF acts as an **intermediary layer** between the frontend and your core backend services. The BFF aggregates, transforms, and formats data from multiple backend services into exactly what each frontend needs.

**Examples:**

- **Web BFF:** Might return detailed user profiles with full metadata.
- **Mobile BFF:** Returns compressed user data optimized for mobile bandwidth.
- **Smart TV BFF:** Provides simplified navigation data suitable for remote control interaction.

---

## Key Benefits

- **UI-specific APIs:** One payload per screen; no over/under-fetching.
- **Faster pages:** Aggregate multiple services in one call, cache where it helps.
- **Cleaner frontend:** Push auth, secrets, retries, and validations to the BFF.
- **Safer:** Hide internal services; apply zero-trust rules, RBAC, and request shaping.

The pattern eliminates the problems that arise when different frontends have conflicting requirements. Mobile apps might need lightweight responses due to bandwidth constraints, while web applications can handle richer data sets. Desktop applications might require different authentication flows than mobile apps.

BFF also enables frontend teams to work more independently. They can evolve their BFF service alongside their frontend without impacting other teams or waiting for changes to a shared API.

---

## Implementation Considerations

Each BFF typically handles concerns like:

- **Authentication:** Session/JWT handling, token exchange, CSRF protection.
- **Data aggregation:** Fan-out to services, combine results, normalize errors.
- **Response formatting:** Shape data for the frontend.
- **Caching strategies:** Per-route TTL, user-specific caching, stale-while-revalidate.
- **Business logic:** Presentation-layer specific.
- **Policies:** Rate-limits, input validation, schema enforcement.
- **Observability:** Logs, traces, metrics tied to UI routes.

The pattern works particularly well in **microservices architectures** where you already have multiple backend services that need orchestration, and in organizations with separate teams responsible for different frontend platforms.

---

## How it fits (compared to an API Gateway)

|                      | API Gateway                   | BFF                                      |
| -------------------- | ----------------------------- | ---------------------------------------- |
| **Scope**            | Shared, generic               | Per UI, owns view models and UX logic    |
| **Responsibilities** | Routing, auth offload, quotas | View shaping, orchestration, UI policies |
| **Usage**            | All clients                   | One per frontend (web, mobile, etc.)     |

> Many systems use both:  
> `client → BFF → (Gateway) → microservices`

---

## When to Use

- Different frontends need different shapes of the same data (web vs mobile).
- You’re compositing data from multiple services per screen.
- You need UI-aware caching, canary logic, or A/B experiments at the edge.

---

## When Not to Use

- A tiny app with one service and simple screens.
- If GraphQL (single schema) already solves over/under-fetching across clients.  
  _(You can still wrap GraphQL in a BFF if you want UI-specific rules.)_

---

## Responsibilities of a BFF

- **Auth:** Session/JWT handling, token exchange, CSRF protection.
- **Orchestration:** Fan-out to services, combine results, normalize errors.
- **Policies:** Rate-limits, input validation, schema enforcement.
- **Caching:** Per-route TTL, user-specific caching, stale-while-revalidate.
- **Observability:** Logs, traces, metrics tied to UI routes.

---

## Simple Examples

### Next.js (App Router) as a BFF (Route Handler proxy)

```ts
// app/api/bff/orders/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const token = await getUserTokenFromSession(); // your auth
  const [orders, recommendations] = await Promise.all([
    fetch(process.env.ORDERS_URL + "/me", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json()),
    fetch(process.env.RECS_URL + "/me", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json()),
  ]);

  // Shape exactly what the UI needs:
  const view = orders.map((o: any) => ({
    id: o.id,
    total: o.total_cents / 100,
    placedAt: o.created_at,
    recommended: recommendations[o.id] ?? [],
  }));

  return NextResponse.json(view, {
    headers: { "Cache-Control": "private, max-age=30" },
  });
}
```

---

### Node/Express BFF (separate service)

```js
import express from "express";
import fetch from "node-fetch";
const app = express();

app.get("/bff/home", async (req, res) => {
  const user = req.user; // from session/jwt middleware
  const [profile, feed] = await Promise.all([
    fetch(`${process.env.PROFILE}/users/${user.id}`).then((r) => r.json()),
    fetch(`${process.env.FEED}/feed?u=${user.id}`).then((r) => r.json()),
  ]);
  res.set("Cache-Control", "private, max-age=60");
  res.json({ name: profile.displayName, items: feed.items.slice(0, 10) });
});

app.listen(3001);
```

---

## BFF vs GraphQL

- **GraphQL API:** Client-driven and shared; great for ad-hoc queries across clients.
- **BFF:** Stricter server-defined endpoints per UI, plus policy and orchestration.
- **Hybrid:** You can combine them: BFF calls GraphQL internally, returns UI-specific view models.

---

## Gotchas & Tips

- **Don’t leak your domain model:** Return view models (what the page needs).
- **Keep it thin:** Orchestration + policy only; business logic stays in services.
- **Version by feature:** Since it’s per-frontend, evolve endpoints with the UI.
- **Security:** Terminate TLS, validate inputs, strip sensitive headers, implement CSRF (for cookie sessions) and rate limits.
- **Observability:** Tag requests with `x-request-id` and propagate to downstream calls.

---

## TL;DR

A **BFF** is a small, UI-specific backend that sits between a frontend and your services, simplifying the UI and optimizing data, performance, and security for that particular experience.  
It’s especially handy for multi-service backends or when you ship to multiple platforms.

---

> **Tip:**  
> If you want, I can sketch a lightweight BFF folder layout for your Next.js/Vercel setup (with auth, caching, and typed response models).

---

## BFF in Next.js: Not Exactly the Same

While Next.js server actions and API routes can serve a BFF pattern, they're more accurately described as backend capabilities within a full-stack framework rather than true BFF implementations.

### The Distinction

- **Server actions and API routes** are features that let you write backend code alongside your frontend code in the same Next.js application. They're convenient for handling form submissions, data mutations, and API endpoints without setting up a separate server.
- A **true BFF pattern** typically involves separate backend services—distinct codebases, deployments, and often different teams maintaining them. Each BFF is a dedicated service that sits between frontends and core backend systems.

### When Next.js Features Align with BFF

Next.js server actions and API routes can implement BFF-like patterns when:

- You have multiple Next.js applications (web admin panel, customer portal, mobile web app) each with their own server actions/API routes
- Each application's backend code is tailored to that specific frontend's needs
- They aggregate data from multiple external services or databases differently

### More Typical BFF Scenarios

Traditional BFF implementations often involve:

- Separate Node.js/Express services for web vs mobile apps
- Different teams maintaining iOS BFF (Swift/Node.js) vs web BFF (Node.js/Python)
- Each BFF deployed independently and calling the same core microservices

So while Next.js gives you the tools to implement BFF patterns, using server actions and API routes is more about co-locating backend logic with your frontend rather than creating dedicated backend services for different client types.

# BFF and Authentication

## Why Use Server Actions and API Routes for Auth?

What’s the advantage of using server actions and API routes to handle authentication between the frontend client and the auth system (Cognito, Auth0, Shopify Customer API, etc)?

**Key advantages:**

- **Safer:** No need to expose secrets or passwords in a public client. Secrets stay server-side.
- **Easier:** You can use confidential credentials and manage tokens securely on the server.
- **Cleaner:** The frontend only receives the result (session token, user data), never the credentials used to obtain it.

### Security Benefits

When you handle auth through server actions/API routes, you're essentially creating a confidential client. Your authentication secrets, API keys, and sensitive credentials never leave your server environment. The browser only receives the final result (like a session token or user data), not the credentials used to obtain it.

With direct frontend SDK calls, those credentials have to be public-facing, which means they're visible in your bundle and can be extracted by anyone inspecting your code or network traffic.

### Simplified Token Management

Server-side auth handling lets you manage token refresh, storage, and rotation entirely on the server. You can store sensitive tokens in secure server-side sessions or encrypted cookies rather than dealing with localStorage security concerns or complex token refresh flows in the client.

### Cleaner Error Handling

Authentication errors, rate limiting, and edge cases can be handled server-side and presented to the frontend as clean, consistent responses rather than exposing the complexity of different auth provider error formats.

### Better Control Over Auth Flow

You can implement custom business logic around authentication—like checking user permissions against your database, logging auth events, or integrating with multiple auth providers—without that complexity bleeding into your frontend code.

#### Example Pattern

```js
// Server action handles all the complexity
async function loginUser(credentials) {
  // Secret keys safe on server
  const tokens = await authProvider.authenticate(credentials);
  const userProfile = await getUserProfile(tokens.accessToken);
  // Set secure session
  await setSession(userProfile);
  return { success: true, user: userProfile };
}
```

Your frontend just calls the server action and gets back clean, processed results without ever touching sensitive auth credentials.

---

## Security Between Frontend and BFF/API Route

**Do calls to the API route need to be authenticated too? Do server actions even need that?**

### API Routes Need Authentication

Yes, API routes absolutely need authentication. They're regular HTTP endpoints that can be called by anyone who knows the URL. Without authentication, any external client could hit your `/api/login` or `/api/user-data` endpoints directly.

You typically handle this through:

- Session cookies (set after initial login)
- JWT tokens in headers
- CSRF tokens for additional protection
- Rate limiting and origin validation

```js
// API route with auth check
export async function GET(request) {
  const session = await getSession(request);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  // Safe to proceed with authenticated user
  return Response.json(await getUserData(session.userId));
}
```

### Server Actions Are More Secure by Default

Server actions have built-in CSRF protection and can only be called from forms or `useFormState`/`useFormStatus` within your Next.js application. They can't be directly invoked via external HTTP requests like API routes can.

However, you still want authentication checks in server actions because:

- Users might lose their session while the page is still loaded
- You want to ensure the right user is performing actions on their own data
- Defense in depth is always good practice

```js
// Server action with auth check
async function updateProfile(formData) {
  const session = await getServerSession();
  if (!session) {
    return { error: "Please log in" };
  }
  // Safe to proceed
}
```

### The Security Layers

You end up with multiple security boundaries:

- **Frontend → BFF:** Session/token validation
- **BFF → Auth Provider:** Secret credentials (hidden from frontend)
- **BFF → Other Services:** Service-to-service authentication

This creates a nice security model where your frontend never touches sensitive credentials, but you still validate that requests are coming from authenticated users.
