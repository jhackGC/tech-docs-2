# Setup Typescript in Node

https://www.typescriptlang.org/docs/handbook/react-&-webpack.html

        $ yarn add -D webpack webpack-cli

        $ yarn add -D @types/react @types/react-dom

        $ yarn add -D typescript ts-loader source-map-loader

        $ yarn global add tslint typescript tslint-react

## tsconfig

        {
            "compilerOptions": {
                "outDir": "./build/",
                "sourceMap": true,
                "noImplicitAny": true,
                "module": "commonjs",
                "target": "es6",
                "jsx": "react",
                "esModuleInterop": true
            }
        }

## webpack

        // path is a node module to resolve paths ...
        const path = require('path');
        const HtmlWebPackPlugin = require('html-webpack-plugin');
        const Dotenv = require('dotenv-webpack');
        const { CleanWebpackPlugin } = require('clean-webpack-plugin');

        module.exports = {
            mode: 'development',

            // wherever you run webpack is the context directory
            context: __dirname,

            // front door of the project, everything is going to be included out from here
            // entry: './src/index.js',

            // source maps strategy, source maps are used for debugging, if not present,
            // when debugging js code in the browser, it will show me the eval'd non human readable
            // code.
            // Enable sourcemaps for debugging webpack's output.
            devtool: 'source-map',

            // dist files and dir
            output: {
                path: path.resolve(__dirname, 'build'),
                filename: '[name].[contenthash].js',
                publicPath: '/',
            },

            // order of resolution for the extensions when requiring modules like require('./App')
            // will look for App.js, App.jsx, App.json
            resolve: {
                extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
            },

            // report to you when you are building
            stats: {
                colors: true,
                reasons: true,
                chunks: true,
            },

            // rules to apply loaders to your code, tool that webpack is going to use in some fashion.
            module: {
                rules: [
                    // lint the code when building
                    {
                        enforce: 'pre', // run before babel
                        test: /\.jsx?$/,
                        loader: 'eslint-loader',
                        exclude: /node_modules/,
                    },
                    // anything js or jsx runs through babel loader
                    {
                        test: /\.jsx?$/,
                        loader: 'babel-loader',
                        exclude: /node_modules/,
                    },
                    // anything ts or tsx runs through typescript loader
                    {
                        test: /\.ts(x?)$/,
                        exclude: /node_modules/,
                        use: [
                            {
                                loader: 'ts-loader',
                            },
                        ],
                    },
                    // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                    {
                        enforce: 'pre',
                        test: /\.js$/,
                        loader: 'source-map-loader',
                    },
                    // Thus, this rule chain the output of sass-loader to css-loader.
                    // css-loader will take this css output of sass-loader and will also process any
                    // other .css files we have in our application and pass on the .css to style-loader,
                    // which will then do the job of putting the css codes inside <style> tags in our index.html
                    {
                        test: /\.(s*)css$/,
                        use: ['style-loader', 'css-loader', 'sass-loader'],
                    },
                    {
                        test: /\.html$/,
                        loader: 'html-loader',
                    },
                ],
            },

            plugins: [
                new CleanWebpackPlugin(),

                new HtmlWebPackPlugin({
                    template: './public/index.html',
                    filename: 'index.html',
                    favicon: 'public/favicon.ico',
                }),
                new Dotenv({
                    path: './env/.env.development',
                }),
            ],

            devServer: {
                port: 8083,
                contentBase: './build',
            },
        };

## Usage

In typeScript you should install @types/react and while extending the React.Component you need to specify the props and state types. Here is the example

        import * as React from 'react'

        interface Props {
            ... // your props validation
        }

        interface State {
            ... // state types
        }

        class FormExample extends React.Component<Props, State> {... }

## Typing stuff around

### Interfaces and Types for Props and State

We can apply interfaces and types for our props and state of our components.

#### Defining interfaces

Applying an interface to components will force us to adhere to such data structures when passing props into a component, ensuring that they are all accounted for while also stopping unwanted props to be passed down.

Interfaces can be defined outside of a component or imported from a separate file.

Define an interface like so:

        interface FormProps {
            first_name: string;
            last_name: string;
            age: number;
            agreetoterms?: boolean;
        }

Here I have created a FormProps interface consisting of a few values.

agreetoterms is optional, hence the ? after the name.

We can also apply an interface for state:

        interface FormState {
            submitted?: boolean;
            full_name: string;
            age: number;
        }

Note: Tslint used to prompt us to use a capital i in front of all our interface names, e.g. IFormProps and IFormState would be the above names. However, it is no longer enforced by default.

#### Applying interfaces to components

We can apply interfaces to both class components and stateless function components.

For class components we utilise angle bracket syntax to apply our props and state interfaces respectively:

        export class MyForm extends React.Component<FormProps, FormState> {
            ...
        }

Note: In the event you have no props but would like to define state, you can place either {} or object in place of FormProps. Both values are valid empty objects. - NOT SURE ABOUT THIS ...

And with function components we can pass our props interface, followed by any other arguments and their specific interfaces:

        function MyForm(props: FormProps) {
            ...
        }

#### Importing interfaces

Defining groups of interface definitions in one file is good practice; a common convention is to create a src/types/ folder with groups of your interfaces:

        // src/types/index.tsx

        export interface FormProps {
            first_name: string;
            last_name: string;
            age: number;
            agreetoterms?: boolean;
        }

And to import your needed interfaces into your component files:

        // src/components/MyForm.tsx

        import React from 'react';
        import { StoreState } from '../types/index';
            ...

#### Working with enums

Enums are another useful feature of Typescript. Lets say I wanted to define an enum for the MyForm component, and then check whether the submitted form value is valid:

        // define enum
        enum HeardFrom {
            SEARCH_ENGINE = "Search Engine",
            FRIEND = "Friend",
            OTHER = "Other"
        }

        //construct heardFrom array
        let heardFrom = [
            HeardFrom.SEARCH_ENGINE,
            HeardFrom.FRIEND,
            HeardFrom.OTHER
        ];

        //get submitted form value
        const submitted_heardFrom = form.values.heardFrom;

        //check if value is valid
        heardFrom.includes(submitted_heardFrom)
            ? valid = true
            : valid = false;

#### Working with iterables

We can also loop through iterables using for…of and for…in methods in Typescript.

These two methods have one key difference:

    Looping using for…of will return a list of values being iterated.

    Looping using for…in will return a list of keys being iterated.

        for (let i in heardFrom) {
            console.log(i); // "0", "1", "2",
        }


        for (let i of heardFrom) {
            console.log(i); // "Search Engine", "Friend", "Other"
        }

#### Typing Events

In the event (no pun intended) you wish to type events, such as onChange or onClick events, utilise your syntax tools to obtain the exact event you need.

Consider the following example, where we update our state every time a name input is changed.

By hovering your mouse over handleChange(), we can see clearly that the event type is indeed React.ChangeEvent<HTMLInputElement>:

Hovering over handleChange() to obtain the event type

This type is then used when typing the e argument in our handleChange function definition.

I have also typed the name and value objects of e with the following syntax:

    const {name, value}: {name: string; value: string;} = e.target;

If you do not know what types an object specifies, then you can simply use the any type.
We could have done this here:

    const {name, value}: any = e.target;

## typescript + react + redux

https://medium.com/@rossbulat/how-to-use-typescript-with-react-and-redux-a118b1e02b76

### Step 1: Typing the Store

Firstly, we will want to define an interface for our Redux store.

Defining the expected state structure will be beneficial for your team and aid in maintaining the expected app state.

This can be done within the /src/types/index.tsx file we discussed earlier.

Here is an example that deals with locality and authentication:

    // src/types/index.tsx

    export interface MyStore {
        language: string;
        country: string;
        auth: {
            authenticated: boolean;
            username?: string;
        };
    }

### Step 2: Defining action types and actions

Action types can be defined using a const & type pattern.
We will firstly want to define the action types within a src/constants/index.tsx file:

        // src/constants/index.tsx

        export const SET_LANGUAGE = 'INCREMENT_ENTHUSIASM';
        export type SET_LANGUAGE = typeof SET_LANGUAGE;
        export const SET_COUNTRY = 'SET_COUNTRY';
        export type SET_COUNTRY = typeof SET_COUNTRY;
        export const AUTHENTICATE = 'AUTHENTICATE';
        export type AUTHENTICATE = typeof AUTHENTICATE;

Notice how the constants we just defined are used as an interface type and as a string literal, which we will utilise next.

These const & type objects can now be imported into your src/actions/index.tsx file, where we can define action interfaces and the actions themselves, and typing them along the way:

        // src/actions/index.tsx
        import * as constants from '../constants';

        //define action interfaces
        export interface SetLanguage {
            type: constants.SET_LANGUAGE;
            language: string;
        }

        export interface SetCountry {
            type: constants.SET_COUNTRY;
            country: string;
        }

        export interface Authenticate{
            type: constants.AUTHENTICATE;
            username: string;
            pw: string;
        }

        //define actions
        export function setLanguage(l: string): SetLanguage ({
            type: constants.SET_LANGUAGE,
            language: l
        });

        export function setCountry(c: string): SetCountry ({
            type: constants.SET_COUNTRY,
            country: c
        });

        export function authenticate(u: string, pw: string): Authenticate ({
            type: constants.SET_COUNTRY,
            username: u,
            pw: pw
        });

Check out the authenticate action in particular here — we are passing a username and password, both of which are of type string, into the function.

The return value is also typed, in this case as Authenticate.

Within the Authenticate interface we are also including the expected username and pw values for the action to be valid.

### Step 3: Defining Reducers

To simplify the process of specifying an action type within a reducer, we can take advantage of union types, introduced in Typescript 1.4.

A union type gives us the ability to combine 2 more more types into one type.

Back in our actions file, add a union type for locality under our interfaces:

    // src/actions/index.tsx

    export type Locality = SetLanguage | SetCountry;

Now we can apply this Locality type to our locality reducer action, in bold text below:

        // src/reducers/index.tsx
        import { Locality } from '../actions';
        import { StoreState } from '../types/index';
        import { SET_LANGUAGE, SET_COUNTRY, AUTHENTICATE} from '../constants/index';

        export function locality(state: StoreState, action: Locality): StoreState {

            switch (action.type) {
                case SET_LANGUAGE:
                    return return { ...state, language: action.language};
                case SET_COUNTRY:
                    return { ...state, language: action.country};
                case AUTHENTICATE:
                    return {
                        ...state,
                        auth: {
                            username: action.username,
                            authenticated: true
                        }
                    };
            }

            return state;

        }

This reducer is relatively straight forward, but nonetheless fully typed:

This reducer, named locality, is typing our state as StoreState, and the expected action as a Locality type.

The reducer will return a StoreState object, if only just the original state in the event no actions are matched.

Our constant & type pairs are being utilised here too, as a means to switch between actions.

### Step 4: Creating the initial Store

Now within your index.tsx we can initiate the store, utilising angle brackets again to pass the type in conjunction with createStore():

        // src/index.tsx
        import { createStore } from 'redux';
        import { locality } from './reducers/index';
        import { StoreState } from './types/index';

        const store = createStore<StoreState>(locality, {
            language: 'British (English)',
            country: 'United Kingdom',
            auth: {
                authenticated: false
            }
        });

We are almost done — this covers most of our Redux integration.

Let’s also visit mapStateToProps and mapDispatchToProps to cater for your container components.

### Mapping State and Dispatch

Within mapStateToProps, remember to map the state argument with StoreState.

The second argument, ownProps, can also be typed with a props interface:
// mapStateToProps example
import { StoreState } from '../types/index';
interface LocalityProps = {
country: string;
language: string;
}

function mapStateToProps (state: StoreState, ownProps: LocalityProps) ({
language: state.language,
country: state.country,
});

mapDispatchToProps is slightly different; we are utilising angle brackets again to pass an interface into the Dispatch method. Then, as expected, the return block dispatches our Locality type actions:

        // mapDispatchToProps example

        const mapDispatchToProps = {
            actions.setLanguage,
            actions.setCountry
        }

Note: As we are wrapping these actions within connect(), it is not required to wrap our actions within dispatch(). We can also emit the parameters of our actions here.

Lastly, we can connect the two to our presentation component:

        export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);

### Troubleshooting

#### ERROR: TS2769: No overload matches this call.

ERROR in /Users/javierh/Documents/dev/\_prd/breeze/breeze-cms-front/src/App.tsx
./src/App.tsx
[tsl] ERROR in /Users/javierh/Documents/dev/\_prd/breeze/breeze-cms-front/src/App.tsx(26,27)
TS2769: No overload matches this call.
Overload 1 of 2, '(props: Readonly<ProviderProps<Action>>): Provider<Action>', gave the following error.
Property '[Symbol.observable]' is missing in type 'Store<{ data: object; serverStatus: string; }, Action> & { dispatch: unknown; }' but required in type 'Store<any, Action>'.
Overload 2 of 2, '(props: ProviderProps<Action>, context?: any): Provider<Action>', gave the following error.
Type 'Store<{ data: object; serverStatus: string; }, Action> & { dispatch: unknown; }' is not assignable to type 'Store<any, Action>'.

- https://stackoverflow.com/questions/56961024/property-symbol-observable-is-missing-in-type-storeapplicationstate-but

- Solution: update redux to latest

#### ERROR: Argument of type 'typeof PagesScreen' is not assignable to parameter of type 'ComponentType<never>'.

        Argument of type 'typeof PagesScreen' is not assignable to parameter of type 'ComponentType<never>'.
        Type 'typeof PagesScreen' is not assignable to type 'ComponentClass<never, any>'.
            Types of property 'contextType' are incompatible.
            Type 'React.Context<any>' is not assignable to type 'import("/Users/javierh/Documents/dev/_prd/breeze/breeze-cms-front/node_modules/@types/react-router/node_modules/@types/react/index").Context<any>'.
                Types of property 'Provider' are incompatible.
                Type 'React.ProviderExoticComponent<React.ProviderProps<any>>' is not assignable to type 'import("/Users/javierh/Documents/dev/_prd/breeze/breeze-cms-front/node_modules/@types/react-router/node_modules/@types/react/index").ProviderExoticComponent<import("/Users/javierh/Documents/dev/_prd/breeze/breeze-cms-front/node_modules/@types/react-router/node_modules/@types/react/index").ProviderProps<any>>'.
                    Types of property 'propTypes' are incompatible.
                    Type 'WeakValidationMap<ProviderProps<any>>' is not assignable to type 'ValidationMap<ProviderProps<any>>'.
                        Property 'value' is optional in type 'WeakValidationMap<ProviderProps<any>>' but required in type 'ValidationMap<ProviderProps<any>>'.ts(2345)
        Peek Problem
        No quick fixes available

This issue seems to be related with the upgrde of these pckg types in Typescript

        "@types/react"
        "@types/react-dom"
        "typescript"

If you use the latest as of 6/9/2019, they break the TS compilation

        "@types/react": "^16.9.2", // BREAKS TS
        "@types/react-dom": "^16.9.0",
        "typescript": "^3.6.2",

I can confirm that tthese versions dont brake TS

        "@types/react": "16.0.38", // DO NOT UPGRADE THIS ONE
        "@types/react-dom": "16.0.4", // NOT SURE ABOUT THIS ONE ...

Followed this and found that they have a fixed version for this pkg "@types/react": "16.0.38"

https://codesandbox.io/s/w02m7jm3q7

#### Avoid Issues when migrating from ES6 to TS

When migrating form ES6 to TS, Remember to remove all the transpiling done before with babel and the checks with eslint, and replace it ONLY with ts related stuff like loader: 'ts-loader', or ts-lint.
TS loader will do the traspiling directly from TS to ES5.

- remove the babel-loader from the webpack loaders, just leave the ts-loader to transpile

e.g. update: add tsx extension

        rules: [
            // lint JSX the code when building
            {
                enforce: 'pre', // run before babel
                test: /\.jsx?$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
            },

            // lint TSX the code when building
            {
                enforce: 'pre', // run before babel
                test: /\.ts(x?)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
            },

e.g. remove:

            // anything js or jsx runs through babel
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },

- remove any package related babel from package.json
Babel can also be used to transpile Typescript, however the market standard is to use the official Microsoft package.

e.g.

        "@babel/core": "^7.1.2",
        "@babel/plugin-proposal-class-properties": "^7.1.0",
        "@babel/preset-env": "^7.1.0",
        "@babel/preset-react": "^7.0.0",
        "babel-eslint": "^10.0.1",
        "babel-loader": "^8.0.4",

        "eslint": "^5.3.0",
        "eslint-config-prettier": "^2.9.0",
        "eslint-loader": "^2.1.0",
        "eslint-plugin-prettier": "^2.6.2",
        "eslint-plugin-react": "^7.11.1",

remove .babelrc from the project as they won't be needed anymore ...

- ATTENTION
  TSLint is migrating to ESLint
  https://github.com/typescript-eslint/typescript-eslint

Now, configure ESLint to run with TypeScript
https://github.com/typescript-eslint/typescript-eslint

"@typescript-eslint/eslint-plugin": "^2.1.0",
"@typescript-eslint/parser": "^2.1.0",
