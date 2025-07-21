# Prettier

https://github.com/prettier/prettier



## Definition
Code formatter to help readability. Stylistic helper.
DOES NOT verify syntax ... (that is ESLint for)

## Why use it?

It's important to keep quality high when writing code so we can focus on architecture and problem-solving.

It takes the code you write, breaks it down in to an abstract syntax tree (AST) which is just a representation of your code. It then takes that AST, throws away all of your code style you made and prints it back out using a predefined style.

While this sounds a little scary, it's actually really cool. Since you no longer have control of the style of your code, you no longer have to think about it at all. 

Your code is always consistent, as is the code from the rest of your team.

Either install Prettier globally 

```bash
npm install --global prettier
```

or 

```bash
npx prettier
```

Prettier can also understand Flow and TypeScript.

Prettier is great to use with Visual Studio Code. 
Just download this extension. 

Pro tip: set it to only run Prettier when it detects a Prettier config file. 

Makes it so you never have to turn it off. In order to do that, set prettier.requireConfig to true and editor.formatOnSave to true.

So to define the config, create a file called .prettierrc and put {} in it. This lets everyone know this is a Prettier project that uses the default configuration. You can put other configs here if you hold strong formatting opinions.

## npm scripts
So it can be painful to try to remember the various CLI commands to run on your project. You can put CLI commands into it and then run the name of the tag and it'll run that script. Let's go see how that works. 

Put the following into your package.json.

First run 
```bash
npm install -D prettier@latest
```
 -D means it's for development only.


"scripts": {
"format": "prettier --write \"src/\*_/_.{js,jsx}\""
},

Now you can run npm run format and it will run that command. This means we don't have to remember that mess of a command and just have to remember format.


## Installation

> npm install --global prettier

## Run it from the command line

run it with some formatting instructions, and show what it will look like

> prettier --single-quote --print-width=120

Add --write to actually modyfiyng the file

> prettier --single-quote --print-width=120 --write

runnig everything in the command lin, Good for CI , so it runs on the command line

## Setup in WebStorm

Add it as an external tool ...
https://github.com/prettier/prettier/blob/master/editors/webstorm/README.md

In external tools put the config as args of the CLI

    --write --single-quote --trailing-comma=all --print-width 120 --parser flow
    "$FileDirRelativeToProjectRoot$/$FileNameWithoutAllExtensions$.{js,jsx}"

That was the easiest way to only process the file if it is .js or .jsx.
Be careful not to leave any spaces in between extension list {js,jsx}. e.g. {js, jsx}

## Setup in VS Code

Prettier formatter for Visual Studio Code
VS Code package to format your JavaScript / TypeScript / CSS using Prettier.

Install through VS Code extensions. Search for Prettier - Code formatter

Visual Studio Code Market Place: Prettier - Code formatter

A word of warning-if you have any other code formatting extensions installed such as for example hugely popular HookyQR.beautify or taichi.react-beautify they might take precedence and format your code instead of Prettier leading to unexpected results.

Usage
Using Command Palette (CMD/CTRL + Shift + P)

1. CMD + Shift + P -> Format Document
   OR
1. Select the text you want to Prettify
1. CMD + Shift + P -> Format Selection

## Set it up as a script for you project lyfecycle (Webpack)

in package.json

    "scripts": {
        "api": "node ratingsAPI.js",
        "format": "prettier  --write --tab-width=2 --single-quote --trailing-comma=all --print-width=120 --parser=flow \"public/src/**/*.{js,jsx}\" "
    },

## move config to file instead of command line
.prettierrc.json




### Double check consistency between methods

We want both methods, per file on save and npm script, to run the same set of formatting.
To ensure that double check they use the same exact params (e.g. --single-quote)
