A **pure function** is a function that meets two key criteria:

---

### ✅ 1. **Given the same input, it always returns the same output.**

No randomness. No dependence on external state (e.g., database, file system, global variables).

### ✅ 2. **It has no side effects.**

It doesn’t change anything outside itself — no logging, no modifying arguments, no saving to disk, no network calls.

---

### 📦 Examples of Pure vs Impure

#### ✅ **Pure function**

```js
function add(a, b) {
  return a + b;
}
```

#### ❌ **Impure function**

```js
let counter = 0;
function increment() {
  counter++; // modifies external state
  return counter;
}
```

---

## 🔎 Why Pure Functions Matter

### 1. **Predictable**

- You always know what to expect from the function.

### 2. **Easier to test**

- No need to mock global state, database, etc.

### 3. **Easier to debug**

- No hidden changes to track down.

### 4. **Enables functional programming**

- Compose functions together more safely.

### 5. **Safe for concurrency**

- No shared state = no race conditions.

---

## 🛠 Design Principles Supported

| Principle                 | How Pure Functions Help                   |
| ------------------------- | ----------------------------------------- |
| **Single Responsibility** | Focuses on one task                       |
| **KISS**                  | Encourages simple, focused logic          |
| **Encapsulation**         | Avoids reaching into external systems     |
| **Testability**           | Requires no mocks or setup                |
| **Functional Purity**     | Core to FP design, enabling composability |

---

## 📍Common Pitfalls

### ❌ Logging inside a function:

```js
function greet(name) {
  console.log(`Hello, ${name}`); // side effect
  return `Hello, ${name}`;
}
```

### ❌ Modifying input:

```js
function mutate(obj) {
  obj.changed = true; // mutation
  return obj;
}
```

Use this instead:

```js
function cloneAndChange(obj) {
  return { ...obj, changed: true };
}
```

---

## ✅ Summary

> A **pure function** is a building block of clean, robust, testable code. It avoids external dependencies and side effects.

---

### Want more?

Absolutely! Let’s walk through **how to refactor impure Node.js functions** into **pure functions + injected dependencies**, so your code is more testable, modular, and clean.

---

## 🔧 1. **Example: Impure Function – File System Call**

```js
// ❌ Impure
const getUserConfig = () => {
  const data = fs.readFileSync("./config.json", "utf-8");
  return JSON.parse(data);
};
```

### ✅ Refactored: Pure + Injected Dependency

```js
// Pure function
const parseConfig = (readFn) => {
  const data = readFn();
  return JSON.parse(data);
};

// Usage
const config = parseConfig(() => fs.readFileSync("./config.json", "utf-8"));
```

### ✅ For testing:

```js
const mockConfig = parseConfig(() => '{"user":"javier"}');
```

---

## 🔧 2. **Example: Impure – Console Logging**

```js
// ❌ Impure
function registerUser(user) {
  console.log("Registering:", user.email);
  return { success: true };
}
```

### ✅ Refactored

```js
function registerUser(user, logger = () => {}) {
  logger(`Registering: ${user.email}`);
  return { success: true };
}

// In prod
registerUser({ email: "test@example.com" }, console.log);

// In test
registerUser({ email: "test@example.com" }); // logger is noop
```

---

## 🔧 3. **Example: Impure – Database Call**

```js
// ❌ Impure
async function getUserById(id) {
  return await db.query("SELECT * FROM users WHERE id = ?", [id]);
}
```

### ✅ Refactored

```js
// Pure wrapper
function createGetUserById(dbClient) {
  return async function getUserById(id) {
    return await dbClient.query("SELECT * FROM users WHERE id = ?", [id]);
  };
}

// Usage
const getUser = createGetUserById(db);

// In test
const fakeDB = {
  query: async () => [{ id: 1, name: "Test" }],
};
const getUserTest = createGetUserById(fakeDB);
```

---

## 💡 Design Pattern: **Dependency Injection**

All of the above examples follow the **Dependency Injection** pattern:

> Pass side-effect-causing dependencies into pure functions as arguments, instead of hardcoding them.

---

## 🧪 Bonus: Abstracting Side Effects with Interfaces

Create interfaces for external services:

```ts
// services/logger.ts
export interface Logger {
  log(message: string): void;
}

export const ConsoleLogger: Logger = {
  log: console.log,
};
```

Inject them into services:

```ts
function processOrder(order, logger: Logger) {
  logger.log(`Processing order ${order.id}`);
}
```

---

## ✅ Summary

| Problematic Action  | Refactor Strategy            |
| ------------------- | ---------------------------- |
| `fs.readFileSync`   | Inject a `readFn`            |
| `console.log`       | Inject a `logger`            |
| `db.query(...)`     | Inject the DB client         |
| External APIs       | Wrap in a service, inject it |
| Static data loading | Pass config as a param       |

---

Would you like a small real-world example (like an Express controller using this style)?
