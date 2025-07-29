# Typical TypeScript Interview Questions and Answers

Below are some common TypeScript interview questions, their answers, and code examples where appropriate.

---

## 1. What is TypeScript?

**Answer:**
TypeScript is a superset of JavaScript that adds static typing and other features to the language. It compiles to plain JavaScript and helps catch errors early during development.

---

## 2. What are the benefits of using TypeScript?

**Answer:**

- Early error detection with static type checking
- Improved code readability and maintainability
- Better IDE support (autocompletion, refactoring)
- Supports modern JavaScript features

---

## 3. How do you declare variables with types in TypeScript?

**Example:**

```ts
let age: number = 30;
let name: string = "Alice";
let isActive: boolean = true;
```

---

## 4. What is an interface in TypeScript?

**Answer:**
An interface defines the shape of an object, specifying property names and types.

**Example:**

```ts
interface User {
  id: number;
  name: string;
  email?: string; // optional property
}

const user: User = {
  id: 1,
  name: "Bob",
};
```

---

## 5. What is a type alias?

**Answer:**
A type alias gives a name to a type, which can be a primitive, union, intersection, or object type.

**Example:**

```ts
type ID = number;
type Status = "active" | "inactive";
```

---

## 6. What is the difference between interface and type?

**Answer:**

- Interfaces are best for describing object shapes and can be extended or merged.
- Types are more flexible and can represent primitives, unions, intersections, and objects.

---

## 7. How do you define a function with typed parameters and return value?

**Example:**

```ts
function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

---

## 8. What are generics in TypeScript?

**Answer:**
Generics allow you to write reusable code that works with any type.

**Example:**

```ts
function identity<T>(value: T): T {
  return value;
}

const num = identity<number>(42);
const str = identity<string>("hello");
```

---

## 9. How do you use enums in TypeScript?

**Example:**

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

let dir: Direction = Direction.Up;
```

---

## 10. What is type assertion?

**Answer:**
Type assertion tells TypeScript to treat a value as a specific type.

**Example:**

```ts
const value: any = "hello";
const strLength: number = (value as string).length;
```

---

## 11. How do you handle optional and default parameters in functions?

**Example:**

```ts
function log(message: string, user?: string) {
  console.log(user ? `${user}: ${message}` : message);
}

function multiply(a: number, b: number = 2): number {
  return a * b;
}
```

---

## 12. What is the "never" type?

**Answer:**
The `never` type represents values that never occur, such as functions that always throw or never return.

**Example:**

```ts
function throwError(msg: string): never {
  throw new Error(msg);
}
```

---

## 13. How do you use union and intersection types?

**Example:**

```ts
type Admin = { admin: true };
type User = { name: string };

type Person = Admin | User; // union
type SuperUser = Admin & User; // intersection
```

---

## 14. How do you use mapped types?

**Example:**

```ts
type ReadonlyUser = Readonly<User>;
type PartialUser = Partial<User>;
```

---

## 15. How do you use utility types like Partial, Readonly, Pick, and Record?

**Example:**

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

const partialUser: Partial<User> = { id: 1 };
const readonlyUser: Readonly<User> = {
  id: 1,
  name: "Bob",
  email: "bob@example.com",
};
const pickedUser: Pick<User, "id" | "name"> = { id: 1, name: "Bob" };
const userRecord: Record<number, User> = {
  1: { id: 1, name: "Bob", email: "bob@example.com" },
};
```

---

## 16. How do you use type guards?

**Example:**

```ts
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function printValue(value: unknown) {
  if (isString(value)) {
    console.log(value.toUpperCase());
  }
}
```

---

## 17. How do you use modules and import/export in TypeScript?

**Example:**

```ts
// math.ts
export function add(a: number, b: number): number {
  return a + b;
}

// main.ts
import { add } from "./math";
console.log(add(2, 3));
```

---

## 18. How do you use classes in TypeScript?

**Example:**

```ts
class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} makes a sound.`);
  }
}

const dog = new Animal("Dog");
dog.speak();
```

---

## 19. How do you use access modifiers (public, private, protected) in TypeScript classes?

**Example:**

```ts
class Person {
  public name: string;
  private age: number;
  protected email: string;

  constructor(name: string, age: number, email: string) {
    this.name = name;
    this.age = age;
    this.email = email;
  }

  public getAge() {
    return this.age;
  }
}
```

---

## 20. How do you use decorators in TypeScript?

**Example:**

```ts
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey} with`, args);
    return original.apply(this, args);
  };
}

class Example {
  @log
  greet(name: string) {
    return `Hello, ${name}`;
  }
}
```

---

_This is not an exhaustive list, but covers many of the most common TypeScript interview questions._
