# SOLID Principles - Object-Oriented Design

The **SOLID principles** are five fundamental design principles that help create maintainable, scalable, and robust object-oriented software. Introduced by Robert C. Martin (Uncle Bob), these principles guide developers in writing code that is easy to understand, modify, and extend.

---

## 🔷 **S** - Single Responsibility Principle (SRP)

### **Definition**

> A class should have only one reason to change. Each class should have only one job or responsibility.

### **Why It Matters**

- **Easier to understand**: Classes with single responsibilities are simpler to comprehend
- **Easier to test**: Focused classes have fewer edge cases
- **Easier to maintain**: Changes to one responsibility don't affect others
- **Higher cohesion**: Related functionality is grouped together

### **Example: Violation of SRP**

```javascript
// BAD - This class has multiple responsibilities
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  // Responsibility 1: User data management
  getName() {
    return this.name;
  }

  getEmail() {
    return this.email;
  }

  // Responsibility 2: Email validation
  validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  // Responsibility 3: Database operations
  save() {
    // Database save logic
    console.log(`Saving user ${this.name} to database`);
  }

  // Responsibility 4: Email sending
  sendWelcomeEmail() {
    // Email sending logic
    console.log(`Sending welcome email to ${this.email}`);
  }
}
```

### **Example: Following SRP**

```javascript
// GOOD - Each class has a single responsibility

// Responsibility 1: User data management
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  getName() {
    return this.name;
  }

  getEmail() {
    return this.email;
  }
}

// Responsibility 2: Email validation
class EmailValidator {
  static validate(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// Responsibility 3: Database operations
class UserRepository {
  save(user) {
    console.log(`Saving user ${user.getName()} to database`);
  }

  findById(id) {
    // Database query logic
  }
}

// Responsibility 4: Email sending
class EmailService {
  sendWelcomeEmail(user) {
    console.log(`Sending welcome email to ${user.getEmail()}`);
  }
}
```

---

## 🔷 **O** - Open/Closed Principle

### **Definition**

> Software entities (classes, modules, functions) should be open for extension but closed for modification.

### **Why It Matters**

- **Prevents breaking existing code**: You don't modify tested, working code
- **Enables easy feature addition**: New functionality through extension
- **Reduces bugs**: Less chance of introducing bugs in stable code
- **Supports polymorphism**: Interface-based design

### **Example: Violation of OCP**

```javascript
// BAD - Need to modify existing code to add new shapes
class AreaCalculator {
  calculateArea(shapes) {
    let totalArea = 0;

    for (const shape of shapes) {
      if (shape.type === "rectangle") {
        totalArea += shape.width * shape.height;
      } else if (shape.type === "circle") {
        totalArea += Math.PI * shape.radius * shape.radius;
      }
      // To add triangle, we need to modify this method!
    }

    return totalArea;
  }
}
```

### **Example: Following OCP**

```javascript
// GOOD - Open for extension, closed for modification

// Base interface/contract
class Shape {
  calculateArea() {
    throw new Error("calculateArea method must be implemented");
  }
}

// Concrete implementations
class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  calculateArea() {
    return this.width * this.height;
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  calculateArea() {
    return Math.PI * this.radius * this.radius;
  }
}

// New shape - no modification needed to existing code!
class Triangle extends Shape {
  constructor(base, height) {
    super();
    this.base = base;
    this.height = height;
  }

  calculateArea() {
    return 0.5 * this.base * this.height;
  }
}

// Calculator doesn't need modification
class AreaCalculator {
  calculateArea(shapes) {
    return shapes.reduce((total, shape) => total + shape.calculateArea(), 0);
  }
}
```

---

## 🔷 **L** - Liskov Substitution Principle

### **Definition**

> Objects of a superclass should be replaceable with objects of a subclass without breaking the application.

### **Why It Matters**

- **Ensures proper inheritance**: Subclasses truly "are-a" type of their parent
- **Enables polymorphism**: You can use derived classes interchangeably
- **Maintains behavioral consistency**: Subclasses don't surprise users
- **Supports interface contracts**: Implementations honor their promises

### **Example: Violation of LSP**

```javascript
// BAD - Flying bird assumption breaks with penguins
class Bird {
  fly() {
    return "Flying high!";
  }
}

class Sparrow extends Bird {
  fly() {
    return "Sparrow flying!";
  }
}

class Penguin extends Bird {
  fly() {
    // Penguins can't fly! This breaks LSP
    throw new Error("Penguins cannot fly!");
  }
}

// This will fail when penguin is passed
function makeBirdFly(bird) {
  return bird.fly(); // Assumes all birds can fly
}
```

### **Example: Following LSP**

```javascript
// GOOD - Proper abstraction hierarchy

class Bird {
  eat() {
    return "Eating food";
  }
}

// Separate interface for flying capability
class FlyingBird extends Bird {
  fly() {
    return "Flying high!";
  }
}

class SwimmingBird extends Bird {
  swim() {
    return "Swimming in water";
  }
}

class Sparrow extends FlyingBird {
  fly() {
    return "Sparrow flying!";
  }
}

class Penguin extends SwimmingBird {
  swim() {
    return "Penguin swimming!";
  }
}

// Now substitution works correctly
function makeBirdEat(bird) {
  return bird.eat(); // All birds can eat
}

function makeFlyingBirdFly(flyingBird) {
  return flyingBird.fly(); // Only flying birds can fly
}
```

---

## 🔷 **I** - Interface Segregation Principle

### **Definition**

> No client should be forced to depend on methods it does not use. Create specific, focused interfaces rather than large, general-purpose ones.

### **Why It Matters**

- **Reduces coupling**: Classes only depend on what they need
- **Improves flexibility**: Easier to implement focused interfaces
- **Enables better testing**: Smaller interfaces are easier to mock
- **Prevents bloated interfaces**: Avoids "fat" interfaces with many methods

### **Example: Violation of ISP**

```javascript
// BAD - Fat interface forces unnecessary dependencies
class WorkerInterface {
  work() {}
  eat() {}
  sleep() {}
}

class HumanWorker extends WorkerInterface {
  work() {
    return "Human working";
  }

  eat() {
    return "Human eating";
  }

  sleep() {
    return "Human sleeping";
  }
}

class RobotWorker extends WorkerInterface {
  work() {
    return "Robot working";
  }

  eat() {
    // Robots don't eat! Forced to implement unused method
    throw new Error("Robots do not eat");
  }

  sleep() {
    // Robots don't sleep! Forced to implement unused method
    throw new Error("Robots do not sleep");
  }
}
```

### **Example: Following ISP**

```javascript
// GOOD - Segregated interfaces

class Workable {
  work() {
    throw new Error("work method must be implemented");
  }
}

class Eatable {
  eat() {
    throw new Error("eat method must be implemented");
  }
}

class Sleepable {
  sleep() {
    throw new Error("sleep method must be implemented");
  }
}

// Human implements all interfaces
class HumanWorker extends Workable {
  work() {
    return "Human working";
  }
}

class HumanEater extends Eatable {
  eat() {
    return "Human eating";
  }
}

class HumanSleeper extends Sleepable {
  sleep() {
    return "Human sleeping";
  }
}

// Robot only implements what it needs
class RobotWorker extends Workable {
  work() {
    return "Robot working";
  }
}

// Or using composition
class Human {
  constructor() {
    this.worker = new HumanWorker();
    this.eater = new HumanEater();
    this.sleeper = new HumanSleeper();
  }
}

class Robot {
  constructor() {
    this.worker = new RobotWorker();
    // No eating or sleeping capabilities
  }
}
```

---

## 🔷 **D** - Dependency Inversion Principle

### **Definition**

> High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details; details should depend on abstractions.

### **Why It Matters**

- **Reduces coupling**: High-level code isn't tied to implementation details
- **Enables testability**: Easy to inject mock dependencies
- **Improves flexibility**: Can swap implementations without changing high-level code
- **Supports inversion of control**: Dependencies are injected rather than created

### **Example: Violation of DIP**

```javascript
// BAD - High-level module depends on low-level module
class MySQLDatabase {
  save(data) {
    console.log("Saving to MySQL database");
  }
}

class UserService {
  constructor() {
    // Directly depends on concrete implementation
    this.database = new MySQLDatabase();
  }

  createUser(userData) {
    // Business logic
    const user = this.validateUser(userData);

    // Depends on specific database implementation
    this.database.save(user);
  }

  validateUser(userData) {
    // Validation logic
    return userData;
  }
}

// Hard to test and inflexible
const userService = new UserService(); // Always uses MySQL
```

### **Example: Following DIP**

```javascript
// GOOD - Depend on abstractions

// Abstraction
class DatabaseInterface {
  save(data) {
    throw new Error("save method must be implemented");
  }
}

// Low-level modules implement the abstraction
class MySQLDatabase extends DatabaseInterface {
  save(data) {
    console.log("Saving to MySQL database");
  }
}

class PostgreSQLDatabase extends DatabaseInterface {
  save(data) {
    console.log("Saving to PostgreSQL database");
  }
}

class MongoDatabase extends DatabaseInterface {
  save(data) {
    console.log("Saving to MongoDB");
  }
}

// High-level module depends on abstraction
class UserService {
  constructor(database) {
    // Dependency is injected
    this.database = database;
  }

  createUser(userData) {
    // Business logic
    const user = this.validateUser(userData);

    // Depends on abstraction, not concrete implementation
    this.database.save(user);
  }

  validateUser(userData) {
    // Validation logic
    return userData;
  }
}

// Flexible and testable
const mysqlDb = new MySQLDatabase();
const postgresDb = new PostgreSQLDatabase();
const mongoDb = new MongoDatabase();

const userService1 = new UserService(mysqlDb);
const userService2 = new UserService(postgresDb);
const userService3 = new UserService(mongoDb);

// Easy to test with mock
class MockDatabase extends DatabaseInterface {
  save(data) {
    console.log("Mock save called");
  }
}

const mockDb = new MockDatabase();
const testUserService = new UserService(mockDb);
```

---

## 🎯 **SOLID Principles Summary**

| Principle | Focus                 | Key Benefit                                          |
| --------- | --------------------- | ---------------------------------------------------- |
| **SRP**   | Single Responsibility | Classes are focused and cohesive                     |
| **OCP**   | Open/Closed           | Extend functionality without modifying existing code |
| **LSP**   | Liskov Substitution   | Subclasses can replace parent classes safely         |
| **ISP**   | Interface Segregation | Clients only depend on methods they use              |
| **DIP**   | Dependency Inversion  | High-level modules don't depend on low-level details |

### **Real-World Application**

When all SOLID principles work together:

```javascript
// A well-designed system following all SOLID principles

// SRP: Each class has one responsibility
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

// ISP: Focused interfaces
class UserRepository {
  save(user) {}
  findById(id) {}
}

class EmailService {
  sendEmail(to, subject, body) {}
}

// DIP: Depend on abstractions
class UserRegistrationService {
  constructor(userRepository, emailService, validator) {
    this.userRepository = userRepository;
    this.emailService = emailService;
    this.validator = validator;
  }

  async registerUser(userData) {
    // SRP: Single responsibility - user registration
    const user = new User(userData.name, userData.email);

    // DIP: Using injected dependencies
    if (!this.validator.validate(user)) {
      throw new Error("Invalid user data");
    }

    await this.userRepository.save(user);
    await this.emailService.sendEmail(
      user.email,
      "Welcome!",
      "Welcome to our platform!"
    );

    return user;
  }
}

// OCP: Easy to extend with new implementations
class PremiumUserRegistrationService extends UserRegistrationService {
  async registerUser(userData) {
    const user = await super.registerUser(userData);

    // Extended functionality without modifying base class
    await this.emailService.sendEmail(
      user.email,
      "Premium Welcome!",
      "Welcome to our premium service!"
    );

    return user;
  }
}
```

Following SOLID principles leads to code that is **maintainable**, **testable**, **flexible**, and **robust**.
