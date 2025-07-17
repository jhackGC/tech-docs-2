# JavaScript Functions

Functions are reusable blocks of code that perform specific tasks. They're like recipes - you write them once and can use them many times with different ingredients (parameters).

## Why Use Functions?

Functions help you:

- **Avoid repetition** - Write code once, use it many times
- **Organize code** - Break large problems into smaller pieces
- **Make code readable** - Give meaningful names to operations
- **Enable reusability** - Share functionality across your program

## Basic Function Structure

```javascript
function addTwo(number) {
  return number + 2;
}

const finalAnswer = addTwo(5);
console.log(finalAnswer); // 7
```

**Anatomy of a function:**

1. `function` - keyword that declares a function
2. `addTwo` - the function name
3. `(number)` - parameter(s) the function accepts
4. `{ }` - function body containing the code
5. `return` - sends a value back to whoever called the function

## Parameters and Arguments

Functions can accept multiple parameters:

```javascript
function greet(firstName, lastName, honorific, greeting) {
  return `${greeting} ${honorific} ${lastName}! I'm extremely pleased you could join us, ${firstName}! I hope you enjoy your stay, ${honorific} ${lastName}.`;
}

console.log(greet("Brian", "Holt", "Lord", "Salutations"));
// "Salutations Lord Holt! I'm extremely pleased you could join us, Brian! I hope you enjoy your stay, Lord Holt."

console.log(greet("Jack", "Sparrow", "Captain", "A-hoy"));
// "A-hoy Captain Sparrow! I'm extremely pleased you could join us, Jack! I hope you enjoy your stay, Captain Sparrow."
```

**Key Points:**

- **Order matters** - parameters are received in the order you send them
- **Any number of parameters** - you can have as many or as few as needed
- **Parameters are variables** - they exist only inside the function

## Calling Functions

```javascript
const myHomeCity = "Seattle";
const myHomeState = "Washington";
const myHomeCountry = "USA";

function logOutYourHome(city, state, country) {
  console.log(`You are from ${city}, ${state} ${country}.`);
}

logOutYourHome(myHomeCity, myHomeState, myHomeCountry);
// "You are from Seattle, Washington USA."
```

**Function call syntax:**

- Function name followed by parentheses: `functionName()`
- Parameters go inside the parentheses
- If you see `()` after a name, it's a function call!

## Return Values

Functions can send data back using `return`:

```javascript
function calculateTax(price, taxRate) {
  const tax = price * taxRate;
  return tax;
}

function calculateTotal(price, taxRate) {
  const tax = calculateTax(price, taxRate);
  const total = price + tax;
  return total;
}

const itemPrice = 100;
const salesTax = 0.08;
const finalTotal = calculateTotal(itemPrice, salesTax);
console.log(`Total: $${finalTotal}`); // "Total: $108"
```

## Different Ways to Write Functions

JavaScript offers several syntaxes for writing functions:

### 1. Function Declaration

```javascript
function bark() {
  console.log("woof");
}
```

### 2. Function Expression

```javascript
const meow = function () {
  console.log("meeeeeeeow");
};
```

### 3. Arrow Function

```javascript
const chirp = () => {
  console.log("chirp chirp");
};
```

**All three work the same way:**

```javascript
bark(); // "woof"
meow(); // "meeeeeeeow"
chirp(); // "chirp chirp"
```

## Practical Examples

### Calculator Functions

```javascript
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Cannot divide by zero!";
  }
  return a / b;
}

console.log(add(5, 3)); // 8
console.log(subtract(10, 4)); // 6
console.log(multiply(6, 7)); // 42
console.log(divide(15, 3)); // 5
```

### String Manipulation Functions

```javascript
function createWelcomeMessage(name, time) {
  return `Good ${time}, ${name}! Welcome to our website.`;
}

function formatPhoneNumber(areaCode, exchange, number) {
  return `(${areaCode}) ${exchange}-${number}`;
}

function createEmail(firstName, lastName, domain) {
  const username = firstName.toLowerCase() + "." + lastName.toLowerCase();
  return `${username}@${domain}`;
}

console.log(createWelcomeMessage("Alice", "morning"));
// "Good morning, Alice! Welcome to our website."

console.log(formatPhoneNumber("555", "123", "4567"));
// "(555) 123-4567"

console.log(createEmail("John", "Doe", "company.com"));
// "john.doe@company.com"
```

### Validation Functions

```javascript
function isValidAge(age) {
  return age >= 0 && age <= 150;
}

function isValidEmail(email) {
  return email.includes("@") && email.includes(".");
}

function isStrongPassword(password) {
  return password.length >= 8;
}

// Usage
const userAge = 25;
const userEmail = "user@example.com";
const userPassword = "secretpassword123";

if (isValidAge(userAge)) {
  console.log("Age is valid");
}

if (isValidEmail(userEmail)) {
  console.log("Email format is valid");
}

if (isStrongPassword(userPassword)) {
  console.log("Password is strong enough");
}
```

## Functions Without Return Values

Not all functions need to return values:

```javascript
function logUserInfo(name, age, city) {
  console.log(`Name: ${name}`);
  console.log(`Age: ${age}`);
  console.log(`City: ${city}`);
  console.log("---");
}

function celebrateBirthday(name) {
  console.log(`🎉 Happy Birthday, ${name}! 🎂`);
  console.log("Hope you have a wonderful day!");
}

logUserInfo("Sarah", 28, "Portland");
celebrateBirthday("Sarah");
```

## Functions Calling Other Functions

Functions can call other functions:

```javascript
function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`;
}

function calculateDiscount(price, discountPercent) {
  return price * (discountPercent / 100);
}

function calculateSalePrice(originalPrice, discountPercent) {
  const discount = calculateDiscount(originalPrice, discountPercent);
  const salePrice = originalPrice - discount;
  return formatCurrency(salePrice);
}

const itemPrice = 59.99;
const discount = 20; // 20% off

console.log(`Original: ${formatCurrency(itemPrice)}`);
console.log(`Sale Price: ${calculateSalePrice(itemPrice, discount)}`);
// Original: $59.99
// Sale Price: $47.99
```

## Best Practices

### 1. Use Descriptive Names

```javascript
// Bad
function calc(x, y) {
  return x * y * 0.08;
}

// Good
function calculateSalesTax(price, taxRate) {
  return price * taxRate;
}
```

### 2. Keep Functions Small and Focused

```javascript
// Each function does one thing well
function validateEmail(email) {
  return email.includes("@");
}

function sendWelcomeEmail(email) {
  console.log(`Sending welcome email to ${email}`);
}

function registerUser(email) {
  if (validateEmail(email)) {
    sendWelcomeEmail(email);
    return "User registered successfully";
  } else {
    return "Invalid email address";
  }
}
```

### 3. Use Default Parameters (Advanced)

```javascript
function greetUser(name = "Guest", timeOfDay = "day") {
  return `Good ${timeOfDay}, ${name}!`;
}

console.log(greetUser()); // "Good day, Guest!"
console.log(greetUser("Alice")); // "Good day, Alice!"
console.log(greetUser("Bob", "evening")); // "Good evening, Bob!"
```

## Common Patterns

### 1. Guard Clauses

```javascript
function calculateArea(length, width) {
  if (length <= 0 || width <= 0) {
    return "Length and width must be positive numbers";
  }

  return length * width;
}
```

### 2. Helper Functions

```javascript
function isEven(number) {
  return number % 2 === 0;
}

function processNumbers(numbers) {
  const evenNumbers = [];
  const oddNumbers = [];

  for (let i = 0; i < numbers.length; i++) {
    if (isEven(numbers[i])) {
      evenNumbers.push(numbers[i]);
    } else {
      oddNumbers.push(numbers[i]);
    }
  }

  return { even: evenNumbers, odd: oddNumbers };
}
```

Functions are one of the most important concepts in programming. They help you write cleaner, more organized, and more maintainable code. Master functions, and you'll be well on your way to becoming a proficient programmer!
