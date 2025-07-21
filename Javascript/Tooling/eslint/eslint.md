# ESLint

On top of Prettier which takes of all the formatting, you may want to enforce some code styles which pertain more to usage: for example you may want to force people to never use with which is valid JS but ill advised to use. ESLint comes into play here. It will lint for these problems.

First of all, run

```bash
npm install -D eslint eslint-config-prettier globals
```

to install ESLint in your project development dependencies. Then you may configure it.

There are dozens of preset configs for ESLint and you're welcome to use any one of them. The Airbnb config is very popular, as is the standard config .

Let's just use the recommended JS config from ESLint, simpler.

## Config with json

No longer supported in ESLint 9. You have to use the new "flat" config system.

## Config with mjs

See https://github.com/jhackGC/react-ecomm/blob/4058f5743bf08871c4e171e42e644b68b4df7ed9/01-tooling/eslint.config.mjs

ESLint changed a lot with version 9. In previous versions they used JSON for configuration which is no longer supported. You have to do their newer "flat" version of config (honestly it is better.)

The /\*\* @type {import('eslint').Linter.Config[]} \*/ is a VS Code / TypeScript trick to be able to do auto-completions on the config object. Super helpful to have the types available right in VS Code. It's not required.

"globals" is a package that is just a big JSON file of what's available in each environment. We're going to be in Node.js and Browser environments so we grabbed those two. If I was being a bit more discerning I'd carefully only apply browser configs to browser files and Node configs to Node.js files.

The config objects are applied in order. We did ESLint's JS config first, and then our custom one so we can overwrite it where we want to, and then the Prettier one should always come last as all it does is turn off rules that Prettier itself does; it doesn't add anything.

This is a combination of the recommended configs of ESLint and Prettier. This will lint for both normal JS stuff as well as JSX stuff.

Let's add ESLint to our package.json scripts:

```json
"scripts": {
  "lint": "eslint"
}
```

Worth adding three things here:

With npm scripts, you can pass additional parameters to the command if you want.

Just add a -- and then put whatever else you want to tack on after that. For example, if I wanted to get the debug output from ESLint, we could run

```bash
npm run lint -- --debug
```

which would translate to eslint --debug.

We can use our fix trick this way: npm run lint -- --fix.
We're going to use both JS and JSX.

## ESLint and Typescript

# TS check in VS Code

# Definition

npm install eslint-plugin-import --save-dev

The command above adds ESLint, adds a parser that makes ESLint understand TypeScript, and adds some TypeScript-specific rules.

If you run into the error that eslint cant find the eslint-plugin-prettier module
try Uninstalling eslint globally with npm or force your local node_modules eslint to run.
It looks like when run as global eslint cant see local npm modules (eslint-plugin-prettier)

> npm remove --global eslint

## test it

globally
\$ eslint ./src/\*_/_.{js,jsx} --quiet

locally
./node\*modules/.bin/eslint ./src/\*\*/\_.{js,jsx} --quiet

--quiet is not to show warnings, only errors

# Setup config file

## Final version

// .eslintrc.json in the root of your project
{
"extends": [
"prettier",
"prettier/react"
],
"plugins": [
"prettier"
],
"parserOptions": {
"ecmaVersion": 2018,
"sourceType": "module",
"ecmaFeatures": {
"jsx": true
}
},
"env": {
"es6": true,
"browser": true,
"node": true,
"jest": true
}
}

### extends

      "extends": [
        "prettier",
        // to the basic default rules (ES6) from eslint, apply the prettier rules, so we dont have
        // conflicts with the prettier code formatter
        // eslint-config-prettier pkg required ??
        "prettier/react" // react rules ... "eslint-plugin-react" required ???
      ],

### plugins

      "plugins": ["prettier"], // eslint-plugin-prettier pkg required ??  Adds the prettier plug in so we can run those

### parserOptions

    "parserOptions": {
        "ecmaVersion": 2018, // i.e. includes rest spread object see http://2ality.com/2017/02/ecmascript-2018.html
        "sourceType": "module", // we want ES6 module style rather than commonJS
        "ecmaFeatures": {
          "jsx": true // ????
        }
    }

## env

     "env": { // Global variables not to fail on
        "es6": true, // not to fail on 'symbol' as it is only available on ES6.
        "browser": true, // not to fail on window or document.
        "node": true //not to fail on node specifics like process.env, which is only available in node.
        "jest": true // it wont complain about jest magically imported functions like "it(...)"
     }

## install dev dependencies

prettier
eslint
eslint-plugin-react
eslint-config-prettier
eslint-plugin-prettier
eslint-config-airbnb
eslint-plugin-import
eslint-plugin-jsx-a11y

### Airbnb style

have very cool styling rules
eslint configured for airbnb eslint style (extends airbnb).

There are many version of ESLint, like th airbnb one, and wehn you configure ESLInt to follow a set of rules
like airbnb, and then you want to override some of those rules you use the extends property in the right order

So ESlint will apply airbnb rules then apply prettier rules, maybe overriding some airbnb rules, and then
prettier/react rules

We add prettier and prettier/react because prettier invalidates many of the things that airbnb checks for.
So these two extensions are disabling a bunch of rules of airbnb, just to make sure that prettier can run
without
ESlint, or ESLint yelling about it. Gets rid of a lot of the noise.
Be sure to put them in that order

First extends airbnb and ONLY AFTER THAT follows prettier

        "extends": [
            "airbnb", // needs some packages see below
            "prettier",
            "prettier/react"
        ]

INSTALL THIS PACKAGES !!!
https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb

\$ npx install-peerdeps --dev eslint-config-airbnb

## Test

> GLOBALLY INSTALLED
> \$ eslint public/js/\*_/_.{js,jsx}
> you may also have to install globally eslint-plugin-prettier

> LOCAL eslint:
> \$ ./node\*modules/eslint/bin/eslint.js src/\*\*/\_.{js,jsx}
> you may also have to install locally eslint-plugin-prettier

if you run into the issue that

    Referenced from: /Users/javierhack/Documents/dev/projects/react/complete-intro-to-react/node_modules/eslint-config-airbnb/index.js
    Referenced from: /Users/javierhack/Documents/dev/projects/react/complete-intro-to-react/.eslintrc.json
    Error: [object Object]:
            ESLint configuration is invalid:
            - Unexpected top-level property "ecmaFeatures".

Maybe the version of eslint that you are using is not supported by the eslint airbnb
config that you are extending.

use the ones that does, like

    "eslint": "3.19.0",
    "eslint-plugin-prettier": "2.1.1",

### Troubleshooting

#### Error: Cannot find module 'eslint-config-prettier'

Install npm package eslint-config-prettier

\$ npm install --save-dev eslint-config-prettier

Turns off all rules that are unnecessary or might conflict with Prettier.
This lets you use you favorite shareable config without letting its stylistic choices get in the way when using Prettier.

#### Error: Cannot find module 'eslint-config-prettier/react'

uninstall and then install locally
npm install --save-dev eslint
npm install --save-dev eslint-plugin-react

test it with

### Error: Cannot find module 'eslint-config-airbnb'

## Setup in WebStorm

Preferences > Language and Frameworks > Javascript > Code Quality Tools > ESLint

- ESList package: USE THE LOCAL ONE ~/Documents/dev/projects/react/complete-intro-to-react/node_modules/eslint
- Automatic search

## Setup in VS Code

install plug - in
ESLint dbaeumer.vscode-eslint
Dirk Baeumer

## Setup in Webpack

### Add it as a npm script

NPM style node_modules

    "eslint": "./node_modules/eslint/bin/eslint.js public/js/**/*.{js,jsx}"

or YARN style node_modules

    "lint": "./node_modules/.bin/eslint './src/**/*.{js,jsx}' --quiet"

### Add it as a module loader: lint the code when transpiling (if in watch it will run everytime it recompiles)

Install
\$ npm install -D eslint-loader

if weback is in watch,it only runs on files that have changed

    // lint the code when building
    {
        enforce: 'pre', // run before babel
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
    },

### Run it

> npm run eslint
> yarn eslint

## Ignore files

> .eslintignore

     public/
     node_modules/

```

```
