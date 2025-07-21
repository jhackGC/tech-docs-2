Last updated 21/07/2025

# Index

- Intro
- Pure React
- Tooling:
  - npm
  - ESLint
  - Prettier
  - emmet: for HTML code completion
- Vite

- JSX
- Hooks
- Effects
- Dev Tools
- Handling Async
- Reach Router
- Class Components
- Error Boundaries
- Context
- Portals and Refs
- Conclusion
- Hooks in Depth
- Emotion
- Code Splitting
- TypeScript
- Server Side Rendering
- Redux
- Testing

# Introduction

# react

Alright! You've made a project folder, navigated into it, and used npm init to create a package.json file. Now you're ready to install some modules!

To install a module using npm, you need to know that module's name. If you want to install a module and you aren't sure of its exact name, you can search for it here: https://www.npmjs.com/. Our first module is named react.

To install the react module, type this command in the terminal:

> npm install --save react
> install can be abbreviated as i, and --save can be abbreviated as -S, if you like to abbreviate:

You just installed React! Now you can access it in your files with the code:

var React = require('react').

# react-dom

If you look at package.json, you can see that there's an object named dependencies that now has react listed as a dependency.
This indicates that your project is "dependent" on having react installed.
If someone tries to run your project, it probably won't work unless they install react first.

You can also see something else new in your directory: a folder named node_modules.

node_modules is where npm modules are saved. If you open node_modules, you should see a folder named react, which contains the code that makes React run.

The next thing that you want to install is react-dom. Once you install react-dom, you will be able access it in your files with the code:

var ReactDOM = require('react-dom').

To install react-dom, type one of these two commands in the terminal:

> npm install --save react-dom

## NPM SCRIPTS

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

## RUN A LOCAL REACT APP

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
