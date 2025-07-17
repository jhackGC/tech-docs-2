---
title: JavaScript Scope & Variable Visibility
layout: clean
---

# JavaScript Scope

Scope determines where variables can be accessed in your code. Understanding scope is crucial for writing bug-free JavaScript and avoiding common errors.

## What is Scope?

**Scope** is the context in which variables are accessible. Think of it as a workspace - variables defined in a function have their own private workspace that other parts of your code can't access.

## Function Scope

Every function creates its own scope:

```javascript
function addFive(number) {
  const someVariable = "you can't see me outside this function";
  return number + 5;
}

addFive(10);
console.log(someVariable); // ReferenceError: someVariable is not defined
```

**What happens:**

1. `someVariable` exists only inside the `addFive` function
2. Once the function finishes, `someVariable` is discarded
3. Trying to access it outside the function causes an error

## Block Scope

Variables declared with `let` and `const` are also confined to their block (between `{` and `}`):

```javascript
let friendsAtYourParty = 0;
for (let i = 0; i <= 10; i++) {
  friendsAtYourParty++;
}
console.log(i); // ReferenceError: i is not defined
```

**What happens:**

1. `i` exists only inside the for loop block
2. After the loop ends, `i` is thrown away
3. You can't access `i` outside the loop

## The Rule of Scope

**General rule**: A variable is "alive" (accessible) between the closest `{` until its corresponding `}`.

```javascript
{
  // Scope starts here
  const message = "Hello";
  console.log(message); // Works - we're inside the scope
} // Scope ends here
console.log(message); // Error - message is out of scope
```

## Scope Examples

Let's work through a complex example:

```javascript
const A = "A"; // Global scope
let F; // Global scope

function doStuff(B) {
  // B is a parameter (function scope)
  console.log(B); // ✅ Works - B is in scope
  const C = "C"; // Function scope
  let H = "H"; // Function scope

  if (1 + 1 === 2) {
    const D = "D"; // Block scope (inside if)
    H = "something else"; // Modifying H from outer scope
  }

  console.log(D); // ❌ Error - D is out of scope
  console.log(H); // ✅ Works - H is in function scope
  F = "F"; // Modifying global variable
}

let E = 0; // Global scope
while (E < 3) {
  E++;
  console.log(A); // ✅ Works - A is global
  const G = "G"; // Block scope (inside while)
}
console.log(E); // ✅ Works - E is global
console.log(G); // ❌ Error - G is out of scope

doStuff("B");
console.log(B); // ❌ Error - B was a parameter
console.log(C); // ❌ Error - C was in function scope
console.log(F); // ✅ Works - F is global
```

## Types of Scope

### 1. Global Scope

Variables declared outside any function or block:

```javascript
const globalVar = "I'm global";
let anotherGlobal = "Me too";

function anyFunction() {
  console.log(globalVar); // ✅ Works - can access global variables
  console.log(anotherGlobal); // ✅ Works
}
```

### 2. Function Scope

Variables declared inside a function:

```javascript
function myFunction() {
  const functionVar = "I'm local to this function";
  let anotherFunctionVar = "Me too";

  console.log(functionVar); // ✅ Works inside the function
}

console.log(functionVar); // ❌ Error - not accessible outside
```

### 3. Block Scope

Variables declared inside any block (`if`, `for`, `while`, etc.):

```javascript
if (true) {
  const blockVar = "I'm in a block";
  let anotherBlockVar = "Me too";
  console.log(blockVar); // ✅ Works inside the block
}

console.log(blockVar); // ❌ Error - not accessible outside the block
```

## Scope Chain

JavaScript looks for variables in this order:

1. **Current scope** - Look in the immediate scope
2. **Outer scope** - Look in the containing scope
3. **Global scope** - Look in the global scope
4. **Error** - If not found anywhere, throw an error

```javascript
const global = "I'm global";

function outer() {
  const outerVar = "I'm in outer";

  function inner() {
    const innerVar = "I'm in inner";

    console.log(innerVar); // Found in current scope
    console.log(outerVar); // Found in outer scope
    console.log(global); // Found in global scope
    console.log(notFound); // Error - not found anywhere
  }

  inner();
}

outer();
```

## Common Scope Issues

### 1. Accessing Variables Too Early

```javascript
console.log(myVar); // ❌ Error - can't access before declaration
const myVar = "Hello";
```

### 2. Loop Variables Leaking

```javascript
// Problem with var (old way)
for (var i = 0; i < 3; i++) {
  // loop body
}
console.log(i); // 3 - var leaks out of the loop

// Solution with let (modern way)
for (let j = 0; j < 3; j++) {
  // loop body
}
console.log(j); // ❌ Error - let stays in the loop
```

### 3. Unintentional Global Variables

```javascript
function problematic() {
  // Forgot to declare with const/let
  accidentalGlobal = "Oops!"; // Creates global variable
}

problematic();
console.log(accidentalGlobal); // "Oops!" - accessible globally
```

## Practical Examples

### Shopping Cart with Scope

```javascript
function createShoppingCart() {
  let items = []; // Private to this function
  let total = 0; // Private to this function

  function addItem(name, price) {
    items.push({ name, price });
    total += price;
    console.log(`Added ${name} for $${price}`);
  }

  function getTotal() {
    return total;
  }

  function getItems() {
    return items.slice(); // Return a copy, not the original
  }

  // Return public interface
  return {
    add: addItem,
    total: getTotal,
    items: getItems,
  };
}

const cart = createShoppingCart();
cart.add("Shirt", 25);
cart.add("Pants", 40);
console.log(cart.total()); // 65

// Can't access items directly - they're private!
console.log(items); // ❌ Error - items is not accessible
```

### Counter with Closure

```javascript
function createCounter() {
  let count = 0; // Private variable

  return function () {
    count++;
    return count;
  };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter2()); // 1 - different counter
console.log(counter1()); // 3
```

## Best Practices

### 1. Minimize Global Variables

```javascript
// Avoid
var userName = "John";
var userAge = 30;
var userEmail = "john@example.com";

// Better
const user = {
  name: "John",
  age: 30,
  email: "john@example.com",
};
```

### 2. Use const and let (Not var)

```javascript
// Old way (avoid)
var name = "Alice";

// Modern way
const name = "Alice"; // Won't change
let age = 25; // Might change
```

### 3. Declare Variables Close to Where You Use Them

```javascript
function processUsers(users) {
  // Declare variables when you need them
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const welcomeMessage = `Welcome, ${user.name}!`;
    console.log(welcomeMessage);
  }
}
```

### 4. Use Functions to Create Private Scope

```javascript
function processData() {
  // All variables here are private to this function
  const data = fetchSomeData();
  const processed = transformData(data);
  const result = analyzeData(processed);

  return result;
}
```

## Debugging Scope Issues

When you get a "ReferenceError":

1. **Check where the variable is declared**
2. **Check where you're trying to use it**
3. **Make sure they're in the same scope or the variable is in an outer scope**
4. **Check for typos in variable names**

```javascript
function debugExample() {
  const message = "Hello";

  if (true) {
    console.log(message); // ✅ Works - message is in outer scope
    const innerMessage = "Hi";
  }

  console.log(innerMessage); // ❌ Error - innerMessage is out of scope
}
```

## The Classic `var` vs `let` Problem: Hoisting & Scope

One of the most confusing aspects of JavaScript scope involves the difference between `var` and `let`, especially in loops with asynchronous callbacks.

### The Problem: `var` and Hoisting

Even though you write `var i` inside a loop definition, **`var` completely ignores block boundaries** due to hoisting:

```javascript
// What you write:
for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i); // Will print 5, 5, 5, 5, 5
  }, 100);
}

// What JavaScript effectively treats it as:
var i; // hoisted to function/global scope

for (i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i); // All callbacks reference the same variable
  }, 100);
}
```

### Why This Happens

1. **`var` has function scope, not block scope** - The `{ }` brackets don't matter
2. **Variable hoisting** - `var i` is moved to the top of the nearest function/global scope
3. **One variable, multiple references** - All callbacks reference the same `i` variable
4. **Timing issue** - The loop finishes before any setTimeout callback executes

### Step-by-Step Breakdown

```javascript
console.log("=== What happens with var ===");

for (var i = 0; i < 3; i++) {
  console.log(`Iteration ${i}: scheduling callback that will read 'i' later`);

  setTimeout(function () {
    console.log(`Callback executed: i = ${i}`);
  }, 100);
}

console.log(`Loop finished: i = ${i}`); // i = 3

// Output:
// Iteration 0: scheduling callback that will read 'i' later
// Iteration 1: scheduling callback that will read 'i' later
// Iteration 2: scheduling callback that will read 'i' later
// Loop finished: i = 3
// Callback executed: i = 3
// Callback executed: i = 3
// Callback executed: i = 3
```

**Key insight:** Callbacks don't capture the **value** of `i` (0,1,2) - they capture a **reference** to the variable `i`. When they finally execute, `i` has changed to 3.

### The Solution: `let` Creates Block Scope

```javascript
console.log("=== What happens with let ===");

for (let j = 0; j < 3; j++) {
  console.log(`Iteration ${j}: creating NEW variable for this iteration`);

  setTimeout(function () {
    console.log(`Callback executed: j = ${j}`);
  }, 100);
}

// j is not accessible here - it's block scoped

// Output:
// Iteration 0: creating NEW variable for this iteration
// Iteration 1: creating NEW variable for this iteration
// Iteration 2: creating NEW variable for this iteration
// Callback executed: j = 0
// Callback executed: j = 1
// Callback executed: j = 2
```

**Why `let` works:**

- `let` has **block scope** - it respects the `{ }` boundaries
- Each loop iteration creates a **separate variable**
- Each callback captures its own variable: `j₀ = 0`, `j₁ = 1`, `j₂ = 2`

### Variable Creation Comparison

```javascript
// With var: 1 variable, modified 3 times
function demonstrateVar() {
  console.log("Creating variables with var...");

  for (var i = 0; i < 3; i++) {
    console.log(`Iteration ${i}: using the SAME variable 'i'`);
  }

  console.log(`After loop: i = ${i} (same variable, final value)`);
}

// With let: 3 variables, each with its own value
function demonstrateLet() {
  console.log("Creating variables with let...");

  for (let i = 0; i < 3; i++) {
    console.log(`Iteration ${i}: NEW variable 'i${i}' created`);
  }

  // console.log(i); // Error - i is not accessible outside the loop
  console.log("After loop: 'i' is not accessible (block scoped)");
}
```

### Mental Model: Shared vs Private Notepads

- **`var`**: Everyone shares 1 notepad → everyone sees the final value
- **`let`**: Everyone gets their own notepad → everyone keeps their value

Understanding scope helps you:

- Avoid variable naming conflicts
- Create more secure code
- Debug errors more effectively
- Write cleaner, more organized code
- Understand the difference between `var` and `let`

Scope can be tricky at first, but with practice, it becomes second nature!

# Interactive examples

- [Scope examples](./scope-examples.html)

# ADVANCED - from ydnjs

[You dont Know JavaScript Chapter - scope](Courses/ydnjs/scope.md)
