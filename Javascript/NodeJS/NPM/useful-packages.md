# underscore / lodash
misc utilities for Objects and collections.


# nodemon
command line pkg, usually installed globally
watches a file for changes an runs node on it every time it changes

# async
Functions for working with asynchronous JavaScript

# node-dev & nodemon
Hot code reload (nodemon) and server restart

# cors
CORS - middleware that makes our API accesible by other domains
cors is a function , a middleware function

    const cors = require ('cors');

ALLOW CORS TO ALL MY API requests

    app.use(cors);

Means that any domain can make requests to my API


# body-parser
Parsing url incoming request data/variables

# jshint
Syntax check

To avoid jshint complaining about ES6 features. Create a .jshintrc file in your project's root and add:
{
  "esversion": 6
}


# express
Web Server - Alternatives to create your own server from scratch with the http module

# httpster
Web Server - Alternatives to create your own server from scratch with the http module
To see local files in the browser we can use the file API like file:///Users/index.html

Or we can use a local static server like httpserver

Install it globally with:

    $ sudo npm install -g httpster

Now you can create a static web server in any directory.

If I wantot create a file server, I can run httpster and give it a port flag and dir,

    $ httpster -p 3001 -d ./public/

    $ sudo npm uninstall -g httpster

install it locally instead, in your project root run:

    $ npm install httpster


# minimist
Manage argv and command line (process params)

    npm i --save minimist

Helper to manage input params

usage:

    process.argv.slice(2) // removes the first 2 args --> node app.js

    var args = require('minimist')(process.argv.slice(2), {string: "name"});

    var nameParam = args.name;

so now when executing:

    $ node 1 --name=World

the result will be : Hello: World

it parsed out the command line for us ...


# asynquence, q , cujoJS, bluebird



simplifying async with promise managenemt: asynquence, q , cujoJS, bluebird
---------------------------------------------------------------------------
The goal is for you to express code y a very declarative way so can understand your asynchronous
control flow

asynquence

https://github.com/getify/asynquence

Say you want to perform two or more asynchronous tasks one after the other
(like animation delays, XHR calls, file I/O, etc). You need to set up an ordered series
of tasks and make sure the previous one finishes before the next one is processed.
You need a sequence.

> asynquence_module.js
var fs = require('fs');
var Asynq = require('asynquence');
require('asynquence-contrib');

function readFile(filename) {
  // simulates an ajax call by adding a delay to the callback calling
  // using asynquence.
  // returns a sq, sq.errfcb() handles that ...
  var sq = Asynq();

  fs.readFile(filename, sq.errfcb());

  return sq;
}

function delayMsg(done, contents){
  setTimeout(function() {
    done(contents);
  }, 3000);
}

function say(filename) {
  // here we create the sequence that represents the callback calling series.
  return readFile(filename).then(delayMsg);
}

module.exports.say = say;



> asynquence.js
// .say() returns a asynquence promise that we can chain of with another
// then() or val() if it is a sync step.
// seq() adds an astync step to the chain
// val() adds a sync step to the chain --> confirm this
// .or() is the sequence error handler, any error in the seq will
// bubble up to this handler

hello
  .say()
  .val(function(contents){
    console.log(contents.toString());
  })
  .or(function(err){
    console.error("Error: " + err);
});

Provides a tidier level of abstraction when working with async flow control
