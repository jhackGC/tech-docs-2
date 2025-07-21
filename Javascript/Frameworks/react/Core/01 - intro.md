## React

React broke away from the MVC approach at the time, favoring a component-based architecture that promotes reusability and Single Responsibility Principle (SRP). All the view, model, and controller logic is encapsulated within components, making it easier to manage and much more productive.

React components do encapsulate aspects of Model, View, and Controller, but not in the traditional MVC sense. In React:

- **View**: The JSX (or the return value of the render function) defines what is displayed—this is the "View".
- **Model**: The component's state (using `useState`, `useReducer`, or class state) holds the data—this is the "Model".
- **Controller**: The event handlers and functions inside the component (such as `onClick`, `handleChange`, etc.) act as the "Controller", managing user input and updating state.

**In summary:**

- The **View** is the rendered output.
- The **Model** is the state/data managed by the component.
- The **Controller** is the logic (event handlers) that updates the state in response to user actions.

React components blend these roles together, making each component self-contained and responsible for its own data, UI, and logic. This is a key difference from classic MVC, where these concerns are separated into different layers.

So, react is not strictly MVC, but it does encapsulate the roles of Model, View, and Controller within components. This allows for a more modular and maintainable codebase, where each component can manage its own state and behavior while rendering its own view.

Creating reusable components that encapsulates

- logic
- markup
- style

Why not MVC on the client like Angular and Backbone?
It is netter than JQuery spaguetti code

Why not MVC approach?
Large apps, one model is used in lots of views.
Controllers were doing crazy routing from one mode to many controllers.
Ends up in in a many to many mess ...

On the other hand, componentization resembles how the web works ...
The separation of concerns about Model, View and Controllers didn't make much sense for user interfaces.

All in one file, one single point of error, easy to debug, easy to understand.
Maintaining Angular apps is difficult, because the "components" are dispersed
