# Front System Design - Rendering Performance

Optimizing Rendering for Performance.
Key point: Fast rendering reduces first contentful paint (FCP) time, which search engines consider a key performance metric.

## Rendering Process and Potential Bottlenecks

| Rendering Step           | Bottleneck                                                                          | Problem Caused                                                                                      |
| ------------------------ | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| HTML Parsing             | Large or deeply nested HTML structures                                              | Slow initial page load due to lengthy DOM tree construction, increasing time to first render (TTFR) |
| CSS Parsing              | Large stylesheets, complex selectors, deep specificity                              | Delayed style calculation, affecting render tree generation and slowing down page rendering         |
| Render Tree Construction | Heavy JavaScript modifying styles before rendering                                  | Blocks render tree creation, delaying the layout and painting processes                             |
| Layout (Reflow)          | Frequent layout recalculations due to DOM updates or dynamic content changes        | Causes layout thrashing, leading to repeated reflows, making UI interactions sluggish               |
| Painting (Repaints)      | Overuse of expensive properties (e.g., box-shadow, filter), frequent visual changes | Triggers unnecessary repaints, increasing CPU/GPU load, and causing laggy animations                |
| Compositing              | Excessive layers, large images, and stacking contexts                               | Slow compositing performance, increasing memory usage, causing animations and scrolling frame drops |

## Strategies for Improving Rendering Performance

- Simplify HTML: It is important to reduce the DOM depth and avoid deep nesting of elements to reduce complexity in the rendering process. Remove hidden divs or unnecessary wrappers, use proper semantic tags.

- Optimize CSS: To improve CSS performance, we should simplify selectors and avoid overly complex or deeply nested rules.
  For example, using class selectors instead of descendant selectors (div p {}) reduces computation overhead, allowing browsers to quickly match elements to their styles.
  Additionally, external stylesheets are preferred over inline styles, as they can be cached and reduce recalculations.

- Minimize layout/reflow: Frequent reflows can slow down rendering, so it’s important to batch DOM updates together rather than making them individually.

- Optimize painting: Excessive painting can degrade performance, so avoiding properties like box-shadow and border-radius in large quantities or during animations is crucial.

- Efficient compositing: To ensure efficient compositing, reduce the number of layers on a page by avoiding elements that create new layers (like position: fixed or z-index)

# GPU acceleration and compositing

Another key aspect of rendering optimization is understanding where rendering happens. Modern machines have a CPU (central processing unit) and a GPU (graphics processing unit). GPU acceleration offloads graphics-related tasks from the CPU to the GPU, allowing smoother animations and faster page updates.

Developers should offload rendering tasks to the GPU when handling complex animations, transitions, or 3D effects, where parallel processing improves efficiency. However, the CPU is better suited to managing tasks that involve heavy calculations, text layout, or frequent DOM updates.

GPU acceleration can significantly enhance rendering performance by leveraging the GPU's parallel processing capabilities but it requires careful consideration of when and how to use it.

## Layer promotion

It involves isolating elements by placing them on their own GPU-accelerated compositing layers.

This is especially crucial for frequently changing elements, like animated buttons or scrolling components. By isolating them on their own layer, visual updates occur independently, preventing unnecessary re-renders of the entire page.

This code below tells the browser that the element is likely to change, prompting it to allocate a separate GPU layer for more efficient handling.

```css
.carousel-item {
  will-change: transform;
  transition: transform 0.5s ease;
}
```

While layer promotion can enhance performance, overusing it may lead to excessive GPU memory consumption and increased overhead. It’s best to promote only those elements that genuinely benefit from hardware acceleration.

# Client-side vs. server-side rendering optimization

Rendering optimization is not just about graphical performance; it also involves choosing the right architectural approach for content delivery.

- CSR (Client-Side Rendering): pages rendered in the browser (JavaScript to dynamically render content)
- SSR (Server-Side Rendering): pages rendered on request
- SSG (Static Site Generation): pages rendered at build time
- ISR (Incremental Static Regeneration): pages updated incrementally after the initial build

A hybrid strategy applies the right technique where needed, combining CSR for interactivity, SSR for faster initial loads, SSG for pre-built static content, and ISR for dynamic updates.

When customisation is needed and is based on user interaction, like user sign-in, SSR (request) or CSR (client-side) can be employed to tailor the experience.

# Summary

Main issues faced during the rendering process and potential solutions:

| Issue                        | Cause                                       | Optimization Technique                             |
| ---------------------------- | ------------------------------------------- | -------------------------------------------------- |
| Large DOM size               | Too many nodes, deep nesting                | Reduce DOM complexity, use documentFragment        |
| Layout thrashing             | Frequent DOM updates                        | Batch updates using requestAnimationFrame          |
| Slow initial load            | Large, deeply nested HTML                   | Reduce DOM depth, use semantic elements            |
| Slow CSS parsing             | Complex selectors, large stylesheets        | Use simple selectors, avoid deep nesting           |
| Excessive repaints           | Overuse of CSS effects (box-shadow, filter) | Use will-change, minimize heavy styles             |
| Unnecessary JS execution     | Excessive unused JS                         | Use code splitting, dynamic imports                |
| Render-blocking resources    | Synchronous CSS/JS                          | Load scripts with async/defer, optimize CSS        |
| Heavy JS execution           | Long-running scripts                        | Use async/defer, minimize rerenders                |
| Inefficient compositing      | Too many layers, stacking contexts          | Optimize layering, use transform and opacity       |
| Overuse of GPU layers        | Excessive hardware acceleration             | Use translateZ(0), promote only necessary layers   |
| Blocking third-party scripts | Slow-loading ads, analytics scripts         | Load scripts asynchronously or via service workers |
| Slow SPA rendering           | Excessive client-side rendering             | Use SSR, SSG, ISR where needed                     |
| Inefficient list rendering   | Large lists slowing down UI                 | Use virtualization (`react-window`) or pagination  |
| Unoptimized fonts            | Large font files, too many weights          | Use font-display: swap, subset fonts               |

# Conclusion

Optimizing the rendering pipeline is not just about improving graphical performance, it is essential for delivering a seamless user experience, reducing load times, and ensuring efficient resource utilization.

By addressing bottlenecks at every stage of the rendering process:

- HTML parsing
- CSS computation
- Layout recalculations
- Painting
- Compositing

developers can significantly enhance application performance.

Selecting the right rendering approach, whether CSR, SSR, SSG, or ISR, plays a pivotal role in balancing speed, interactivity, and scalability. While GPU acceleration and layer promotion improve animations and responsiveness, excessive use can lead to performance trade-offs. Therefore, optimization techniques should be applied strategically, considering both system constraints and user experience goals.

Furthermore, performance monitoring is an ongoing necessity. In an evolving web landscape, maintaining optimal rendering performance is not a one-time effort but a continuous process that ensures applications remain responsive, efficient, and scalable in the long run.
