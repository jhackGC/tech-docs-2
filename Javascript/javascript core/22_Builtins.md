# JavaScript Built-ins

JavaScript comes with many built-in functions and methods that handle common tasks. These are pre-written functions created by smart people to solve problems you'll encounter frequently.

## What are Built-ins?

Built-ins are functions and methods that JavaScript provides out of the box. You don't need to write them yourself - they're already there and ready to use!

**Key point**: Always look for the parentheses `()` - that's how you know something is a function.

## String Methods

### Making Text Lowercase

```javascript
const sentence = "ThIs HaS wEiRd CaSiNg On It";
const lowerCaseSentence = sentence.toLowerCase();
console.log(lowerCaseSentence); // "this has weird casing on it"
```

### Making Text Uppercase

```javascript
const sentence = "make me loud";
const upperCaseSentence = sentence.toUpperCase();
console.log(upperCaseSentence); // "MAKE ME LOUD"
```

### Checking if a String Contains Another String

```javascript
const testStringOne = "The quick brown fox jumps over the lazy dog";
const testStringTwo =
  "Mirror, mirror on the wall, don't say it cause I know I'm cute";
const stringToLookFor = "cute";

console.log(testStringOne.includes(stringToLookFor)); // false
console.log(testStringTwo.includes(stringToLookFor)); // true
```

### Other Useful String Methods

```javascript
const text = "  Hello World  ";

// Remove whitespace from beginning and end
console.log(text.trim()); // "Hello World"

// Get the length of a string
console.log(text.length); // 15

// Replace text
console.log(text.replace("World", "JavaScript")); // "  Hello JavaScript  "

// Split string into an array
const fruits = "apple,banana,orange";
console.log(fruits.split(",")); // ["apple", "banana", "orange"]

// Get a portion of a string
const message = "Hello World";
console.log(message.substring(0, 5)); // "Hello"
console.log(message.slice(6)); // "World"
```

## Math Object

### Rounding Numbers

```javascript
const number = 5.3;
const roundedNumber = Math.round(number);
console.log(roundedNumber); // 5

// Other rounding methods
console.log(Math.floor(5.9)); // 5 (round down)
console.log(Math.ceil(5.1)); // 6 (round up)
```

### More Math Functions

```javascript
// Random number between 0 and 1
console.log(Math.random()); // 0.7834952847629

// Random number between 1 and 10
const randomNumber = Math.floor(Math.random() * 10) + 1;
console.log(randomNumber); // Random number from 1-10

// Maximum and minimum
console.log(Math.max(1, 5, 3, 9, 2)); // 9
console.log(Math.min(1, 5, 3, 9, 2)); // 1

// Absolute value
console.log(Math.abs(-5)); // 5

// Power/exponent
console.log(Math.pow(2, 3)); // 8 (2 to the power of 3)
console.log(2 ** 3); // 8 (alternative syntax)

// Square root
console.log(Math.sqrt(16)); // 4
```

## Date Object

### Getting Current Date and Time

```javascript
// Milliseconds since January 1, 1970
console.log(Date.now()); // 1642612345678

// Current date
const now = new Date();
console.log(now); // Current date and time

// Get specific parts
console.log(now.getFullYear()); // 2025
console.log(now.getMonth()); // 6 (July - months are 0-indexed!)
console.log(now.getDate()); // 15
console.log(now.getDay()); // 2 (Tuesday - days start from 0=Sunday)
```

### Creating Specific Dates

```javascript
const birthday = new Date(1990, 5, 15); // June 15, 1990 (month is 0-indexed)
const event = new Date("2025-12-25"); // Christmas 2025

console.log(birthday.getFullYear()); // 1990
console.log(event.toDateString()); // "Thu Dec 25 2025"
```

## Number Methods

### Converting Strings to Numbers

```javascript
const stringNumber = "42";
const actualNumber = parseInt(stringNumber);
console.log(actualNumber); // 42

const decimalString = "3.14159";
const decimalNumber = parseFloat(decimalString);
console.log(decimalNumber); // 3.14159

// Alternative method
const converted = Number("123");
console.log(converted); // 123
```

### Checking if Something is a Number

```javascript
console.log(isNaN("hello")); // true (is Not a Number)
console.log(isNaN("123")); // false (is a valid number)
console.log(isNaN(42)); // false (is a number)
```

## Array Methods (Preview)

### Basic Array Operations

```javascript
const colors = ["red", "green", "blue"];

// Add to the end
colors.push("yellow");
console.log(colors); // ["red", "green", "blue", "yellow"]

// Remove from the end
const lastColor = colors.pop();
console.log(lastColor); // "yellow"
console.log(colors); // ["red", "green", "blue"]

// Get array length
console.log(colors.length); // 3

// Check if something is in the array
console.log(colors.includes("red")); // true
console.log(colors.includes("purple")); // false
```

## Practical Examples

### Text Processing

```javascript
function cleanUserInput(input) {
  return input.trim().toLowerCase();
}

function formatName(firstName, lastName) {
  const cleanFirst = firstName.trim();
  const cleanLast = lastName.trim();
  return `${cleanFirst} ${cleanLast}`.toUpperCase();
}

console.log(cleanUserInput("  HELLO WORLD  ")); // "hello world"
console.log(formatName("john", "doe")); // "JOHN DOE"
```

### Random Number Generator

```javascript
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rollDice() {
  return getRandomNumber(1, 6);
}

function coinFlip() {
  return Math.random() < 0.5 ? "heads" : "tails";
}

console.log(getRandomNumber(1, 100)); // Random number between 1-100
console.log(rollDice()); // Random number between 1-6
console.log(coinFlip()); // "heads" or "tails"
```

### Date Calculations

```javascript
function getAge(birthYear) {
  const currentYear = new Date().getFullYear();
  return currentYear - birthYear;
}

function daysUntilChristmas() {
  const today = new Date();
  const christmas = new Date(today.getFullYear(), 11, 25); // December 25

  // If Christmas has passed this year, calculate for next year
  if (today > christmas) {
    christmas.setFullYear(christmas.getFullYear() + 1);
  }

  const timeDiff = christmas - today;
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
}

console.log(getAge(1990)); // Age based on birth year
console.log(daysUntilChristmas()); // Days until Christmas
```

### String Validation

```javascript
function isValidEmail(email) {
  return email.includes("@") && email.includes(".");
}

function isStrongPassword(password) {
  return (
    (password.length >= 8 && password.includes("@")) ||
    password.includes("!") ||
    password.includes("#")
  );
}

function formatPhoneNumber(phone) {
  // Remove all non-digits
  const digits = phone.replace(/\D/g, "");

  // Format as (XXX) XXX-XXXX
  if (digits.length === 10) {
    return `(${digits.substring(0, 3)}) ${digits.substring(
      3,
      6
    )}-${digits.substring(6)}`;
  }
  return phone; // Return original if not 10 digits
}

console.log(isValidEmail("user@example.com")); // true
console.log(isStrongPassword("password123!")); // true
console.log(formatPhoneNumber("1234567890")); // "(123) 456-7890"
```

## Global Functions

### Converting Data Types

```javascript
// String to Number
console.log(parseInt("42")); // 42
console.log(parseFloat("3.14")); // 3.14
console.log(Number("123")); // 123

// Number to String
console.log(String(42)); // "42"
console.log((42).toString()); // "42"

// Boolean conversions
console.log(Boolean(1)); // true
console.log(Boolean(0)); // false
console.log(Boolean("hello")); // true
console.log(Boolean("")); // false
```

## Finding Documentation

**MDN (Mozilla Developer Network)** is your best friend for looking up built-in functions:

- Go to [developer.mozilla.org](https://developer.mozilla.org)
- Search for any JavaScript method or function
- Read examples and see all available options

**Remember**: You're not expected to memorize everything! Looking things up is normal and professional developers do it constantly.

## Common Built-in Patterns

### Method Chaining

Many built-ins can be chained together:

```javascript
const userInput = "  HELLO WORLD  ";
const cleaned = userInput.trim().toLowerCase().replace("world", "javascript");
console.log(cleaned); // "hello javascript"
```

### Immutability

Most built-in methods don't change the original value:

```javascript
const original = "Hello";
const modified = original.toUpperCase();

console.log(original); // "Hello" (unchanged)
console.log(modified); // "HELLO" (new value)
```

Built-in functions save you time and effort. Instead of writing complex code to solve common problems, you can use these pre-built, tested, and optimized functions. Always check if a built-in exists before writing your own solution!
