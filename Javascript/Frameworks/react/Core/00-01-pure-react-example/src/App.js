// plain react functional component
// This is a pure React example without any build tools or JSX
const Pizza = (
  props // props are passed in as an argument
) => {
  const name = props.name || "Cheese Pizza"; // default to Cheese Pizza if no name prop is passed
  return React.createElement("div", {}, [
    React.createElement("h2", {}, name),
    React.createElement("p", {}, "Delicious pizza made with love."),
    React.createElement(
      "ul",
      {},
      props.ingredients
        ? props.ingredients.map((ingredient) =>
            React.createElement("li", {}, ingredient)
          )
        : React.createElement("li", {}, "No ingredients provided")
    ),
  ]);
};

const App = () => {
  return React.createElement(
    "div", // the type of element
    {}, // props/attributes
    [
      React.createElement("h1", {}, "Pixel Perfect Pizzas"),
      React.createElement(Pizza), // React tries to run the function and get the return value
      React.createElement(Pizza, {
        name: "Hawaiian Pizza",
        ingredients: ["Ham", "Pineapple"],
      }), // passing props
      React.createElement(Pizza, { name: "Pepperoni Pizza" }), // passing props
    ] // children
  );
};

const container = document.getElementById("root"); // where we want to render our React app
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
