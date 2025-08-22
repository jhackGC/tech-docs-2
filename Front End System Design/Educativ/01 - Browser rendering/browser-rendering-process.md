| Step                         | Description                                                                                                          |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Parsing HTML                 | Browser reads HTML and builds the DOM (Document Object Model), a tree-like structure of nodes representing elements. |
| Parsing CSS                  | Browser parses CSS and creates the CSSOM (CSS Object Model), defining the style rules for DOM elements.              |
| Constructing the render tree | Combines DOM and CSSOM into a render tree, which includes only visible elements to be displayed.                     |
| Layout                       | Calculates the position and size of each visible element based on styles and document flow.                          |
| Painting                     | Fills in pixels for each element (text, color, images) based on the computed styles—like coloring in the layout.     |
| Compositing                  | Combines painted layers to form the final image. Layers are stacked and rendered for smooth, optimized updates.      |
