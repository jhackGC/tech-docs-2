# RxJs

# History

## Callbacks

Async made easy with callbacks, wait for the code to complete and then call back my function
cons:

- callback hell
- error handling
- cant return values form CBs

## Promises

An improved Callback

Pros:

- good error handling
- can return values
- chainable
- helper methods (then(...), resolve(...), reject(...), etc)

Cons:

- can only be used once

## Real Time: Observables

It's a reusable Promise that keeps listening after the then(...) method

Pros:

- has the subscribe(...) method that is similar to then(...) but reusable

So you can wait for something to happen, respond, and keep listening for it to happen again, and respond again

_observable_: what can be observed. Its a function, it takes in an observer, and provides lots of methods, like create and subscribe.

_observer_: what observes, those who are subscribed to the observable, is what you will use to listen to whatever you want to listen to, it could listen a button, a search box, a remote data stream, etc.

Observers are just objects that have three methods:

    - next
    - error
    - complete

    const observable\$ = Observable.create(observer => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.complete();
    });

    observable\$.subscribe(
      value => console.log(value), // responds to observer.next(payload)
      err => console.log(err), // responds in case of error
      () => console.log('this is the end'), // responds to observer.complete()
    );

    // Logs
    // 1
    // 2
    // 3
    // "this is the end"


    // when finished close the subscriptions

### Close the subscription - memory leaks

All observables that have subscriptions attached will continue to listen, unless we unsubscribe.

### Observer Design Pattern

Base of Event-Driven design

So,

Subject has a list of dependents (the observers), and notifies all of them automatically of any state changes, usually by calling one of their methods

# DAtabase observables

WE used to have a idle db waiting for querys, when someone updated it didnt tel lanyone that it was updated.
Now we want ot query and listen for updates -> data streams -> items processd one at a time.
Now your data is a stream of events or `updates

# Installation

dependencies

{
"dependencies": {
"rxjs": "^5.5.2"
},
"devDependencies": {
"ts-loader": "^3.1.1",
"typescript": "^2.6.1",
"typings": "^2.1.1",
"webpack-dev-server": "^2.9.4"
}
}

### typings

./node_modules/.bin/typings install dt~es6-shim --global --save
es6-shim

### ts compiler config

tsconfig.json

{
"compilerOptions": {
"target": "es5", --> compiled code
"module":"commonjs", --> module format that webpack understands
"sourceMap": true --> easir to debug
}
}

### webpack config

This file is a js file as is code that NodeJS will run in its environment.
It will export a config object

Webpack will analyse this file and all the dependencies that ir brings in and use that info to produce a bundle for my application.

webpack.config.js

    module.exports = {
      entry: "./main"// file that bootstraps the app and kicks off the app
    }

./main.ts

    alert('Ok!');

module loaders are tools that can look at different file types, process them, and give webpack the output to bundle into the single app.js file's output
if you are only going to work with ts files just put that

    module.exports = {
      entry: "./main",// file that bootstraps the app and kicks off the app
      output: { filename: "app.js"},//all compiled app
      module: {
        loaders: [{
          test: /.ts$/, //regex to match files in the file system
          loader: "ts-loader"
        }]
      },
      resolve: {
        extensions: ["",".ts", ".js"] // that will help webpack to find e.g.
        // main.ts by only specifying main
      }
    }

ts-loader is a tool tht we installed, see package.json, it is a webpack plug in, that knows how to use the typescript compiler to process a ts file (as defined in --> test: /.ts\$/ ), like main.ts, when it finished with the file and covnerted it to JS, webpack takes the resulting JS and bundles it in the app.js

it bundles our code as well as all the RxJs code that we need and other libraries.

How webpack should resolve modules, and what are the file extensions that webpack should be looking at:

add a line in package.json to make this tools easier to use, npm scripts.
