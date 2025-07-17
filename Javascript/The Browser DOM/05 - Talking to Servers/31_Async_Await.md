# async/await

## Overview

async/await is a modern JavaScript feature that makes asynchronous code much easier to read and write. It's a cleaner alternative to promise chains and callbacks.

## The Problem with Promises

### Promise Chains Are Hard to Read

```javascript
// This works but is hard to follow
function addNewDoggo() {
  const promise = fetch(DOG_URL);
  promise
    .then(function (response) {
      const processingPromise = response.json();
      return processingPromise;
    })
    .then(function (processedResponse) {
      const img = document.createElement("img");
      img.src = processedResponse.message;
      img.alt = "Cute doggo";
      doggos.appendChild(img);
    });
}
```

### Historical Context

Before promises, we used **callbacks**:

- Led to "pyramid of doom" or "callback hell"
- Functions inside of functions inside of functions
- Very hard to read and maintain

Promises improved this by making code linear, but we can do even better!

## The Solution: async/await

### Clean, Readable Code

```javascript
const DOG_URL = "https://dog.ceo/api/breeds/image/random";
const doggos = document.getElementById("dog-target");

async function addNewDoggo() {
  const promise = await fetch(DOG_URL);
  const processedResponse = await promise.json();
  const img = document.createElement("img");
  img.src = processedResponse.message;
  img.alt = "Cute doggo";
  doggos.appendChild(img);
}

document.getElementById("dog-btn").addEventListener("click", addNewDoggo);
```

**How much easier is that to read?** So much easier!

## How async/await Works

### Key Rules

1. You can only use `await` inside `async` functions
2. `await` pauses function execution until the promise resolves
3. `async` functions always return promises

### What `await` Does

```javascript
const promise = await fetch(DOG_URL);
```

This line tells your code: **"Pause execution on this function until this promise resolves."**

The function stops executing until the API call finishes and you have a response back. Then it picks up where it left off. This makes code read very linearly!

## async Functions Always Return Promises

### Important Behavior

Even simple `async` functions return promises:

```javascript
async function getName() {
  return "Brian";
}

console.log("a promise", getName()); // Logs: Promise {}

getName().then(function (name) {
  console.log("the actual name", name); // Logs: "the actual name Brian"
});
```

**Key Point:** Despite not doing any `await`ing in `getName`, because it's `async` it returns a promise. This is how `async` functions work and why `await` works with them.

## Comparing Approaches

### Promise Chains

```javascript
function fetchUserData(userId) {
  return fetch(`/api/users/${userId}`)
    .then((response) => response.json())
    .then((user) => {
      return fetch(`/api/posts/${user.id}`);
    })
    .then((response) => response.json())
    .then((posts) => {
      console.log("User posts:", posts);
      return posts;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
```

### async/await

```javascript
async function fetchUserData(userId) {
  try {
    const userResponse = await fetch(`/api/users/${userId}`);
    const user = await userResponse.json();

    const postsResponse = await fetch(`/api/posts/${user.id}`);
    const posts = await postsResponse.json();

    console.log("User posts:", posts);
    return posts;
  } catch (error) {
    console.error("Error:", error);
  }
}
```

**Which one is easier to understand?** The async/await version reads like synchronous code!

## Error Handling with try/catch

### The Problem with Promise Chains

```javascript
fetch(url)
  .then((response) => response.json())
  .then((data) => processData(data))
  .catch((error) => console.error(error)); // Catches all errors
```

### Clean Error Handling with async/await

```javascript
async function fetchData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    processData(data);
  } catch (error) {
    console.error("Something went wrong:", error);
  }
}
```

### Specific Error Handling

```javascript
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const user = await response.json();
    return user;
  } catch (error) {
    if (error.message.includes("404")) {
      console.log("User not found");
    } else {
      console.error("Network error:", error);
    }
    throw error; // Re-throw if needed
  }
}
```

## Common Patterns

### 1. Multiple Async Operations

```javascript
async function loadPageData() {
  try {
    // These run sequentially (one after another)
    const user = await fetchUser();
    const posts = await fetchUserPosts(user.id);
    const comments = await fetchPostComments(posts[0].id);

    return { user, posts, comments };
  } catch (error) {
    console.error("Failed to load page data:", error);
  }
}
```

### 2. Parallel Async Operations

```javascript
async function loadPageDataFast() {
  try {
    // These run in parallel (at the same time)
    const [user, posts, settings] = await Promise.all([
      fetchUser(),
      fetchPosts(),
      fetchSettings(),
    ]);

    return { user, posts, settings };
  } catch (error) {
    console.error("Failed to load page data:", error);
  }
}
```

### 3. Loading with Progress Updates

```javascript
async function loadWithProgress() {
  try {
    updateStatus("Loading user...");
    const user = await fetchUser();

    updateStatus("Loading posts...");
    const posts = await fetchPosts();

    updateStatus("Loading complete!");
    return { user, posts };
  } catch (error) {
    updateStatus("Loading failed!");
    throw error;
  }
}
```

## Real-World Examples

### Weather App with async/await

```javascript
async function getWeather(zipCode) {
  try {
    const response = await fetch(
      `https://api.weather.com/forecast?zip=${zipCode}`
    );

    if (!response.ok) {
      throw new Error("Weather service unavailable");
    }

    const weather = await response.json();

    document.getElementById(
      "temperature"
    ).textContent = `${weather.temperature}°${weather.units}`;
    document.getElementById("description").textContent = weather.description;
  } catch (error) {
    document.getElementById("error").textContent =
      "Could not fetch weather data. Please try again.";
    console.error("Weather fetch error:", error);
  }
}
```

### Form Submission

```javascript
async function submitForm(formData) {
  const submitButton = document.getElementById("submit");

  try {
    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    const response = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Submission failed");
    }

    const result = await response.json();
    showSuccessMessage("Form submitted successfully!");
  } catch (error) {
    showErrorMessage("Submission failed. Please try again.");
    console.error("Submission error:", error);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Submit";
  }
}
```

### Search with Debouncing

```javascript
let searchTimeout;

async function handleSearch(query) {
  // Clear previous timeout
  clearTimeout(searchTimeout);

  // Wait 300ms before searching
  searchTimeout = setTimeout(async () => {
    if (query.length < 2) return;

    try {
      showLoadingSpinner();

      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}`
      );
      const results = await response.json();

      displaySearchResults(results);
    } catch (error) {
      showSearchError();
      console.error("Search error:", error);
    } finally {
      hideLoadingSpinner();
    }
  }, 300);
}
```

## Best Practices

### 1. Always Use try/catch

```javascript
// Good
async function fetchData() {
  try {
    const data = await fetch(url);
    return await data.json();
  } catch (error) {
    console.error("Fetch failed:", error);
    throw error;
  }
}

// Risky - errors will be unhandled
async function fetchData() {
  const data = await fetch(url);
  return await data.json();
}
```

### 2. Don't Forget to await

```javascript
// Wrong - returns a promise, not the data
async function getData() {
  return fetch(url).json(); // Missing await!
}

// Correct
async function getData() {
  const response = await fetch(url);
  return await response.json();
}
```

### 3. Use Parallel Operations When Possible

```javascript
// Slow - runs sequentially
async function loadData() {
  const users = await fetchUsers(); // Wait 200ms
  const posts = await fetchPosts(); // Wait another 200ms
  return { users, posts }; // Total: 400ms
}

// Fast - runs in parallel
async function loadData() {
  const [users, posts] = await Promise.all([
    fetchUsers(), // Both start at the same time
    fetchPosts(), // Total: 200ms (the slower of the two)
  ]);
  return { users, posts };
}
```

### 4. Handle Loading States

```javascript
async function loadUserProfile(userId) {
  const loadingEl = document.getElementById("loading");
  const contentEl = document.getElementById("content");

  try {
    loadingEl.style.display = "block";
    contentEl.style.display = "none";

    const user = await fetchUser(userId);

    contentEl.innerHTML = `<h1>${user.name}</h1><p>${user.email}</p>`;
  } catch (error) {
    contentEl.innerHTML = "<p>Failed to load user profile</p>";
  } finally {
    loadingEl.style.display = "none";
    contentEl.style.display = "block";
  }
}
```

## Common Mistakes

### 1. Forgetting async Keyword

```javascript
// Wrong - will cause syntax error
function fetchData() {
  const data = await fetch(url); // SyntaxError!
  return data.json();
}

// Correct
async function fetchData() {
  const data = await fetch(url);
  return data.json();
}
```

### 2. Not Handling Errors

```javascript
// Risky - unhandled promise rejections
async function riskyFunction() {
  const data = await fetch("/api/data"); // Could fail!
  return data.json();
}

// Safe
async function safeFunction() {
  try {
    const data = await fetch("/api/data");
    return data.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
```

### 3. Using async When Not Needed

```javascript
// Unnecessary async
async function getName() {
  return "Brian"; // No async operations
}

// Better
function getName() {
  return "Brian";
}
```

## Key Takeaways

1. **async/await makes asynchronous code read like synchronous code**
2. **Only use `await` inside `async` functions**
3. **`async` functions always return promises**
4. **Always use try/catch for error handling**
5. **Use `Promise.all()` for parallel operations**
6. **Much easier to read and maintain than promise chains**
7. **Great for handling multiple async operations in sequence**

## When to Use async/await vs Promises

### Use async/await when:

- You have multiple sequential async operations
- You need complex error handling
- You want code that's easy to read and debug
- You're doing conditional async operations

### Use Promises when:

- You need to work with existing promise-based APIs
- You're doing simple one-off async operations
- You're already comfortable with promise chains

async/await is generally the preferred approach for new code because it's more readable and easier to maintain!
