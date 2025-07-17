---
title: JavaScript Loops & Iteration
layout: clean
---

# JavaScript Loops

Loops allow you to repeat code multiple times without writing the same thing over and over. They're essential for handling repetitive tasks efficiently.

## The Problem Loops Solve

Instead of writing repetitive code like this:

```javascript
let friendsAtYourParty = 0;
friendsAtYourParty = friendsAtYourParty + 1;
friendsAtYourParty = friendsAtYourParty + 1;
friendsAtYourParty = friendsAtYourParty + 1;
friendsAtYourParty = friendsAtYourParty + 1;
friendsAtYourParty = friendsAtYourParty + 1;
friendsAtYourParty = friendsAtYourParty + 1;
friendsAtYourParty = friendsAtYourParty + 1;
friendsAtYourParty = friendsAtYourParty + 1;
friendsAtYourParty = friendsAtYourParty + 1;
friendsAtYourParty = friendsAtYourParty + 1;
console.log(friendsAtYourParty); // 10
```

We can use loops to do the same thing more efficiently!

## let vs const

Before we dive into loops, let's understand variable declarations:

- **`const`** - Cannot be reassigned after declaration
- **`let`** - Can be reassigned (use when value will change)
- **`var`** - Old way, avoid using it

```javascript
const name = "Alice"; // Can't change this
let age = 25; // Can change this
age = 26; // This works
// name = "Bob";         // This would cause an error
```

**Principle of Least Power**: Always use the least powerful tool that gets the job done. Use `const` by default, `let` when you need to reassign.

## While Loops

A while loop continues running as long as a condition is true:

```javascript
let friendsAtYourParty = 0;
while (friendsAtYourParty < 10) {
  friendsAtYourParty = friendsAtYourParty + 1;
}
console.log(friendsAtYourParty); // 10
```

**How it works:**

1. Check the condition (`friendsAtYourParty < 10`)
2. If true, run the code inside the `{}`
3. Go back to step 1
4. If false, exit the loop

## Increment Shortcuts

There are several ways to add 1 to a variable:

```javascript
let friendsAtYourParty = 0;

// All of these do the same thing:
friendsAtYourParty = friendsAtYourParty + 1; // Long way
friendsAtYourParty += 1; // Add-equals
friendsAtYourParty++; // Post-increment (most common)
++friendsAtYourParty; // Pre-increment (rarely used)

console.log(friendsAtYourParty); // 4
```

### Other Shortcut Operators

```javascript
let score = 10;

score += 5; // Add 5 (score becomes 15)
score -= 3; // Subtract 3 (score becomes 12)
score *= 2; // Multiply by 2 (score becomes 24)
score /= 4; // Divide by 4 (score becomes 6)
score **= 2; // Exponent (score becomes 36)

// For adding/subtracting 1:
score++; // Add 1
score--; // Subtract 1
```

## For Loops

For loops are the most common type of loop, perfect when you know how many times to repeat:

```javascript
let friendsAtYourParty = 0;
for (let i = 0; i <= 10; i++) {
  friendsAtYourParty++;
}
console.log(friendsAtYourParty); // 11
```

### For Loop Structure

```javascript
for (initialization; condition; increment) {
  // Code to repeat
}
```

1. **Initialization**: `let i = 0` - Set up control variable
2. **Condition**: `i <= 10` - Continue while this is true
3. **Increment**: `i++` - What happens after each loop

### Why `i`?

By convention, programmers use `i` for the loop counter (stands for "index"). You could use any name, but everyone expects `i`.

## Counting from Zero

**Important concept**: In programming, we start counting from 0!

- English counting: 1, 2, 3, 4, 5...
- Programming counting: 0, 1, 2, 3, 4...

```javascript
// Print numbers 0 through 4
for (let i = 0; i < 5; i++) {
  console.log(`Count: ${i}`);
}
// Output:
// Count: 0
// Count: 1
// Count: 2
// Count: 3
// Count: 4
```

The 5th element is at index 4, the 1st element is at index 0.

## Practical Examples

### Countdown Timer

```javascript
console.log("Rocket launch countdown:");
for (let i = 10; i >= 1; i--) {
  console.log(i);
}
console.log("Blast off! 🚀");
```

### Multiplication Table

```javascript
const number = 7;
console.log(`Multiplication table for ${number}:`);

for (let i = 1; i <= 10; i++) {
  const result = number * i;
  console.log(`${number} x ${i} = ${result}`);
}
```

### Sum Calculator

```javascript
let total = 0;
for (let i = 1; i <= 100; i++) {
  total += i;
}
console.log(`Sum of 1 to 100 is: ${total}`); // 5050
```

### Creating Patterns

```javascript
// Print a triangle
for (let i = 1; i <= 5; i++) {
  let stars = "";
  for (let j = 1; j <= i; j++) {
    stars += "*";
  }
  console.log(stars);
}
// Output:
// *
// **
// ***
// ****
// *****
```

## Infinite Loops (Danger!)

Be careful not to create infinite loops that never end:

```javascript
// DON'T DO THIS - Infinite loop!
let friendsAtYourParty = 1;
while (friendsAtYourParty > 0) {
  friendsAtYourParty = friendsAtYourParty + 1; // This will never make it <= 0
}
```

This will crash your program because:

- `friendsAtYourParty` starts at 1
- Each loop adds 1, making it larger
- The condition `> 0` will always be true
- The loop never ends

### How to Avoid Infinite Loops

1. **Make sure your condition will eventually be false**
2. **Ensure your increment/decrement moves toward the exit condition**
3. **Test with small numbers first**

## While vs For Loops

### Use While When:

- You don't know exactly how many iterations you need
- You're waiting for something to change
- The loop depends on user input or external conditions

```javascript
let userGuess = "";
while (userGuess !== "secret") {
  userGuess = prompt("What's the password?");
}
```

### Use For When:

- You know the exact number of iterations
- You're counting through a range
- You're processing a list of items

```javascript
// Print even numbers from 0 to 20
for (let i = 0; i <= 20; i += 2) {
  console.log(i);
}
```

## Loop Control

### Break - Exit the loop early

```javascript
for (let i = 0; i < 10; i++) {
  if (i === 5) {
    break; // Exit when i equals 5
  }
  console.log(i);
}
// Output: 0, 1, 2, 3, 4
```

### Continue - Skip to next iteration

```javascript
for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) {
    continue; // Skip even numbers
  }
  console.log(i);
}
// Output: 1, 3, 5, 7, 9
```

## Best Practices

1. **Use meaningful variable names** in longer loops
2. **Keep loop bodies simple** and focused
3. **Avoid modifying the loop counter** inside the loop body
4. **Use const for values that don't change** inside loops
5. **Comment complex loop logic**

```javascript
// Good: Clear and purposeful
const students = 25;
for (let studentNumber = 1; studentNumber <= students; studentNumber++) {
  console.log(`Grading student ${studentNumber}`);
}

// Bad: Unclear and error-prone
for (let x = 1; x <= 25; x++) {
  console.log(`Grading student ${x}`);
  x++; // Don't modify loop counter inside the loop!
}
```

Loops are one of the most powerful tools in programming - they let you automate repetitive tasks and process large amounts of data efficiently!
