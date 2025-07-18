# Flex

_Content from: [Complete Intro to Web Dev v3 - Flex](https://btholt.github.io/complete-intro-to-web-dev-v3/lessons/css/flex)_

`display: flex` is a display mode for CSS. It's to note that when you stick `display: flex`, it allows you to change the layout inside the tag. It allows you to change the layout of its children. Externally, it acts just like `block`. Likewise there is a `inline-flex` which acts just like `display: inline-block` externally.

Flex allows for a lot of interesting patterns but we're going to scratch the surface today. Take [Jen Kramer's course](https://frontendmasters.com/courses/css-grid-flexbox-v2/) or read the [CSS Tricks article](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) to learn more. We're going to explore same case today. Flex lets you tell CSS how to lay out the items inside a tag. We can tell them to be left aligned, bottom aligned, center aligned, whatever you want. You can even throw them into columns. I think this is best taught by example so let's just throw a bunch on the page. All of them will have the following CSS:

```html
<style>
  .flex-container {
    display: flex;
    width: 100%;
    border: 1px solid black;
  }
</style>
<div class="flex-container">
  <div class="box-1">1</div>
  <div class="box-2">2</div>
  <div class="box-3">3</div>
</div>
```

**Result:**
1 2 3

And we'll just be changing three properties: `flex-direction`, `justify-content`, and `align-items`. Nothing special will go on the boxes, just the style to make the colored boxes. So let's throw a bunch examples up.

No changes made, just the above CSS and HTML.

Looks similar to the floats, but notice if you make the page more narrow, the boxes will squish instead of wrapping.

## Flex Direction

```html
<style>
  .reverse {
    flex-direction: row-reverse;
  }
</style>
<div class="flex-container reverse">
  <div class="box-1">1</div>
  <div class="box-2">2</div>
  <div class="box-3">3</div>
</div>
```

**Result:**
3 2 1

It's backwards! Easy as pie to do it with flex. We can even make it a column!

```html
<style>
  .column {
    flex-direction: column;
  }
</style>
<div class="flex-container column">
  <div class="box-1">1</div>
  <div class="box-2">2</div>
  <div class="box-3">3</div>
</div>
```

**Result:**
1
2
3

## justify-content

Okay, so now we've done columns, (also, `column-reverse` works as you would expect) we're going to try affecting how the items are justified.

```html
<style>
  .jc-right {
    justify-content: flex-end;
  }
</style>
<div class="flex-container jc-right">
  <div class="box-1">1</div>
  <div class="box-2">2</div>
  <div class="box-3">3</div>
</div>
```

**Result:**
1 2 3

This is basically right-justified. Notice this is different from the reversed one above because the items stayed in the same order. By default, the `justify-content` is `flex-start` which is like left-justified.

```html
<style>
  .jc-center {
    justify-content: center;
  }
</style>
<div class="flex-container jc-center">
  <div class="box-1">1</div>
  <div class="box-2">2</div>
  <div class="box-3">3</div>
</div>
```

**Result:**
1 2 3

And here we see centered boxes. Let's explore the last two which aim to evenly space the boxes out in the space provided.

```html
<style>
  .jc-sb {
    justify-content: space-between;
  }
</style>
<div class="flex-container jc-sb">
  <div class="box-1">1</div>
  <div class="box-2">2</div>
  <div class="box-3">3</div>
</div>
```

**Result:**
1 2 3

This one puts the first on the left most and the last on the right most. It then aims to space out the items in the middle equally. Very useful for laying out columns on your web page. The last two are `space-around` and `space-evenly`. I'm just showing you `space-around` but `space-evenly` is very similar. Feel free to read more into it if you're interested.

```html
<style>
  .jc-sa {
    justify-content: space-around;
  }
</style>
<div class="flex-container jc-sa">
  <div class="box-1">1</div>
  <div class="box-2">2</div>
  <div class="box-3">3</div>
</div>
```

**Result:**
1 2 3

Notice the space between the items and the edges (as compared to before.)

## align-items

So now we've shown you the `justify-content` property, let's examine `align-items`. `justify-content` worries about horizontal justification and `align-items` worries about vertical alignment. Let's take a look at a few examples.

```html
<style>
  .ai-fe {
    align-items: flex-end;
  }
</style>
<div class="flex-container ai-fe">
  <div class="box-1">1</div>
  <div class="box-2">2</div>
  <div class="box-3">3</div>
</div>
```

**Result:**
1 2 3

Notice how all the items are now pushed to the bottom of the element, the "end" of it (the opposite is, you guessed it `flex-start`.) This isn't always useful but I find myself constantly using the next one for centering items.

```html
<style>
  .ai-center {
    align-items: center;
  }
</style>
<div class="flex-container ai-center">
  <div class="box-1">1</div>
  <div class="box-2">2</div>
  <div class="box-3">3</div>
</div>
```

**Result:**
1 2 3

Vertically centering something previous to flex was a nightmare. Seriously, Google "vertically center CSS" and see the decades of anguish on StackOverflow. Luckily for you we now have flex and it makes vertically centering something as easy as `align-items: center` in a `display: flex` tag. Count your lucky stars!!

```html
<style>
  .ai-stretch {
    align-items: stretch;
    height: 200px;
  }

  /* remove the height from the three boxes */
  .no-height {
    height: unset;
  }
</style>
<div class="flex-container ai-stretch">
  <div class="box-1 no-height">1</div>
  <div class="box-2 no-height">2</div>
  <div class="box-3 no-height">3</div>
</div>
```

**Result:**
1 2 3

For this one I did have to remove the heights from the boxes or it overrules the stretch. Stretch makes the interior tags stretch to fit whatever container they're put in (unless they're limited by a `height` already.)

## flex-grow

```html
<style>
  .ai-grow {
    /* nothing necessary here */
  }

  .ai-grow .box-1 {
    flex-grow: 1;
    width: 0;
  }
  .ai-grow .box-2 {
    flex-grow: 5;
    width: 0;
  }
  .ai-grow .box-3 {
    flex-grow: 10;
    width: 0;
  }
</style>
<div class="flex-container ai-grow">
  <div class="box-1">1</div>
  <div class="box-2">5</div>
  <div class="box-3">10</div>
</div>
```

**Result:**
1 5555555555 10101010101010101010

This is another neat trick you can do with flex: tell it a proportion and have it fill in the blanks with the widths. With flex-grow you're telling it what proportion for it to use for its width. In our case, we have a 1, a 5, and a 10. So box-1 will take 1/16, box-2 will take 5/16, and box-3 will take 10/16 of the available width.

## Combining what we learned

So now we've gone through the basics of flex. Obviously you can combine these to achieve various effects. We're going to re-use the CSS classes from above (if you messed with them, just refresh the page.)

```html
<div class="flex-container ai-center reverse jc-sa">
  <div class="box-1">1</div>
  <div class="box-2">2</div>
  <div class="box-3">3</div>
</div>
```

**Result:**
3 2 1

Or this:

```html
<div class="flex-container ai-fe column">
  <div class="box-1">1</div>
  <div class="box-2">2</div>
  <div class="box-3">3</div>
</div>
```

**Result:**
1
2
3

## Further Flex

There's a lot more power with flex you can achieve. You can make multiple rows using `flex-wrap`. There are also a slew of properties that the children elements can have (everything we have done so far goes on the parent class) that you can affect things like order using `order` and you can individually override the `align-items` using `align-self`. Cool stuff. Definitely dig into it further.

## Key Flexbox Properties

### Parent (Container) Properties:

- **`flex-direction`**: row, row-reverse, column, column-reverse
- **`justify-content`**: flex-start, flex-end, center, space-between, space-around, space-evenly
- **`align-items`**: flex-start, flex-end, center, stretch, baseline
- **`flex-wrap`**: nowrap, wrap, wrap-reverse

### Child (Item) Properties:

- **`flex-grow`**: How much to grow relative to other items
- **`flex-shrink`**: How much to shrink relative to other items
- **`flex-basis`**: Initial size before growing/shrinking
- **`align-self`**: Override the align-items for individual items
- **`order`**: Change the visual order without affecting HTML structure

Flexbox is incredibly powerful and is now the standard way to create layouts in modern CSS!
