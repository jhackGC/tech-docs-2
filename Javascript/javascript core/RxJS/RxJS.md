# RxJs

## installation

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
    
ts-loader is a tool tht we installed, see package.json, it is a webpack plug in, that knows how to use the typescript compiler to process a ts file (as defined in --> test: /.ts$/ ), like main.ts, when it finished with the file and covnerted it to JS, webpack takes the resulting JS and bundles it in the app.js

it bundles our code as well as all the RxJs code that we need and other libraries.

How webpack should resolve modules, and what are the file extensions that webpack should be looking at:




add a line in package.json to make this tools easier to use, npm scripts.