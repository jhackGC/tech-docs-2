# The DOM (Document Object Model)

## Overview

The DOM (Document Object Model) is how JavaScript interacts with HTML and CSS. It's a collection of objects and methods that allow you to manipulate the webpage from JavaScript code.

## How Browsers Work

### Typical Process:

1. You write code in your editor (like VSCode)
2. You put your code on a server so that other people can get it
3. Someone visits your website:
   - Their browser makes a request to your server for your `index.html`
   - Your server sends them a copy of the HTML
   - The browser reads the HTML, sees you have a `my-script.js` script tag
   - Browser makes another request for `my-script.js` from your server
   - Your server sends them a copy of `my-script.js`
   - The browser reads the JavaScript code and begins executing it

### Local Development

When developing locally, your computer acts as both the server and client. Your hard drive serves the files to your browser, making development easier.

## Basic DOM Manipulation

### Selecting Elements

Use `document.querySelector()` to select the first element that matches a CSS selector:

```javascript
const redSquare = document.querySelector(".red-square");
```

### Modifying Styles

You can change CSS properties through JavaScript:

```javascript
// HTML: <div class="red-square"></div>
// CSS: .red-square { color: crimson; width: 100px; height: 100px; }

const redSquare = document.querySelector(".red-square");
redSquare.style.backgroundColor = "limegreen";
```

**Important Notes:**

- CSS properties use camelCase in JavaScript (e.g., `background-color` becomes `backgroundColor`)
- `padding-right` becomes `paddingRight`
- This applies to all CSS properties when accessed via JavaScript

### Working with Multiple Elements

Use `document.querySelectorAll()` to select multiple elements:

```html
<ul>
  <li class="js-target">Unchanged</li>
  <li class="js-target">Unchanged</li>
  <li>Won't Change</li>
  <li class="js-target">Unchanged</li>
  <li>Won't Change</li>
  <li class="js-target">Unchanged</li>
</ul>
```

```javascript
const elementsToChange = document.querySelectorAll(".js-target");
for (let i = 0; i < elementsToChange.length; i++) {
  const currentElement = elementsToChange[i];
  currentElement.innerText = "Modified by JavaScript!";
}
```

## Key DOM Concepts

### document Object

- `document` is a globally available variable in the browser
- It represents the entire HTML document
- Use it to interact with HTML and CSS
- Has many methods for finding and manipulating elements

### Common DOM Methods

- `querySelector()` - Returns first element matching CSS selector
- `querySelectorAll()` - Returns all elements matching CSS selector
- `style` property - Access and modify CSS styles
- `innerText` - Get or set text content of an element

### What Else Can You Do?

Beyond styling, you can:

- Add more HTML into elements
- Remove elements
- Change text content
- Search for elements inside other elements
- Get element position on the page
- Clone elements
- And much more!

## Practice Examples

### Example 1: Change Multiple Styles

```javascript
const element = document.querySelector("#myElement");
element.style.backgroundColor = "blue";
element.style.fontSize = "20px";
element.style.marginTop = "10px";
```

### Example 2: Modify All Elements of a Class

```javascript
const buttons = document.querySelectorAll(".button");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].style.color = "white";
  buttons[i].style.backgroundColor = "navy";
}
```

## Key Takeaways

- The DOM bridges JavaScript and HTML/CSS
- Use `document.querySelector()` for single elements
- Use `document.querySelectorAll()` for multiple elements
- CSS properties become camelCase in JavaScript
- The DOM allows complete control over webpage appearance and content
- This is what makes JavaScript unique for web development

## Next Steps

Understanding the DOM is crucial for interactive web development. Next, we'll learn about events and listeners to make our webpages respond to user interactions.
