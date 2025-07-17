# Components

## basic usage

Import react and react-dom scripts from the pre-bundled versions in node_modules
then their exports will be available globally (React and ReactDOM)

    React.createElement('div', null) 

creates DOM element in the virtual DOM

ReactDOM.render(component, target dom node); renders the component in the DOM node

the component can be reused as its function is like a blue-print.
React.createElement('div', null) can receive children as the third params

React.createElement('div', null,
        React.createElement(MyTitle),
        React.createElement(MyTitle),
        React.createElement(MyTitle)
)

or as an array


React.createElement('div', null,
        [React.createElement(MyTitle),
        React.createElement(MyTitle),
        React.createElement(MyTitle)]
)

that's how you build  components tree


<body>
    <div id="app"></div>
    <script src="../node_modules/react/umd/react.development.js"></script>
    <script src="../node_modules/react-dom/umd/react-dom.development.js"></script>

    <script>

      const MyFirstComponent = function (){
        return React.createElement('div', null,
          React.createElement('h1', null, 'This is my first component!')
        )
      }


      const MyTitle = function () {
          return (React.createElement('h1', null, 'This is my first component!'))
      }

      const MySecondComponent = function (){
        return React.createElement('div', null,
            React.createElement(MyTitle)
        )
      }

      ReactDOM.render(React.createElement(MySecondComponent), document.getElementById('app'));


    </script>
</body>


## props
you can pass props from components to components

    const MyTitle = function (props) {
          return (React.createElement('h1', null, props.title))
     }

     const MySecondComponent = function (){
        return React.createElement('div', null,
            React.createElement(MyTitle, {title:'The title by props'})
        )
     }


### Functional Component
- a function with just behavior that returns other react components or JSX

// MyTitle.js

    import React from 'react';

    const MyTitle = function (props) {
          return (React.createElement('h1', null, props.title))
     }

    export default MyTitle


### Class component
- a class, that has state, you want to keep some info in it.
e.g. an input component needs to store the user input text somewhere.

ES6 class, javascript object with props and methods, must have  render() method

// SearchBar.js

    import React, { Component } from 'react';

    export default class SearchBar extends Component{
        render(){
            return < input />;
        }
    }





