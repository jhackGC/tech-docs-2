#

# config webpack

    ## webpack.config.json

            // const webpack = require('webpack');
            const path = require('path');
            const BUILD_DIR = path.join(__dirname, 'dist');
            const APP_DIR = path.join(__dirname, 'src');

            const config = {
                entry: APP_DIR + '/index.js',

                // dist file and dir
                output: {
                    path: BUILD_DIR,
                    filename: 'bundle.js', // relative path, do not use slash, just the filename
                },
            };

            module.exports = config;

    ## package.json

            "scripts": {
                "build": "webpack -d" // -d debug
            },
            "devDependencies": {
                "webpack": "^4.16.5",
            },

## Babel

We need babel to transpile react code and es6 code to es5 code.

\$ yarn add babel-core -D // -D development

\$ yarn add babel-loader -D // -D development

\$ yarn add babel-preset-react -D

\$ yarn add babel-preset-env
// previously it was preset-2015 but it is now replaced with -env
check: https://babeljs.io/docs/en/env/

### Babel & React

Create a file for babel config

- .babelrc

        "presets": ["@babel/env", "@babel/react"], // babel will transpile using these presets, here it can convert from es6/7/8 to es5 (@babel/env), and react to es5 (@babel/react)

# Webpack Plug-ins

you have webpack own plugins and imported ones

## webpack plugins

        const webpack = require('webpack');

        plugins: [new webpack.ProgressPlugin()],

## HTML plug in

Processes html file. Will pick html files and process them and put them in the dist dir
In injects whartever output assets is there in the file. i.e. bundle.js

        $ yarn add html-webpack-plugin -D

        - webapck.config

        const HtmlWebPackPlugin = require('html-webpack-plugin');

        with no params object the plugin will use the default values and files

        plugins: [
            new HtmlWebPackPlugin(),
        ],

        this will emmit a new asset called index.html that can be served in a web server...

        You can also specify other than default values
        new HtmlWebPackPlugin({
            template: './public/index.html', // source
            filename: 'index.html', // destination file
        }),

## Webpack-dev-server plug in

        \$ yarn add webpack-dev-server -D

add a new script for the server and add i to the start script

        - package.json

        "serve": "webpack-dev-server"
        "start": "npm run serve -- --env.mode development"

diff -qr /Users/javierh/Documents/dev/xside/titan-azure/titan-full/client /Users/javierh/Documents/dev/xside/titan-azure/titan-client --exclude=node_modules

### Webpack loaders

Adds functionality to webpack, so it knows ow to process specific types of files
At the moment if we try to include any type of js file webpack wont know aht to do with it ...

e.g.

            import React, { Component } from 'react';
            import ReactDOM from 'react-dom';

            class App extends Component {
                render() {
                    return <div>React rendered</div>;
                }
            }

            ReactDOM.render(<App />, document.getElementById('root'));


    Remember to add the DOM elem for React, id="root"
    - dist/index.html

            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <title>WEBPACK TEST</title>
                </head>
                <div id="root"></div>

                <script type="text/javascript" src="./bundle.js"></script>
            </html>

So we need to include the loaders in webapck to transpile from es6 and react to es5

    - webpack.config.json

            // const webpack = require('webpack');
            const config = {
                module: {
                    rules: [ // rules are the loaders you want to run
                        {
                            test: /\.(js | jsx)?/, // only transpile js or jsx files

                            // only transpile jsx files in this dir, excluding the node_modules for example
                            // include: APP_DIR, // commented as we prefer to use exclude, to transpile all but the exclusions

                            // excluding the node_modules, we dont want them transpiled, they are already transpiled
                            exclude: /node_modules/,

                            // transpile es6 and react to es5, based on .babelrc config
                            use: 'babel-loader',
                        }
                    ]
                },
            };

# Webpack Assets

- Loading assets with loaders
  we need css files and images

  - CSS loader
    Bundles css files into the bundle.

    \$ yarn add css-loader -D

    add a css file to your js file, and webpack will compile just fine, will add the css to the bundle;

            module: {
                rules: [
                    {
                        test: /\.css?/, // css files
                        use: 'css-loader', //
                    },
                ],
            },

    if you put this but doesnt know what to do with the css file, so you have to config the loader witha nother loader, the style loader.

            module: {
                rules: [
                ],
            },

    - Style loader
      Takes any CSS from your javascript bundle and adds it to the page as CSS text, thats how the browser knows to handle it.

    \$ yarn add style-loader -D

    Loaders can be CHAINED together so we can use many loaders applied to the same target test
    for that create an array of loaders, THETY WILL EXECUTE FROM RIGHT TO LEFT

                module: {
                    rules: [
                        {
                            test: /\.css?/, // css files
                            use: ['style-loader', 'css-loader'],
                        },
                    ],
                },

        This will add the css to the style tag in the header

                <head>
                    <title>WEBPACK TEST</title>
                    <style>html {
                        min-height: 100%;
                        background-color: #0c45bb;
                        background-image: linear-gradient(-236deg, rgba(18, 35, 122, 0.27) 0%, rgba(29, 245, 125, 0.27) 100%);
                    }
                    </style>
                </head>

* Image loader as URL

  \$ yarn add url-loader -D

            And now you can import and use them in css or js

            - index.css

                html {
                    background-image: url('./lupa.png');
                }

            - index.js

                import lupaImg from './lupa.png';

                console.log('image: ', lupaImg); // it will be fully embedded in the js file as a base hex64 content

                class Image extends Component {
                    render() {
                        const image = <img src={lupaImg}></img>;
                        return image;
                    }
                }

            - webpack config

- File loader

  \$ yarn add file-loader -D

- Image loader - image-webpack-loader - use url-loader instead

  \$ yarn add image-webpack-loader -D

  I want to add an image locally


    Webpack won't know what to do with our image

- Managing assets
- Adding ...

# Watch files

Add a watcher to re-compile when you modify any file

        "scripts": {
            "build:watch": "webpack -d --watch"
        },

it will rebuild and regenerate the bundle each time a file changes

## code splitting

# Updated example 07/02/2021

```
// path is a node module to resolve paths ...
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, './dist');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.js'),
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({ title: 'Development', template: './public/index.html' }),
    new Dotenv({
      path: './.dev.env',
    }),
    new CopyPlugin({ patterns: [{ from: 'public/img-test', to: 'img-test' }] }),

  ],
  module: {
    rules: [
      // lint the code when building
      {
        enforce: 'pre', // run before babel
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      // anything js or jsx runs through babel
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      // Thus, this rule chain the output of sass-loader to css-loader and then that result to style-loader.
      // css-loader will take this css output of sass-loader and will also process any
      // other .css files we have in our application and pass on the .css to style-loader,
      // which will then do the job of putting the css codes inside <style> tags in our index.html
      {
        test: /\.(s*)css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  // order of resolution for the extensions when requiring modules like require('./App')
  // will look for App.js, App.jsx, App.json
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].[contenthash].js',
  },
  devtool: 'inline-source-map',
  devServer: { // creates dist files on the fly, on memory
    port: 8082,
    contentBase: BUILD_DIR,
    writeToDisk: true, // write dev server dist files to memory AND disk to check whats being served.
    // hot: true,
  },

  // wherever you run webpack is the context directory
  context: __dirname,

  // source maps strategy, source maps are used for debugging, if not present,
  // when debugging js code in the browser, it will show me the eval'd non human readable
  // code. Needed to debiug code in the browser.
  devtool: 'cheap-source-map',

  // report to you when you are building
  stats: {
    colors: true,
    reasons: true,
  },
};
```