# CSS Grid

CSS Grid is the latest and greatest way to create layout designs with CSS. While Flexbox is great for flexible layouts, Grid is specifically designed for creating grid-based layouts, making it perfect for page layouts that follow a grid structure.

## Grid vs Flexbox

- **Grid**: Better for laying out entire pages (which are frequently grid-like)
- **Flexbox**: More flexible and useful for unique, one-dimensional layouts

## Basic Grid Example

Here's a simple 2x2 grid layout:

```html
<style>
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 10px;
    column-gap: 10px;
  }

  .grid-picture {
    margin: 0;
    padding: 0;
  }
</style>

<div class="grid">
  <img
    class="grid-picture"
    src="http://pets-images.dev-apis.com/pets/dog25.jpg"
    alt="a doggy"
  />
  <img
    class="grid-picture"
    src="http://pets-images.dev-apis.com/pets/dog26.jpg"
    alt="a doggy"
  />
  <img
    class="grid-picture"
    src="http://pets-images.dev-apis.com/pets/dog27.jpg"
    alt="a doggy"
  />
  <img
    class="grid-picture"
    src="http://pets-images.dev-apis.com/pets/dog28.jpg"
    alt="a doggy"
  />
</div>
```

## Key Grid Properties

### Gap Properties

- `row-gap`: Sets the space between rows
- `column-gap`: Sets the space between columns

### Grid Template Columns

- `grid-template-columns`: Defines the size of columns
- Can use percentages, pixels, or `fr` (fraction units)
- `1fr 1fr` = two equal columns (50% each)
- `1fr 2fr 1fr` = three columns (25%, 50%, 25%)

### Display Types

- `display: grid` - Block-level grid container
- `display: inline-grid` - Inline-level grid container

## Advanced Grid Layout Example

Here's a more complex example for laying out an entire webpage:

```html
<style>
  .my-page-header {
    grid-area: nav-header;
    background-color: red;
    padding: 10px;
  }

  .my-page-body {
    grid-area: main-body;
    background-color: blue;
    padding: 10px;
  }

  .my-page-sidebar {
    grid-area: nav-side;
    background-color: green;
    padding: 10px;
  }

  .my-page-footer {
    grid-area: footer;
    background-color: yellow;
    padding: 10px;
  }

  .my-page {
    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-template-areas:
      "nav-header nav-header"
      "nav-side main-body"
      "footer footer";
  }
</style>

<div class="my-page">
  <div class="my-page-header">the header</div>
  <div class="my-page-body">the body</div>
  <div class="my-page-sidebar">the sidebar</div>
  <div class="my-page-footer">the footer</div>
</div>
```

## Grid Areas Explained

### `grid-area`

- Allows you to name a section and refer to it later
- Names don't need to match class names

### `grid-template-areas`

- Allows you to define layout using named areas
- Enables columns that span across rows
- Use `.` to represent empty cells
- Visual representation makes layout clear

## Key Takeaways

1. **Grid is powerful**: This is just a basic introduction to CSS Grid's capabilities
2. **Perfect for page layouts**: Grid excels at creating structured page layouts
3. **Named areas**: The grid-area feature makes complex layouts intuitive
4. **Flexible sizing**: The `fr` unit makes responsive layouts easy

## Further Learning

- [Complete Guide to CSS Grid - CSS Tricks](https://css-tricks.com/snippets/css/complete-guide-grid/)
- More advanced Grid techniques and examples
- Combining Grid with Flexbox for optimal layouts

Grid opens up many possibilities for creating sophisticated, responsive layouts with clean, maintainable CSS code.
