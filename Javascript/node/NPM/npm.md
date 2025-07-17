# NPM

NPM: tool to manage packages.

The node js core is relatively small. It needs external packages.

# Package and Module

Module: A single js file that has functionality
Package: - A directory with one or more js files in it. - It has a metadata file that describes it, called package.json.

# Getting help

    $ npm -h

or
open browser if online or local help pages

    $ npm help install

search for help

    $ npm help-search remove

or

NPM site - https://docs.npmjs.com/misc/config
down there is a list of shorthands

# create a Node package and therefore a package.json (node package descriptor)

    $ npm init

It will pick up the pkgs that you have already installed and put them in

    $ npm init -y

accepts all the defaults, if you want you can define your own defaults

## package.json

describes the node package, with its dependencies among other details

reason to use a package.json: - define a package - track dependencies the project uses - create scripts, saving you from having to install and use grunt or gulp - use 3rd party projects (dependencies)

## NPM other usages: run other peoples apps, samples, commands

- clone it
- npm install
- npm start (this script has to be defined in the package.json file)
- npm test (this script has to be defined in the package.json file)

# NPM - FULL LIBRAY LIST IN : https://npmjs.com

$ npm -v -> version
$ npm ls -> what is installed and where
$ npm install -> install locally, get the latest dependencies versions
$ npm remove -> remove locally
\$ npm update -> latest versions of all your packages
On a regular maintenance process you will run a npm update to keep all dependencies updated

devDependencies are installed when using nm install with no flags

# installing packages

\$ npm install -g <pkg>
sudo may be needed to create dirs in the users main root node_modules

## flags

--save saves the change to the package.json dependencies
--save-dev add it to the package.json dev dependencies
-g install globally

# Global check

npm list -g --depth 0

#### TODO: mover esto a Node o Express

## CREATING NPM modules

https://docs.npmjs.com/getting-started/publishing-npm-packages
SemVer verison semantics:
0.0.1-a
major.minor.patch-relevancy
patch does not brake the API

Steps to publish:

- crate a package.json file in the root of your project
  {
  "name": "swell_test", // unique
  "version": "0.0.1-a", // SemVer style
  "description": "SouthSwell library test",
  "main": "asynquence.js", // file that is going to be pulled in when package required.
  "dependencies": {
  "minimist":"0.0.8"
  }
  "scripts": {
  "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "javier hack <javier@southswell.com.au>",
  "license": "MIT"
  }

dependencies version semantics:
0.0.8 only that version
~0.0.8 that version or upgraded patches (e.g. 0.0.9 or 0.0.10) not minor or major versions

- create npm users
  npm adduser

- npm publish swell_test

# Sharing quick walk thru

A quick walkthrough with only essentials:

> mkdir my-lib
> cd my-lib
> npm init -y
> npm i -D typescript
> touch tsconfig.json
> mkdir src
> touch src/index.ts
> touch .npmignore
> tsconfig.json:

{
"compilerOptions": {
"target": "es6",
"module": "commonjs",
"declaration": true,
"outDir": "./dist",
"strict": true
}
}
src/index.ts:

export interface Check {
isValid(): bool;
}
.npmignore:

dist/
Add the npm scripts in package.json:

"prepublishOnly": "tsc"
Publish:

npm publish
Now use in some other project:

npm i my-lib

# refresh nom packages

npm outdated

npm install -g npm-check-updates

```
ncu
```
