# In Next.js, when developing, what are the most common issues and how do you solve them?

### Hydration Mismatches

Often due to assumptions that client and server render the same content (e.g. using window during SSR).

✅ Solution: I promote component design that clearly separates SSR and CSR logic, using useEffect, dynamic imports with ssr: false, and clear SSR-safe utilities.

### Developer Environment Inconsistencies

Environment variables, .env loading, or caching issues during npm run dev.
✅ Solution: I ensure .env management is standardized and documented, and enforce using .env.local for secrets and NEXT*PUBLIC* for browser access.

### Unoptimized Development Experience

Large, complex components and lack of separation of concerns can slow productivity.
✅ Solution: I enforce a modular component architecture, use Storybook for UI development in isolation, and introduce linting/prettier and CI checks early.

### Type Safety and Prop Mismatches

Especially when consuming props in getServerSideProps or getStaticProps.
✅ Solution: I ensure we leverage InferGetServerSidePropsType or Zod schema validation to validate both backend and frontend data structures.

# In Next.js, when running in production, what are the common issues and how would you solve them?

In production, we must balance stability, performance, and observability.

Common issues include:

# Server Side Rendering not working as expected

You want your pages to be server-rendered, but they are not behaving as expected. They end up being dynamically rendered (per request), making them slower to render as the api that brings the data to render, is called on every request.

**Possible causes:**

- Accessing request-specific data (cookies, headers, session) in `getStaticProps`, which forces SSR or disables static generation.

- Using `getServerSideProps` instead of `getStaticProps`, which causes the page to be rendered on every request rather than at build time.

- Setting a very low `revalidate` interval in `getStaticProps` (ISR), making it behave almost like SSR.

- Using client-side only code (e.g., `window`, `localStorage`) in server-rendered components, causing errors or fallback to dynamic rendering.

- Runtime errors or exceptions in `getStaticProps` or `getServerSideProps`, causing fallback to SSR or error pages.

- Not using `getStaticPaths` for dynamic routes, so fallback is always blocking or SSR.

- Middleware, rewrites, or custom server logic that forces dynamic rendering.

- The page is not included in the static export due to dynamic routes or fallback settings.

**How to fix:**

- Use `getStaticProps` and `getStaticPaths` for pages that can be statically generated.
- Avoid using request-specific data in static generation.
- Set a reasonable `revalidate` interval for ISR if you need periodic updates.
- Move non-essential data fetching to the client side if it blocks static generation.
- Review your Next.js configuration and routing for settings that force SSR.
- Refactor code to avoid using browser-only APIs in server-rendered components.

# When having lots of pages to pre-render, you may run into issues with the build time

When you have a large number of pages to pre-render, the build time can become excessive, leading to timeouts or performance issues.

**Possible causes:**

- Too many pages being generated at build time, exceeding the default timeout limits.
- Inefficient data fetching or processing logic in `getStaticProps` or `getStaticPaths`.
- Large datasets being processed synchronously during the build.

**How to fix:**

- Use incremental static regeneration (ISR) to pre-render only a subset of pages at build time, and then update them on demand.
- Optimize data fetching logic to reduce the amount of data processed during the build.
- Use pagination or batching to split large datasets into smaller chunks that can be processed incrementally.
- Consider using `getStaticProps` with `revalidate` to allow pages to be updated after the initial build without requiring a full rebuild.
- If necessary, increase the build timeout settings in your hosting provider or build tool configuration to accommodate longer build times.

## Page function timeout

A function timeout when rendering a Next.js page is often caused by a slow API request in data fetching methods like getServerSideProps or getStaticProps, or directly in the component body, for the latest versions of NextJs that do not use getServerSideProps or getStaticProps. This is a common production issue.

How to address it:

- Check the function logs to identify which API call is taking too long.

- Set reasonable timeouts for API requests (e.g., using axios timeout or fetch with AbortController).

- Add error handling and fallback UI for slow or failed requests.

- Cache API responses when possible to reduce repeated calls.

- Profile and optimize the backend API for performance.

- Use loading states and consider rendering partial data if possible.

- Monitor API latency and set up alerts for slow endpoints.

- Always ensure your data fetching logic is resilient to delays and failures, so the page can render gracefully even if the API is slow or unavailable.

### Performance & Bundle Size

Bloated pages, blocking scripts, and unoptimized images can degrade UX.
✅ Solution: Use **_next/image_**, lazy loading, dynamic imports, and regularly audit bundle size with next-bundle-analyzer. We aim for Core Web Vitals alignment across all pages.

### Runtime Errors or SSR Failures

Client-side code (e.g. window, localStorage) running during SSR causes crashes.

✅ Solution: Through code review and coaching, ensure defensive coding for browser-only APIs and promote use of useEffect for hydration logic (client side).

### Incorrect Routing or Fallbacks

Misconfigured getStaticPaths can result in 404s for dynamic routes.
✅ Solution: Lead architecture reviews for routing, ensuring fallback behavior and incremental static regeneration (ISR) are implemented with analytics-based route prioritization.

### Deployment Config or CI/CD Failures

CI/CD misconfigurations (e.g. caching, build order) can lead to broken builds or downtime.
✅ Solution: Maintain production parity in staging, enforce build-time checks in CI, and work closely with DevOps to secure rollback strategies.

# What is the process to solve defects in software engineering?

1. Triage & Impact Analysis

Lead discussions to assess severity, business impact, and user exposure.

Prioritize defects using risk-based thinking and communicate timelines.

2. Reproduction & Root Cause Discovery

Guide the team in debugging, often pairing with engineers to trace logs, metrics, or APM data.

These methods:

    - Reduce noise and complexity
    - Prevent chasing false leads
    - Make debugging more efficient
    - Help ensure fixes are targeted and do not introduce regressions

Isolate and reduce the scope of the issue to a minimal reproducible example or module, making root cause analysis faster and more reliable.

Use tools like Sentry, Datadog, or custom telemetry for deep insights.

3. Fix with Quality in Mind

Encourage isolated, minimal-impact patches.

Lead or review the implementation to ensure it aligns with architectural standards and doesn't introduce regressions.

4. Validation & Automation

Validate with automated unit, integration, and regression tests.

Integrate test coverage into CI pipelines.

5. Deploy & Monitor

Leverage feature flags or canary deployments when necessary.

Post-deployment monitoring is essential; Be sure you track resolution metrics and get ready for rollbacks.

6. Postmortem & Continuous Improvement

For critical incidents, you should facilitate blameless postmortems and feed learnings into future sprints, improving systems and processes continuously.
