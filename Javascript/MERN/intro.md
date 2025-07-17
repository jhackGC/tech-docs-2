# Configuration

# Dependencies

        "dependencies": {

            // for the back end
            "express": "^4.17.1", // web framework
            "mongodb": "^3.2.7", // Official MongoDB driver
            "prop-types": "^15.7.2", // types checking

            // for the front end
            "react": "^16.8.6", // react
            "react-dom": "^16.8.6" // react rendering to Browser both client side and server side
        },

        "devDependencies": {
            // pack your assets and code into bundles for the web
            "webpack": "^4.35.0", // bundler to translate modular code into browser code
            "webpack-cli": "^3.3.5" // CLI to control the webpack

            // loader for webpack (babel), for translating jsx and es6 to plain JS
            "babel-loader": "^8.0.6", // loader
            "@babel/node": "7.x", // ???
            "@babel/core": "^7.4.5", //
            "@babel/preset-env": "^7.4.5",
            "@babel/preset-react": "^7.0.0",
            "@babel/plugin-proposal-class-properties": "^7.4.4",
            "babel-eslint": "^10.0.2", // for eslint to understand babel code? yes, to make eslint work with babel

            "nodemon": "^1.19.1", // watch modified files to restart node server

            "eslint": "^6.0.1", // es6 code check
            "eslint-plugin-react": "^7.14.2", // code check specific for react, recommended settings for react


        }

## global dependencies

"@babel/cli": "^7.4.4", // CLI to control babel, needed for deployment

# dir structure

/src
for the front end

/public
for the static stuff like css, js and stuff being loaded on clients, we are goint o use express middleware to serve directly this files

/api
for the node back end api

they all may have a index file as an entry point for each

# npm scripts

        "scripts": {
            "start": "nodemon --exec babel-node server.js --ignore public/",
        },


        "start": "nodemon --exec babel-node server.js --ignore public/",
        Starts the server
        we need our script to work with babel and nodemon
        - add the nodemon execution wrapper
        - add babel-node for our server code to understand jsx as well, thats needed for server side rendering
        ignore the public directory so it is not watched by nodemon, as that directory is a distribution directory and changes in the public dir are usually driven by changes in the source directory.

        "dev": "webpack -wd"
        Transforms the source files into a bundle file for the browser
        - the -wd flags are for watch mode and development mode.

        configure webpack to work with our file structure, tha is done in the config file webpack.config.js

# webpack.config.js

        module.exports = {
        entry: './src/index.js', // where to start
        // bundle all the modules we depend on inside the entry file, into the output
        output: {
            path: __dirname + '/public',
            filename: 'bundle.js'
        },
        // then for every file, module, that ends with a .js, we want to run the babel-loader on it, which wil take care of transforming the non-standard JS to standard JS. For this, it uses a config for babel in babel.config.js
        module: {
            loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
            ]
        }
        };

# babel config

This config instructs babel to use the two presets we are interested in

- babel.config.js

        module.exports = {
            presets: ['@babel/react', '@babel/env'],
            plugins: ['@babel/plugin-proposal-class-properties']
        };

@babel/react -> to transform jsx
@babel/env -> to trnasform modern JS into standard JS

plugins: ['@babel/plugin-proposal-class-properties'] to use the new class syntax

# node config

## add babel-node globally

create a server.js
