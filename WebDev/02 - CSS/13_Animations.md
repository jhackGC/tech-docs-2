# CSS Animations

CSS animations open up a world of possibilities for creating engaging, interactive web experiences. With just CSS, you can achieve truly amazing effects that bring your websites to life.

## Basic Animation Example

Let's start with a simple spinning animation:

```html
<style>
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .spinny-boi {
    animation: spin 0.5s infinite linear;
    display: inline-block;
    font-size: 30px;
  }
</style>

<div class="spinny-boi">🤢</div>
```

## How Animations Work

### @keyframes Rule

- Allows you to define a reusable animation
- Can be applied to any element using the animation name
- Defines the states of your animation

### Animation Properties

```css
.element {
  /* Shorthand */
  animation: spin 0.5s infinite linear;

  /* Or write it out fully */
  animation-name: spin;
  animation-duration: 0.5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
```

### Keyframe States

- `from` or `0%`: Starting state of animation
- `to` or `100%`: Ending state of animation
- If `from` is not defined, animation starts from current element state

## Easing Functions

Animation easing controls the rate of change over time, creating more natural motion effects:

```html
<style>
  @keyframes move {
    to {
      translate: 50px;
    }
  }

  .dancer {
    display: inline-block;
    font-size: 30px;
    position: absolute;
    right: 0;

    /* Long form animation properties */
    animation-name: move;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }

  .linear {
    animation-timing-function: linear;
  }
  .ease {
    animation-timing-function: ease;
  }
  .ease-in-out {
    animation-timing-function: ease-in-out;
  }
  .ease-in {
    animation-timing-function: ease-in;
  }
  .ease-out {
    animation-timing-function: ease-out;
  }
</style>

<div class="dancers-list">
  <div class="dancer linear">💃</div>
  <!-- linear -->
  <div class="dancer ease">💃</div>
  <!-- ease -->
  <div class="dancer ease-in-out">💃</div>
  <!-- ease-in-out -->
  <div class="dancer ease-in">💃</div>
  <!-- ease-in -->
  <div class="dancer ease-out">💃</div>
  <!-- ease-out -->
</div>
```

## Easing Function Types

1. **linear**: Constant speed throughout
2. **ease**: Starts slow, speeds up, then slows down
3. **ease-in-out**: Slow start and end, fast middle
4. **ease-in**: Slow start, then speeds up
5. **ease-out**: Fast start, then slows down
6. **cubic-bezier()**: Custom curve using mathematical functions

## Beyond Position Animations

You can animate many CSS properties, not just position:

```html
<style>
  @keyframes rainbow {
    100%,
    0% {
      color: rgb(255, 0, 0);
    }
    8% {
      color: rgb(255, 127, 0);
    }
    16% {
      color: rgb(255, 255, 0);
    }
    25% {
      color: rgb(127, 255, 0);
    }
    33% {
      color: rgb(0, 255, 0);
    }
    41% {
      color: rgb(0, 255, 127);
    }
    50% {
      color: rgb(0, 255, 255);
    }
    58% {
      color: rgb(0, 127, 255);
    }
    66% {
      color: rgb(0, 0, 255);
    }
    75% {
      color: rgb(127, 0, 255);
    }
    83% {
      color: rgb(255, 0, 255);
    }
    91% {
      color: rgb(255, 0, 127);
    }
  }

  .rainbow-text {
    animation: rainbow 2s infinite;
    font-size: 24px;
    font-weight: bold;
  }
</style>

<div class="rainbow-text">Rainbow</div>
```

## Key Animation Properties

### Animation Duration

- How long the animation takes to complete one cycle
- Examples: `1s`, `500ms`, `0.5s`

### Animation Iteration Count

- How many times the animation repeats
- `infinite` for endless loop
- Numbers for specific repetitions

### Animation Direction

- `normal`: Default direction
- `reverse`: Backwards
- `alternate`: Forward then backward
- `alternate-reverse`: Backward then forward

### Animation Fill Mode

- `none`: Default
- `forwards`: Keeps end state
- `backwards`: Applies start state before animation
- `both`: Both forwards and backwards

## Practical Tips

1. **Performance**: Animate `transform` and `opacity` for best performance
2. **Accessibility**: Consider users who prefer reduced motion
3. **Subtlety**: Often less is more with animations
4. **Purpose**: Animations should enhance user experience, not distract

## Advanced Techniques

- Combine multiple animations on one element
- Use JavaScript to trigger animations based on user interaction
- Create complex sequences with animation delays
- Use CSS variables for dynamic animations

CSS animations are a powerful tool for creating engaging web experiences. Start with simple animations and gradually explore more complex techniques as you become comfortable with the basics.
