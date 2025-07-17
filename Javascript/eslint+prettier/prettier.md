# Prettier

https://github.com/prettier/prettier

## Definition

Code formatter to help readability. Stylistic helper.
DOES NOT verify syntax ... (that is ESLint for)

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
