# JSON (JavaScript Object Notation)

## Overview

JSON is a standard language format that allows your frontend website to communicate with backend servers. Think of it like morse code - both sender and receiver need to understand the same encoding system.

## What is AJAX?

Before diving into JSON, let's understand AJAX:

- **AJAX** = Asynchronous JavaScript and XML
- Allows requesting additional data from server after page has loaded
- Examples: infinite scroll on social media, loading more content
- The name is historical (we don't use XML anymore), but it stuck

## What is JSON?

- **JSON** = JavaScript Object Notation
- Looks exactly like JavaScript objects
- Used for encoding messages between frontend and backend
- 99.999999% of all JSON is valid JavaScript code

## JSON Syntax Example

```json
{
  "name": "Luna",
  "age": 10,
  "breed": "Havanese",
  "location": {
    "city": "Seattle",
    "state": "WA"
  }
}
```

This looks like valid JavaScript because it **is** valid JavaScript! You could copy-paste this directly into JavaScript code and it would work.

## Converting JSON to JavaScript Objects

### The Problem

Server responses always come back as **strings**, but we need them as objects to work with in JavaScript.

### The Solution: JSON.parse()

```javascript
// Pretend this came from a server (it's actually a string)
const responseFromServer = `{
  "name": "Luna",
  "age": 10,
  "breed": "Havanese",
  "location": {
    "city": "Seattle",
    "state": "WA"
  }
}`;

console.log(responseFromServer); // This is a string

// Convert string to JavaScript object
const responseObject = JSON.parse(responseFromServer);

console.log(responseObject.name); // "Luna"
console.log(responseObject.location.city); // "Seattle"
console.log(responseObject); // Full object
```

**Key Points:**

- `JSON.parse()` converts JSON string to JavaScript object
- Once parsed, you can access properties normally
- Use dot notation to access nested properties

## Converting JavaScript Objects to JSON

### The Problem

Sometimes you need to send JavaScript objects to a server, but servers expect JSON strings.

### The Solution: JSON.stringify()

```javascript
const dog = {
  name: "Luna",
  age: 10,
  breed: "Havanese",
  location: {
    city: "Seattle",
    state: "WA",
  },
};

const objString = JSON.stringify(dog);
console.log(objString);
// Output: {"name":"Luna","age":10,"breed":"Havanese","location":{"city":"Seattle","state":"WA"}}
```

**Key Points:**

- `JSON.stringify()` converts JavaScript object to JSON string
- Useful for sending data to servers
- Creates a compact string representation

## Pretty-Printing JSON

### For Debugging and Display

Sometimes you want to display JSON in a readable format:

```html
<pre>
  <code id="code-block"></code>
</pre>
```

```javascript
const dog = {
  name: "Luna",
  age: 10,
  breed: "Havanese",
  location: {
    city: "Seattle",
    state: "WA",
  },
};

const el = document.getElementById("code-block");
el.innerText = JSON.stringify(dog, null, 4);
```

**Result:**

```json
{
  "name": "Luna",
  "age": 10,
  "breed": "Havanese",
  "location": {
    "city": "Seattle",
    "state": "WA"
  }
}
```

### JSON.stringify() Parameters

```javascript
JSON.stringify(object, replacer, spacing);
```

- **object**: The object to convert
- **replacer**: `null` (ignore this parameter for now)
- **spacing**: Number of spaces for indentation
  - `0` = no spacing (compact)
  - `2` = 2 spaces indentation
  - `4` = 4 spaces indentation

### HTML Tags Explained

- `<pre>` = pre-formatted text (respects whitespace)
- `<code>` = indicates code block
- Together they create nicely formatted code displays
- Useful for debugging when `console.log` isn't available

## Escape Characters

### The Problem

JSON uses quotes (`"`) to define strings, but what if you want quotes inside your strings?

### The Solution: Escape Characters

- `\"` = literal quote character inside a string
- `\\` = literal backslash character
- `\n` = newline character
- `\t` = tab character

### Examples

```javascript
const quotes = '"'; // String containing one quote
const backslash = "\\"; // String containing one backslash
const message = 'She said "Hello!"'; // String with quotes inside
```

**Alternative:** Use single quotes to contain double quotes:

```javascript
const message = '"Hello there!"'; // Easier way
```

## Common JSON Use Cases

### 1. API Responses

```javascript
// Typical server response
const apiResponse = `{
  "users": [
    {"id": 1, "name": "Alice"},
    {"id": 2, "name": "Bob"}
  ],
  "status": "success"
}`;

const data = JSON.parse(apiResponse);
console.log(data.users[0].name); // "Alice"
```

### 2. Sending Data to Servers

```javascript
const userInfo = {
  username: "alice123",
  email: "alice@example.com",
  age: 25,
};

// Convert to JSON before sending
const jsonData = JSON.stringify(userInfo);
// Now ready to send to server
```

### 3. Local Storage

```javascript
// Storing objects in localStorage (which only accepts strings)
const settings = { theme: "dark", language: "en" };
localStorage.setItem("userSettings", JSON.stringify(settings));

// Retrieving objects from localStorage
const savedSettings = JSON.parse(localStorage.getItem("userSettings"));
```

## JSON vs JavaScript Objects

### Similarities

- Almost identical syntax
- Both use key-value pairs
- Both support nested structures
- Both support arrays

### Key Differences

| JSON                           | JavaScript Object       |
| ------------------------------ | ----------------------- |
| Keys must be strings in quotes | Keys can be unquoted    |
| Only double quotes (`"`)       | Single or double quotes |
| Limited data types             | All JavaScript types    |
| Cannot contain functions       | Can contain functions   |
| Cannot contain comments        | Can contain comments    |

### JSON Data Types

JSON supports only these data types:

- String: `"hello"`
- Number: `42`, `3.14`
- Boolean: `true`, `false`
- null: `null`
- Object: `{}`
- Array: `[]`

## Best Practices

### 1. Always Handle Errors

```javascript
try {
  const data = JSON.parse(responseString);
  // Use data here
} catch (error) {
  console.error("Invalid JSON:", error);
}
```

### 2. Validate Data Structure

```javascript
const data = JSON.parse(response);
if (data && data.users && Array.isArray(data.users)) {
  // Safe to use data.users
}
```

### 3. Use Meaningful Variable Names

```javascript
// Good
const userProfile = JSON.parse(userDataString);

// Less clear
const obj = JSON.parse(str);
```

## Key Takeaways

- JSON is the standard format for web communication
- `JSON.parse()` converts JSON strings to JavaScript objects
- `JSON.stringify()` converts JavaScript objects to JSON strings
- JSON looks like JavaScript but has stricter rules
- Always handle potential parsing errors
- Use pretty-printing for debugging and display
- JSON is essential for modern web development

## Next Steps

Now that you understand JSON, you're ready to learn about AJAX - how to actually request and send JSON data to servers!
