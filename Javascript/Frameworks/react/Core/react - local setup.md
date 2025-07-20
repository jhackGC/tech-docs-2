codecademy

    SETTING UP REACT LOCALLY
    --------------------------
    https://www.codecademy.com/articles/react-setup-i 

    HOW NPM IS DIFFERENT

When you install software, you may be used to something like this: you install what you need, it sits there on your computer, and you can use it whenever you want.

You can do that with npm! But there's a different, better way: install what you need, over and over again, every time that you need it. Download and install React every time that you make a React app.

That sounds much worse! Here's why it's actually better:

First, npm makes installation extremely easy. Installing software over and over sounds like a headache, but it really isn't. We'll walk through how soon!

Second, npm modules ("modules" are another name for software that you download via npm) are usually small. There are countless modules for different specific purposes. Instead of starting your app with a giant framework that includes tons of code you don't need, you can install only modules that you will actually use! This helps keep your code quick, easy to navigate, and not vulnerable to dependencies that you don't understand.

IN CONCLUSION: Starting now, every step in this article series will be a step that you have to take every time you make a new React app. You don't have to install Node.js and npm anymore, but you should start from here for every new React project that you make.

NPM INIT
------------------
Alright, let's make a React app on your home computer! Where do you start?

To begin, decide where you want to save your app, and what you want to name it. In the terminal, cd to wherever you want to save your app. Use mkdir to make a new directory with your app's name. cd into your new directory.

Once you've done all that, type this command into your terminal:

>npm init

You will get a lot of prompts! You can answer them, but it's also safe to just keep hitting return and not worry about it.

Once the prompts are done, use your favorite text editor to open all of the files in your project's root directory. You could do this with a terminal command such as atom . or subl .. You will see that a new file named package.json has been created!

What just happened?

The command npm init automatically creates a new file named package.json. package.json contains metadata about your new project.

Soon, you will install more npm modules. package.json keeps track of the modules that you install. Other developers can look at your package.json file, easily install the same modules that you've installed, and run their own local versions of your project! This is fantastic for collaborating.

INSTALL REACT
-------------------------------
Alright! You've made a project folder, navigated into it, and used npm init to create a package.json file. Now you're ready to install some modules!

To install a module using npm, you need to know that module's name. If you want to install a module and you aren't sure of its exact name, you can search for it here: https://www.npmjs.com/. Our first module is named react.

To install the react module, type this command in the terminal:

> npm install --save react
install can be abbreviated as i, and --save can be abbreviated as -S, if you like to abbreviate:

You just installed React! Now you can access it in your files with the code:

var React = require('react').

INSTALL REACTDOM
-------------------------------
If you look at package.json, you can see that there's an object named dependencies that now has react listed as a dependency.
This indicates that your project is "dependent" on having react installed.
If someone tries to run your project, it probably won't work unless they install react first.

You can also see something else new in your directory: a folder named node_modules.

node_modules is where npm modules are saved. If you open node_modules, you should see a folder named react, which contains the code that makes React run.

The next thing that you want to install is react-dom. Once you install react-dom, you will be able access it in your files with the code:

var ReactDOM = require('react-dom').

To install react-dom, type one of these two commands in the terminal:

> npm install --save react-dom

-----------------------------------------------------------------------------------------------

BABEL
-----

BACKGROUND
----------
Before React code can run in the browser, it must be changed in certain ways. One necessary transformation is compiling JSX into vanilla JavaScript.

INSTALL BABEL
-------------
Babel is a JavaScript compiler that includes the ability to compile JSX into regular JavaScript. Babel can also do many other powerful things.

Babel's npm module's name is babel-core. You're going to install babel-core slightly differently than you installed react and react-dom. Instead of npm install --save babel-core, you will use the command npm install --save-dev babel-core.

This is because you will only be using Babel in development mode. When a React app is shipped into production, it no longer needs to make transformations: the transformations will be hard-coded in place. The --save-dev flag saves an npm module for development version only.

Just as --save can be shortened to -S, --save-dev can be shortened to -D.

You're also going to install two other babel-related modules, named babel-loader and babel-preset-react, respectively. We'll explain those soon!

Use one of these terminal commands to install babel-core, babel-loader, and babel-preset-react:

> npm install --save-dev babel-core
> npm install --save-dev babel-loader
> npm install --save-dev babel-preset-react

all togheter
> npm install --save-dev babel-core babel-loader babel-preset-react




CONFIGURE BABEL

In order to make Babel work, you need to write a babel configuration file.

In your root directory, create a new file named .babelrc. If you get prompted about starting a filename with a period, go ahead and say that it's okay.

Save the following code inside of .babelrc:

{ presets: ['react'] }

That's it! Babel is now ready to go.


-----------------------------------------------------------------------------------------------

WEBPACK
---------
BACKGROUND

You've installed Babel, but you haven't "plugged it in" to your React app yet. 
You need to set up a system in which your React app will automatically run through Babel and compile your JSX, before reaching the browser.

Also, JSX to JavaScript is just one of many transformations that will need to happen to your React code. You need to set up a "transformation manager" that will take your code and run it through all of the transformations that you need, in the right order. How do you make that happen?

There are a lot of different software packages that can make this happen. The most popular as of this writing is a program called webpack.

INSTALL WEBPACK

webpack is a module that can be installed with npm, just like react and react-dom. You'll also be installing two webpack-related modules named webpack-dev-server and html-webpack-plugin, respectively. We'll explain these a little more soon.

webpack should be saved in development mode, just like babel.

Install webpack, webpack-dev-server, and html-webpack-plugin with one of these two terminal commands:

> npm install --save-dev webpack webpack-dev-server html-webpack-plugin

WEBPACK.CONFIG.JS
-------------------
Alright! Webpack has been installed!

Webpack's job is to run your React code through various transformations. Webpack needs to know exactly what transformations it should use!

You can set that information by making a special webpack configuration file. This file must be located in the outermost layer of your root directory, and must be named webpack.config.js. It is where you will put all of the details required to make webpack operate.

In your root directory, create a new file named webpack.config.js.

CONFIGURE WEBPACK
------------------
Webpack is going to take your JavaScript, run it through some transformations, and create a new, transformed JavaScript file. This file will be the ones that the browser actually reads.

In order to do this, Webpack needs to know three things:

1 - What JavaScript file it should transform.
2 - Which transformations it should use on that file.
3 - Where the new, transformed file should go.

Let's walk through those three steps!

First, in webpack.config.js, write:

module.exports = {}


All of webpack's configuration will go inside of that object literal!.

WHAT JAVASCRIPT FILE SHOULD WEBPACK TRANSFORM?
----------------------------------------------------
The first thing that webpack needs to know is an entry point. The entry point is the file that Webpack will transform.

Your entry point should be the outermost component class of your React project. It might look something like this:

var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/App');

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

In this example, webpack will transform the result of <App />. If <App />'s render function contains components from other files, then those components will be transformed as well. If you make your entry point the outermost component class of your app, then webpack will transform your entire app!

To specify an entry point, give module.exports a property named entry. entry's value can be a filepath, or an array of filepaths if you would like to have more than one entry point. For this project, you will only need one.

In webpack.config.js, update module.exports to look like this:


module.exports = {
  entry: __dirname + '/app/index.js'
}

In Node.js, __dirname refers to the currently executing file. __dirname + /app/index.js will create a filepath pointing to the currently executing file, down into a folder named app, and landing on a file named index.js.

WHAT TRANSFORMATIONS SHOULD WEBPACK PERFORM?
---------------------------------------------
Webpack can now successfully grab your outermost component class file, and therefore grab your entire React app. Now that webpack can grab all of this code, you need to explain what webpack should do with it once it's been grabbed.

You can tell webpack what to do with the code that it's grabbed by adding a second property to module.exports. This property should have a name of module and a value of an object literal containing a loaders array:

module.exports = {
  entry: __dirname + '/app/index.js',
  module: {
    loaders: []
  }
}

Each "loader" that you add to the loaders array will represent a transformation that your code will go through before reaching the browser.



WRITE A LOADER
--------------------------
Each loader transformation should be written as an object literal. Here's your first loader, empty for now:

module.exports = {
  entry: __dirname + '/app/index.js',
  module: {
    loaders: [
      {}
    ]
  }
};

Each loader object needs a property called test. The test property specifies which files will be affected by the loader:

module.exports = {
  entry: __dirname + '/app/index.js',
  module: {
    loaders: [
      {
        test: /\.js$/
      }
    ]
  }
};

The regular expression /\.js$/ represents all strings that end with the pattern, ".js". That means that this loader will perform a 
transformation on all ".js" files.

In addition to "test", each loader transformation can have a property named include or exclude. You can use "exclude" to specify files that match the "test" criteria, that you don't want to be transformed. Similarly you can use "include" to specify files that don't fit the "test" criteria, that you do want to be transformed:

module.exports = {
  entry: __dirname + '/app/index.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
};


The node_modules folder contains lots of JavaScript files that will be caught by your /\.js$/ test. However, you don't want anything in the node_modules folder to be transformed. node_modules holds the code for React itself, along with the other modules that you've downloaded. You don't want to transform that!

The final property of each loader is what transformation that loader should perform! You specify a particular transformation with a property named loader:

module.exports = {
  entry: __dirname + '/app/index.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};

In this example, you have a loader with three properties: test, exclude, and loader. Your loader will search for all files ending in ".js", excluding files in the node_modules folder. Whatever files it finds, it will run through the 'babel-loader' transformation.

Where does the string 'babel-loader' come from? When you ran the command npm install --save-dev babel-core babel-loader babel-preset-react, you installed babel-loader into your node_modules folder. Your loader property will automatically be able to find it there. The magic of npm!



WHAT SHOULD WEBPACK DO WITH THE TRANSFORMED JAVASCRIPT?
--------------------------------------------------------
Alright! Now you have told webpack which files to grab, and how to transform those files. Webpack will grab your React app and run it through babel-loader, translating all of your JSX into JavaScript.

The final question is, where should the transformed JavaScript go?

Answer this by adding another property to module.exports. This property should have a name of output, and a value of an object:

module.exports = {
  entry: __dirname + '/app/index.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  output: {}
};

The output object should have two properties: filename and path. 'filename' will be the name of the new, transformed JavaScript file. 'path' will be the filepath to where that transformed JavaScript file ends up:

module.exports = {
  entry: __dirname + '/app/index.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  output: {
    filename: 'transformed.js',
    path: __dirname + '/build'
  }
};

This will save your transformed JavaScript into a new file named build/transformed.js.

---------------------------------------------------------------------------------------------------------------

HTML WEBPACK PLUGIN
---------------------

Good work! The hardest part is over. There is, however, still one issue.

Your app's main HTML file is named app/index.html. Your app's outermost JavaScript file, which is also your entry point for webpack, is named app/index.js. These two files are neighbors, both living in the app folder.

Before webpack performs its transformations, your entry file (app/index.js) and your HTML file (app/index.html) are located in the same directory. The HTML file contains a link to the entry file, looking something like this: <script src="./index.js"></script>.

After webpack performs its transformations, your new entry file will be located in build/transformed.js, and that link won't work anymore!

When webpack makes a new JavaScript file, it needs to make a new HTML file as well. There is a tool for this, and you've already installed it: 

html-webpack-plugin

CONFIGURE HTML WEBPACK PLUGIN
----------------------------
At the top of webpack.config.js, add this line of code:

var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig =  new HTMLWebpackPlugin({/*conf obj here*/})

When you call require('html-webpack-plugin'), the returned value is a constructor function.
Most of the work of configuring HTMLWebpackPlugin should be done on an instance of that constructor function.

Add this new declaration, underneath the previous one:

var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig =  new HTMLWebpackPlugin({/*conf obj here*/})

THE HTML WEBPACK PLUGIN CONFIGURATION OBJECT
--------------------------------------------
That empty configuration object is where you will tell HTMLWebpackPlugin what it needs to know.

The object's first property should be named template. template's value should be a filepath to the current HTML file, the one that you're trying to copy and move:


var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig =  new HTMLWebpackPlugin({
  template: __dirname + '/app/index.html'
});

module.exports = {
  entry: __dirname + '/app/index.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  output: {
    filename: 'transformed.js',
    path: __dirname + '/build'
  }
};


The object's second property should be named filename. filename's value should be the name of the newly created HTML file. It's fine to name it index.html. Since the new HTML file will be located in the build folder, there won't be any naming conflicts:

var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig =  new HTMLWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html'
});

module.exports = {
  entry: __dirname + '/app/index.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  output: {
    filename: 'transformed.js',
    path: __dirname + '/build'
  }
};


The object's final property should be named inject. inject value should be be a string: either 'head' or 'body'.

When HTMLWebpackPlugin creates a new HTML file, that new HTML file will contain a <script> tag linking to webpack's new JavaScript file. This <script> tag can appear in either the HTML file's <head> or <body>. You choose which one via the inject property.

Here's an full example:

var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig =  new HTMLWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: __dirname + '/app/index.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  output: {
    filename: 'transformed.js',
    path: __dirname + '/build'
  }
};

THE PLUGINS PROPERTY
-----------------------
You have fully configured your HTMLWebpackPlugin instance! Now all that's left is to add that instance to module.exports.

You can do this by creating a new module.exports property named plugins. plugins value should be an array, containing your configured HTMLWebpackPlugin instance!

Find the plugins property at the bottom of module.exports:

var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig =  new HTMLWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: __dirname + '/app/index.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  output: {
    filename: 'transformed.js',
    path: __dirname + '/build'
  },
  plugins: [HTMLWebpackPluginConfig]
};

------------------------------------------------------------------------------
NPM SCRIPTS
-------------------
You will find that as your applications become more complex, you will need to use more and more verbose command-line scripts. This can become a serious pain!

Fortunately, npm scripts are here to help.

Inside of your package.json file, find the scripts object. This object lets you give your command-line scripts easier names, and look them up whenever you forget them!

Let's say that you need to use the script npm run build && npm run git-commit && npm run git-push. That's way too much to remember. In package.json, you could add:

"scripts": {
  deploy: "npm run build && npm run git-commit && npm run git-push"  
}


After that, you only need to type npm run deploy, and it will execute the command saved as deploy's value.
And even better, you can look up the command in package.json if you forget.

In package.json, replace the scripts object with this:

scripts: {
  build: "webpack",
  start: "webpack-dev-server"
}

npm run build will make webpack perform its transformations.

npm run start will start a local server! npm run start will also give you the ability to change your app and see the changes automatically, without having to restart the server for each new change.

RUN A LOCAL REACT APP
--------------------------------------
Inside of your root directory, create a new directory named app. Create two new files inside of app: app/index.js and app/index.html.

In app/index.html, copy the following code:


In app/index.js, copy the following code:


var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/App');

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

Inside of the app folder, create a new folder named components. Create a new file inside of app/components named app/components/App.js.

In app/components/App.js, write a component class. This component class can render whatever you want. Don't forget to require React at the top of the file, and to set module.exports equal to your component class at the bottom of the file.

var React = require('react');

var App = React.createClass({

    render: function(){
      return <h1>Hola</h1>
    }
  }
);


module.exports = App;

In the terminal, type:

> npm run build

Check for a newly created build folder inside of your root directory. The build folder should contain new html and js files: build/index.html and build/transformed.js.

In the terminal, type:

> npm run start

Open a new browser tab and navigate to http://localhost:8080. See your React component shining gloriously in the sun.

In app/components/App.js, make a change to your component class's render function. Refresh the browser tab and see your change appear on the screen!

THE CONDENSED VERSION
------------------------------------------------
That seems like an enormous amount of work to get a simple app up and running!

Perhaps it was, but that was in large part due to the fact that we slowly explained every step. Executing the steps by rote is much faster.

Here's a condensed version of how to get a React app up and running:

In the terminal, create a new directory. cd into that directory.

Type the following command-line scripts:

> npm init
> npm i -S {react,react-dom}
> npm i -D babel-{core,loader} babel-preset-react
> npm i -D webpack webpack-dev-server html-webpack-plugin

You still have to:
- create babel config file -> .babelrc.
- create webpack config -> webpack.config.js
- add the npm scripts (build, start) to the package.json
- create a directory inside of your root directory named app, and another directory inside of app named app/components.
- create the app three new files: app/index.js, app/index.html, and app/components/App.js.

Remember to make app/components/App.js the outermost component class of your new app.

In the terminal, type these two commands:

> npm run build
> npm run start
