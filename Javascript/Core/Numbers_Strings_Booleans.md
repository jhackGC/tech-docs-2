---
title: JavaScript Data Types - Numbers, Strings & Booleans
layout: clean
---

# JavaScript: Numbers, Strings, and Booleans

In programming, we work with different types of data. The three fundamental data types in JavaScript are numbers, strings, and booleans. Let's explore each one.

## Strings

### What are Strings?

Strings are sequences of characters - letters, numbers, symbols, and spaces. They represent text data like names, addresses, messages, etc.

### Creating Strings

```javascript
const myName = "Brian Holt";
console.log(myName); // "Brian Holt"
```

### Three Ways to Define Strings

JavaScript offers three ways to create strings:

```javascript
const doubleQuotes = "Hello World";
const singleQuotes = "Hello World";
const backTicks = `Hello World`;
```

All three work the same way, but backticks have special powers we'll see soon!

### String Concatenation

#### The Old Way (+ operator)

```javascript
const firstName = "Brian";
const lastName = "Holt";

const sentence = "Hello " + firstName + " " + lastName + "! How are you!?";
console.log(sentence); // "Hello Brian Holt! How are you!?"
```

**Important**: Notice the spaces! The computer only does exactly what you tell it to do.

#### The Modern Way (Template Strings)

```javascript
const firstName = "Brian";
const lastName = "Holt";

const sentenceWithTemplate = `Hello ${firstName} ${lastName}! How are you!?`;
console.log(sentenceWithTemplate); // "Hello Brian Holt! How are you!?"
```

### Template Strings (ES6 Feature)

Template strings use **backticks** (`) and allow you to embed variables directly:

```javascript
const name = "Alice";
const age = 30;
const city = "New York";

const intro = `Hi, I'm ${name}. I'm ${age} years old and I live in ${city}.`;
console.log(intro); // "Hi, I'm Alice. I'm 30 years old and I live in New York."
```

**Benefits of Template Strings:**

- Cleaner syntax
- No need to remember spaces
- Can span multiple lines
- Easier to read and maintain

### Practical Examples

```javascript
// User information
const username = "john_doe";
const email = "john@example.com";

// Creating messages
const welcomeMessage = `Welcome back, ${username}!`;
const resetEmail = `Password reset link sent to ${email}`;

// Dynamic content
const itemCount = 5;
const cartMessage = `You have ${itemCount} items in your cart`;

console.log(welcomeMessage); // "Welcome back, john_doe!"
console.log(resetEmail); // "Password reset link sent to john@example.com"
console.log(cartMessage); // "You have 5 items in your cart"
```

## Booleans

### What are Booleans?

Booleans represent simple true/false values. They're like digital switches - either on (true) or off (false).

### Creating Booleans

```javascript
const lightIsOn = true;
const doorIsLocked = false;
const userIsLoggedIn = true;
```

### Real-World Examples

```javascript
// User states
const isAdmin = false;
const hasPermission = true;
const isOnline = true;

// Feature flags
const darkModeEnabled = true;
const notificationsEnabled = false;

// Conditions
const isWeekend = false;
const isHoliday = true;
```

### Why Booleans Matter

Booleans are essential for:

- Controlling program flow (if/else statements)
- Feature toggles
- User permissions
- Status tracking
- Conditional rendering

## Numbers

### JavaScript Number Type

Unlike some programming languages that separate integers and decimals, JavaScript has just one number type: **Number**.

```javascript
// All of these are Numbers
const wholeNumber = 42;
const decimal = 3.14159;
const negative = -17;
const large = 1000000;
```

### Working with Numbers

```javascript
// Basic arithmetic
const price = 29.99;
const quantity = 3;
const tax = 0.08;

const subtotal = price * quantity;
const taxAmount = subtotal * tax;
const total = subtotal + taxAmount;

console.log(`Subtotal: $${subtotal}`); // "Subtotal: $89.97"
console.log(`Tax: $${taxAmount}`); // "Tax: $7.20"
console.log(`Total: $${total}`); // "Total: $97.17"
```

### Combining Data Types

You can mix different data types in meaningful ways:

```javascript
// Product information
const productName = "Wireless Headphones";
const price = 159.99;
const inStock = true;
const rating = 4.5;

const productSummary = `${productName} - $${price} (${rating}⭐) ${
  inStock ? "In Stock" : "Out of Stock"
}`;
console.log(productSummary); // "Wireless Headphones - $159.99 (4.5⭐) In Stock"
```

## Data Type Examples in Practice

### User Profile

```javascript
const firstName = "Sarah";
const lastName = "Johnson";
const age = 28;
const isSubscribed = true;
const accountBalance = 127.5;

const profileSummary = `
  Name: ${firstName} ${lastName}
  Age: ${age}
  Subscription: ${isSubscribed ? "Active" : "Inactive"}
  Balance: $${accountBalance}
`;

console.log(profileSummary);
```

### Shopping Cart

```javascript
const itemName = "Coffee Mug";
const itemPrice = 12.99;
const quantity = 2;
const hasDiscount = true;
const discountPercent = 0.1;

const subtotal = itemPrice * quantity;
const discount = hasDiscount ? subtotal * discountPercent : 0;
const total = subtotal - discount;

console.log(`Item: ${itemName}`);
console.log(`Quantity: ${quantity}`);
console.log(`Subtotal: $${subtotal}`);
console.log(`Discount: $${discount}`);
console.log(`Total: $${total}`);
```

## Key Takeaways

1. **Strings**: Use backticks (`) for template strings - they're cleaner and more powerful
2. **Booleans**: Perfect for true/false states and conditions
3. **Numbers**: JavaScript has one number type that handles both integers and decimals
4. **Mix and match**: You can combine different data types to create dynamic content
5. **Template strings are your friend**: Use `${variable}` syntax for embedding values

These three data types form the foundation of all JavaScript programming. Master them, and you'll be ready to tackle more complex concepts!

---

## Practice & Next Steps

1. **Practice**: Try the [interactive examples](17_numbers_strings_booleans_example.html) to test these concepts
2. **Next**: [Control Flow](18_Control_Flow.md) - Learn to make decisions in your code
3. **Review**: Go back to [JavaScript Introduction](01_intro.md) if you need a refresher

## Navigation

- [⬅️ Previous: Introduction](01_intro.md)
- [🏠 JavaScript Core Index](index.md)
- [➡️ Next: Control Flow](18_Control_Flow.md)
- [🧪 Interactive Examples](17_numbers_strings_booleans_example.html)

---

_Last updated: July 17, 2025_
