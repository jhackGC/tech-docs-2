# Lambdas and Webpack

One of the major challenges when working with AWS Lambda is bundling all your node_modules into one zip file.

Most simple examples rely on zipping up the entirety of ./node_modules, but that doesn't scale well if you're looking to built a suite of Lambda functions as opposed to a single "Hello, World" example. In this article, I'll demonstrate the problem with zipping up Lambda functions yourself and show you how to use Webpack to bundle a Lambda function that connects to MongoDB.

http://thecodebarbarian.com/bundling-a-node-js-function-for-aws-lambda-with-webpack.html

https://github.com/serverless-heaven/serverless-webpack#example-with-babel

https://medium.com/a-man-with-no-server/deploying-a-serverless-application-using-webpack-and-babel-to-support-es2015-to-aws-2f61cff8bafb

Packages that will help us with the task:

**serverless**: a framework for creation of serverless applications

**serverless-offline**: a plugin for serverless framework that emulates the environment in order to spin up the application locally

**serverless-webpack**: a plugin for serverless to work together with webpack. lib that connects sls with webpack

**webpack**: packager used for transforming ES6 syntax into one supported by node vX

**webpack-node-externals**: ???

Now if you will use es6+

**babel-loader**: es6+ transpiler webpack loader
**@babel/cli**: es6+ transpiler executable cli
**@babel/core**: es6+ transpiler lib
**@babel/preset-env**: es6+ transpiler definitions for es6+

    $ npm install serverless serverless-offline serverless-webpack webpack webpack-node-externals babel-loader @babel/core @babel/preset-env --save-dev

## install serverless-webpack

    $ npm install serverless-webpack --save-dev

Add the plugin to your serverless.yml file:

        plugins:
          - serverless-webpack

## create babel file

create .babelrc file
you want to reference @babel/preset-env (which is for 7.x).

    {
      "presets": ["@babel/preset-env"]
    }

## create webpack.config.js file

    var nodeExternals = require('webpack-node-externals')

    module.exports = {
      entry: './handler.js', // your handler file
      # eventually you can use serverless-webpack -> slsw.lib.entries to auto generate entries based on our functions defined in serverless.yml
      target: 'node',
      output: {
          libraryTarget: 'commonjs',
          path: '.webpack',
          filename: 'handler.js', // this should match the first part of function handler in serverless.yml
      },
      module: {
          loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ["babel-loader"]
            }
          ]
      }
    };

Note we are importing a dependency "webpack-node-externals", and we’re putting it in the externals section of our file.

First, install it

    $ npm install webpack-node-externals --save

This will prevent Webpack from bundling dependencies in node_modules like AWS, which are already included in AWS Lambda. (this is not quite clear ??)

However, we do want a few dependencies to be bundled.

To control what is bundled and what is not, the serverless-webpack plugin leverages our package.json file to do this filtering: everything in dependencies will be bundled. Everything in devDependencies wont.
