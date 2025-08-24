## What is Reflow?

**Reflow** (also called layout) is the process where the browser recalculates the positions and dimensions of elements in the document. It's expensive because it can affect the entire page layout.

### What triggers Reflow:

**DOM Changes:**

- Adding/removing elements
- Changing element content
- Changing CSS classes

**Style Changes that affect layout:**

- `width`, `height`, `padding`, `margin`
- `border`, `position`, `top`, `left`
- `display`, `float`, `clear`
- Font size changes

**Browser window changes:**

- Resizing window
- Scrolling (sometimes)

**JavaScript operations:**

- Reading layout properties: `offsetWidth`, `offsetHeight`, `clientWidth`, `scrollTop`
- Calling `getBoundingClientRect()`

### How to avoid Reflow:

- Use CSS `transform` and `opacity` for animations (GPU accelerated, no reflow)
- Batch DOM reads and writes
- Use `position: absolute` or `position: fixed` to remove elements from normal flow
- Use CSS containment (`contain: layout`)
