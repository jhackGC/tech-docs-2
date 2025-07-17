# Project: iOS Calculator

## Overview

Time to put everything together! We're going to rebuild the calculator from iOS using HTML, CSS, and JavaScript.

## Project Requirements

### Functionality

- Calculator should look like the iOS calculator
- Should function like a normal calculator
- **Do NOT implement** `%` or `.` (decimal) - assume all numbers are integers
- `C` means clear - clears everything and returns to initial state
- **Extra Credit:** Back arrow (⌫) acts like backspace:
  - Deletes last character typed
  - If only one digit remains, sets current number to `0`
- Don't worry about numbers being too long for the screen
- When equals is pressed, you can either:
  - Clear results when next number is typed (like real calculators)
  - Make user press `C` to clear (simpler approach)

## Planning Your Approach

### Break Down the Problem

Programming is about taking large problems and breaking them into smaller ones. Don't try to tackle everything at once!

### Suggested Order

1. Write the HTML structure first
2. Add CSS styling to match the iOS look
3. Implement JavaScript functionality

## HTML and CSS Tips

### Structure and Styling

- Use `<button></button>` elements for buttons (better for accessibility)
- Use `monospace` font for the result screen
- Multiple rows of flex-laid-out divs work well for button layout
- Alternative: One div with `flex-wrap` property

### Layout Spacing Tips

To get equal gutters (black spaces between buttons):

```css
.button {
  width: 24.5%; /* 4 buttons per row */
}
.button-row {
  justify-content: space-between; /* Even spacing */
  margin-bottom: 0.5%; /* Equal vertical spacing */
}
```

**Important:** Margin is always measured as function of width, so `margin-bottom: 0.5%` will match side gutters of `0.5%`.

### Styling Orange Buttons

- Add a special class for operator buttons
- Or use `:last-child` selector if buttons are in row divs

### General Approach

- Sometimes do the math to get exact measurements
- Sometimes guess-and-check until it looks right
- Both approaches are valid!

## JavaScript Tips

### Code Organization

- About 80 lines of JavaScript is typical for this project
- If you're writing 200+ lines, consider simplifying your approach
- Use many small functions instead of one large function
- Each function should do one thing well
- Author used 8 different functions

### State Management

You'll need to track several variables:

- Current number being displayed
- Previous number (for operations)
- Current operation (+, -, ×, ÷)
- Whether we just completed an operation

**Important:** Store these variables where they stay in scope!

### Event Handling Options

1. Add event listener to each button individually
2. Use one event listener on the button container (event delegation)

Both approaches work - choose what makes sense to you.

### Debugging

- Use `console.log()` everywhere while writing code
- Remember to remove debug logs when finished

## Understanding Types in JavaScript

### The Type Problem

Everything that goes into the DOM and comes out of the DOM is a **string**.

```javascript
const num = 10;
const div = document.querySelector(".number-target");
console.log(num, typeof num); // 10 "number"
div.innerText = num;
console.log(div.innerText, typeof div.innerText); // "10" "string"
```

### Why This Matters

For math operations, you need actual numbers:

- `"5" + "5" = "55"` (string concatenation)
- `5 + 5 = 10` (numeric addition)

### Converting Strings to Numbers

Use `parseInt()` to convert string numbers to actual numbers:

```javascript
const stringNum = "5";
const actualNum = parseInt(stringNum);
console.log(typeof stringNum); // "string"
console.log(typeof actualNum); // "number"
```

### Checking Types

Use the `typeof` operator to check data types:

```javascript
console.log(typeof "hello"); // "string"
console.log(typeof 42); // "number"
console.log(typeof true); // "boolean"
```

## Development Strategy

### 1. Start Simple

Build a basic version that can:

- Display numbers when clicked
- Clear the display
- Perform one simple operation

### 2. Add Features Gradually

Once basic version works:

- Add all four operations (+, -, ×, ÷)
- Handle multiple operations in sequence
- Add error handling

### 3. Polish

- Make it look exactly like iOS calculator
- Add the back button (extra credit)
- Test edge cases

## Calculator Logic Flow

### Basic Operations

1. User clicks number → Display updates
2. User clicks operator → Store current number and operator
3. User clicks another number → Display updates
4. User clicks equals → Perform calculation, show result

### State Tracking Example

```javascript
let currentNumber = "0";
let previousNumber = null;
let currentOperation = null;
let justCalculated = false;
```

## Common Challenges

### Challenge 1: Chaining Operations

`5 + 3 × 2 =` should equal `16`, not `11`

- Calculator performs operations left-to-right
- No order of operations in simple calculators

### Challenge 2: Multiple Equals Presses

What happens when user presses `=` multiple times?

- Some calculators repeat the last operation
- Others do nothing
- Choose what makes sense for your implementation

### Challenge 3: Leading Zeros

Handle cases like `007` → should display as `7`

## Project Files

Once you're finished (or if you get stuck), you can reference:

- [HTML Solution](https://btholt.github.io/complete-intro-to-web-dev-v3/project-files/calculator.html)
- [CSS Solution](https://btholt.github.io/complete-intro-to-web-dev-v3/project-files/calculator.css)
- [JavaScript Solution](https://btholt.github.io/complete-intro-to-web-dev-v3/project-files/calculator.js)

## Key Takeaways

- Break large problems into smaller pieces
- Plan your HTML/CSS before writing JavaScript
- Use `console.log()` for debugging
- Remember to convert strings to numbers for math
- There's no single "right" way to solve this
- Focus on making it work correctly first, then optimize

## Success Criteria

Your calculator is successful if:

- It looks reasonably like the iOS calculator
- Basic math operations work correctly
- Clear button resets everything
- Numbers display properly when clicked
- You learned something about combining HTML, CSS, and JavaScript!

Good luck, and remember: if you get stuck, break the problem down smaller!
