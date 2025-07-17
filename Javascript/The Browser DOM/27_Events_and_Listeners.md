# Events and Listeners

## Overview

Events and listeners allow us to make websites reactive to user interactions. We use JavaScript to "listen" for events (like clicks, typing, etc.) and respond with functions.

## What Are Events?

Events are created when certain things happen on a webpage:

- User clicks a button
- User types in an input field
- User moves their mouse
- Page finishes loading
- And many more!

## What Are Event Listeners?

Event listeners are functions that "listen" for specific events and run code when those events occur. We attach event listeners to HTML elements using JavaScript.

## Basic Event Listening

### Click Events

```html
<button class="event-button">Click me!</button>
```

```javascript
const button = document.querySelector(".event-button");
button.addEventListener("click", function () {
  alert("Hey there!");
});
```

**Breaking it down:**

1. Select the button using `querySelector`
2. Call `addEventListener()` with two parameters:
   - Event name: `"click"`
   - Callback function: runs when event happens
3. The callback function shows an alert dialog

**Note:** The `});` at the end has:

- `}` - closes the function
- `)` - closes the `addEventListener()` call
- `;` - ends the statement

### Input Events - keyup

```html
<input placeholder="type into me!" class="input-to-copy" />
<p class="p-to-copy-to">Nothing has happened yet.</p>
```

```javascript
const input = document.querySelector(".input-to-copy");
const paragraph = document.querySelector(".p-to-copy-to");

input.addEventListener("keyup", function () {
  paragraph.innerText = input.value;
});
```

**How it works:**

- `keyup` event fires when you release a key
- `input.value` gets the current text in the input
- `paragraph.innerText` updates the paragraph content
- Result: Whatever you type appears instantly in the paragraph

**Note:** Use `keyup` instead of `keydown` because `keydown` fires before the key registers, making you one character behind.

### Input Events - change

```html
<div class="color-box"></div>
<input class="color-input" placeholder="Type a color here!" />
```

```css
.color-box {
  background-color: limegreen;
  width: 100px;
  height: 100px;
}
```

```javascript
const input = document.querySelector(".color-input");
const colorBox = document.querySelector(".color-box");

input.addEventListener("change", function () {
  colorBox.style.backgroundColor = input.value;
});
```

**About change events:**

- Fires when user types and then unfocuses the input (clicks elsewhere or presses Tab)
- Try typing "red" then clicking somewhere else
- Invalid colors are ignored (no error, just no change)

## Event Delegation

### The Problem

If you have many elements that need event listeners, attaching one to each is tedious.

### The Solution: Event Bubbling

When an event fires on an element, it "bubbles up" to its parent, then its parent's parent, etc., until it reaches the root element.

```html
<div class="button-container">
  <button>1</button>
  <button>2</button>
  <button>3</button>
  <button>4</button>
  <button>5</button>
</div>
```

```javascript
document
  .querySelector(".button-container")
  .addEventListener("click", function (event) {
    alert(`You clicked on button ${event.target.innerText}`);
  });
```

**How it works:**

1. We attach ONE event listener to the parent container
2. When any button is clicked, the event bubbles up to the container
3. The `event` parameter contains information about what happened
4. `event.target` tells us which element originally triggered the event
5. `event.target.innerText` gets the text of the clicked button

## Event Object

Every event listener receives an event object as its first parameter:

```javascript
element.addEventListener("click", function (event) {
  console.log(event.target); // Element that triggered the event
  console.log(event.type); // Type of event ("click")
  console.log(event.target.innerText); // Text content of the element
});
```

## Common Event Types

### Mouse Events

- `click` - User clicks an element
- `dblclick` - User double-clicks
- `mousedown` - Mouse button pressed
- `mouseup` - Mouse button released
- `mouseover` - Mouse enters element
- `mouseout` - Mouse leaves element

### Keyboard Events

- `keydown` - Key is pressed down
- `keyup` - Key is released
- `keypress` - Key is pressed (deprecated)

### Form Events

- `change` - Input value changes (after unfocus)
- `input` - Input value changes (immediately)
- `submit` - Form is submitted
- `focus` - Element receives focus
- `blur` - Element loses focus

### Window Events

- `load` - Page finishes loading
- `resize` - Window is resized
- `scroll` - Page is scrolled

## Best Practices

### 1. Use Specific Event Types

```javascript
// Good - specific to user need
input.addEventListener("keyup", updatePreview);

// Less ideal - fires too often
input.addEventListener("keydown", updatePreview);
```

### 2. Use Event Delegation for Multiple Elements

```javascript
// Good - one listener for many buttons
container.addEventListener("click", handleButtonClick);

// Less efficient - multiple listeners
buttons.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});
```

### 3. Keep Callback Functions Small

```javascript
// Good - clean and readable
button.addEventListener("click", function () {
  updateCounter();
  saveToStorage();
  showMessage();
});

// Better - separate function
function handleButtonClick() {
  updateCounter();
  saveToStorage();
  showMessage();
}
button.addEventListener("click", handleButtonClick);
```

## Alert Function Note

`alert()` is part of the DOM and is technically `window.alert()`, but you can omit `window.` when working in browsers. Alert creates annoying popup dialogs - use sparingly!

## Key Takeaways

- Events make websites interactive and responsive
- Use `addEventListener()` to listen for events
- Event listeners take an event name and callback function
- Event objects contain useful information about what happened
- Event delegation helps manage multiple similar elements efficiently
- Choose the right event type for your needs (keyup vs keydown, click vs change)

## Next Steps

With events and listeners, you can create truly interactive web experiences. Next, we'll build a project that puts DOM manipulation and events together!
