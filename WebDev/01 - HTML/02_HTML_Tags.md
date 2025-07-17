# HTML Tags

_Content originally from: [Complete Intro to Web Dev v3 - HTML Tags](https://btholt.github.io/complete-intro-to-web-dev-v3/lessons/html/tags) and adapted_

We're going to start building our very first website. At first, our website is going to be pretty ugly, but it's still going to be functional! We're going to be using the language HTML, or hypertext markup language. This isn't a programming language since it doesn't actually do anything. It's like how English isn't a programming language either: you can't "run" English. Same idea with HTML: you can't "run" HTML. HTML is simply the language and pictures on the page. It's the static (which is another word for unchanging) content.

## Tags

HTML's base building block is the tag. A tag is a building block. It describes what's inside it. Every tag has an opening and a closing tag (some tags open and close at the same point.) I think the easiest way to learn it is just to show a bunch of examples.

```html
<h1>This is the title to my document</h1>
```

**Result:**

# This is the title to my document

You can see the `<h1>` and the `</h1>` surrounding the text "This is the title to my document". This is how HTML operates. You can have an opening tag which has information or more tags inside of it. In this case we have an `h1` tag which is a heading tag: it's used for the biggest title on the page, typically a title. If you rendered that using the browser, it looks like:

# This is the title to my document

It's bigger and bolder because that's what browsers do with h1s, it makes them look important on the page. However it does more than that too. Browsers aren't the only thing reading websites. Blind and people who can't see well will use screen readers to read web pages out loud to them; it uses things like headers to understand what information is important to read to the users. It's also how Google and Bing will understand the important details of your website. In other words, it's important which type of tag you use. More than just the visual aesthetic is using those tags.

### Tag Structure

A tag, whether it's opening or closing, is surrounded by angle brackets, `<` and `>`. Closing tags always have a slash, `/`, after the opening angle bracket, so it looks like `</h1>`. There are things called "self-closing tags" or "void tags" that open and close themselves. These will look like this: `<input />` (I'll explain in a sec what inputs are.) That slash at the end means it is self-closing. To make it more confusing, that last slash is optional, so `<input>` (with no closing tag ever) is valid too since input tags are always self-closing.

### Tag Nesting

Tags are also opened and closed in a specific order too. The most recently opened tag must be the next closed tag. For example, if I have an h1 inside of a div, the h1 must be closed first.

```html
<div>
  <h1>Hi</h1>
</div>
```

**Result:**

# Hi

The above is **correct**.

```html
<!-- INCORRECT EXAMPLE -->
<div>
  <h1>
    Hi
  </div>
</h1>
```

The above is **incorrect**. I can't close the div before I close the h1 since the h1 was the last one I opened.

## Key Points

- HTML is a markup language, not a programming language
- Tags are the base building blocks of HTML
- Tags have opening and closing parts: `<tag>content</tag>`
- Some tags are self-closing: `<input />` or `<input>`
- Tags must be properly nested (last opened, first closed)
- Tags provide semantic meaning for screen readers, search engines, and accessibility
- Proper tag usage is important for more than just visual appearance
