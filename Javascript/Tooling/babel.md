# Babel
JS transpiler

## Definition
Babel transforms from one type of file to another, with many kinds of transformations. 
**Each kind of transformation is called a plugin**. e.g. a plugin for arrow functions, to transform from arrow functions 
to common functions in ES5.

Sets of transformations, group of plug-ins, are called presets.

e.g. react has 3 other presets, full of plug-ins: 
- JXS understand
- JSX transform
- Flow


## Installation
> yarn add babel

## Test


## Setup config file
Create a .babelrc

You can use presets like react

    {
      "presets" : [
        "react",//transforms jsx and flow to es5
        "es2015"//transforms es2015 to es5
      ]
    }

or 

"ES2015", but browsers will some day understand ES2015, so it wont be necessary to compile your 
code from ES2015 (ES6) to ES5, so that preset will became obsolete and will add extra burden, or you will
have to update your presets manually all the time to keep updated with browser implementation of 
ECMAscrtip

Better to use "env"

    ["env", {
      "targets": {
        "browsers": "last 2 versions"
      },
    "loose": true
    }]

So the target 'ESX' that you are compiling your code into, 
is the one that the last 2 versions of the browsers understand.
Its a automatic moving target, managed by a compatibility table maintained by someone.

Verify this: So, if all browsers, in their last 2 versions support ES2015, then our target 
moves to ES2016, as we don't have to compile ES2015 code anymore as all browsers now understand it.
    
> "loose": true

Tells babel to avoid adding extra code to your bundle that is generally used for edge cases, extreme situations.

> modules:false

tell babel not to transpile the modules. e.g. transform import React from 'react' --> const React = require('react')
That was required for webpack 1 but webpack 2 is ES2015 enabled (accepts imports).
It is saying, babel dont touch the modules, webpack will take care of them.
AS babel is gin to run before webpack put things together.
By doing this we enable live code inclusion as the code stays with 'static' imports instead of dynamic requires e.g. 
require('react') 

# Support for Object Rest Spread

https://babeljs.io/docs/en/babel-plugin-transform-object-rest-spread.html

// npm 
npm install --save-dev babel-plugin-transform-object-rest-spread

// .babelrc

{
  "plugins": ["transform-object-rest-spread"]
}



