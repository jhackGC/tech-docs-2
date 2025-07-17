# Node JS

Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for
data-intensive real-time applications that run across distributed devices.

What is NODE for? sweet spot for Node:

- Super efficient in doing communication, socket, peer to peer comms, high throughput low latency.
- Not so good at serving big static files (e.g. video cdn server)

# JS in Node vs JS in Browser

see v8 package in 'node core modules' folder

# CLI commands

run a js file:

    $ node file.js

# Project structure

Your project structure should look like this:

    your-project-directory
    |--dist
    |--node_modules
    |--src
    |  |--server.js
    |--package.json
    |--.babelrc

# Configuration

- package.json

      $ npm init

Node server dependencies

prod

    npm install --save express body-parser cors mongoose

dev

    npm install -D webpack @babel/cli @babel/core @babel/node @babel/preset-env nodemon babel-eslint babel-loader eslint webpack dotenv

# Babel config

https://hackernoon.com/using-babel-7-with-node-7e401bc28b04

- bablrc.json

      {
        "presets": ["@babel/preset-env"]
      }

## some scripts WEBPACK

    "start":"nodemon --exec babel-node server.js --ignore public/"
    - wrap the node in a nodemon execution wrapper, to restart when changes are done
    - use babel-node instead of node
    - ignore public/ for nodemon watching changes as it will be populated from src dist creation,

    "dev": "webpack -wd"
    - transform src files nto a bundled file
    - watch mode (-w)
    - dev mode (-d)

// webpack.config.js

    modules.export = {
        entry: './src/index.js',
        output: {
            path: __dirname + '/public',
            filename: 'bundle.js'
        },
        module:{
            loaders: [
                {
                    test: /\.js$/,
                    loader:'babel'
                }
            ]
        }
    }

## transpile and execute with babel-node

transpile and run with node with babel-node lci package

\$ babel-node server.js

if babel-node not installed globally, add ./node_modules/bin dir in \$PATH with vim ~/bash_profile

## Node modules

Importing node modules, ES6 syntax to import, we need babel to run this import

    import 'package'; // node core modules or if not found, dependency packages npm installed
    import './dir'; // local modules, relative path
    import './config'; // ES6 syntax, must be transpiled by babel

All import files are CACHED

### Scope

Every module has its own scope, all elements are private and must be exported ir order to be avail to others.
In node modules we dont have to wrap elements in an IIFE to create scope, it does it for us automatically.

import usually is done into variables, directly if deafult exported or deconstructured if extra exports
, extra exports have to be imported into a variable

// config.js

    const env = process.env;

    export const nodeEnv = env.NODE_ENV || 'development';

    export default {
        port: env.PORT || 8080;
    }

// server.js

    import config from './config'; // default export just goes
    import config, { nodeEnv } from './config'; // default export just goes, extra imports into variables destructured

run
\$ babel-node server.js

## HTTP module and express

run
\$ babel-node server.js

# hot reload

\$ npm install -g nodemon
same as node but restart when making changes to a file does not refreshes the browser, just the server

# Node core

Based on V8 google runtime for browsers

Usual ES5 JS syntax, Primitives, Object, Arrays

Has ES6 by default - e.g. ES6 template string: `flkwdjfwlkjg ${var}`

## CommonJS

Uses CommonJS by default, which means all scope is in each modules, every node js file that we create sia module
and its scope is u to that module.

# global object

The global object is "global" (in the browser is "window")

## The global objects namespace

https://nodejs.org/dist/latest-v6.x/docs/api/globals.html

_The global objects namespace is what we can access in a js file without having to require anything._

In the global namespace we find:

- console()

- \_\_dirname : the path to where this module is located

- \_\_fileneme : the path to where this module is located including the file/module name

- require():
  function to import other node.js modules, they could be available form your intallation of node js.
  If we would like to make items consumable by other Javascript files, we can export them with 'module export'
  module.exports is an object.
  module.exports is the object that is returned to the require statement;
  e.g. module.exports = Person;

- process : node process instance

  - argv: variables used to start the process - default values are the node command, and module being executed
    \$ console.log(process.argv);
    [ '/usr/local/Cellar/node/7.10.0/bin/node',
    '/Users/javierhack/Documents/dev/projects/node/Ex_Files_Nodejs_EssT/Exercise Files/Ch03/03_02/start/app' ]

  - stdin, stdout: Used to communicate with the process.
    e.g. Read and write ops with the terminal, or communicating with a child process
    stdout writes to std out (usually the terminal) but does not add line breaks
    console.log() uses stdout, and add line breaks

                   - listening to events in the stdin or stdout

                   process.stdin.on('data', callBack FCN with the input data as arg).

                   process.stdout.on('data', callBack FCN with the input data as arg).

                   - For he stdin, when a user types in the stdin (usually the terminal) and hits enter, that will raise the data event and pass the input as the first arg.

                   Trim data as it comes with \n \r leading and ending. so, data.toString().trim()

                   - for the stdout, when the proc writes in the stdout, the event is trigered and pass/inject the output written  as the first arg. to the callback


                     - by placing an event listener to stdin, the process will run indefinetely, and it will wait for input to come, so we use node asynchronously this time, as it has to wait for the user to put some data to keep running.
                     Everytime you hit enter you raise a data event. and the process does not stop. This is called a running process or application.

                     -	Manipulate the std output:
                        process.stdout.clearLine();
                        process.stdout.cursorTo(0);

    - exit the process with exit();

    - process can listen to events too. as it is an object.
        process.on('exit', function(){

        });

- Timing functions: one way to use Node Js Asynchronously is with events, another is using the tiing functions.
  Available globally, and work the same as in the browser.

                    - setTimeOut: create a delay of a certain time and then callback a function.
                    After running the callback func, the process exits, which means that during that time the process was waiting AND running.

                    - clearInterval clerTimeout func are used to stop them.

# built in functions: @TODO more info here

- hello.slice(17); the slice function on Strings.

# process object: argument variables with process.argv

https://nodejs.org/dist/latest-v6.x/docs/api/process.html#process_process

- One important object that is available to us globally is the process object.
  It can be accessed from anywhere, and it contains functionality that allows us to interact with information
  about the current process instance. We can use the process object to get environment information, read
  environment variables, communicate with the terminal, or parent processes, through standard input and
  standard output. We can even exit the current process. This object essentially gives us a way to work
  with the current process instance. One of the the things that we can do with the process object is to
  collect all the information from the terminal, or command prompt, when the application starts.

All of this information will be saved in a variable called process.argv

- One important object that is available to us globally is the process object. It can be accessed from anywhere, and it contains functionality that allows us to interact with information about the current process instance. We can use the process object to get environment information, read environment variables, communicate with the terminal, or parent processes, through standard input and standard output. We can even exit the current process. This object essentially gives us a way to work with the current process instance. One of the the things that we can do with the process object is to collect all the information from the terminal, or command prompt, when the application starts.

All of this information will be saved in a variable called process.argv

\$ node app --user Javier --greeting "Gday mate"
[ '/usr/local/Cellar/node/7.10.0/bin/node',
'/Users/javierhack/Documents/learning/projects/node/Ex_Files_Nodejs_EssT/Exercise Files/Ch03/03_02/start/app',
'--user',
'Javier',
'--greeting',
'Gday mate' ]

var flag = '--user';
var index = process.argv.indexOf(flag); // 2
var flagValue = process.argv[index + 1]; // Javier

Every file that we create in Node.js is it's own module, and every varible that we create in a js file is scoped only to that module.
That means that our variables that are created in a file are not added to the global scope, as in the browser.

# CORE MODULES: default NODE JS modules

- path: ???
- utils
- v8: Node JS is built on top of Google Chrome V8's processor
- readline: Node JS is built on top of Google Chrome V8's processor
- child_process
- events: Node JS implementation of the publisher/subscriber design pattern.
- fs: The File System
- https : The HTTP Module

middle end.com
Middle end tasks, front end concerning points (templating, routing, validating, etc.) that used to be managed deeply into the back end (jsps, routing, double r triple validation points, client, server, database ).
So those tasks that we front enders need to contro more, are in the back, abstracted in the stack back end !
So, can we put them in a middle end tier?
WHAT IF W EIMPLEMENT THIS MIDDLE END TIER USING SERVER SIDE JAVASCRIPT?
Dont have to rewrite the whole back end, but relieve the back end fro doing front end concerns ...
So now you can validate only once on the server side with JAvascript, not in the jquery, not in java not in the db.

- Is good for scripting in JS, create command line programs, like unix bash scripts in JS running in Node. You use JS in Node instead of
  You can ue the bash style annotation to make a node script (JS) into an executable bash style script like:
  #!/usr/bin/env node

      	var args = require('minimist')(process.argv.slice(2), {string: "name"});
      	var nameParam = args.name;

      	console.log("Hello: " + nameParam);

      	change the file to be executable
      	$ chmod 700 1.js

      	execute it
      	$ ./1.js --name=World

      	-- finish a program:  process.exit(1);

# FILE I/O

In CommonJS (Node default lang) anything you declare in a file is private to that file (module)
So you have to expose them as a public API with module.exports.say = say;

All which is related with data transfers, like file read, or streams, is done not in terms of strings, is not pulling in
a string, is creating an array buffer, which is a efficient binary representation of our data. To return our buffer
into something readable, we define its encoding when reading it or force it with toString().

- using toString
  contents = fs.readFileSync(filename);
  contents.toString();

- or read it with a encoding defined
  contents = fs.readFileSync(filename, 'UTF-8');

Reading with fs is raw reading, it reads /n and ANY content in you file, therefore when you print it it will show these.
No fancy formatting or anything there.

NOTE: the way you usually and naturally organize your code in Node JS is with the require import module system, you may use delegation,
or inheritance if you want to

    - Sync

    	> main.js
    		var hello = require('./file_io_async_module.js');

    		var contents = hello.say(fileName)

    	    console.log(contents.toString());

    	> file_io_sync_module.js
    		var fs = require('fs');

    		function say(filename){
    			return fs.readFileSync(filename);
    		}

    		module.exports.say = say;

    - Async
    Callbacks in CommonJS (Node), are in the style (err, value), called err style callback. The first param in a callback is reserved for
    errors.

    	> main.js
    		var hello = require('./file_io_async_module.js');

    		var contents = hello.say(fileName, function(err, content) {
    		  if (err) {
    		    console.log(err);
    		  } else {
    		    console.log(contents.toString());
    		  }
    		});

    	> file_io_sync_module.js
    		var fs = require('fs');

    		function say(filename, callback){
    			return  contents = fs.readFile(filename, callback);
    		}

    		module.exports.say = say;

    	- Introducing a forced delay to simulate AJAX.

    	> file_io_sync_module.js
    		var fs = require('fs');

    		function say(filename, callback) {
    		  //simulates an ajax call or db request by adding a delay to the callback calling
    		  return (contents = fs.readFile(filename, function(err, contents) {
    		    if (err) {
    		      callback(err);
    		    } else {
    		      setTimeout(function() {
    		        callback(null, contents);
    		      }, 3000);
    		    }
    		  }));
    		}

    		module.exports.say = say;

NOTE: Careful with nested Callbacks

Asynquence

# Testing and CI CD

mocha and

# Troubleshooting

## Node and Windows npm node-gyp
