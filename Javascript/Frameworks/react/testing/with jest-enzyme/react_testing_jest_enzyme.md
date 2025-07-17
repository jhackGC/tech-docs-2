# React testing with jest - enzyme

- jest: testing framework currently based on jasmine
- enzyme: advanced renderer that helps with node navigation and search.

# Types of test

Unit test: black box test of a component

- it has inputs, props or stores injected.
- it has outputs:
  - render results
  - interfaces interaction (e.g. API calls)
  - interaction with other components (e.g. children components)

When you test unit a component you test the public API, so you mock the inputs (props, shared state), and check for the outputs to be what you want, for that you may need to check:

- mock API calls to external interfaces
- check for props passed to children comps
- check for rendered items or html markup

You try NOT TO test the internal behavior or state of the component (methods, internal state), as it will couple your test to the inner workings of the components, and turn it into a white box testing.

With enzyme, the best is to always use shallow render, and dive in case you need to render something down the tree. That shows that you understand the components tree, by knowing how to navigate it.
Do not use mount as it will render the whole tree and render/execute coponents that you dont already want to test.

E2E tests: treat the app as a black box as a user perspective , and verify the estate of the app

# config

## Jest and Babel

npm install --save-dev jest

// add script
"test" : "jest",

Babel
transpiles ES6+ to ES5

if you find this error "unexpected token import"

In your config you should have configured Babel to transpile everything to ES5 except imports statements, why?

# jest config

Jest can work with enzyme, install them as dev.

Install all:

npm install -D jest enzyme enzyme-adapter-react-16

It also needs to be configured in every test.
To avoid repeating that code in each test, can be solved by setting this in webpack.

    "setupTestFrameworkScriptFile": "<rootDir>/configuration/jest.config.js",

and creating a file that has the functions to execute so it will be run in every test.

    // jest.config.js

    import { configure } from "enzyme";
    import Adapter from "enzyme-adapter-react-16";

    configure({ adapter: new Adapter() });

# Final webpack config

"jest": {
"setupTestFrameworkScriptFile": "<rootDir>/configuration/jest.config.js",
"testURL": "http://localhost/",
"moduleNameMapper": {
"\\.(css|less)$": "identity-obj-proxy"
}
},

# Basic testing

Just Jest - React DOM to render

test('It should have items', () => {
const container = document.createElement('div');
ReactDOM.render(<ItemList items={[]} />, container);
console.log(container.innerHTML);
expect(container.innerHTML).toBe('no items');
})

This tests the layout or style, not the user oriented output

To make it less strict but focused on the actual values, not layout, do:

expect(container.textContent).toMatch('no items');

//another test
test('Renders the given items', () => {
const container = document.createElement('div');
ReactDOM.render(<ItemList items={['apple', 'orange', 'pear']} />, container);
expect(container.textContent).toMatch('apple');
expect(container.textContent).toMatch('orange');
expect(container.textContent).toMatch('pear');
})

if you want to checj the layout use snapshot testing.

# Snapshot testing with Jest

# IMPORTANT

always use shallow as it does not render the whole tree, and makes the test hard to maintain.
Unit tests: Shallow only
Integration tests between (e.g. vertical test): Shallow with dive() and find() - NOT MOUNT
E2E test: Selenium or Cypress (better)

Separate reference data from dynamic data, ref data could be good to be put in the context, and dynam ic in the redux store

Do not use React Context con observe de mobx, they clash, as observe runs componentShouldUpdate

JEST only accepts variables called with mockSomething

# Mobx: Passing stores to components

In general there are three ways in which you can pass stores in MobX

- Explicitly via props. Easy to test and clear to follow, but can become clumpsy when you have deeply nested structures or many stores (you can solve the latter by having a store for stores)

- Import stores in the components directly and just use them :) It's the MVP of passing stores around, but stand alone testing of components becomes tricky quickly as you have to make sure your global stores are in the right state first

- Pass stores around via React's context mechanism. Redux's Provider uses that, as does the mobx-connect package. Context is passed implicitly and deep component can extract data out of the context, but it is still easy to test as you only have to make sure you set up some context before testing the component.

Your current solution is a combination of 2. and 3., like mobx-connect and redux provider you use a HoC, but it grabs the stores from the the global state instead of the context. So the principle is fine, but if you would use context in your HoC to grab the stores from, you will discover that your components are easier to test. I am considering to provide a standardized Provider in the mobx-react package as well that uses context to pass stores (or anything you like) around.

see @inject in mobx-react package

## mocking module imports or dependencies ...

// Mock ThemeProvider to get tests working with enzyme
// There is a bug which should be resolved in the next weeks:
// https://webcache.googleusercontent.com/search?q=cache:wJc584JVxWQJ:https://github.com/airbnb/enzyme/issues/1647
// https://webcache.googleusercontent.com/search?q=cache:W7JbIVBQeAIJ:https://github.com/airbnb/enzyme/issues/1509
jest.mock('../../context/app-context', () => ({
AppContext: {
Provider: ({ children }) => children
}
}));
import { AppContext } from "../../context/app-context";

import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';

// mock external modules dependencies
jest.mock('react-native-splash-screen', () => ({
hide: () => 'mock result',
}));

test('snapshot is ok', () => {
const elem = renderer.create(<App />);
expect(elem.toJSON()).toMatchSnapshot();
});

test('App is enabled', () => {
const elem = renderer.create(<App />);
const instance = elem.getInstance();
expect(instance.state.appEnabled).toBe(true);
});

// it('renders correctly', () => {
// const elem = renderer.create(<App />);
// expect(elem.toJSON()).toMatchSnapshot();
// });





        