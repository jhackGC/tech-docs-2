# CSS: Putting It Together

Now it's time to put all the CSS techniques you've learned into practice! This lesson challenges you to create a complete newspaper-style layout using CSS Grid, Flexbox, and styling techniques.

## The Project: The News Times

Your goal is to recreate a newspaper front page layout. Here's what you need to implement:

![The News Times Design](https://btholt.github.io/complete-intro-to-web-dev-v3/images/the_news_times.png)

## Project Requirements

1. **Implement however you see fit** - there are many correct approaches
2. **Navigation links** should underline when a user hovers over them
3. **Use any image** you like (example: `http://pets-images.dev-apis.com/pets/dog25.jpg`)
4. **HTML is provided** - focus on the CSS implementation
5. **Challenge yourself** before looking at the solution

## HTML Structure

Here's the HTML structure to work with:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>The News Times</title>
    <link rel="stylesheet" href="news.css" />
  </head>
  <body>
    <div class="page">
      <div class="brand-header">
        <h1 class="brand">The News Times</h1>
      </div>

      <ul class="nav-links">
        <li><a href="#" class="section-link">Politics</a></li>
        <li><a href="#" class="section-link">Technology</a></li>
        <li><a href="#" class="section-link">Local</a></li>
        <li><a href="#" class="section-link">Opinion</a></li>
        <li><a href="#" class="section-link">Sports</a></li>
      </ul>

      <div class="story story-1">
        <h2 class="article-title">Student Learns HTML</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
      </div>

      <div class="story story-2">
        <h2 class="article-title">BREAKING: Luna is Adorable</h2>
        <img
          class="article-img"
          src="http://pets-images.dev-apis.com/pets/dog25.jpg"
          alt="Luna in a suitcase"
        />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
      </div>

      <div class="story story-3">
        <h2 class="article-title">CSS Is Apparently a Thing</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
      </div>

      <div class="story story-4">
        <h2 class="article-title">
          Between the Angle Brackets: The Brian Holt Scandal
        </h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
      </div>

      <div class="story story-5">
        <h2 class="article-title">
          Scientist Invents New Miracle Drink: Coffee
        </h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      </div>
    </div>
  </body>
</html>
```

## Key Techniques to Use

### CSS Grid for Layout

- Use `grid-template-areas` to define the newspaper layout
- Create a responsive grid structure
- Name your grid areas for clarity

### Flexbox for Navigation

- Use flexbox for the navigation bar
- Distribute links evenly across the width
- Center-align navigation elements

### Typography and Styling

- Choose appropriate fonts for headers and body text
- Style the brand/newspaper title
- Add hover effects to navigation links

### Borders and Visual Hierarchy

- Use borders to separate content sections
- Create visual boundaries between articles
- Ensure consistent spacing and padding

## Solution Approach

Here's the CSS solution structure:

```css
* {
  box-sizing: border-box;
}

body {
  padding: 30px;
}

/* Brand Styling */
.brand {
  font-family: "Snell Roundhand";
  font-weight: normal;
  font-size: 60px;
  text-align: center;
}

/* Grid Areas */
.brand-header {
  grid-area: header;
}
.nav-links {
  grid-area: nav;
}
.story-1 {
  grid-area: story-1;
}
.story-2 {
  grid-area: story-2;
}
.story-3 {
  grid-area: story-3;
}
.story-4 {
  grid-area: story-4;
}
.story-5 {
  grid-area: story-5;
}

/* Main Grid Layout */
.page {
  display: grid;
  grid-template-areas:
    "header header header"
    "nav nav nav"
    "story-1 story-2 story-3"
    "story-4 story-5 story-5";
}

/* Article Styling */
.article-title {
  font-size: 30px;
  text-align: center;
  font-weight: normal;
  font-style: italic;
}

.article-img {
  display: block;
  margin: 0 auto;
  max-height: 250px;
}

/* Story Containers */
.story {
  padding: 10px;
  border-left: 3px solid black;
  border-bottom: 3px solid black;
}

.story-3,
.story-5 {
  border-right: 3px solid black;
}

/* Navigation */
.nav-links {
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  border: 3px solid black;
  margin: 0;
  padding: 30px;
}

.section-link {
  color: #666;
  text-decoration: none;
  font-size: 30px;
  font-weight: bold;
  font-family: "Futura";
}

.section-link:hover {
  text-decoration: underline;
}
```

## Learning Objectives

This project reinforces:

1. **CSS Grid mastery** - Complex layouts with named areas
2. **Flexbox navigation** - Even distribution and alignment
3. **Typography hierarchy** - Different font styles and sizes
4. **Hover effects** - Interactive navigation elements
5. **Border usage** - Visual separation and structure
6. **Responsive design** - Layout that works across screen sizes

## Tips for Success

1. **Start with the grid** - Define your layout structure first
2. **Work section by section** - Style one area at a time
3. **Test as you go** - Check your progress frequently
4. **Don't be afraid to experiment** - Try different approaches
5. **Use browser dev tools** - Inspect and debug your layout

Remember: there's no single "correct" way to implement this design. The goal is to practice combining multiple CSS techniques into a cohesive, professional-looking layout. Challenge yourself before looking at the solution, and don't worry if you struggle - that's where the real learning happens!
