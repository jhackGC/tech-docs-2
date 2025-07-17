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

Useful to transpile before sending it to the browser, increasing performance

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
$ npm install babel-preset-react@6.16.0 --save-dev
$ npm install babel-preset-latest@6.16.0 --save-dev
$ npm install babel-preset-stage-0@6.16.0 --save-dev

- now transpile the src

$ babel ./src/index.js --out-file ./dist/bundle.js

### change the npm scripts to run some scripts

{
 
  "scripts": {
    "start": "httpster -d ./dist -p 3003"
  },
 
}

#### transpile using webpack
Webpack is:
- module bundler
- creates static files
	- using as sources:
		- scripts
		- dependencies
		- css files
		- etc.
- automates processes

##### Install webpack ver 1.13.3
$ npm install webpack@1.13.3 --save-dev //webpack
$ npm install -g webpack@1.13.3 // install it globally too
$ npm install babel-loader@6.2.5 --save-dev // transpiler loader
$ npm install webpack-dev-server@1.16.2 --save-dev // dev server



##### Create the config file

 > webpack.config.js -> it describes all we want to do to the files before prod

var webpack = require("webpack");

module.exports = {
    entry: './src/index.js', // input file
    output: {
        path: "dist/assets", // output destination
        filename: "bundle.js", // output file
        publicPath: "assets" // where the bundle file will reside to the public, relative to the devServer contentBase
    },
    // the server will auto reload, helpful for dev
    devServer: {
        inline: true,
        contentBase: './dist',
        port: 3003
    }, //
    module: {
        //loaders are the tasks that we want webpack to perform
        loaders: [{
            test: /\.js$/, // target
            exclude: /(node_modules)/, // exclusions
            loader: ['babel-loader'], // loader name
            query: {
                presets: ["latest", "stage-0", "react"] // translators
            }
        }]
    }
}

### RUN IT  
$ webpack

and fix the index.html to access the new bundle.js location

<script type="text/javascript" src="assets/bundle.js"></script>

### replace the httpster server for the webpack dev-server

> package.json

    "scripts": {
        "start": "httpster -d ./dist -p 3003"
    },

## Install react as dependencies

Install them with npm
$ npm install react@15.3.2 --save
$ npm install react-dom@15.3.2 --save

Remove them fromt he index.html file as scripts

import the libs in the index.js file
- import React from 'react';
- import ReactDOM from 'react-dom';


## loading JSON files with webpack

Create lib.js file and a titles.json (for I18N) file

> titles.json

	{
		"hello": "Bonjour",
		"goodbye": "Au Revoir"
	}

> lib.js

	import React from 'react'
	import text from './titles.json' // remember to put ./ before file name

	export const hello = (<h1 id='title'
	                          className='header'
	                          style={{backgroundColor: 'purple', color: 'yellow'}}>
	    {text.hello}
	</h1>)

	export const goodbye = (<h1 id='title'
	                            className='header'
	                            style={{backgroundColor: 'yellow', color: 'purple'}}>
	    {text.goodbye}
	</h1>)

> index.js

    import React from 'react';
    import {render} from 'react-dom';
    import {goodbye, hello} from '../lib';

    const style = {
        backgroundColor: 'blue',
        color: 'white',
        fontFamily: 'verdana'
    }


    render(
        <div>
            {hello} // brought from the lib file
            {goodbye} // brought from the lib file
        </div>, // element to render
        document.getElementById('react-container') // container target
    )

> webpack.config.js

add a new loader 

    module: {
        //loaders are the tasks that we want webpack to perform
        loaders: [...
            {
                test: /\.json$/, // target, search files that match this RegEx
                exclude: /(node_modules)/, // exclusions
                loader: ['json-loader'], // loader name
            }]
    }
    
Install the new loader

> npm install json-loader@0.5.4 --save-dev

and re run the server
> npm start