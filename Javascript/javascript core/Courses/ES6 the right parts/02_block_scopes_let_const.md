# let vs var

let: cant be re-declared, creates scope where its declared.
var: can be re-declared (ignores the following declarations, gets hoisted), does not creates scope where its declared.
follow normal lexical scope rules


    //swap numbers
    function foo(x, y) {
        if (x > y) {
            var tmp = x;
            x = y;
            y = tmp;
        }

        console.log('tmp outside if: ', tmp);
    }

    foo(8, 4);

The var keyword is attaching a tmp variable to the scope of foo, it is hoisted at compile time to the scope of
foo, it will be available everywhere inside foo(...)'s scope.

It does not "stay" in the if statement, that is just a stylistic clue to the reader to understand what is your intention
, but technically it is hoisted and available to the foo() scope
that's why you can do a console.log(tmp) outside of the is statement.

Same here in a for statement


    function bar(x) {
        for (var i = 0; i < x; i++) {
            //..
            console.log('i inside: ', i);
        }

        console.log('i outside: ', i);
    }

    bar(8);

With the "let" keyword we create a scope where its defined, so we enforce what we stylistically are saying.

You still can use var in the context where it syntactically doe snot need to create context, scope. So, probably you
don't really need to replace all your vars with lets, only were it is necessary to do what it was created to do,
create scope.

## Where to use them
var: You can use them where you think you need to use it in many scopes
let: You can use them where you think you need to use it in the defined scope only

### declaring in scopes: try - catch

with let we have issues when enclosing them in blocks, like

    function foo(x, y) {

        try {
            let z = x * 2;
        } catch (err) {
            console.log(z);
        }

        console.log(z); // compilation error -> not defined
    }

    foo(8, 4);

workaround: define outside the let, but you loose readability as the declaration is separated from the first usage of
the variable, could be 1000 lines
You wont find z straight away, and you will have to scan the code to dind it and understand any curly braces to be sure
that it is in the right scope.

    function foo(x, y) {
        let z;
        ...
        ...
        ...


        try {
            z = x * 2;
        } catch (err) {
            console.log(z);
        }

        console.log(z); // compilation error -> not defined
    }

    foo(8, 4);


So, if your variable is used in two very diff places in the code, it might be helpful to declare it twice.
But the reader may think that is used for the first time, in both cases, could be confusing

### declaring in scopes: "if" statements

the let vars get "trapped" in the if statements
the if blocks are not really blocks for this purpose, they are vars conditionally set

    function foo(x) {
        if (x > 5) {
            let w = 1;
            let r = 2;
        } else if (x > 3) {
            let w = 3;
            let r = 4;
        }

        console.log(x);
        console.log(w, r); // error
    }

    foo(8);

with vars is better, like automatically declared outside by hoisting

// with vars

    function foo(x) {
        if (x > 5) {
            var w = 1;
            var r = 2;
        } else if (x > 3) {
            var w = 3;
            var r = 4;
        }

        console.log(x);
        console.log(w, r);
    }

// after compilation hoisting

    function foo(x) {
        var w;
        var r;

        if (x > 5) {
            w = 1;
            r = 2;
        } else if (x > 3) {
            w = 3;
            r = 4;
        }

        console.log(x);
        console.log(w, r);
    }

### declaring in scopes: "for" statements
In this case, when dealing with callbacks ana closures,  the let keyword makes more sense



    function foo(x, y) {
        for (var i = 0; i < 5; i++) {
            $("#btn" + i).click(
                function () {
                    console.log(" button " + i + " clicked !");
                }
            )
        }
    }

or

    function foo() {
        for (var i = 0; i < 5; i++) {

            setTimeout(
                function () {
                    console.log(" value of i is " + i);
                }, 2000);
        }
    }

    foo(); // will print "value of i is 5" five times.

var i in the for loop, is shareable among scopes, so, by closure, by inner functions like the click callback.

As the callback functions are executed later that the finalisation of the foo execution, triggered by an event or
cron, like setTimeout.

When the foo function ends, the value of var i is 6, and, as it is a shareable variable that belongs to the foo scope,
it will be later accessed by closing functions, like all the click callbacks. All they al will print 6.

We dont want that, we want each callback to print the corresponding value of i when the callback function was created.

So we use the let keyword to create a new block scope every time the for loop runs, and in each scope, i will have the
loop iteration value, and keep it, then each iteration callback function will have closure on that scope, and will
access i with the "saved" value in the scope.


    function foo() {
        for (let i = 0; i < 5; i++) {
            setTimeout(
                function () {
                    console.log(" value of i is " + i);
                }, 2000);
        }
    }

    foo();
    // value of i is 0
    // value of i is 1
    // value of i is 2
    // value of i is 3
    // value of i is 4

So block scopes can be useful with closures in the for loops.


The let declaration is an implicit way of creating scope, as it "hijacks" an existing if or for loop and turns it into
a block of scope. If you have  big block and wan tot now if that is a scope, you have to scan the code to find let keywords.

There is another way, an explicit way, called block form of let.

    let (x=2){
        // ...
    }

    function foo(x, y){
        if (x>y){
            let (x=2){
                // ...
            }
        }

    }

For the sake of less brain squash and readability maybe is better to use block explicit lets, that denotes clearly
the block scope of the let declared variable.


But this was rejected, so a workaroudn to make an explicit block variable is just wrap it in {}

    function foo(x, y){
        if (x>y){
            {
                let x = 2;
                // ...
            }
        }

    }


### TDZ errors, Temporary Dead Zone

with let, if you do:

     console.log(x); // error, x not defined
     let x = 2;

with var

    console.log(x); // not error, x will be hoisted, se tot undefined, and in this like it will just show its value of
    // "undefined"
    var x = 2;



## Summary for let
Probably is better ot use explicit blocks with let, to save your brain some squash figuring out how the let keywords are creating
implicit blocks


# "const" keyword
Block scoped declarator.
Keeps you from reassigning the var
Immutable reference, has nothing to do with the value.

    const x = 3;

the value is not immutable as I can do:

    const x = [1,2,3];
    x[0] = 43;

it could be confusing to readers if used as:

    const x = [1,2,3];

    foo(x);

Looks like x value, the array, is immutable, but it's not.

If you want to make then final, at a shallow level, use Object.freeze().
Less confusion potential

    var x = Object.freeze([1,2,3]);

## when to use it?
To define real constants with primitive values.


    const PI = 3.1416;

it could be against you

    // the array will exist in memory until there are no references to it by closure ...
    function foo() {
        const x = [1, 2, 3]; // imagine this array is huge ...
        $("#btn").click(function () {
            console.log(x[0]);
            // x = null; // normal solution to let it be garbage collected, but cant re-assign a const !!!
            x.length = 0; // as it is an array, you can set the length to 0 to clear it, release it.
            // but if it is an object you have to go thru all its props and clear them !!!

        });
    }

# exercise 1
refactor this code , use const and lets where neccesary, so it prints true


    var x = 2;fns = [];

    (function () {
        var x = 5;

        for (let i = 0; i < x; i++) {
            // ... adds functions here
            console.log(i);
            fns[i] = function () {
                console.log('i in function: ', i);

                return i;
            };
        }

    })();

    console.log(
        (x * 2) === fns[x * 2]()
    );

    // true

x is a constant
fns is variable as we are going to modify it
the IIFE is just there to create a context for x = 5, so it does not shadow x = 2, but we can use a block and const to
create that scope.

result

    const x = 2;
    var fns = [];

    {
        const x = 5;

        for (let i = 0; i < x; i++) {
            fns[i] = function num() {
                return i;
            };
        }
    }


    console.log(
        (x * 2) === fns[x * 2]()
    ); // true


