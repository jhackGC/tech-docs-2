# REACT - FRONT END MASTER COURSE

## Installation


## Tooling
yarn

emit helper to write html faster

prettier
- external tool on save and / or npm script for all files

ESLint

webpack

Babel

## The React Paradigm
Creating reusable components that encapsulates
* logic
* markup
* style

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




## Basic usage

### component creation

Create element: 

    React.createElement(tagName, {id: 'comp1'}, children[])

- tagName can be anything not only real html tags ...
- the second arg are the attributes
- third arg the children
- The create element is the output of the transpiling of a JSX tag.

        <body>
        // root dom element
        <div id="app"></div>
        
        // libraries
        // Once imported they are available as global objects
        <script src="../node_modules/react/dist/react.js"></script>
        <script src="../node_modules/react-dom/dist/react-dom.js"></script>
        
        <script>
          const MyFirtComponent = function(){
            return React.createElement('div', null,
              React.createElement('h1', null, 'This is my first component')
            )
          }
        
          ReactDOM.render(React.createElement(MyFirtComponent),
            document.getElementById('app')
          );
        
        </script>
        </body>

### composition and nesting

    const MyTitleComponent = function(){
        return React.createElement('div', null,
          React.createElement('h1', null, 'This is my second component')
        )
    }
    
    const MyFirtComponent = function(){
        return React.createElement('div', null,
          React.createElement(MyTitleComponent),
          React.createElement(MyTitleComponent),
          React.createElement(MyTitleComponent)
        )
    }

You can use an array as the children components (nested elems)
   
    const MyFirtComponent = function(){
        return React.createElement('div', null,
            [
              React.createElement(MyTitleComponent),
              React.createElement(MyTitleComponent),
              React.createElement(MyTitleComponent)
            ]
        )
    }
    
### Create elements factories
If you are not using JSX, and don't want to create all the time new components qith createElement
You can se factories like:
    
    const ce = React.createElement;
    
    const MyFirtComponent = function(){
        return ce('div', null,
            [
              ce(MyTitleComponent),
              ce(MyTitleComponent),
              ce(MyTitleComponent)
            ]
        )
    }

### props / attributes

    // second arg are the props ...
    React.createElement(MyTitleComponent, { title: 'Hey'}),
    
    // first arg are the props now
    const MyTitleComponent = function(props){
        return ce('div', null,
          ce('h1', null, props.title)
        )
    }
    
One of the props can be the style, which has have an object value, easier to work with, compared to css. 
    
    ce('h1', { style: {color: props.color} }, props.title)

more on styling in another chapter.
React style is actually interacting with the Javascript API for DOM elements, and thats how styling works.
 in the DOM API regarding the style.

When the element to render is another component, props will be passed as the first arg in the creation function, as we 
have seen.
But when the elem to render is a string it is taken a a html tag and the props are going to be rendered as the 
attributes. Note that those tags and props/attrs are not checked if they are actually real html tags/attrs !!!
React does it naively, that's what we use tooling to fix that. e.g. Flow. to statically type check.

## JSX
Anything that requires to be transpiled is good to be named not js directly ...
