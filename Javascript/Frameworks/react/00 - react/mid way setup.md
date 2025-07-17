# mid way setup and walk trough

React is a library that can be imported in your html page and used.

## Your most basic project - Pure React

### Include the libs in your html

> dist/index.html
grab them from any cdn like facebook or cdnjs.com

	<!DOCTYPE html>
	<html lang="en">
	<head>
	    <script src="https://fb.me/react-15.1.0.js"></script>
	    <script src="https://fb.me/react-dom-15.1.0.js"></script>
	    <meta charset="UTF-8">
	    <title>Hello World with React</title>
	</head>
	<body>

		Hello World with React, inserting react components
	<div id="react-container"></div>
	<script src="index.js"></script>
	    
	</body>
	</html>

JS file with programmatic component creation

> dist/index.js

	const title = React.createElement(
	    'h1', // tag name
	    {
	        id: 'title',
	        className: 'myHeaderTitle'
	    }, // tag attributes
	    'Hello World' // tag content
	)
	// ReactDOM will render the element in the React VIRTUAL DOM
	ReactDOM.render(
	    title, // element to render
	    document.getElementById('react-container') // container target
	)


### test web server - httpster

$ sudo npm install -g httpster

go to the folder were your public material is

$ httpster -d ./dist -p 3002

### refactor with ES6 - extracting stuff from classes

			const { createElement } = React
			const { render } = ReactDOM

			const title = createElement(
				    'h1', // tag name
				    {
				        id: 'title',
				        className: 'myHeaderTitle'
				    }, // tag attributes
				    'Hello World' // tag content
				)
				// ReactDOM will render the element in the React VIRTUAL DOM
				render(
				    title, // element to render
				    document.getElementById('react-container') // container target
				)

### Add a styles attr to the component

		const style = {
		    backgroundColor: 'orange',
		    color: 'white',
		    fontFamily: 'verdana'
		}


		const title = React.createElement(
		    'h1',
		    {
		        id: 'title',
		        className: 'myHeaderTitle',
		        style: style,

		    }, // tag attributes
		    'Hello World 4' // tag content
		)




### refactor with JSX
replace create elements for JSX

render(
    <h1 id='title'
        className='myHeaderTitle'
        style={style}>Hello World</h1>, // element to render
    document.getElementById('react-container') // container target
)


#### expressions within JSX: { } transpolation
<h1 id='title'
        className='myHeaderTitle'
        style={style}></h1>	

### to compile from JSX to vanilla JS, you need to transpile it.
babel


#### transpile in browser
- from cdn: like cdnjs, choose babel-core 5.8 as your in browser transpiler, version 6 up is different and wont transpile in browser

https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.38/browser.js

<!DOCTYPE html>
<html lang="en">
<head>
    <script src="https://fb.me/react-15.1.0.js"></script>
    <script src="https://fb.me/react-dom-15.1.0.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.38/browser.js"></script>

    <meta charset="UTF-8">
    <title>Hello World with React</title>
</head>
<body>
Hello World with React, no web server2

<div id="react-container"></div>
<script type="text/babel" src="index.js"></script>
</body>
</html>

- Add the "text/babel" type to the js file so its transpiled

#### transpile using the command line - babel-cli

Useful to transpile before sending it to the browser
- remove the in browser transpiling stuff


<!DOCTYPE html>
<html lang="en">
<head>
    <script src="https://fb.me/react-15.1.0.js"></script>
    <script src="https://fb.me/react-dom-15.1.0.js"></script>
    <meta charset="UTF-8">
    <title>Hello World with React</title>
</head>
<body>
Hello World with React, no web server2

<div id="react-container"></div>
<script type="text/javascript" src="index.js"></script>
</body>
</html>

- create a npm project

$ npm init

it creates the package.json

install the babel-cli, one specific version 6.18.0
$ npm install babel-cli@6.18.0 --save-dev


also installit globally to be run anywhere int he computer

$ npm install -g babel-cli@6.18.0

- resstructure folders and files

/src

and put the index.js there

dir layout:

/dist/index.html --> all what is ready for the browser
/src/index.js --> all the sources, ES5, ES6, JSX
/node_modules/
package.json
package-lock.json


- create a babelrc file for babel config
> .babelrc

	{
		'presets': ['latest', 'react', 'stage-0'] // all that we want to transpile from
	}

presets: 	
	latest: all es2015, es2016, es2017 than has been accepted
	react: all JSX
	stage-0: anything proposed as an ECMAScript feature

- install the presets code
$ npm install babel-preset-react