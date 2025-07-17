# CSS Project: Coffee Masters Checkout

This project is your capstone for the HTML and CSS sections! You'll create a complete checkout page for a coffee app, combining all the techniques you've learned.

## Project Overview

Create a checkout page that looks like this:

![Coffee Masters Design](https://btholt.github.io/complete-intro-to-web-dev-v3/images/coffee_masters.png)

## Project Requirements

### What You Need to Build

- **HTML and CSS from scratch** - this time you write both!
- **Coffee Masters logo**: [Download here](https://btholt.github.io/complete-intro-to-web-dev-v3/images/coffee_masters_logo.png)
- **Responsive layout** that works on different screen sizes
- **Form inputs** styled to match the design
- **Clean, modern interface** with proper spacing and typography

### Design Notes

- You don't have to match the design perfectly - get the general style close
- There are many correct ways to implement this
- Expect around 100 lines of HTML and 150 lines of CSS
- Use a combination of Grid and Flexbox where appropriate

## New CSS Techniques You'll Need

### Rounded Corners

Use `border-radius` to create rounded corners:

```css
.rounded-button {
  border-radius: 8px;
}

.circular-element {
  border-radius: 50%;
}
```

### Box Shadows

Add depth with `box-shadow`:

```css
.card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.elevated-button {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

### Web Fonts

Add Google Fonts to enhance typography:

```html
<head>
  <link
    href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap"
    rel="stylesheet"
  />
</head>
```

```css
body {
  font-family: "Open Sans", sans-serif;
}
```

## Advanced Input Styling

### Overlayed Labels

Create modern input fields with overlayed labels:

```html
<div class="input-group">
  <label for="email" class="input-label">Email Address</label>
  <input id="email" class="styled-input" placeholder="Enter your email" />
</div>
```

```css
.input-group {
  position: relative;
  display: inline-block;
}

.styled-input {
  border: 2px solid #ddd;
  padding: 12px;
  border-radius: 8px;
  width: 100%;
}

.input-label {
  background-color: white;
  color: #666;
  font-size: 12px;
  position: absolute;
  left: 16px;
  top: -8px;
  padding: 0 4px;
}
```

## Layout Strategy

### Suggested Approach

1. **Start with the HTML structure** - organize content into logical sections
2. **Create the overall layout** using CSS Grid for the main areas
3. **Style individual components** with Flexbox for internal layouts
4. **Add styling details** like colors, fonts, shadows, and borders
5. **Test responsiveness** and adjust as needed

### Recommended Sections

- Header with logo and navigation
- Order summary section
- Payment form section
- Order total and checkout button

## Key Learning Objectives

This project will test your ability to:

1. **Structure complex HTML** with semantic elements
2. **Create responsive layouts** using Grid and Flexbox
3. **Style form elements** for a professional appearance
4. **Apply visual design principles** like spacing, typography, and color
5. **Use advanced CSS features** like shadows, border-radius, and positioning
6. **Combine multiple techniques** into a cohesive design

## Tips for Success

### Planning Phase

- Analyze the design and identify main sections
- Sketch out your HTML structure before coding
- Choose your layout strategy (Grid for main layout, Flexbox for components)

### Implementation Phase

- Build incrementally - one section at a time
- Test frequently in the browser
- Use browser dev tools to debug layout issues
- Don't be afraid to experiment with different approaches

### Styling Phase

- Start with basic layout, then add styling details
- Use consistent spacing throughout
- Pay attention to typography hierarchy
- Add shadows and rounded corners last

## Resources

- **Reference materials**: [CSS Tricks Border Radius](https://css-tricks.com/almanac/properties/b/border-radius/)
- **Box Shadow Generator**: Various online tools can help create shadow effects
- **Google Fonts**: [fonts.google.com](https://fonts.google.com) for typography options
- **Color Palettes**: Use tools like Coolors.co for color inspiration

## Challenge Yourself!

This is intentionally challenging - it combines everything you've learned about HTML and CSS. Don't worry if you struggle; that's where the real learning happens. Give it your best effort before looking at any solutions.

Remember: There's no single "correct" way to build this. Focus on creating clean, readable code that achieves the visual design. The most important thing is to practice and apply what you've learned.

Good luck with your Coffee Masters checkout page!
