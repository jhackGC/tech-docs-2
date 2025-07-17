---
title: JavaScript Arrays
layout: clean
---

# JavaScript Arrays

Arrays are ordered collections of data. Unlike objects which store data using keys, arrays store data in a specific order that you can access by position (index).

## What are Arrays?

Arrays are perfect for storing lists of related items:

- Days of the week
- Shopping list items
- User names
- Product inventory
- Anything where order matters

## Creating Arrays

Arrays are created using square brackets `[]`:

```javascript
const daysOfTheWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

console.log(daysOfTheWeek);
```

## Accessing Array Elements

Use square brackets with the index number (starting from 0):

```javascript
console.log(daysOfTheWeek[0]); // "Monday" (first element)
console.log(daysOfTheWeek[1]); // "Tuesday" (second element)
console.log(daysOfTheWeek[6]); // "Sunday" (seventh element)
```

**Remember**: Arrays use **zero-based indexing**

- First element: index 0
- Second element: index 1
- Third element: index 2
- And so on...

## Array Types

You can store any type of data in arrays:

### Array of Strings

```javascript
const colors = ["red", "green", "blue", "yellow"];
```

### Array of Numbers

```javascript
const primeNumbers = [1, 2, 3, 5, 7, 11, 13, 17];
```

### Array of Objects

```javascript
const courses = [
  { teacher: "Will Sentance", course: "JavaScript: The Hard Parts" },
  { teacher: "Sarah Drasner", course: "Intro to Vue" },
  { teacher: "Brian Holt", course: "Complete Intro to React" },
  { teacher: "Steve Kinney", course: "Build Your Own Programming Language" },
  { teacher: "Scott Moss", course: "Intro to Node.js" },
];
```

### Mixed Arrays

```javascript
const mixedArray = ["Hello", 42, true, { name: "John" }, [1, 2, 3]];
```

## Array Properties and Methods

### Length Property

```javascript
const primeNumbers = [1, 2, 3, 5, 7, 11, 13, 17];
console.log(primeNumbers.length); // 8
```

### Join Method

```javascript
console.log(primeNumbers.join(" | ")); // "1 | 2 | 3 | 5 | 7 | 11 | 13 | 17"
console.log(primeNumbers.join(", ")); // "1, 2, 3, 5, 7, 11, 13, 17"
console.log(primeNumbers.join("")); // "1235711317"
```

## Adding Elements to Arrays

### Push Method (Add to End)

```javascript
const courses = [
  { teacher: "Will Sentance", course: "JavaScript: The Hard Parts" },
  { teacher: "Sarah Drasner", course: "Intro to Vue" },
];

courses.push({ teacher: "Jen Kramer", course: "Getting Started with CSS" });
console.log(courses.length); // 3
```

### Unshift Method (Add to Beginning)

```javascript
const fruits = ["banana", "orange"];
fruits.unshift("apple");
console.log(fruits); // ["apple", "banana", "orange"]
```

## Modifying Array Elements

You can change elements by assigning to their index:

```javascript
const courses = [
  { teacher: "Will Sentance", course: "JavaScript: The Hard Parts" },
  { teacher: "Sarah Drasner", course: "Intro to Vue" },
  { teacher: "Brian Holt", course: "Complete Intro to React" },
];

// Change the third element (index 2)
courses[2] = { teacher: "Brian Holt", course: "Complete Intro to Databases" };
console.log(courses[2]); // New course object
```

## Removing Elements from Arrays

### Pop Method (Remove from End)

```javascript
const colors = ["red", "green", "blue"];
const lastColor = colors.pop();
console.log(lastColor); // "blue"
console.log(colors); // ["red", "green"]
```

### Shift Method (Remove from Beginning)

```javascript
const numbers = [1, 2, 3, 4];
const firstNumber = numbers.shift();
console.log(firstNumber); // 1
console.log(numbers); // [2, 3, 4]
```

## Looping Through Arrays

### Method 1: For Loop (Traditional)

```javascript
const cities = [
  "Seattle",
  "San Francisco",
  "Salt Lake City",
  "Amsterdam",
  "Hong Kong",
];

for (let i = 0; i < cities.length; i++) {
  console.log(cities[i]);
}
```

**How it works:**

1. Start with `i = 0`
2. Continue while `i < cities.length`
3. Access element at `cities[i]`
4. Increment `i` after each iteration

### Method 2: forEach Method

```javascript
cities.forEach(function (city) {
  console.log(city);
});

// Or with arrow function (modern syntax)
cities.forEach((city) => {
  console.log(city);
});
```

**How it works:**

- `forEach` calls the function once for each array element
- The current element is passed as a parameter (`city`)
- No need to manage index manually

## Practical Examples

### Shopping List Manager

```javascript
const shoppingList = [];

// Add items
shoppingList.push("milk");
shoppingList.push("bread");
shoppingList.push("eggs");

console.log(`Shopping list has ${shoppingList.length} items`);

// Display list
console.log("Shopping List:");
for (let i = 0; i < shoppingList.length; i++) {
  console.log(`${i + 1}. ${shoppingList[i]}`);
}

// Remove last item
const lastItem = shoppingList.pop();
console.log(`Removed: ${lastItem}`);
```

### Student Grade Manager

```javascript
const grades = [85, 92, 78, 96, 88];

// Calculate average
let total = 0;
for (let i = 0; i < grades.length; i++) {
  total += grades[i];
}
const average = total / grades.length;
console.log(`Average grade: ${average}`);

// Find highest grade
let highest = grades[0];
for (let i = 1; i < grades.length; i++) {
  if (grades[i] > highest) {
    highest = grades[i];
  }
}
console.log(`Highest grade: ${highest}`);

// Count passing grades (>= 70)
let passingCount = 0;
grades.forEach((grade) => {
  if (grade >= 70) {
    passingCount++;
  }
});
console.log(`Passing grades: ${passingCount}`);
```

### Contact List

```javascript
const contacts = [
  { name: "Alice Johnson", phone: "555-0101", email: "alice@email.com" },
  { name: "Bob Smith", phone: "555-0102", email: "bob@email.com" },
  { name: "Carol Davis", phone: "555-0103", email: "carol@email.com" },
];

// Add new contact
function addContact(name, phone, email) {
  contacts.push({ name, phone, email });
  console.log(`Added ${name} to contacts`);
}

// Find contact by name
function findContact(searchName) {
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].name === searchName) {
      return contacts[i];
    }
  }
  return null;
}

// Display all contacts
function displayContacts() {
  console.log("Contact List:");
  contacts.forEach((contact, index) => {
    console.log(`${index + 1}. ${contact.name} - ${contact.phone}`);
  });
}

addContact("David Wilson", "555-0104", "david@email.com");
displayContacts();
console.log(findContact("Alice Johnson"));
```

## Useful Array Methods

### Check if Element Exists

```javascript
const fruits = ["apple", "banana", "orange"];

console.log(fruits.includes("banana")); // true
console.log(fruits.includes("grape")); // false
```

### Find Index of Element

```javascript
const colors = ["red", "green", "blue"];

console.log(colors.indexOf("green")); // 1
console.log(colors.indexOf("purple")); // -1 (not found)
```

### Reverse Array

```javascript
const numbers = [1, 2, 3, 4, 5];
numbers.reverse();
console.log(numbers); // [5, 4, 3, 2, 1]
```

### Sort Array

```javascript
const names = ["Charlie", "Alice", "Bob"];
names.sort();
console.log(names); // ["Alice", "Bob", "Charlie"]

const numbers = [3, 1, 4, 1, 5];
numbers.sort();
console.log(numbers); // [1, 1, 3, 4, 5]
```

## Array vs Object Comparison

### Use Arrays When:

- Order matters
- You have a list of similar items
- You need to loop through items in sequence
- You're storing a collection

### Use Objects When:

- You need key-value pairs
- Order doesn't matter
- You want to access data by meaningful names
- You're modeling a single entity

## Real-World Array Applications

### Todo List

```javascript
const todoList = [
  { id: 1, task: "Buy groceries", completed: false },
  { id: 2, task: "Walk the dog", completed: true },
  { id: 3, task: "Write code", completed: false },
];

// Add new todo
function addTodo(task) {
  const newTodo = {
    id: todoList.length + 1,
    task: task,
    completed: false,
  };
  todoList.push(newTodo);
}

// Mark as completed
function completeTodo(id) {
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].id === id) {
      todoList[i].completed = true;
      break;
    }
  }
}

// Display pending todos
function showPendingTodos() {
  console.log("Pending tasks:");
  todoList.forEach((todo) => {
    if (!todo.completed) {
      console.log(`- ${todo.task}`);
    }
  });
}

addTodo("Learn JavaScript");
completeTodo(1);
showPendingTodos();
```

### Image Gallery

```javascript
const imageGallery = [
  { src: "photo1.jpg", alt: "Sunset", caption: "Beautiful sunset" },
  { src: "photo2.jpg", alt: "Mountain", caption: "Mountain view" },
  { src: "photo3.jpg", alt: "Ocean", caption: "Ocean waves" },
];

// Display gallery
function displayGallery() {
  imageGallery.forEach((image, index) => {
    console.log(`Image ${index + 1}: ${image.caption}`);
    console.log(`File: ${image.src}`);
    console.log("---");
  });
}

displayGallery();
```

## Best Practices

1. **Use meaningful variable names**
2. **Start with for loops** when learning (easier to understand)
3. **Use forEach** when you're comfortable with functions
4. **Check array length** before accessing elements
5. **Use const** for arrays that won't be reassigned (you can still modify elements)

```javascript
// Good
const userNames = ["alice", "bob", "charlie"];

// Good - checking bounds
if (userNames.length > 0) {
  console.log(userNames[0]);
}

// Good - descriptive loop
for (let i = 0; i < userNames.length; i++) {
  console.log(`User ${i + 1}: ${userNames[i]}`);
}
```

Arrays are fundamental to JavaScript programming. They're perfect for managing lists of data and are used everywhere in web development - from storing user input to managing application state!
