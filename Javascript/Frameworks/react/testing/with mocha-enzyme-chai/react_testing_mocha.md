# react testing
- mocha: testing framework
- enzyme: DOM helper
- chai: assertion library



test_helper.js needs:
- jquery
- react-addons-test-utils
- chai
- jsdom
- chai-jquery
- babel-preset-es2015
- babel-preset-stage-2
- babel-core ?
- es2015 ?

npm i --save-dev babel-preset-es2015 jquery react-addons-test-utils jsdom chai chai-jquery react-redux redux redux-thunk


Issues with jsdom?
--------------------------
if you get:

var document = jsdom.jsdom(html, options)
TypeError: jsdom.jsdom is not a function

downgrade to "jsdom": "9.12.0"

-----------------------------

configure Babel ...
--------------------
Create a file in the prj root dir called .babelrc with this content:
> .babelrc
{
  "presets": ["react", "es2015", "stage-2"]
}

Ignoring styles while testing
------------------------------
If you test a component that imports a css file, it will crash the test as
mocha uses babel it treats the imported css as a JS file.


There is a babel/register style hook to ignore style imports:

https://www.npmjs.com/package/ignore-styles

Install it:

npm install --save-dev ignore-styles

Run tests without styles:

mocha --require ignore-styles

NOTE
------------
We import "expect" but not "describe" and "it". How does react resolve those names?

'Describe' and 'It' are made available on global context thanks to mocha, and set in the test running process context by webpack when running the test npm script.
Under scripts, you'll see that "test" uses mocha. This is why we don't have to import "describe" or "it". They are part of mocha. 'expect', however, is used for our test assertions and it is part of chai. This is why we have to import 'expect'.

The most important keywords for mocha are:
- describe
- it
- expect

// Use 'describe' to group together similar tests
describe('testDescriptionOrName') --> e.g. describe('App')

// Use 'it' to test a single attribute of a target
// 'It' blocks try to make an assertion about a very particular fact about the testing subject
it(testPurposeDesc)
e.g. it('should show the correct text')

// Use 'expect' to make a single assertion about a target (the thing we are testing, App)
e.g. expect(component).to.exist;


eg.

describe('App' , () => {

  it('shows the correct text', () => {

    expect(component).to.exist;

  });

});

----------------------------------------------------------------------------------------------------------------------------------------

The purpose of wrapping all the tests specs in a function (an arrow func), as the second argument in the describe function,
is to safely run them by mocha without stopping when one fails.

so:

describe('desc', ()=> {

  it('should ...', ()=>{
    expect( ... );
  })

  it('should ...', ()=>{
    expect( ... );
  })

  it('should ...', ()=>{
    expect( ... );
  })

})



test it
------------
npm run test:watch

TDD Approach
=============

SPEC DRIVEN DESIGN - MOCKUP
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Define feature and what you care about it - Feature MOCKUP
------------------------------------------------------------

// We have a footer. It has some product specs. WE test on those specs,
// we are worried about the final product, the html, leaving unit testing
// behind for a minute, our tests are flexible, focus on functions, end results,
// not on how they are done, leaving some room for refactoring.

// It has three main parts:
//  - The Legal Bit
//  - Links to 6 more data like T&Cs o Contact Us ...
//  - 5 Social media icons with links (Facebook, Twitter, Google plus,
//    Instagram, YouTube)

// What do we care about it
// - That the legal bit button works and display the needed info
// - That the data links are properly spelled, styled and work opening the
//    corresponding new screen
// - That the social media links are properly set up (correct image, style)
//    and the link works opening the corresponding new screen.


Test setup
--------------

VERY important
---------------
For each test we want to make sure we have a fresh version of the component to work with. so, we need to CREATE a new component EVERY time we run a spec, an 'it' function.
You must be careful about polluting other specs.  We are redefining 'component' in the 'beforeEach', but if you want to make sure that its always
cleaned up you can add in an 'afterEach' like so:

afterEach(() => {
  component = null;
});

--------------------

describe('FooterBarComponent', function() {

  // const component = renderComponent(FooterBarComponent); // WRONG, CANT REUSE RENDERED COMPONENT, need to use a BeforeEach mocha testing lyfecycle method

  beforeEach(() => {
    const component = renderComponent(FooterBarComponent);
  });

  it('has links', () => {
    expect(component.find('ul.links')).to.exist;
  });

  it('has a global-footer-bar class', () => {
    expect(component).to.have.class('global-footer-bar');
  });

  it('has a Legal Bit link', () => {
    expect(component.find('a#legal-bit')).to.exist;
  });

  afterEach(() => {
    component = null;
  });

});






Side note - just to be clear, Mocha doesn't run any tests in parallel out of the box.



