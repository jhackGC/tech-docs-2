# AJAX (Asynchronous JavaScript and XML)

## Overview

AJAX allows you to request data from servers after your page has loaded, making websites dynamic and interactive. Despite the name mentioning XML, we typically use JSON today.

## What is an API?

### Definition

An **API (Application Programming Interface)** is a URL that you can make requests to get information back from. Think of it as a website, but for machines instead of humans.

### Two Meanings of API

1. **Web API**: An endpoint you call to get data from a server (what we're focusing on)
2. **Code API**: How to use a piece of code (e.g., a dog object with `eat()` and `bark()` methods)

## How AJAX Works: Weather App Example

Let's walk through a hypothetical weather app process:

1. User navigates to your page and it loads
2. User types `98109` into search bar and hits enter
3. Your app makes a request to `api.example.com/weather?zip=98109`
4. The API responds with `{ "temperature": 75, "units": "F" }`
5. Your app decodes the string to an object using `JSON.parse`
6. Your app updates the page to say "The current weather is 75ºF"

## API Sources

### Who Makes APIs?

- **Your own server**: Frontend requesting from your backend
- **Public/Free APIs**: Many available online
- **Paid services**: Weather APIs, mapping APIs, etc.

### Useful Resources

- [Public APIs list](https://github.com/toddmotto/public-apis)
- [Dog CEO API](https://dog.ceo/dog-api/) - A fun example
- [Frontend Masters Pet API](http://pets-v2.dev-apis.com/pets) - Used in examples

## Query Strings

### What Are Query Strings?

The `?zip=98109` part of a URL allows you to send parameters to an API, similar to function parameters.

### Examples

- Single parameter: `example.com/weather?zip=98109`
- Multiple parameters: `example.com/weather?zip=98109&day=tomorrow`
- Parameters separated by `&`

## Making Your First AJAX Request

### Basic Dog Image Example

```html
<button id="dog-btn">Gimme Doggo</button>
<div id="dog-target"></div>
```

```javascript
const DOG_URL = "https://dog.ceo/api/breeds/image/random";
const doggos = document.getElementById("dog-target");

function addNewDoggo() {
  const promise = fetch(DOG_URL);
  promise
    .then(function (response) {
      const processingPromise = response.text();
      return processingPromise;
    })
    .then(function (processedResponse) {
      const dogObject = JSON.parse(processedResponse);
      const img = document.createElement("img");
      img.src = dogObject.message;
      img.alt = "Cute doggo";
      doggos.appendChild(img);
    });
}

document.getElementById("dog-btn").addEventListener("click", addNewDoggo);
```

## Understanding the Code

### Why Async Code?

Requests take time because they involve:

1. Calling out to the Internet
2. Reaching the server
3. Server processing the request
4. Server responding
5. Response coming back

This could be very fast or take a minute - you don't know!

### Promises

A **promise** represents a future value. It allows you to:

- Give it a function to run when it gets an answer back
- Handle async operations without blocking your code

### The fetch() Function

- `fetch()` is a built-in browser function
- Takes a URL and tries to get information from that API
- Returns a promise
- Example: `fetch("https://dog.ceo/api/breeds/image/random")`

### Promise Chaining

You can chain promises with multiple `.then()` calls:

```javascript
fetch(url)
  .then(function (response) {
    // First async operation
    return response.text();
  })
  .then(function (text) {
    // Second async operation (uses result from first)
    const data = JSON.parse(text);
    // Do something with data
  });
```

## Improved Version: Using response.json()

```javascript
const DOG_URL = "https://dog.ceo/api/breeds/image/random";
const doggos = document.getElementById("dog-target");

function addNewDoggo() {
  const promise = fetch(DOG_URL);
  promise
    .then(function (response) {
      const processingPromise = response.json(); // json instead of text
      return processingPromise;
    })
    .then(function (processedResponse) {
      // Skip JSON.parse - it's already an object!
      const img = document.createElement("img");
      img.src = processedResponse.message;
      img.alt = "Cute doggo";
      doggos.appendChild(img);
    });
}
```

### Key Difference

- `response.text()`: Returns raw text (needs `JSON.parse()`)
- `response.json()`: Automatically parses JSON for you

## Response Methods

When you get a response from `fetch()`, you can process it in different ways:

```javascript
fetch(url).then((response) => {
  return response.text(); // Raw text
  return response.json(); // Parsed JSON object
  return response.blob(); // Binary data (images, files)
  return response.arrayBuffer(); // Raw binary data
});
```

## Error Handling

### Basic Error Handling

```javascript
fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    // Use your data
  })
  .catch((error) => {
    console.error("There was a problem:", error);
  });
```

### Why Error Handling Matters

- Network could be down
- API could be unavailable
- Invalid URLs
- Server errors (500, 404, etc.)

## Common AJAX Patterns

### 1. Loading Indicator

```javascript
function fetchData() {
  showLoader();

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      hideLoader();
      displayData(data);
    })
    .catch((error) => {
      hideLoader();
      showError(error);
    });
}
```

### 2. Form Submission

```javascript
function submitForm(formData) {
  fetch("/api/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    });
}
```

### 3. Periodic Updates

```javascript
function updateData() {
  fetch("/api/status")
    .then((response) => response.json())
    .then((data) => updateUI(data));
}

// Update every 30 seconds
setInterval(updateData, 30000);
```

## Best Practices

### 1. Use Descriptive Variable Names

```javascript
// Good
const weatherApiUrl = "https://api.weather.com/forecast";
const weatherData = response.json();

// Less clear
const url = "https://api.weather.com/forecast";
const data = response.json();
```

### 2. Keep Functions Small

```javascript
// Good - separate concerns
function fetchDogImage() {
  return fetch(DOG_URL).then((response) => response.json());
}

function displayDogImage(dogData) {
  const img = document.createElement("img");
  img.src = dogData.message;
  img.alt = "Cute doggo";
  return img;
}

function addNewDoggo() {
  fetchDogImage()
    .then(displayDogImage)
    .then((img) => doggos.appendChild(img));
}
```

### 3. Handle Errors Gracefully

```javascript
fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .catch((error) => {
    console.error("Fetch error:", error);
    showUserFriendlyError();
  });
```

## Real-World Examples

### Weather App

```javascript
function getWeather(zipCode) {
  const url = `https://api.weather.com/forecast?zip=${zipCode}`;

  fetch(url)
    .then((response) => response.json())
    .then((weather) => {
      document.getElementById(
        "temperature"
      ).textContent = `${weather.temperature}°${weather.units}`;
    })
    .catch((error) => {
      document.getElementById("error").textContent =
        "Could not fetch weather data";
    });
}
```

### Search Autocomplete

```javascript
function searchSuggestions(query) {
  const url = `https://api.example.com/search?q=${query}`;

  fetch(url)
    .then((response) => response.json())
    .then((suggestions) => {
      const list = document.getElementById("suggestions");
      list.innerHTML = "";

      suggestions.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item.title;
        list.appendChild(li);
      });
    });
}
```

## Key Takeaways

- AJAX enables dynamic, interactive web applications
- `fetch()` is the modern way to make HTTP requests
- Promises handle asynchronous operations
- Always handle errors gracefully
- Use `response.json()` for JSON APIs
- Chain promises to handle multi-step async operations
- APIs can be your own, public, or paid services
- Query strings pass parameters to APIs

## Next Steps

AJAX with promises is powerful, but there's an even cleaner way to write async code using `async/await`. That's what we'll learn next!
