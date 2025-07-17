# Setup Typescript in Node / Express

https://medium.com/javascript-in-plain-english/typescript-with-node-and-express-js-why-when-and-how-eb6bc73edd5d

# Install NPMs packages

## typescript

Let’s now install the typescript package, the types for express and the ts-node library to run typescript direclty in node without transpiling first (dev only)

        npm install typescript -s

or

        yarn add typescript -D

## About the Typescript node package

Node.js is an engine that runs Javascript and not Typescript.
The node Typescript package allows you to transpile your .ts files to .js scripts.

Babel can also be used to transpile Typescript, however the market standard is to use the official Microsoft package.

Inside our package.json we will put a script called tsc:

        "scripts": {
            "tsc": "tsc"
        },

This modification allows us to call typescript functions from the command line in the project’s folder.

So we can use the following command:

        npm run tsc -- --init

This command initializes the typescript project by creating the tsconfig.json file.

Within this file we will uncomment the 'outDir' option and choose a location for the transpiled .js files to be delivered.

## Installing express.js

        npm install express -s

or

yarn add express -D

Express and Typescript packages are independent.

The consequence of this is that Typescript does not “know” types of Express classes.

There is a specific npm package for the Typescript to recognize the Express types.

        npm install @types/express -s

or

        yarn add @types/express -D

# Compiling/Transpiling our first application:

        npm run tsc

As you can see, the command automatically created the build/dist folder and the .js file.

# Running the transpiled express:

        node build/app.js

# Running TypeScript without transpiling

You can run typescript directly on the node with the ts-node package.

This package is recommended for development only.

To make the final deploy in production, always use the javascript version of your project.

The ts-node is already included as a dependency on another package,
ts-node-dev.

After installing, ts-node-dev we can run commands that restarts the server whenever a project file changes.

        npm install ts-node-dev -s

    or

        yarn add ts-node-dev -D

Inside our package.json we will add two more scripts:

"scripts": {
"build": "tsc",
"dev": "ts-node-dev --respawn --transpileOnly ./app/app.ts",
"prod": "build && node ./build/app.js"
},

To start the development environment:

        npm run dev

To run the server in production mode:

        npm run prod

# Scripts final

    "scripts": {
        "dev": "ts-node-dev --respawn --transpileOnly ./src/server.ts",
        "build": "tsc",
        "prod": "npm run build && node ./dist/server.js",
        "serve": "node dist/server.js",
    },

# Dependencies final

    "dependencies": {
        "body-parser": "^1.19.0",
        "cors": "^2.8.3",
        "express": "^4.15.3",
        "lodash": "^4.17.11",
        "mongoose": "^5.6.0"
    },
    "devDependencies": {
        "@types/express": "^4.17.1",
        "dotenv": "^8.1.0",
        "eslint": "^6.0.1",
        "eslint-config-standard": "^12.0.0",
        "eslint-plugin-import": "^2.18.0",
        "eslint-plugin-node": "^9.1.0",
        "eslint-plugin-prettier": "^3.1.0",
        "eslint-plugin-promise": "^4.2.1",
        "eslint-plugin-standard": "^4.0.0",
        "mocha": "^6.1.4",
        "ts-node-dev": "^1.0.0-pre.42",
        "typescript": "^3.6.3"
    }

# Clean the project from ES6 transpiling

remove

    "@babel/cli": "^7.4.4",
    "@babel/core": "^7.4.5",
    "@babel/node": "^7.4.5",
    "@babel/preset-env": "^7.4.5",
    "@babel/register": "^7.4.4",

# if iporting json files directly see "resolveJsonModule": true

# troubleshooting

## Issues with ts lint or eslint

## 9/11/2019, 12:10:35 PM:

Failed to load plugin 'prettier' declared in 'CLIOptions'/Users/javierh/Documents/dev/\_prd/breeze/breeze-cms-back/src/service/DataService.ts:: Cannot find module 'eslint-plugin-prettier'

remove
// "plugins": ["prettier"],
