# JavaScript Context (The `this` Keyword)

The `this` keyword in JavaScript refers to the context in which a function is called. It's one of the more complex concepts in JavaScript, but understanding the basics will help you write better object-oriented code.

## What is Context?

**Context** is the environment in which your code runs. The `this` keyword gives you access to that context. Think of it as "what object am I currently working with?"

## Basic Example with Objects

Let's see `this` in action with a practical example:

```javascript
const me = {
  name: {
    first: "Brian",
    last: "Holt",
  },
  location: {
    streetNumber: 500,
    street: "Fakestreet",
    city: "Seattle",
    state: "WA",
    zipCode: 55555,
    country: "USA",
  },
  getAddress() {
    return `${this.name.first} ${this.name.last}
${this.location.streetNumber} ${this.location.street}
${this.location.city}, ${this.location.state} ${this.location.zipCode}
${this.location.country}`;
  },
};

console.log(me.getAddress());
// Output:
// Brian Holt
// 500 Fakestreet
// Seattle, WA 55555
// USA
```

**Key points:**

- Inside the `getAddress` method, `this` refers to the `me` object
- `this.name.first` accesses the `first` property of the `name` object within `me`
- `this` allows the method to access other properties of the same object

## Global Context

When you're not inside an object, `this` refers to the global context:

```javascript
console.log(this === window); // true (in browsers)
console.log(this.scrollY); // 0 (window's scrollY property)
console.log(window.scrollY); // 0 (same as above)
```

In browsers, the global context is the `window` object, which contains many built-in properties and methods.

## Rule of Thumb

**Simple rule**:

- If you're inside an object method, `this` refers to that object
- If you're not inside an object, `this` refers to the global object (`window` in browsers)

## Practical Examples

### User Profile Object

```javascript
const user = {
  firstName: "Alice",
  lastName: "Johnson",
  email: "alice@example.com",
  age: 28,

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  },

  getEmailDomain() {
    return this.email.split("@")[1];
  },

  isAdult() {
    return this.age >= 18;
  },

  introduce() {
    return `Hi, I'm ${this.getFullName()} and I'm ${this.age} years old.`;
  },
};

console.log(user.getFullName()); // "Alice Johnson"
console.log(user.getEmailDomain()); // "example.com"
console.log(user.isAdult()); // true
console.log(user.introduce()); // "Hi, I'm Alice Johnson and I'm 28 years old."
```

### Shopping Cart with Context

```javascript
const shoppingCart = {
  items: [],
  total: 0,

  addItem(name, price) {
    this.items.push({ name, price });
    this.calculateTotal();
    return `Added ${name} for $${price}`;
  },

  removeItem(name) {
    this.items = this.items.filter((item) => item.name !== name);
    this.calculateTotal();
    return `Removed ${name} from cart`;
  },

  calculateTotal() {
    this.total = this.items.reduce((sum, item) => sum + item.price, 0);
  },

  getItemCount() {
    return this.items.length;
  },

  displayCart() {
    if (this.items.length === 0) {
      return "Your cart is empty";
    }

    let display = "Shopping Cart:\n";
    this.items.forEach((item) => {
      display += `- ${item.name}: $${item.price}\n`;
    });
    display += `Total: $${this.total}`;
    return display;
  },

  checkout() {
    if (this.items.length === 0) {
      return "Cannot checkout with empty cart";
    }

    const receipt = this.displayCart();
    this.items = [];
    this.total = 0;
    return `Checkout completed!\n${receipt}`;
  },
};

console.log(shoppingCart.addItem("T-Shirt", 19.99));
console.log(shoppingCart.addItem("Jeans", 49.99));
console.log(shoppingCart.displayCart());
console.log(shoppingCart.checkout());
```

### Bank Account Example

```javascript
const bankAccount = {
  accountNumber: "123456789",
  balance: 1000,
  ownerName: "John Doe",

  deposit(amount) {
    if (amount > 0) {
      this.balance += amount;
      return `Deposited $${amount}. New balance: $${this.balance}`;
    }
    return "Invalid deposit amount";
  },

  withdraw(amount) {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      return `Withdrew $${amount}. New balance: $${this.balance}`;
    }
    return "Invalid withdrawal amount or insufficient funds";
  },

  getBalance() {
    return `Current balance: $${this.balance}`;
  },

  getAccountInfo() {
    return `Account: ${this.accountNumber}
Owner: ${this.ownerName}
Balance: $${this.balance}`;
  },

  transfer(amount, targetAccount) {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      targetAccount.balance += amount;
      return `Transferred $${amount} to ${targetAccount.ownerName}`;
    }
    return "Transfer failed";
  },
};

const savings = {
  accountNumber: "987654321",
  balance: 500,
  ownerName: "John Doe",
};

console.log(bankAccount.deposit(200));
console.log(bankAccount.withdraw(150));
console.log(bankAccount.getAccountInfo());
```

## Why Use `this`?

### 1. Access Object Properties

```javascript
const calculator = {
  result: 0,

  add(number) {
    this.result += number;
    return this; // Allows method chaining
  },

  multiply(number) {
    this.result *= number;
    return this;
  },

  getResult() {
    return this.result;
  },

  reset() {
    this.result = 0;
    return this;
  },
};

// Method chaining example
const finalResult = calculator.add(5).multiply(2).add(3).getResult();

console.log(finalResult); // 13
```

### 2. Reusable Methods

```javascript
const personMethods = {
  introduce() {
    return `Hello, I'm ${this.name} and I'm ${this.age} years old.`;
  },

  haveBirthday() {
    this.age++;
    return `Happy birthday! I'm now ${this.age}.`;
  },
};

const person1 = {
  name: "Alice",
  age: 25,
  introduce: personMethods.introduce,
  haveBirthday: personMethods.haveBirthday,
};

const person2 = {
  name: "Bob",
  age: 30,
  introduce: personMethods.introduce,
  haveBirthday: personMethods.haveBirthday,
};

console.log(person1.introduce()); // "Hello, I'm Alice and I'm 25 years old."
console.log(person2.introduce()); // "Hello, I'm Bob and I'm 30 years old."
```

## Common Gotchas (Advanced)

### 1. Method Assignment

```javascript
const person = {
  name: "Alice",
  greet() {
    return `Hello, I'm ${this.name}`;
  },
};

// This works
console.log(person.greet()); // "Hello, I'm Alice"

// This doesn't work as expected
const greetFunction = person.greet;
console.log(greetFunction()); // "Hello, I'm undefined" (this is now window)
```

### 2. Arrow Functions (Advanced Topic)

```javascript
const obj = {
  name: "Test",

  regularFunction() {
    return this.name; // 'this' refers to obj
  },

  arrowFunction: () => {
    return this.name; // 'this' refers to global context, not obj
  },
};

console.log(obj.regularFunction()); // "Test"
console.log(obj.arrowFunction()); // undefined (or error)
```

## Best Practices

### 1. Use `this` in Object Methods

```javascript
const product = {
  name: "Laptop",
  price: 999,

  // Good: Use this to access object properties
  getDisplayPrice() {
    return `$${this.price}`;
  },

  // Good: Use this to call other methods
  getFullDescription() {
    return `${this.name} - ${this.getDisplayPrice()}`;
  },
};
```

### 2. Be Consistent

```javascript
const timer = {
  seconds: 0,

  start() {
    // Use this consistently throughout the object
    setInterval(() => {
      this.display();
    }, 1000);
  },

  display() {
    console.log(`Timer: ${this.seconds} seconds`);
    this.seconds++;
  },
};
```

## When You Don't Need `this`

If you're not working with objects, you often don't need `this`:

```javascript
// Simple function - no this needed
function addNumbers(a, b) {
  return a + b;
}

// Utility function - no this needed
function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`;
}
```

## Key Takeaways

1. **`this` refers to the object** when called as a method
2. **`this` refers to global context** when not in an object
3. **Use `this` to access object properties** and methods
4. **Context can change** depending on how a function is called
5. **Start simple** - use `this` in object methods first

The `this` keyword is complex and has many edge cases, but for now, focus on using it within object methods to access properties and other methods of the same object. As you advance in JavaScript, you can explore more advanced context concepts!
