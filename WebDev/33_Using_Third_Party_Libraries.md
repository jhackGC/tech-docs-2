# Using Third Party Libraries

## Overview

One of the most powerful aspects of modern JavaScript development is the ability to use code that others have written and shared. This allows us to build amazing applications by standing on the shoulders of giants.

## Why Use Third Party Libraries?

### Benefits

- **Save Time**: Don't reinvent the wheel
- **Leverage Expertise**: Use code written by experts in specific domains
- **Proven Solutions**: Libraries are often battle-tested across many projects
- **Community Support**: Active communities provide help and updates
- **Focus on Your App**: Spend time on your unique features, not common problems

### The JavaScript Ecosystem

- **Hundreds of thousands** of libraries available
- Covers everything: animations, data visualization, UI components, utilities
- Mix of motivations: benevolence, education, résumé building, hopes for reciprocity

## Two Ways to Include Libraries

### Method 1: CDN Links (Quick and Easy)

### Method 2: Build Tools (Professional Approach)

Let's explore both using the **Popmotion** animation library as an example.

## Method 1: Using CDN Links

### What is a CDN?

A **CDN (Content Delivery Network)** hosts libraries so you can include them directly in your HTML.

### Example: Popmotion Animation

**index.html:**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Animation</title>
    <link href="./animation.css" rel="stylesheet" type="text/css" />
  </head>
  <body>
    <h1>Animation</h1>
    <div class="ball"></div>

    <!-- Load library first -->
    <script src="https://unpkg.com/popmotion@11.0.3/dist/popmotion.min.js"></script>
    <!-- Then your code -->
    <script src="./animation.js"></script>
  </body>
</html>
```

**animation.css:**

```css
.ball {
  width: 100px;
  height: 100px;
  background-color: #0074d9;
  border-radius: 50%; /* Makes it circular */
  position: relative;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 400px;
}
```

**animation.js:**

```javascript
const ball = document.querySelector(".ball");
popmotion.animate({
  from: "0px",
  to: "100px",
  repeat: Infinity,
  repeatType: "mirror",
  type: "spring",
  onUpdate(update) {
    ball.style.left = update;
  },
});
```

### How It Works

1. The CDN script makes `popmotion` available globally
2. Our script can then use the `popmotion` object
3. The ball springs back and forth with realistic physics!

### Important Notes

- **Script order matters**: Load the library before your code
- **Global objects**: CDN libraries often create global variables
- **Version pinning**: Always specify a version (`@11.0.3`)

## Method 2: Using Build Tools (Professional Approach)

### Why Build Tools?

Real projects often have:

- 10+ to 100+ dependencies
- Too many script tags becomes unmanageable
- Need better dependency management
- Want optimized, bundled code

### Prerequisites: Install Node.js

1. [Install Node.js](https://nodejs.org/) (version 10+)
2. This also installs **npm** (Node Package Manager)

### Step-by-Step Setup

#### 1. Install Parcel (Build Tool)

```bash
npm install --global parcel
```

[Parcel](https://parceljs.org/) is a simple bundler that packages all your code together.

#### 2. Update Your HTML

Remove the CDN script tag:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Animation</title>
    <link href="./animation.css" rel="stylesheet" type="text/css" />
  </head>
  <body>
    <h1>Animation</h1>
    <div class="ball"></div>

    <!-- No more CDN script -->
    <script src="./animation.js"></script>
  </body>
</html>
```

#### 3. Initialize NPM Project

```bash
npm init -y
```

This creates a `package.json` file to track dependencies and configurations.

#### 4. Install Popmotion Locally

```bash
npm install popmotion@11.0.3
```

This:

- Downloads Popmotion to `node_modules/` folder
- Adds it to your `package.json` dependencies
- Makes it available for `require()` or `import`

#### 5. Update JavaScript (CommonJS Style)

**animation.js:**

```javascript
const popmotion = require("popmotion");

const ball = document.querySelector(".ball");
popmotion.animate({
  from: "0px",
  to: "100px",
  repeat: Infinity,
  repeatType: "mirror",
  type: "spring",
  onUpdate(update) {
    ball.style.left = update;
  },
});
```

#### 6. Run Development Server

```bash
parcel index.html
```

- Creates a local server at `http://localhost:1234`
- Bundles all your code automatically
- Watches for changes and rebuilds

### Modern ES6 Import Syntax

**Preferred modern approach:**

```javascript
import { animate } from "popmotion";

const ball = document.querySelector(".ball");
animate({
  from: "0px",
  to: "100px",
  repeat: Infinity,
  repeatType: "mirror",
  type: "spring",
  onUpdate(update) {
    ball.style.left = update;
  },
});
```

### How Parcel Works

#### Entry Point Detection

1. You point Parcel to your HTML file
2. HTML references CSS and JS files
3. Parcel follows these references
4. Bundles everything together

#### Module Resolution

- `require('popmotion')` → looks in `node_modules/`
- `require('./my-file')` → looks for local file
- `.js` extension is optional: `require('./my-file.js')`

#### Development Features

- **Hot reloading**: Changes update automatically
- **Source maps**: Debug original code, not bundled code
- **Development server**: No need to set up Apache or nginx

## Comparing the Two Methods

### CDN Approach

**Pros:**

- Quick to set up
- No build process
- Works immediately
- Good for learning/prototyping

**Cons:**

- External dependency (requires internet)
- Global namespace pollution
- Hard to manage many libraries
- No optimization/bundling
- Version management challenges

### Build Tool Approach

**Pros:**

- All code bundled together
- Better performance (one HTTP request)
- Dependency management with `package.json`
- Module system (no global variables)
- Development server with hot reloading
- Optimizations (minification, tree-shaking)

**Cons:**

- More complex setup
- Requires Node.js
- Build step needed
- Learning curve for tools

## Package.json Deep Dive

### Example package.json

```json
{
  "name": "my-animation-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "parcel index.html",
    "build": "parcel build index.html"
  },
  "dependencies": {
    "popmotion": "^11.0.3"
  },
  "devDependencies": {
    "parcel": "^2.0.0"
  }
}
```

### Key Sections

- **dependencies**: Libraries your app needs to run
- **devDependencies**: Tools for development (build tools, testing)
- **scripts**: Custom commands you can run with `npm run`

### Semantic Versioning

- `11.0.3` = Exact version
- `^11.0.3` = Compatible version (11.x.x)
- `~11.0.3` = Patch releases only (11.0.x)

## Working with Dependencies

### Installing Libraries

```bash
# Install and save to package.json
npm install library-name

# Install specific version
npm install library-name@2.1.0

# Install as dev dependency
npm install --save-dev parcel

# Install globally
npm install --global live-server
```

### Managing node_modules

- **Never commit `node_modules/`** to version control
- Use `.gitignore` to exclude it
- Run `npm install` to recreate from `package.json`
- Can be multiple GB in size for large projects

### Package Lock Files

- `package-lock.json` locks exact versions
- Ensures consistent installs across environments
- **Do commit** this file to version control

## Popular JavaScript Libraries

### Animation

- **Popmotion**: Functional, reactive animation library
- **GSAP**: Professional animation library
- **Anime.js**: Lightweight animation library

### UI Libraries

- **React**: Component-based UI library
- **Vue**: Progressive JavaScript framework
- **Angular**: Full-featured framework

### Utilities

- **Lodash**: Utility functions for common tasks
- **Moment.js**: Date/time manipulation (now deprecated)
- **Day.js**: Modern, lightweight date library

### Data Visualization

- **D3.js**: Powerful data visualization library
- **Chart.js**: Simple charts
- **Three.js**: 3D graphics

### HTTP Requests

- **Axios**: Promise-based HTTP client
- **Fetch** (built-in): Modern browser API

## Best Practices

### 1. Choose Libraries Carefully

```javascript
// Consider these factors:
// - Active maintenance
// - Good documentation
// - Community size
// - Bundle size impact
// - Browser compatibility
```

### 2. Lock Down Versions

```json
{
  "dependencies": {
    "popmotion": "11.0.3" // Exact version
  }
}
```

### 3. Separate Dependencies

```json
{
  "dependencies": {
    "react": "^18.0.0" // Runtime dependency
  },
  "devDependencies": {
    "parcel": "^2.0.0" // Build tool only
  }
}
```

### 4. Use .gitignore

```
node_modules/
dist/
.cache/
```

### 5. Understand Your Dependencies

- Read documentation
- Check bundle size impact
- Understand what you're importing
- Consider alternatives

## Terminal Commands Reference

### Stop Development Server

```bash
# Universal stop command
Ctrl + C
```

### Common NPM Commands

```bash
# Initialize new project
npm init -y

# Install all dependencies
npm install

# Install specific package
npm install package-name

# Uninstall package
npm uninstall package-name

# List installed packages
npm list

# Check for outdated packages
npm outdated

# Update packages
npm update
```

### Parcel Commands

```bash
# Development server
parcel index.html

# Production build
parcel build index.html

# Specify port
parcel index.html --port 3000
```

## Next Steps

### Ready to Learn More?

Third-party libraries open up incredible possibilities. Consider exploring:

- **React**: Component-based UI development
- **Vue.js**: Progressive JavaScript framework
- **D3.js**: Data visualization
- **Angular**: Full-featured framework
- **Express.js**: Server-side JavaScript

### Frontend Masters Courses

- [Complete Intro to React](https://frontendmasters.com/courses/complete-react-v7/)
- [Introduction to Vue.js](https://frontendmasters.com/courses/vue-3/)
- [Building Awesomer Apps with Angular](https://frontendmasters.com/courses/angular-13/)
- [Introduction to Data Visualization with d3](https://frontendmasters.com/courses/d3/)

## Key Takeaways

- Third-party libraries accelerate development significantly
- CDN approach is quick for learning; build tools are better for real projects
- npm and package.json manage dependencies professionally
- Parcel makes bundling simple for beginners
- Modern JavaScript uses ES6 import/export syntax
- Choose libraries carefully - they become part of your codebase
- Build tools unlock powerful development workflows

The JavaScript ecosystem is vast and powerful. Learning to leverage existing libraries effectively is one of the most important skills in modern web development!
