Goals: reusable APIs, composition, stability

Reusable APIs: Components solve one problem well and can be combined (Button, Input, Tabs). Small, predictable prop surfaces.

Composition: Prefer children/slots over dozens of props. sE.g., <Dialog><Dialog.Header/><Dialog.Body/></Dialog>.

Stability: Backwards-compatible props, sensible defaults, and predictable behavior across themes/apps.

Props design (sane defaults, minimal surface), controlled vs uncontrolled

Sane defaults: Set defaults so a component is useful with zero props (e.g., type="button"; variant="primary").

Minimal surface: Each prop should have a clear, single responsibility. Avoid “prop soup.”

Controlled vs uncontrolled:

Controlled: parent owns state (value + onChange). Predictable, form-friendly, testable.

Uncontrolled: component manages internal state (defaultValue). Simpler to use, fewer re-renders.

Pattern: Offer both when sensible: value? + defaultValue? + onChange?. If value is provided, treat as controlled.

forwardRef, className merging, as (optional), context where needed

forwardRef: Pass a ref to the DOM node for focus/measure/scroll (<Input ref={r} />). Crucial for accessibility and composition.

className merging: Always append user classes to your base classes (className={${base} ${userClass || ''}}) so consumers can style/override.

as prop (optional): Let consumers change the underlying element without losing styles/behavior (e.g., Button as="a" href="/x"). Keep it if your DS needs polymorphism; skip if it adds confusion.

Context: Use for shared, cross-component state (e.g., Tabs group state). Don’t put frequently changing per-item state in context (triggers re-renders).

Styling choices: CSS Modules vs CSS-in-JS (pick and justify)

CSS Modules (+ CSS variables):

Pros: tiny runtime, great tree-shaking, easy SSR, works with design tokens via var(--token).

Cons: dynamic variants need class logic in JS.

Good default for design systems focused on performance and broad compatibility.

CSS-in-JS (e.g., styled-components, Emotion, vanilla-extract/compiled):

Pros: powerful variants/themes colocated with JS; great DX.

Cons: potential runtime cost (varies by library), SSR complexity (not for all libs).

Use when you need many dynamic variants or theming logic tightly coupled to component state.

Rule of thumb: start with CSS Modules + tokens. Reach for CSS-in-JS only if you truly need dynamic runtime styling.

Labs: Input, Checkbox/Radio, Switch; composable Tabs (roving tabindex)

Input: controlled/uncontrolled support; label + id/htmlFor; error/help text; aria-invalid; focus ring.

Checkbox/Radio: native inputs under the hood; keyboard support (Space, Arrow in radio groups); proper name grouping for radios.

Switch: keyboard (Space/Enter), role="switch" + aria-checked; focus outline; not a replacement for checkbox in forms unless mapped.

Tabs: “roving tabindex” (only one tab has tabIndex=0, others -1); Arrow keys move focus; Enter/Space activates; link tabs to panels via aria-controls/aria-labelledby.

Deliverable: Components with usage docs + prop tables

Docs (Storybook/MDX):

What it is, when to use, accessibility notes, keyboard map, do/don’t.

Variants, states (hover/focus/disabled/error), examples with real copy.

Prop tables:

name, type (TS), default, required?, description, a11y notes (e.g., “if aria-label is used, children should be icon-only”).

Quality gates: examples covered by tests (RTL), at least one keyboard E2E (Playwright), and a Loki snapshot per visual state.

If you want, I can add a tiny code pack showing: (1) a dual controlled/uncontrolled Input, (2) a forwardRef Button, and (3) a Tabs roving-tabindex handler you can paste into your repo.