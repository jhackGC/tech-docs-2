# JavaScript Introduction

Welcome to the world of programming! This section introduces you to JavaScript, your first programming language. Whether you're completely new to coding or coming from another language, this guide will help you understand the fundamentals.

## Target Audience

This section is optimized for beginners who are completely new to coding. If you already know another programming language, you can skim through to familiarize yourself with JavaScript syntax and concepts.

Think of it like learning languages: if you already know Spanish, learning Italian becomes easier because you apply similar concepts with minor variations.

## What is Code?

### Code is for Humans First, Computers Second

This might surprise you, but code is essentially **notes on how to solve a particular problem** that just happens to be written in a way computers can understand.

Why is this important?

- You or someone else will need to read this code again in the future
- Maybe tomorrow, maybe in ten years
- Code should be understandable at a glance
- Think of code like a textbook - you want to jump right to the concept you need

### Key Principles

1. **You'll spend more time maintaining code than writing it**
2. **Be explicit and deliberate**
3. **Don't try to be clever - be simple and clear**
4. **Code is communication**

## How JavaScript Executes

JavaScript is **single-threaded**, meaning only one thing happens at a time. Generally, it executes:

- Line 1, then Line 2, then Line 3, etc.

Let's see this in action:

```javascript
const monthlyRent = 500;
const yearlyRent = monthlyRent * 12;
console.log(yearlyRent);
```

## Understanding Variables

### Declaring Variables

```javascript
const monthlyRent = 500;
```

- `const` - keyword that tells JavaScript we're declaring a variable
- `monthlyRent` - the variable name (no spaces allowed)
- `500` - the value we're storing

### Variable Naming

**Use camelCasing**: `monthlyRent` (like humps on a camel!)

**Good variable names are crucial:**

- Make them descriptive, even if they're long
- Should explain what the variable represents
- Help others (and future you) understand the code instantly

**Examples:**

```javascript
// Good names
const monthlyRent = 500;
const userAge = 25;
const isLoggedIn = true;

// Avoid
const mr = 500; // What is 'mr'?
const x = 25; // What does 'x' represent?
```

### Variable Rules

- Can't use JavaScript keywords (like `const`, `if`, `function`)
- No spaces in names
- Choose meaningful names over short ones

## Basic Operations

### Arithmetic

```javascript
const monthlyRent = 500;
const yearlyRent = monthlyRent * 12; // Multiplication
```

You can mix variables and numbers:

```javascript
const monthlyRent = 500;
const monthsInAYear = 12;
const yearlyRent = monthlyRent * monthsInAYear;
```

### The Semicolon (;)

- Ends each statement
- Like a period in writing
- Tells JavaScript you've completed your thought

## Console.log()

`console.log()` prints information to the JavaScript console:

```javascript
console.log(yearlyRent); // Prints: 6000
```

The JavaScript console is part of browser developer tools - this is where you'll see output and debug your code.

## Your First JavaScript Program

Let's create a working example:

### 1. Create index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>JavaScript Experiments</title>
  </head>
  <body>
    <h1>JavaScript Experiments!</h1>
    <script src="./experiments.js"></script>
  </body>
</html>
```

### 2. Create experiments.js

```javascript
const monthlyRent = 500;
const yearlyRent = monthlyRent * 12;
console.log(yearlyRent);
```

### 3. Test Your Code

1. Open the HTML file in your browser
2. Open the browser's developer console
3. You should see `6000` printed in the console

**Congratulations! You just wrote your first code!**

## Why Use Variables?

1. **Readability**: Code explains itself
2. **Maintainability**: Change values in one place
3. **Reusability**: Use the same value multiple times
4. **Semantic meaning**: Variables give context to numbers

```javascript
// Instead of this:
const total = 500 * 12;

// Do this:
const monthlyRent = 500;
const yearlyRent = monthlyRent * 12;
```

The second version tells a story about what you're calculating.

## Key Takeaways

1. **Code is communication** - write for humans first
2. **Use descriptive variable names** - they're documentation
3. **JavaScript executes line by line** - order matters
4. **Variables store and reuse values** - use them everywhere
5. **The console is your friend** - use it to test and debug

Programming is about breaking down complex problems into simple, clear steps. Start with these fundamentals and build up from here!
