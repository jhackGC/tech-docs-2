# Pseudoclasses and Pseudoelements

_Content from: [Complete Intro to Web Dev v3 - Pseudoclasses and Pseudoelements](https://btholt.github.io/complete-intro-to-web-dev-v3/lessons/css/pseudoclasses-and-pseudoelements)_

## Pseudoclasses

Sometimes we want to change how elements look based on certain events that happen in the DOM. One of the most common ones is we want to change an element when someone hovers their mouse over it. Like this box:

The CSS we used for this is this:

```html
<style>
  .hover-example {
    width: 100px;
    height: 100px;
    background-color: limegreen;
    color: white;
  }
  .hover-example:hover {
    background-color: crimson;
    width: 150px;
    height: 150px;
  }
</style>
<div class="hover-example">Hover your mouse over me</div>
```

**Result:**
_Hover your mouse over me_ (box changes on hover)

The `:hover` part selects that element only when that condition is true. There are are many [CSS pseudo classes](https://css-tricks.com/pseudo-class-selectors/) like being able to only select the first element of something like this:

The CSS for this is:

```html
<style>
  .first-child-example {
    color: crimson;
  }
  .first-child-example:first-child {
    color: limegreen;
  }
</style>
<ol>
  <li class="first-child-example">First</li>
  <li class="first-child-example">Second</li>
  <li class="first-child-example">Third</li>
</ol>
```

**Result:**

1. First (in green)
2. Second (in red)
3. Third (in red)

This only selects the element if it is the first element inside of a tag. Otherwise it won't select it. There are numerous other CSS classes; check out the CSS-Tricks article if you want learn more.

## Common Pseudoclasses

- **`:hover`** - Triggers when a user hovers over an element
- **`:active`** - Triggers when an element is being activated (clicked)
- **`:focus`** - Triggers when an element has focus (like a form input)
- **`:first-child`** - Selects the first child element
- **`:last-child`** - Selects the last child element
- **`:nth-child(n)`** - Selects the nth child element
- **`:visited`** - Selects visited links
- **`:disabled`** - Selects disabled form elements

## Pseudoelements

We're not going to dwell too much on pseudoelements as they are a bit of an advance concept. [Read here](https://css-tricks.com/almanac/pseudo-selectors/b/after-and-before/) for a more in-depth dive on it. But let's have a quick example.

```html
<div class="chapter">This is a chapter of my book.</div>

<div class="chapter">This is a second chapter of my book.</div>

<style>
  .chapter {
    margin: 0;
  }
  .chapter::after {
    content: "❦";
    font-size: 50px;
    text-align: center;
    display: block;
  }
</style>
```

**Result:**
This is a chapter of my book.
❦

This is a second chapter of my book.
❦

Do you remember at the end of a chapter of some books, they have a little embellishment to let you know you've finished a chapter? That's called an end mark. Many use one called a fleuron and that's what the ❦ character is. Let's say we wanted to write CSS to automatically insert that character after every chapter class in our book.

(By the way you can totally use CSS for print layouts like books and newspapers.)

Every element has a `::before` and an `::after`. You can use these pseudoelements to insert things there like we did with the fleuron.

## Common Pseudoelements

- **`::before`** - Inserts content before an element's content
- **`::after`** - Inserts content after an element's content
- **`::first-letter`** - Selects the first letter of text
- **`::first-line`** - Selects the first line of text
- **`::selection`** - Styles the portion of text selected by the user

## Important Notes

Again, not the most common thing to do, just wanted you to be aware of it. You will in old code and documentation see `:before` and `:after` but these are old and now are `::before` and `::after` so that pseudoclasses (like `:hover`) and pseudoelements (like `::after`) can be disambiguated by syntax.

## Key Differences

- **Pseudoclasses** (single colon `:`) select elements based on their state or position
- **Pseudoelements** (double colon `::`) select and style parts of elements or insert content
