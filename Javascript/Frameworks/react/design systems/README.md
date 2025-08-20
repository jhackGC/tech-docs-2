# Front-End Systems with React: Design Systems, Testing & Accessibility

_Amazing—let’s turn those requirements into a hands-on, project-based course you can run solo or with a team. The curriculum builds a mini React design system end-to-end (components, tokens, docs, tests, a11y) and uses the exact tools you mentioned: Jest, React Testing Library, Playwright, Loki—plus WCAG throughout._

---

## TypeScript Essentials for Design Systems

Most modern React design systems are written in TypeScript for type safety, better DX, and maintainability. Here’s what you need to know:

### Why TypeScript?

- Catches bugs at compile time, not runtime
- Improves IDE autocompletion and documentation
- Enables safer, more expressive component APIs

### Key Concepts

- **Props & State Typing:** Use interfaces or types to define props and state for all components.
- **Generics:** For reusable components (e.g., polymorphic components, lists, forms).
- **Discriminated Unions:** For variant props (e.g., Button variants, Input types).
- **Type Inference:** Leverage TypeScript’s inference to reduce boilerplate.
- **Utility Types:** Use built-in types like `Partial<T>`, `Omit<T, K>`, `Pick<T, K>`, `Record<K, T>`.
- **Polymorphic Components:** Use the `as` prop pattern with generics for flexible components.
- **DefaultProps & Required Props:** Prefer required props; use default values in function signatures.

### Patterns & Best Practices

- **Strict Mode:** Enable `strict: true` in `tsconfig.json` for maximum safety.
- **Component Typing:**
  ```tsx
  type ButtonProps = {
    children: React.ReactNode;
    variant?: "primary" | "secondary";
    onClick?: () => void;
  };
  const Button: React.FC<ButtonProps> = ({
    children,
    variant = "primary",
    ...rest
  }) => (
    <button className={`btn btn-${variant}`} {...rest}>
      {children}
    </button>
  );
  ```
- **Forwarding Refs:**
  ```tsx
  import React from "react";
  type InputProps = React.ComponentPropsWithoutRef<"input"> & { label: string };
  const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, ...props }, ref) => (
      <label>
        {label}
        <input ref={ref} {...props} />
      </label>
    )
  );
  ```
- **Polymorphic Components:**
  ```tsx
  type AsProp<C extends React.ElementType> = { as?: C };
  type PolymorphicProps<C extends React.ElementType, P = {}> = P &
    AsProp<C> &
    Omit<React.ComponentPropsWithoutRef<C>, keyof P | "as">;
  function Box<C extends React.ElementType = "div">(
    props: PolymorphicProps<C>
  ) {
    const { as: Component = "div", ...rest } = props;
    return <Component {...rest} />;
  }
  ```
- **Exporting Types:** Always export your component prop types for consumers.
- **Type-Checking Stories & Tests:** Use TypeScript in Storybook stories and test files for consistency.

### Tooling

- Use `tsup`, `tsc`, or `swc` for builds
- Use `typedoc` for API docs
- Configure Storybook for TS support

### Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Polymorphic React Components in TypeScript](https://www.benmvp.com/blog/polymorphic-react-components-typescript/)

---

## Course Overview

- **Format:** 6 modules (≈ 6 weeks part-time or 2–3 weeks intensive)
- **Prereqs:** Solid JS/React basics (hooks, JSX), Git
- **Primary deliverable:** A production-ready mini design system + Storybook docs + test suite

---

## Capstone: What You’ll Build

A publishable XUI-style design system with:

- **Foundations:** design tokens (CSS variables), theming (light/dark/high-contrast)
- **Core components:** Button, ButtonLink, Input, Select/Combobox, Checkbox/Radio, Switch, Tabs, Accordion, Tooltip, Dialog/Modal, Toast, DataTable
- **Docs site:** Storybook with MDX usage guides & a11y notes
- **Quality gates:** Jest + React Testing Library (unit/integration), Playwright (E2E keyboard flows), Loki (visual regression), axe checks
- **DX/Release:** ESLint/Prettier, commit hooks, CI, versioning (Changesets), semver, migration docs

---

## Module-by-Module Breakdown

### 0. Environment & Scaffolding (½ day)

- **Goals:** repo layout, tooling, Storybook up.
- **Tasks:**
  - Create monorepo or single package (`/packages/ui`, `/apps/docs` optional)
  - Add: React, Storybook, ESLint/Prettier, Jest + RTL, Playwright, Loki, axe
- **Deliverable:** Storybook runs; tests run in CI (local)

---

### 1. HTML/CSS → Tokens & Theming (3–4 days)

- **Goals:** semantics, resilient layout, design tokens.
- **Tasks:**
  - Semantic HTML for form controls; CSS reset; focus styles
  - Tokens: color, typography, spacing, radius, shadow via `:root { --color-bg: … }`
  - Theming with CSS variables (light/dark/high-contrast), prefers-reduced-motion
  - **Lab:** build Button + ButtonLink with accessible focus & states
- **Deliverable:** Tokens documented in Storybook (MDX), Button stories

---

### 2. React Component Architecture (1 week)

- **Goals:** reusable APIs, composition, stability.
- **Tasks:**
  - Props design (sane defaults, minimal surface), controlled vs uncontrolled
  - `forwardRef`, className merging, `as` (optional), context where needed
  - Styling choices: CSS Modules vs CSS-in-JS; pick one and justify
  - **Labs:** Input, Checkbox/Radio, Switch; composable Tabs (roving tabindex)
- **Deliverable:** Components with usage docs + prop tables

---

### 3. Accessibility Deep Dive (1 week)

- **Goals:** WCAG & ARIA APG patterns implemented for real.
- **Tasks:**
  - Keyboard maps & focus management; accessible names; aria-\*
  - Critical patterns: Dialog (focus trap, aria-modal, return focus), Combobox/Listbox, Menu, Tooltip, Accordion
  - Integrate axe checks; color contrast; RTL support
  - **Labs:** Accessible Dialog & Combobox with full keyboard support
- **Deliverable:** A11y notes in stories; axe passes; manual keyboard test checklist

---

### 4. Testing Strategy (4–5 days)

- **Goals:** confidence via layered tests.
- **Tasks:**
  - Unit/Integration: Jest + RTL (behavior-first), mocks & DOM queries
  - Visual: Loki snapshots from Storybook stories
  - E2E: Playwright flows (Tab/Shift+Tab, Enter/Space/Escape)
  - Test perf: avoid flaky timers; CI parallelization; coverage gates
  - **Labs:** Tests for Dialog (open/close/restore focus), Tabs (arrow nav), Combobox (typeahead)
- **Deliverable:** Green test suite; CI job with lint/type/test/visual/e2e

---

### 5. Distribution, Docs & Ops (3–4 days)

- **Goals:** make it shippable & maintainable.
- **Tasks:**
  - Storybook MDX: usage, dos/don’ts, a11y guidance, code samples
  - Versioning & releases: Changesets → semver; migration docs; deprecations
  - Package exports, tree-shaking, sideEffects, type defs (if using TS later)
  - Support model: issues templates, triage, release notes, component ownership
  - **Lab:** Release `@acme/ui@0.1.0` (private or public), write a migration doc for a breaking change
- **Deliverable:** Published package + docs site

---

## Weekly Assessments (What “Done” Means)

- **Functionality:** all components meet API & UX spec
- **A11y:** WCAG checks pass; keyboard paths documented; axe clean
- **Testing:** ≥90% critical-path coverage; E2E for focus-heavy flows; Loki baseline stable
- **Docs:** Storybook stories for states/variants; MDX usage + a11y notes
- **Performance:** bundle size budget met; no unnecessary re-renders (checked with React Profiler)

---

## Suggested Repo Scripts

```json
{
  "scripts": {
    "dev": "storybook dev -p 6006",
    "build:stories": "storybook build",
    "test": "jest",
    "test:e2e": "playwright test",
    "test:vr": "loki test",
    "test:a11y": "node scripts/axe-scan.js",
    "lint": "eslint .",
    "format": "prettier -w .",
    "release": "changeset version && changeset publish"
  }
}
```

---

## Practice Checkpoints (Mini-briefs)

### Dialog Spec

- **Reqs:** Opens via button/Enter/Space; traps focus; closes on Esc/overlay; returns focus; aria-modal, labelled; prefers-reduced-motion friendly.
- **Tests:** RTL unit + Playwright E2E; Loki states.

### Combobox Spec

- **Reqs:** Editable input; filtered list; Up/Down/Home/End; Enter selects; aria-activedescendant; aria-expanded; screen-reader friendly.
- **Tests:** RTL keyboard path + E2E happy path.

### Tabs Spec

- **Reqs:** Roving tabindex; Left/Right/Home/End; proper role="tablist"; aria-controls / aria-labelledby.
- **Tests:** RTL + Loki (selected/hover/focus states).

---

## “Read/Watch” List (High-leverage)

- WAI-ARIA APG: Dialog, Combobox, Tabs, Menu, Accordion (focus & roles)
- WebAIM: Forms & contrast
- React docs: Managing State; Escape Hatches; Performance
- Testing Library: Queries & guiding principles
- Playwright: Keyboard & accessibility assertions
- Loki: Visual regression with Storybook

---

## Stretch Goals (If Time Allows)

- Theme switching with system preference & persisted choice
- Localization/RTL pass (dir switching + logical properties)
- Performance profiling & memoization plan for DataTable
- Codemod for API migration (e.g., Button prop rename)
