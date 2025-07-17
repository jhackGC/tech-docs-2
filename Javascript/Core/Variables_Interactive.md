---
title: JavaScript Variables Demo
layout: clean
---

# JavaScript Variables - Interactive Examples

## Basic Variable Declaration

{% include runnable-code.html
title="Variable Declaration Example"
language="javascript"
code='const firstName = "Brian";
const lastName = "Holt";
const age = 30;

console.log(`Hello, I am ${firstName} ${lastName}`);
console.log(`I am ${age} years old`);

// Try changing the values above and run again!' %}

## String Concatenation

{% include runnable-code.html
title="String Concatenation Methods"
language="javascript"
code='// Method 1: Template strings (modern)
const name = "Alice";
const city = "New York";
const template = `Hi, I am ${name} from ${city}`;
console.log("Template string:", template);

// Method 2: Plus operator (traditional)
const plus = "Hi, I am " + name + " from " + city;
console.log("Plus operator:", plus);

// Method 3: Array join
const array = ["Hi, I am", name, "from", city];
console.log("Array join:", array.join(" "));' %}

## Math Operations

{% include runnable-code.html
title="JavaScript Math"
language="javascript"
code='const price = 29.99;
const quantity = 3;
const tax = 0.08;

const subtotal = price _ quantity;
const taxAmount = subtotal _ tax;
const total = subtotal + taxAmount;

console.log(`Price per item: $${price}`);
console.log(`Quantity: ${quantity}`);
console.log(`Subtotal: $${subtotal.toFixed(2)}`);
console.log(`Tax (${tax * 100}%): $${taxAmount.toFixed(2)}`);
console.log(`Total: $${total.toFixed(2)}`);' %}

## Try Your Own Code

{% include runnable-code.html
title="Your Code Playground"
language="javascript"
code='// Write your own JavaScript code here!
// Try creating variables, doing math, or using console.log

console.log("Hello, World!");

// Your code here...' %}
