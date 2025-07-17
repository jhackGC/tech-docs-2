# WebPack

## Definition
Packager and much more
Helps to package only whats needed.
Thanks to static modules (ES6 modules) webpack allow syou to import only what you need form a module like

// ES5
- node js / commmonJS background
const React  = require('react');
the require function is a dynamic import, as we feed it with a value or variale 
  var x = 'react';
  require(x);


// ES6
import React form 'react'; // static import
// MyModule
export const x = 5;
export const y = 7;

//Another file
import { x } from './MyModule';

By using STATIC modules we use or import only what we need.
It also allows our tools to statically analise the imports and prune things that are not necessary, and reduce the output.

## Installation
Add webpack globally ()
> yarn add webpack

or

> npm i webpack

# Configuration
Install webpack and webpack-cli to run it from the command line


## Test it
// create a test file, you have to call it index.js

// src/index.js
console.log("hello");

In its most basic form it doesn't need a config file, it has one by default.
The most basic use of webpack is that it needs an input point or entry point and an output file.
If they are undefined, will use its defaults:
- input: src/index.js
- output: dist/main.js

Now run

from the commnad line and the prj root: 

  ./node_modules/.bin/webpack --mode development
  ./node_modules/.bin/webpack --mode production

or add the following scripts to your package.json:

{
  "scripts": {
    "start": "webpack --mode development",
    "build": "webpack --mode production"
},

Webpack 4 now has two modes, development and production. In production code is minimised.

# Run for PROD
{
  "scripts": {
    "build": "webpack --mode production"
},

$ npm build



# Loaders
Webpack by itself only knows javascript, so when we want it to pack any other type of resources like .css or .scss or .ts, webpack needs help in order to compile and bundle those non-javascript types of resources.
 
Loaders are the node-based utilities built for webpack to help webpack to compile and/or transform a given type of resource that can be bundled as a javascript module.


## Basic React app config
React uses ES6 and JSX.
To work with React, we need to install webpack along with Babel. 
This will transpile the code from ES6 to ES5

Install react and react-dom as a dependency, if not done yet.

npm i react react-dom -S

Then install as dev dependencies:

npm i babel-core babel-loader babel-preset-env babel-preset-react -D

- babel-core: Transforms your ES6 code into ES5

- babel-loader: Webpack helper to transform your JavaScript dependencies (for example, when you import your components into other components) with Babel

- babel-preset-env: Determines which transformations/plugins to use and polyfills (provide modern functionality on older browsers that do not natively support it) based on the browser matrix you want to support

- babel-preset-react: Babel preset for all React plugins, for example turning JSX into functions

**We need to create a webpack.config.js file to state the rules for our babel-loader.**

**We then need to make a separate file called .babelrc to provide the options for the babel-loader.**

You can include it in the webpack.config.js file, but I have seen that most projects have this separated. 
This results in clearer readability, and it can be used by other tools unrelated to webpack. 
When you state that you’re using babel-loader in your webpack config, it will look for .babelrc file if there is one.


## Setup config file
create a webpack.config.js file
    
    // path is a node module to resolve paths ...
    const path = require('path');
    
    module.exports = {
      // wherever you run webpack is the context directory
      context: __dirname,
    
      // front door of the project, everything is going to be included out from here
      entry: './js/ClientApp.jsx',
    
      // source maps strategy, source maps are used for debugging, if not present,
      // when debugging js code in the browser, it will show me the eval'd non human readable
      // code
      devtool: 'cheap-eval-source-map',
    
      // dist files and ir
      output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
      },

      // order of resolution for the extensions when requiring modules like require('./App')
      // will look for App.js, App.jsx, App.json
      resolve: {
        extensions: ['.js', '.jsx', '.json']
      },
    
      // report to you when you are building
      stats: {
        colors: true,
        reasons: true,
        chunks: true
      },
    
      // rules to apply loaders to your code, tool that webpack is going to use in some fashion.
      module: {
        rules: [
          // anything js or jsx runs through babel
          {
            test: /\.jsx?$/,
            loader: 'babel-loader'
          }
        ]
      }
    };

run it with 
> ./node_modules/.bin/webpack

includes source maps and not minified

> ./node_modules/.bin/webpack -p

for production, minified

> ./node_modules/.bin/webpack -p


## Setup in NPM as a script

      "scripts": {
        "build": "webpack"
      },
  
We only put webpack , and not ./node_modules/.bin/webpack, because when we run this script with npm or yarn, 
  it is smart enough to go and try to find it first in the node_modules/.bin, whoch does not happen 
  in your bash console.
  
  and run it with:
  
  > yarn build
  > npm run build
  
  trick, provide params to the command running in the npm script.
  all after the -- will be provided to the command running in the build script (webpack) ...
  > npm run build -- -p


anything after -- will be provided as args to the command running.

e.g.
{
  "scripts": {
    "build": "webpack"
},

$ npm run build -- -p
runs webpack -p
  
### Add file change watcher

> webpack --watch
> yarn build -- --watch

Add it as a npm script
    "watch": "webpack --watch"

### run ESLint with webpack - useful for team enforcement
put another rule before the babel loader

      {
        enforce: 'pre', // ensuring that we lint before babel, source code check, not the compiled by babel.
        test: /\.jsx?$/, // all files ending in js or jsx
        loader: 'eslint-loader', // running eslint on all the files running in the build pipeline, only the ones that
         have changed
        exclude: /node_modules/ // obvious, I dont care about it
      },
      
restart the watch

### ADD A DEV SERVER
Install

npm i -D webpack-dev-server

add this to your webpack.config.json
 
 OLD WAY

    devServer: {
        publicPath: '/public/' // path ON THE SERVER where the static files are (e.g. bundle.js)
    },

as https://webpack.js.org/guides/development/#using-webpack-dev-server
Webpack 4 + 

    devServer: {
        port: 8080,
        contentBase: './public'
    },

change the relative src for the bundle in index.html

      <script src="./bundle.js"></script>

run it form the command line

  ./node_modules/.bin/webpack-dev-server

- runs a server at localhost:8080
- and does the watch automatically
when you save a file, it also reloads the browser
and shows in the browser console

add a script in webpack
 
    "scripts": {
        "dev": "webpack-dev-server --mode development",
    },

DONT FORGET THE --mode development in the script

# CSS LOADER
In React Styling can be inside the component or in external CSS Files.
That is, in external CSS Files, for each component we have a corresponding component.css file that will define the CSS for that component.

For a component App.js, we also have app.css:

.app p {
  color: blue;
}

And then in the component we can import this CSS file, as if it was a JavaScript module:

import styles from './app.css';

Finally, we can reference the class name in our CSS file:

<div className={styles.app}>
  <p>This text will be blue</p>
</div>

**None of this works out of the box, but we’ll use Webpack with a couple of additional loaders to get this working. **

The beauty is that the actual class name in the generated CSS file won’t be .app as above, but .app-[some-hash]. 
By adding a hash to each class name it’s guaranteed that each CSS class declaration is unique (the hash is based on the contents - so if two classes clash it’s because they have the same styles).

## Enter Webpack Loaders

**A Webpack loader is a plugin for Webpack that can apply extra transformations or manipulate files before they are bundled.**

There’s two we need to use:

**css-loader**: It can parse a CSS file and apply various transforms to it. 
Is the npm module that would help webpack to collect CSS from all the css files referenced in your application and put it into a string.

**style-loader**: It can load some CSS and inject it into the document via a <link> tag.? or <style> ?
It would take the output string generated by the above css-loader and put it inside the <style> tags in the index.html file.



**Crucially it has a CSS Modules mode that can take our CSS and hash the classes as mentioned above.**

What we need to do is add another configuration for .css files where we first configure style-loader, and then css-loader:

{
  test: /\.css$/,
  loader: 'style-loader'
}, {
  test: /\.css$/,
  loader: 'css-loader',
  query: {
    modules: true,
    localIdentName: '[name]__[local]___[hash:base64:5]'
  }
}


Note that the order of adding these loaders is important. 

First, we need to resolve the CSS files before adding them to the DOM with the style-loader. 
By default, webpack uses the loaders from the right (last element in the array) to the left (first element in the array).

First we configure the style-loader, which needs no extra configuration, so we’re set. Then we have to configure css-loader. The important bit to this is the query object, which defines two properties:

**modules**: true turns on the **CSS modules** mode (hashing css classes to become unique)

**localIdentName**: '[name]__[local]___[hash:base64:5]' defines the structure of the generated CSS class should be. You don’t need to worry too much about this, other than knowing that this maps to the generated output. 
For example, our CSS from above with the class of app will end up as app__app___2x3cr in the browser.

## Install the loaders
Install both of these modules as a dev dependency:

npm i css-loader style-loader -D


## Running Webpack
You can now run Webpack (npm start) and have your CSS modules converted and working for you in the browser.

If you’re using the dev server you’ll also note that the CSS is automatically updated when you change without a hard refresh in the browser which is useful during developmen


## Making CSS modular
We can also make CSS modular using webpack. This means class name will be scoped locally and specific to only the component in question.

To do this, we can provide some options to css-loader: **    modules: true,**

{
  test: /\.css$/,
  loader: 'css-loader',
  query: {
**    modules: true,**
    localIdentName: '[name]__[local]___[hash:base64:5]'
  }

To enable CSS modules, we need to set module option for css-loader to be true. the 'loader' option configures how many loaders before css-loader should be applied. For example, sass-loader would have to come before css-loader.

The localIdentName allows you to configure the generated identification for the transformed css class.

- [name] will take the name of your component
- [local] is the name of your class/id
- [hash:base64] is the randomly generated hash which will be unique in every component’s CSS
  
To make this a bit more visual, I’ll give you an example. Say I have a component named Form and I have a button with a CSS class primaryButton. I also have another component called Search and a button in it with a CSS class primaryButton. However, both of these classes have different CSS:

Form button
  .primaryButton {
    background-color: green;
  }

Search button
  .primaryButton {
    background-color: blue;
  }

When webpack bundles your application, depending on which CSS comes latest, both of your buttons could have the color green or blue instead of Form having green and Search having blue.

This is where the localIdentName comes into place. With this, once your application is bundled, your buttons will have a unique class name.

As you can see, the button class name in the Form component is different to the one in the Search component — their naming starts with the name of the component, class name, and unique hash code.

So with this, you won’t have to worry about whether you have given the same class name throughout your whole application — you only have to worry about whether you have used it in the same component.


## Add a ESLint loader ... TBD
 module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },

## Final modules config 

// rules to apply loaders to your code, tool that webpack is going to use in some fashion.
    module: {
        rules: [
            // anything js or jsx runs through babel
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            },
            // anything imported css will go injected to a style/link? tag in html
            {
                test: /\.css$/,
                loader: 'style-loader'
            },
            {
                // anything imported css will be transformed to a string
                test: /\.css$/,
                loader: 'css-loader',
                query: {
                    modules: true,
                    localIdentName: '[name]__[local]___[hash:base64:5]'
                }
            }
        ]
    }



    