# Code Smells in Node.js Applications

Code smells are indicators of potential problems in your codebase. They don't necessarily mean the code is broken, but they suggest areas that might need refactoring. Here's a comprehensive list of code smells specific to Node.js applications.

---

## 🚫 **1. Asynchronous Code Smells**

### **Callback Hell**

```javascript
// BAD - Nested callbacks create pyramid of doom
function processUser(userId, callback) {
  getUser(userId, (err, user) => {
    if (err) return callback(err);

    getProfile(user.id, (err, profile) => {
      if (err) return callback(err);

      getPosts(user.id, (err, posts) => {
        if (err) return callback(err);

        getComments(posts[0].id, (err, comments) => {
          if (err) return callback(err);

          callback(null, { user, profile, posts, comments });
        });
      });
    });
  });
}
```

```javascript
// GOOD - Use async/await or promises
async function processUser(userId) {
  try {
    const user = await getUser(userId);
    const profile = await getProfile(user.id);
    const posts = await getPosts(user.id);
    const comments = await getComments(posts[0].id);

    return { user, profile, posts, comments };
  } catch (error) {
    throw error;
  }
}
```

### **Mixed Async Patterns**

```javascript
// BAD - Mixing callbacks, promises, and async/await
function processData(data, callback) {
  // promise
  validateData(data)
    .then((valid) => {
      if (valid) {
        processAsync(data, (err, result) => {
          // callback
          if (err) return callback(err);
          // promise
          saveData(result)
            .then(() => callback(null, result))
            .catch(callback);
        });
      }
    })
    .catch(callback);
}
```

```javascript
// GOOD - Consistent async pattern
async function processData(data) {
  const valid = await validateData(data);
  if (!valid) throw new Error("Invalid data");

  const result = await processAsync(data);
  await saveData(result);

  return result;
}
```

### **Blocking the Event Loop**

```javascript
// BAD - Synchronous operations
function processLargeFile(filename) {
  const data = fs.readFileSync(filename); // BLOCKS! readFileSync is sync !!
  const processed = heavyProcessing(data); // BLOCKS! the single thread waits to be finished ...
  fs.writeFileSync("output.txt", processed); // BLOCKS! writeFileSync is sync !!
}
```

```javascript
// GOOD - Non-blocking operations
async function processLargeFile(filename) {
  const data = await fs.promises.readFile(filename);
  const processed = await heavyProcessingAsync(data);
  await fs.promises.writeFile("output.txt", processed);
}
```

---

## 🗂️ **2. Structure and Organization Smells**

### **Monolithic Route Files**

```javascript
// BAD - Everything in one file
const express = require("express");
const app = express();

// 200+ lines of route handlers
app.get("/users", (req, res) => {
  // 50 lines of business logic
  // Database queries
  // Validation
  // Error handling
});

app.post("/users", (req, res) => {
  // Another 50 lines
});

app.get("/products", (req, res) => {
  // Another 50 lines
});

// ... 20 more routes
```

```javascript
// GOOD - Separated concerns
// routes/users.js
const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.get("/", userController.getUsers);
router.post("/", userController.createUser);

module.exports = router;

// controllers/userController.js
const userService = require("../services/userService");

exports.getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

### **God Objects/Functions**

```javascript
// BAD - Function doing too many things
function processOrder(orderData) {
  // Validate order (20 lines)
  if (!orderData.customerId) throw new Error("Invalid customer");
  if (!orderData.items || orderData.items.length === 0)
    throw new Error("No items");

  // Calculate totals (30 lines)
  let total = 0;
  for (const item of orderData.items) {
    total += item.price * item.quantity;
  }

  // Apply discounts (25 lines)
  if (orderData.discountCode) {
    // Complex discount logic
  }

  // Save to database (15 lines)
  // Send confirmation email (20 lines)
  // Update inventory (25 lines)
  // Generate invoice (30 lines)
  // Log transaction (10 lines)
}
```

```javascript
// GOOD - Single responsibility functions
class OrderProcessor {
  constructor(validator, calculator, discountService, orderRepo, emailService) {
    this.validator = validator;
    this.calculator = calculator;
    this.discountService = discountService;
    this.orderRepo = orderRepo;
    this.emailService = emailService;
  }

  async processOrder(orderData) {
    this.validator.validate(orderData);

    const total = this.calculator.calculateTotal(orderData);
    const discountedTotal = await this.discountService.applyDiscounts(
      total,
      orderData.discountCode
    );

    const order = await this.orderRepo.save({
      ...orderData,
      total: discountedTotal,
    });
    await this.emailService.sendConfirmation(order);

    return order;
  }
}
```

---

## 🔧 **3. Error Handling Smells**

### **Silent Failures**

```javascript
// BAD - Swallowing errors
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    // Silent failure - user gets no response
    console.log("Error occurred"); // No details
  }
});
```

```javascript
// GOOD - Proper error handling
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    // proper logger
    logger.error("Failed to fetch users:", error);
    // feedback
    res.status(500).json({
      error: "Failed to fetch users",
      message: error.message,
    });
  }
});
```

### **Duplicate Error Handling**

```javascript
// BAD - Repeated error handling
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error(error); // Duplicate
    res.status(500).json({ error: "Internal server error" }); // Duplicate
  }
});
```

```javascript
// GOOD - Centralized error handling
const errorHandler = (err, req, res, next) => {
  logger.error(err);

  if (err.name === "ValidationError") {
    return res.status(400).json({ error: "Validation failed" });
  }

  res.status(500).json({ error: "Internal server error" });
};

app.use(errorHandler);

// Routes can now be cleaner
app.get("/users", async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error); // Let middleware handle it
  }
});
```

---

## 🔐 **4. Security Smells**

### **Exposed Secrets**

```javascript
// BAD - Hardcoded secrets
const mongoose = require("mongoose");
mongoose.connect("mongodb://username:password@localhost:27017/database_name");

const jwt = require("jsonwebtoken");
const token = jwt.sign(payload, "my-secret-key-12345");
```

```javascript
// GOOD - Environment variables
require("dotenv").config();
mongoose.connect(process.env.MONGODB_URI);

const token = jwt.sign(payload, process.env.JWT_SECRET);
```

### **Missing Input Validation**

```javascript
// BAD - No validation
app.post("/users", (req, res) => {
  const user = new User(req.body); // Direct assignment
  user.save();
});
```

```javascript
// GOOD - Proper validation
const { body, validationResult } = require("express-validator");

app.post(
  "/users",
  [
    body("email").isEmail().normalizeEmail(),
    body("name").trim().isLength({ min: 1 }),
    body("age").isInt({ min: 0, max: 120 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = new User(req.body);
    user.save();
  }
);
```

---

## 📊 **5. Performance Smells**

### **N+1 Query Problem**

```javascript
// BAD - N+1 queries
async function getUsersWithPosts() {
  const users = await User.find(); // 1 query

  for (const user of users) {
    user.posts = await Post.find({ userId: user.id }); // N queries
  }

  return users;
}
```

```javascript
// GOOD - Single query or proper joins
async function getUsersWithPosts() {
  return await User.find().populate("posts"); // 1 query
}

// Or with raw query
async function getUsersWithPosts() {
  return await User.aggregate([
    {
      $lookup: {
        from: "posts",
        localField: "_id",
        foreignField: "userId",
        as: "posts",
      },
    },
  ]);
}
```

### **Missing Caching**

```javascript
// BAD - Expensive computation on every request
app.get("/stats", async (req, res) => {
  const stats = await calculateExpensiveStats(); // 5 seconds
  res.json(stats);
});
```

```javascript
// GOOD - Caching
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 300 }); // 5 minutes

app.get("/stats", async (req, res) => {
  let stats = cache.get("stats");

  if (!stats) {
    stats = await calculateExpensiveStats();
    cache.set("stats", stats);
  }

  res.json(stats);
});
```

---

## 🧪 **6. Testing Smells**

### **Untestable Code**

```javascript
// BAD - Hard to test
function processPayment(amount) {
  const stripe = require("stripe")("sk_test_..."); // Direct dependency (PROBLEM)
  const result = stripe.charges.create({ amount });

  console.log("Payment processed"); // Side effect

  if (result.status === "succeeded") {
    sendEmail("Payment successful"); // Another side effect
  }
}
```

```javascript
// GOOD - Testable with dependency injection
class PaymentProcessor {
  constructor(paymentGateway, emailService, logger) {
    this.paymentGateway = paymentGateway;
    this.emailService = emailService;
    this.logger = logger;
  }

  async processPayment(amount) {
    const result = await this.paymentGateway.charge(amount);

    this.logger.info("Payment processed");

    if (result.status === "succeeded") {
      await this.emailService.send("Payment successful");
    }

    return result;
  }
}
```

### **No Error Testing**

```javascript
// BAD - Only testing happy path
test("should create user", async () => {
  const user = await createUser({ name: "John", email: "john@example.com" });
  expect(user.name).toBe("John");
});
```

```javascript
// GOOD - Testing error cases too
test("should create user", async () => {
  const user = await createUser({ name: "John", email: "john@example.com" });
  expect(user.name).toBe("John");
});

test("should throw error for invalid email", async () => {
  await expect(createUser({ name: "John", email: "invalid" })).rejects.toThrow(
    "Invalid email"
  );
});

test("should throw error for missing name", async () => {
  await expect(createUser({ email: "john@example.com" })).rejects.toThrow(
    "Name is required"
  );
});
```

---

## 🔄 **7. Dependency Management Smells**

### **Dependency Hell**

```javascript
// BAD - Too many dependencies
const express = require("express");
const lodash = require("lodash");
const moment = require("moment");
const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const redis = require("redis");
const nodemailer = require("nodemailer");
const multer = require("multer");
const sharp = require("sharp");
const pdf = require("html-pdf");
const csv = require("fast-csv");
const xlsx = require("xlsx");
// ... 50+ more dependencies
```

```javascript
// GOOD - Minimal, focused dependencies
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Create utility functions instead of importing libraries
function formatDate(date) {
  return date.toISOString().split("T")[0];
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

### **Circular Dependencies**

```javascript
// BAD - Circular dependency
// userService.js
const postService = require("./postService");

class UserService {
  async getUserPosts(userId) {
    return await postService.getPostsByUser(userId);
  }
}

// postService.js
const userService = require("./userService"); // Circular!

class PostService {
  async getPostsByUser(userId) {
    const user = await userService.getUser(userId);
    return this.findPostsByUser(user);
  }
}
```

```javascript
// GOOD - Proper dependency structure
// userService.js
class UserService {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }
  // removes duplicated code to retrieve the posts of the user, leave that responsibility in one place
  async getUser(userId) {
    return await this.userRepo.findById(userId);
  }
}

// postService.js
class PostService {
  // dependency passed as param
  constructor(postRepo, userService) {
    this.postRepo = postRepo;
    this.userService = userService;
  }

  async getPostsByUser(userId) {
    const user = await this.userService.getUser(userId);
    return await this.postRepo.findByUserId(user.id);
  }
}
```

---

## 🎨 **8. Code Style Smells**

### **Inconsistent Naming**

```javascript
// BAD - Inconsistent naming
const usr = await User.findById(id);
const user_posts = await getUserPosts(usr.id);
const PostCount = user_posts.length;
const isUserActive = usr.active;

function getUserData(ID) {
  return User.find({ _id: ID });
}
```

```javascript
// GOOD - Consistent naming
const user = await User.findById(id);
const userPosts = await getUserPosts(user.id);
const postCount = userPosts.length;
const isUserActive = user.active;

function getUserData(userId) {
  return User.find({ _id: userId });
}
```

### **Magic Numbers and Strings**

```javascript
// BAD - Magic numbers/strings
setTimeout(() => {
  // What does 300000 mean?
  console.log("Cache cleared");
}, 300000);

if (user.role === "admin" || user.role === "super_admin") {
  // Magic strings
}

const results = await User.find().limit(50); // Magic number
```

```javascript
// GOOD - Named constants
const CACHE_CLEAR_INTERVAL = 5 * 60 * 1000; // 5 minutes
const ADMIN_ROLES = ["admin", "super_admin"];
const DEFAULT_PAGE_SIZE = 50;

setTimeout(() => {
  console.log("Cache cleared");
}, CACHE_CLEAR_INTERVAL);

if (ADMIN_ROLES.includes(user.role)) {
  // Clear intent
}

const results = await User.find().limit(DEFAULT_PAGE_SIZE);
```

---

## 📋 **9. Configuration Smells**

### **Environment-Specific Code**

```javascript
// BAD - Environment checks scattered throughout code
function connectToDatabase() {
  if (process.env.NODE_ENV === "production") {
    return mongoose.connect("mongodb://prod-server");
  } else if (process.env.NODE_ENV === "development") {
    return mongoose.connect("mongodb://dev-server");
  } else {
    return mongoose.connect("mongodb://test-server");
  }
}
```

```javascript
// GOOD - Configuration object
const config = {
  development: {
    database: {
      uri: "mongodb://dev-server",
      options: { debug: true },
    },
  },
  production: {
    database: {
      uri: process.env.MONGODB_URI,
      options: { debug: false },
    },
  },
  test: {
    database: {
      uri: "mongodb://test-server",
      options: { debug: false },
    },
  },
};

const currentConfig = config[process.env.NODE_ENV || "development"];

function connectToDatabase() {
  return mongoose.connect(
    currentConfig.database.uri,
    currentConfig.database.options
  );
}
```

---

## 🔍 **10. Monitoring and Logging Smells**

### **Console.log Everywhere**

```javascript
// BAD - Console.log debugging
app.post("/users", async (req, res) => {
  console.log("Creating user:", req.body); // Debug info

  try {
    const user = await User.create(req.body);
    console.log("User created:", user.id); // Success info
    res.json(user);
  } catch (error) {
    console.log("Error creating user:", error); // Error info
    res.status(500).json({ error: "Failed to create user" });
  }
});
```

```javascript
// GOOD - Proper logging
const logger = require("./logger");

app.post("/users", async (req, res) => {
  logger.info("Creating user", {
    userId: req.user?.id,
    email: req.body.email,
  });

  try {
    const user = await User.create(req.body);
    logger.info("User created successfully", {
      userId: user.id,
      email: user.email,
    });
    res.json(user);
  } catch (error) {
    logger.error("Failed to create user", {
      error: error.message,
      stack: error.stack,
      userData: req.body,
    });
    res.status(500).json({ error: "Failed to create user" });
  }
});
```

---

## 🛠️ **Tools to Detect Code Smells**

### **Static Analysis Tools**

```bash
# ESLint - Code quality and style
npm install --save-dev eslint

# SonarJS - Bug detection and code smells
npm install --save-dev eslint-plugin-sonarjs

# JSHint - Code quality
npm install --save-dev jshint

# Complexity analysis
npm install --save-dev complexity-report
```

### **Security Tools**

```bash
# npm audit - Check for vulnerabilities
npm audit

# Snyk - Security scanning
npm install -g snyk

# ESLint security plugin
npm install --save-dev eslint-plugin-security
```

### **Performance Tools**

```bash
# Clinic.js - Performance profiling
npm install -g clinic

# 0x - Flame graph profiling
npm install -g 0x

# Autocannon - Load testing
npm install -g autocannon
```

---

## 📋 **Code Smell Checklist**

Use this checklist to review your Node.js code:

- [ ] **Async Code**: No callback hell, consistent async patterns
- [ ] **Structure**: Separated concerns, single responsibility
- [ ] **Error Handling**: Proper error handling, no silent failures
- [ ] **Security**: No exposed secrets, proper input validation
- [ ] **Performance**: No N+1 queries, appropriate caching
- [ ] **Testing**: Code is testable, error cases covered
- [ ] **Dependencies**: Minimal dependencies, no circular deps
- [ ] **Style**: Consistent naming, no magic numbers
- [ ] **Configuration**: Environment-specific config externalized
- [ ] **Logging**: Proper logging instead of console.log

Regular code reviews and automated tools can help catch these smells early and maintain code quality.
