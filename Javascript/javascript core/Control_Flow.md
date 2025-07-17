---
title: JavaScript Control Flow & Conditionals
layout: clean
---

# JavaScript Control Flow

Control flow allows you to modify how your program runs based on conditions. Instead of executing code line by line, you can make decisions and skip or repeat certain parts.

## If Statements

### Basic If/Else

```javascript
const skyIsBlue = true;

if (skyIsBlue) {
  console.log("The sky is blue!");
} else {
  console.log("The sky is … not blue?");
}
// Output: "The sky is blue!"
```

**How it works:**

- The condition in parentheses is evaluated
- If `true`, the first block runs
- If `false`, the else block runs
- The else block is optional

### Expressions in Conditions

```javascript
if (2 + 2 === 4) {
  console.log(
    "Oh thank god, the fundamental principles of mathematics still hold true."
  );
} else {
  console.log("Uh, panic?");
}
// Output: "Oh thank god, the fundamental principles of mathematics still hold true."
```

You can put any expression inside the if statement - anything that evaluates to true or false.

## Comparison Operators

### Assignment vs Equality

- `=` - **Assignment** ("is assigned to")
- `===` - **Equality** ("is equal to")

```javascript
const isBrianCool = true; // Assignment: isBrianCool is assigned to true

if (isBrianCool === true) {
  // Equality: asking "is isBrianCool equal to true?"
  console.log("Brian is cool!");
}
```

### Triple Equals vs Double Equals

- `===` - **Strict equality** (preferred)
- `==` - **Loose equality** (does type coercion)

```javascript
2 == "2"; // true (converts string to number)
2 === "2"; // false (different types)
```

**Always use `===`** unless you specifically need type coercion.

### Other Comparison Operators

```javascript
const age = 25;

// Not equal
if (age !== 18) {
  console.log("Not 18 years old");
}

// Greater than / less than
if (age > 21) {
  console.log("Can drink alcohol");
}

if (age >= 18) {
  console.log("Can vote");
}

if (age < 65) {
  console.log("Not retirement age");
}

if (age <= 30) {
  console.log("Still young");
}
```

## Multiple Conditions (else if)

```javascript
const friendsAtYourParty = 10;

if (friendsAtYourParty === 0) {
  console.log("Cool, now I have a lot of nachos to myself.");
} else if (friendsAtYourParty <= 4) {
  console.log("Perfect amount to play some Mario Kart.");
} else {
  console.log("Wooooo turn on the dance music!");
}
// Output: "Wooooo turn on the dance music!"
```

**How it works:**

1. Check first condition
2. If false, check the else if condition
3. If that's false, run the else block
4. Only one block will ever run

## Real-World Examples

### User Authentication

```javascript
const isLoggedIn = true;
const isAdmin = false;

if (isLoggedIn && isAdmin) {
  console.log("Welcome, admin!");
} else if (isLoggedIn) {
  console.log("Welcome, user!");
} else {
  console.log("Please log in");
}
```

### Grade Calculator

```javascript
const score = 87;

if (score >= 90) {
  console.log("A - Excellent!");
} else if (score >= 80) {
  console.log("B - Good job!");
} else if (score >= 70) {
  console.log("C - Satisfactory");
} else if (score >= 60) {
  console.log("D - Needs improvement");
} else {
  console.log("F - Please retake");
}
// Output: "B - Good job!"
```

### Shopping Cart Logic

```javascript
const itemsInCart = 3;
const isLoggedIn = true;
const hasPaymentMethod = true;

if (itemsInCart === 0) {
  console.log("Your cart is empty");
} else if (!isLoggedIn) {
  console.log("Please log in to continue");
} else if (!hasPaymentMethod) {
  console.log("Please add a payment method");
} else {
  console.log("Ready to checkout!");
}
```

## Logical Operators

### AND (&&)

Both conditions must be true:

```javascript
const hasLicense = true;
const hasInsurance = true;

if (hasLicense && hasInsurance) {
  console.log("You can drive!");
}
```

### OR (||)

At least one condition must be true:

```javascript
const isWeekend = false;
const isHoliday = true;

if (isWeekend || isHoliday) {
  console.log("No work today!");
}
```

### NOT (!)

Flips true to false, false to true:

```javascript
const isRaining = false;

if (!isRaining) {
  console.log("Great weather for a walk!");
}
```

## Nested If Statements

```javascript
const weather = "sunny";
const temperature = 75;

if (weather === "sunny") {
  if (temperature > 70) {
    console.log("Perfect day for the beach!");
  } else {
    console.log("Sunny but a bit chilly");
  }
} else {
  console.log("Maybe stay inside today");
}
```

## Ternary Operator (Shorthand)

For simple if/else statements, you can use the ternary operator:

```javascript
const age = 20;
const message = age >= 18 ? "You can vote" : "Too young to vote";
console.log(message);

// Equivalent to:
let message2;
if (age >= 18) {
  message2 = "You can vote";
} else {
  message2 = "Too young to vote";
}
```

## Best Practices

1. **Use `===` instead of `==`** for comparisons
2. **Keep conditions simple** and readable
3. **Use meaningful variable names** in conditions
4. **Consider using early returns** to avoid deep nesting
5. **Group related conditions** logically

```javascript
// Good: Clear and readable
const user = {
  age: 25,
  hasAccount: true,
  isVerified: true,
};

if (!user.hasAccount) {
  console.log("Please create an account");
  return;
}

if (!user.isVerified) {
  console.log("Please verify your email");
  return;
}

if (user.age < 13) {
  console.log("Must be 13 or older");
  return;
}

console.log("Welcome!");
```

Control flow is fundamental to programming - it's what makes your code smart and responsive to different situations!
