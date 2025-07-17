# Deploy in Heroku
    > create a heroku account
    https://signup.heroku.com/

    > install heroku CLI
    https://devcenter.heroku.com/articles/heroku-cli
    npm install -g heroku-cli
    heroku --version

    > login to heroku
    heroku login

    > Once the app is managed by GIT

    > get into the app root dir
    cd my-app
    
    > Create a heroku app, a heroku git repo, add a remote called heroku, and set the app master branch to track the master of the heroku repo.

    heroku create my-app -b https://github.com/mars/create-react-app-buildpack.git

    > check heroku remote
    git remote show heroku

    > push the code to the heroku remote (that will create a node running environment, install node packages, and deploy your app on it)
    git push heroku master

    > open heroku app
    heroku open

    All in one, once npm, git and heroku are installed
    -----------------------------------------------
    npm install -g create-react-app
    create-react-app my-app
    cd my-app
    git init
    heroku create -b https://github.com/mars/create-react-app-buildpack.git
    git add .
    git commit -m "react-create-app on Heroku"
    git push heroku master
    heroku open










Learning path
-------------------------------------------------------------------
- React website: https://facebook.github.io/react/
- React Native : https://facebook.github.io/react-native/
- Flux: https://facebook.github.io/flux/
Flux introduces a one way data flow paradigm that works really well with React. I'd also take a look at Redux. Redux is a Flux library that is used to simplify state and complex applications

- http://reactkungfu.com/







React is about printing dynamic content and reuse components


JSX - Javascript as XML
----------------------------

Use Babel: http://babeljs.io/
- Transpiles JS Code
- Works for JSX
- Works for ES6+

Converts JSX sintax to React JS code

JSX Sintax: 
	<ul>
	    <li>item 1</li>
	    <li>item 2</li>
	    <li>item 3</li>
	</ul>

JS Code using Babel
React.createElement(
                "ul",
                null,
                React.createElement(
                                "li",
                                null,
                                "item 1"
                ),
                React.createElement(
                                "li",
                                null,
                                "item 2"
                ),
                React.createElement(
                                "li",
                                null,
                                "item 3"
                )
);

You can add a browser transpiler only up to version 5, version 6 does nto support browser transpiler
        <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.js"></script>



Creating components
---------------------------

## React always want to render one element, so wrap all that you need to render into one element (e.g. a div)

## With React.create ##
var MyComponent = React.createClass({
    render(){
        return <div>
            <h1>Hello World !</h1>
            <p>This is my first React component</p>
        </div>
    }
})

ReactDOM.render(<MyComponent />,
document.getElementById('react-container'))


## With a ES6 class ##
class MyComponent extends React.Component{
    render() {
        return <div>
            <h1>Hello World</h1>
            <p>This is my first React component!</p>
        </div>
    }
}

ReactDOM.render(<MyComponent />,
    document.getElementById('react-container'))

## Stateless functional component,  a simple function that returns react elements ##
 const MyComponent = () => {
    return <div>
        <h1>Hello World 3 !</h1>
        <p>This is my first React component</p>
    </div>
}

Adding properties to components
----------------------------------------
var MyComponent = React.createClass({
    render() {
        return <div>
            <h1>{this.props.text}</h1>
            <p>This is my first React component!</p>
        </div>
    }
})


 ReactDOM.render(<div>
    <MyComponent text="Hola Mundo !"/>
    <MyComponent text="Hola Mundo 2 !"/>
    <MyComponent text="Hola Mundo 3 !"/>
</div>
,
document.getElementById('react-container'))
 
 ## prop children ##
 -----------------------------------------------------
ReactDOM.render(<div>
    <MyComponent text="Hola Mundo !">
    	My message
    </MyComponent>
</div>
,

<p>{this.props.children}</p>


document.getElementById('react-container'))

CUSTOM METHODS (mostly used for events) in COMPONENETS
---------------------------------------------

var Note = React.createClass({

	edit(){
	    alert("Editing Note")
	},

	remove(){
	    alert("Removing Note")
	},

	render() {
	    return (
	        <div className="note">
	            <p></p>
	            <span>
	                <button onClick={this.edit}>Edit</button>
	                <button onClick={this.remove}>X</button>
	            </span>
	        </div>
	    )
	}
});

COMPONENTS STATE
-------------------
When a component's state data changes, the render function will be called again to re-render the change in state.

 getInitialState, a React function that when our component renders, this will be the initial state of the application.

 setState, another REact function

 var CheckBox = React.createClass({

getInitialState() {
    return {checked : false}
},

handleCheck (){
    this.setState({checked: !this.state.checked });
},

render(){
    var msg;
    if(this.state.checked){
        msg = "checked"
    }else{
        msg = "un-checked"
    }

    return (
            <div>
                <input type="checkbox"
                       onChange={this.handleCheck}/> // DO NOT USE this.handleCheck() with parenthesius here, it will get into an infinite loop error
                <p>This checkbox is {msg}</p>
            </div>
    )
}
})

we've added some state to a component using the get initial state function. This.setState, is going to be the function that we call every time that we want to change that state.


Using REFS
----------------------

ref="newText"

renderForm() {
    return (
        <div className="note">
          <textarea ref="newText"></textarea>
          <button onClick={this.save}>SAVE</button>
        </div>
    )
},

So refs are a really reliable way to access the values of an underlying DOM node. So, anytime you need to reach out to a form element or something where you can't access the value via Props and State a Reference might be useful.

Type validation with propTypes
--------------------------------
var Board = React.createClass({
    propTypes:{
        count: function(props, propName){
            if (typeof props[propName] !== "number"){
                return new Error("count must be a number")
            }
        }
    },

    render(){
        return (
            <div className='board'>
                {this.props.count}
            </div> )
    }

})

ReactDOM.render(<Board count="ten"/>,
    document.getElementById('react-container'))

 children components - nested
 -----------------------------
 var Board = React.createClass({
	 getInitialState(){
	    return {
	        notes: [
	            'Call Bob',
	            'Email SAra',
	            'Eat Lunch',
	            'Finish proposal'
	        ]
	    }
	},

	render(){
	    return (
	        <div className='board'>
	            {this.state.notes.map( (note, i) => {
	                return <Note key={i}>{note}</Note>
	            })}
	        </div> )
	}
})

ReactDOM.render(<Board count={3}/>,
document.getElementById('react-container'))

Keys
-------------------------
When rendering our Note components, we pass a key property to our component when it is part of an array of children. Our Board is the parent, and it's note children all contain this key property.
eachNote(note) {
    return (<Note key={note.id}
                  id={note.id}
                  onChange={this.update}
                  onRemove={this.remove}>
              {note.note}
            </Note>)
},

To ensure that the state and the identity of our components is maintained through multiple renders, we need to assign it a key property.

Assigning styles before rendering
----------------------------------

we've assigned this as a style property, and we've made use of the component will mount method to add this right before our DOM elements are rendered

## in the Note component ##
componentWillMount is a react function that belongs to the component lifecycle, it does something before its rendered


componentWillMount(){
    this.style = {
        right: this.randomBetween(0, window.innerWidth - 150, 'px'),
        top: this.randomBetween(0, window.innerHeight - 150, 'px')
    }
},

randomBetween(x, y, s){
    return (x + Math.ceil(Math.random() * (y-x))) + s
},

COMPONENTS LIFECYCLE
-------------------------------------


- Hooks for:
	- creation
	- lifetime
	- teardown

##	These methods allow you to do things like add libraries, load data, and more at very specific times. ##

	Mounting lifecycle (several methods):
		- getInitialState
		called once and will set the default for a state
		- componentWillMount
		called right before the render, and it's the last chance to effect state prior to the render.
		- render
		only required method
		- componentDidMount
		is going to fire right after the render, so after a successful render, we can now access the dom, the component has been rendered, and now the user can interact with it.

	Updating lifecycle
		- componentWillReceiveProps: Change the object and effect state
		- shouldComponentUpdate and componentWillUpdate: invoked right before rendering, and are often used for optimization.  We're only going to call these methods if something has changed
		- render: 
		- componentDidUpdate: fire right after everything in the dom has been updated.

	- componentWillUnmount is called right before the component is unmounted. This can help us do things like clean up dom elements and invalidate timers. So when it is called on the parent, all of the children are unmounted as well.

	SETTING PROPS TO COMPONENTS
	-------------------------------------------
	- setDefaultProps method.
	Called once before the component renders to set up defaults for our component.
	For example: to handle all of our styling via getDefaultProps rather than the style tag in the html page.
	So we want to return an object that passes all of this information about our desired style

	var Box = React.createClass({
        getDefaultProps(){
            return {
                backgroundColor: 'blue',
                height: 200,
                width: 200
            }
        },

        render() {
            return (
                <div id='myDiv'>
                   <div style={this.props}></div>
                </div>
            )
        }

        So you may be asking yourself why wouldn't I just use CSS for this? Well CSS selectors apply to certain elements, classes, or IDs. So if you wanna reuse a style on different elements that don't share classes or IDs, we can apply the same style through getDefaultProps.

        So getDefaultProps provides us a life cycle method for initializing default properties for our components. This isn't a required method, but it is nice to be able to use this in the event that other properties are not passed.

        UPDATING OUR COMPONENT
        ---------------------------
         var Box = React.createClass({
	        getInitialState() {
	            return {
	                backgroundColor: 'purple',
	                height: 200,
	                width: 200
	            }
	        },


PREVENTING UNNECESARY RE_RENDERING with shouldComponentUpdate
--------------------------------------------------------------
shouldComponentUpdate(nextProps, nextState){
                return this.props.children !== nextProps.children
                        || this.state !== nextState
},


So the component life cycle can make a lot of great enhancements to our code. We can do things like load data. We can add a little enhancements to our form fields. Any time we need to do any sort of data loading or optimizations for speed, we can always tap into those component life cycle methods to make our applications even better.

fetch and react-draggable libraries
------------------------------------
fectch is used to make ajax calls to APIs
react-draggable is used to make componenet draggable

render() {
  return (
      <ReactDraggable>
          {this.state.editing) ? this.renderForm()
                              : this.renderDisplay()
          }
      </ReactDraggable>
  )
}

All JSX code has to be inside parenthesis when inside a tag component  ...


Create apps using create-react-app
-------------------------------------
Old Schools steps:
- manually add all libraries into html (slows down app)

alternative: 
Create React App is a command line tool that can be used to build our React applications. Now, Create React App is a utility that's going to install everything you need to work with React, without having to spend hours setting up your development environment

https://github.com/facebookincubator/create-react-app

install
npm install -g create-react-app
create-react-app my-app
cd my-app/
npm start

When refactoring into component we will wnat to use libraries like draggable for the Note.js comp.
We can install it in the project with npm because it wont be called from the html scripts tags.

npm install --save react-draggable

And this is going to save this to our project's dependencies

BUILD FOR PRODUCTION with Create React app
---------------------------------------------
> npm run build.

So, what nmp run build will do, since we're using Create React app, is it's going to run a production build. So, what this does for us is it bundles everything up. It minfies our code and it makes it production-ready. So, if you do wanna run a production build, you don't have to set up any of that either. All of that happens here. 

So, if for example, I look at my JavaScript file , it's all minified, it's all put on one line. So, that's gonna run really quickly in the browser. So, Create React app has a lot of magic going on behind the scenes.

It's gonna handle all of our Babel transpiling, all of our Webpack, all of our production optimization, and it's a really great way to get started with a project quickly and easily without having to struggle with tooling for hours. So, Create React app may be something you want to check out.

run it after build with an static server:
install the server:
> npm install -g serve
run it
> serve -s build

