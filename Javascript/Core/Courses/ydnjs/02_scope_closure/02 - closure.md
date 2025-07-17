# Closure (AKA Scope Closure)

Closure is when a function is able to remember and access its lexical scope even when that function is executing outside its lexical
scope.

Let us then consider code which brings closure into full light:

        function foo() {
            var a = 2;

            function bar() {
                console.log( a );
            }

            return bar;
        }

        var baz = foo();

        baz(); // 2 -- Whoa, closure was just observed, man.

The function bar() has lexical scope access to the inner scope of foo().

But then, we take bar(), the function itself, and return it. In this case, we return the function object itself that bar references.

After we execute foo(), we assign the value it returned (our inner bar() function) to a variable called baz, and then we
actually invoke baz(), which of course is invoking our inner function bar(), just by a different identifier reference.

bar() is executed, for sure. But in this case, it's executed OUTSIDE of its declared lexical scope.

After foo() executed, normally we would expect that the entirety of the inner scope of foo() would go away, because we know that the Engine employs a Garbage Collector that comes along and frees up memory once it's no longer in use. Since it would appear that the contents of foo() are no longer in use, it would seem natural that they should be considered gone.

But the "magic" of closures does not let this happen. That inner scope is in fact still "in use", and thus does not go away. Who's using it? The function bar() itself.

By virtue of where it was declared, bar() has a lexical scope closure over that inner scope of foo(), which keeps that scope alive for bar() to reference at any later time.

bar() still has a reference to that scope, and that reference is called closure.

IMPORTANT: The function is being invoked well outside of its author-time lexical scope. 

Closure lets the function continue to access the lexical scope it was defined in at author-time.

Of course, any of the various ways that functions can be passed around as values, and indeed invoked in other locations, are all examples of observing/exercising closure.

Whatever facility we use to transport an inner function outside of its lexical scope, it will maintain a scope reference to where it was originally declared, and wherever we execute it, that closure will be exercised.

# EXAMPLE

    function wait(message) {

        setTimeout( function timer(){
            console.log( message );
        }, 1000 );

    }

    wait( "Hello, closure!" );

We take an inner function (named timer) and pass it to setTimeout(..). But timer has a scope closure over the scope of wait(..),
indeed keeping and using a reference to the variable message.

A thousand milliseconds after we have executed wait(..), and its inner scope should otherwise be long gone, that inner function timer still has closure over that scope.

Deep down in the guts of the Engine, the built-in utility setTimeout(..) has reference to some parameter, probably called fn or func or something like that. Engine goes to invoke that function, which is invoking our inner timer function, and the lexical scope reference is still intact.

Closure.

when you pass in a callback function, get ready to sling some closure around


Not a closure observation
-----------------------
var a = 2;

(function IIFE(){
	console.log( a );
})();

This code "works", but it's not strictly an observation of closure. Why? Because the function (which we named "IIFE" here) is not executed outside its lexical scope. It's still invoked right there in the same scope as it was declared (the enclosing/global scope that also holds a). a is found via normal lexical scope look-up, not really via closure.

The most common canonical example used to illustrate closure involves the humble for-loop.

for (var i=1; i<=5; i++) {
	setTimeout( function timer(){
		console.log( i );
	}, i*1000 );
}

You expect 1, 2, 3, 4, 5
But you will get 5 times "6", one every 1 second.
Why
When the loop finishes i === 6.
When the timer function is called, every 1 second, it will see its scope (closure), do a Right look up, retrieve i from the closure scope, and its value is 6.

What's missing is that we are trying to imply that each iteration of the loop "captures" its own copy of i, at the time of the iteration. But, the way scope works, all 5 of those functions, though they are defined separately in each loop iteration, all are closed over the same shared global scope, which has, in fact, only one i in it.

Put that way, of course all functions share a reference to the same i. Something about the loop structure tends to confuse us into thinking there's something else more sophisticated at work. There is not. There's no difference than if each of the 5 timeout callbacks were just declared one right after the other, with no loop at all.


How to fix this
------------------
for (var i=1; i<=5; i++) {
	(function(){
		var j = i;
		setTimeout( function timer(){
			console.log( j );
		}, j*1000 );
	})();
}

Eureka! It works!

A slight variation some prefer is:

for (var i=1; i<=5; i++) {
	(function(j){
		setTimeout( function timer(){
			console.log( j );
		}, j*1000 );
	})( i );
}

Of course, since these IIFEs 

(function(..){..
	})( );
}

are just functions, we can pass in i, and we can call it j if we prefer, or we can even call it i again. Either way, the code works now.

The use of an IIFE inside each iteration created a new scope for each iteration, which gave our timeout function callbacks the opportunity to close over a new scope for each iteration, one which had a variable with the right per-iteration value in it for us to access.

-----------------------------------------------------------------------------

If we use the "let" declaration, which hijacks a block and declares a variable right there in the block we also can "create" a scope for reach iteration.

It essentially turns a block into a scope that we can close over. So, the following awesome code "just works":

for (var i=1; i<=5; i++) {
	let j = i; // yay, block-scope for closure!
	setTimeout( function timer(){
		console.log( j );
	}, j*1000 );
}

Another special behavior defined for "let" declarations used in the head of a for-loop.
This behavior says that the variable will be declared not just once for the loop, but each iteration. And, it will, helpfully, be initialized at each subsequent iteration with the value from the end of the previous iteration.

for (let i=1; i<=5; i++) {
	setTimeout( function timer(){
		console.log( i );
	}, i*1000 );
}



------------------------------------------------
MODULES and closures
------------------------------------------------

function CoolModule() {
	var something = "cool";
	var another = [1, 2, 3];

	function doSomething() {
		console.log( something );
	}

	function doAnother() {
		console.log( another.join( " ! " ) );
	}

	return {
		doSomething: doSomething,
		doAnother: doAnother
	};
}

var foo = CoolModule();

foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3


This is the pattern in JavaScript we call module. This most common way of implementing the module pattern is often called "Revealing Module"

It's appropriate to think of this object return value as essentially a public API for our module
		doSomething: doSomething,
		doAnother: doAnother

This object return value is ultimately assigned to the outer variable foo, and then we can access those property methods on the API, like foo.doSomething().

When we transport those functions outside of the lexical scope, by way of property references on the object we return, we have now set up a condition by which closure can be observed and exercised.

To state it more simply, there are two "requirements" for the module pattern to be exercised:

1- There must be an outer enclosing function, and it must be invoked at least once (each time creates a new module instance).

2 - The enclosing function must return back at least one inner function, so that this inner function has closure over the private scope, and can access and/or modify that private state.

They fulfill both characteristics of the module pattern I listed above: invoking a function definition wrapper, and keeping its return value as the API for that module.

In other words, modules are just modules, even if you put a friendly wrapper tool on top of them.

ES6 adds first-class syntax support for the concept of modules.
ES6 Module APIs are static (the APIs don't change at run-time)
Each module can both import other modules or specific API members, as well export their own public API members.

bar.js
--------
function hello(who) {
	return "Let me introduce: " + who;
}
export hello;

foo.js
--------
// import only `hello()` from the "bar" module
import hello from "bar";

var hungry = "hippo";

function awesome() {
	console.log(
		hello( hungry ).toUpperCase()
	);
}

export awesome;

main.js
----------
// import the entire "foo" and "bar" modules
module foo from "foo";
module bar from "bar";

console.log(
	bar.hello( "rhino" )
); // Let me introduce: rhino

foo.awesome(); // LET ME INTRODUCE: HIPPO

import imports one or more members from a module's API into the current scope, each to a bound variable (hello in our case). module imports an entire module API to a bound variable (foo, bar in our case). export exports an identifier (variable, function) to the public API for the current module. These operators can be used as many times in a module's definition as is necessary.

The contents inside the module file are treated as if enclosed in a scope closure, just like with the function-closure modules seen earlier.

Review
----------------------------

Closure seems to the un-enlightened like a mystical world set apart inside of JavaScript which only the few bravest souls can reach. But it's actually just a standard and almost obvious fact of how we write code in a lexically scoped environment, where functions are values and can be passed around at will.

Closure is when a function can remember and access its lexical scope even when it's invoked outside its lexical scope.

Closures can trip us up, for instance with loops, if we're not careful to recognize them and how they work. But they are also an immensely powerful tool, enabling patterns like modules in their various forms.

Modules require two key characteristics: 
1) an outer wrapping function being invoked, to create the enclosing scope 
2) the return value of the wrapping function must include reference to at least one inner function that then has closure over the private inner scope of the wrapper.


----------------------------------------------------
Appendix A: Dynamic Scope
----------------------------------------------------
The key characteristic of lexical scope is that it is defined at author-time, when the code is written or declared. It's kinda static scope.

example:
----------------
function foo() {
	console.log( a ); // 2
}

function bar() {
	var a = 3;
	foo();
}

var a = 2;

bar();

In author-time, Lexical scope holds that the RHS reference to a in foo() will be resolved to the global variable "a", which will result in value 2 being output.

Dynamic scope, by contrast, doesn't concern itself with how and where functions and scopes are DECLARED, but rather where they are called from.
In other words, the scope chain is based on the call-stack, not the nesting of scopes in code, static.

So, if JavaScript had dynamic scope, when foo() is executed, theoretically the code below would instead result in 3 as the output.

function foo() {
	console.log( a ); // 3  (not 2!)
}

function bar() {
	var a = 3;
	foo();
}

var a = 2;

bar();


How can this be? Because when foo() cannot resolve the variable reference for a, instead of stepping up the nested (lexical, static, declared) scope chain, it walks up the CALL-STACK, to find where foo() was called from. 
Since foo() was called from bar(), it checks the variables in scope for bar(), and finds an a there with value 3.

The key contrast: lexical scope is write-time, whereas dynamic scope (and this!) are runtime. Lexical scope cares where a function was declared, but dynamic scope cares where a function was called from.

----------------------------------------------------
Appendix B: Polyfilling Block Scope
----------------------------------------------------
Up to ES6, block scopes were only availablr using "with" and "catch" clauses.

But it's ES6's introduction of let that finally gives full, unfettered block-scoping capability to our code. There are many exciting things, both functionally and code-stylistically, that block scope will enable.

ES6
----------

{
	let a = 2;
	console.log( a ); // 2
}

console.log( a ); // ReferenceError

pre ES6
--------------
try{throw 2}catch(a){
	console.log( a ); // 2
}

console.log( a ); // ReferenceError
Weird looking code. We see a try/catch that appears to forcibly throw an error, but the "error" it throws is just a value 2, and then the variable declaration that receives it is in the catch(a) clause

That's right, the catch clause has block-scoping to it, which means it can be used as a polyfill for block scope in pre-ES6 environments.

Tools can transpile ES6 code to work in pre-ES6 environments. You can write code using block-scoping, and benefit from such functionality, and let a build-step tool take care of producing code that will actually work when deployed.

With Traceur
https://github.com/google/traceur-compiler/wiki/Getting-Started
---------------------
{
	try {
		throw undefined;
	} catch (a) {
		a = 2;
		console.log( a );
	}
}

console.log( a );

So, with the use of such tools, we can start taking advantage of block scope regardless of if we are targeting ES6 or not, because try/catch has been around (and worked this way) from ES3 days.

----------------------------------------------------
Appendix C: Lexical-this
----------------------------------------------------
"this" is dynamic by nature.
e.g.

var obj = {
	id: "awesome",
	cool: function coolFn() {
		console.log( this.id );
	}
};

var id = "not awesome";
obj.cool(); // awesome
setTimeout( obj.cool, 100 ); // not awesome

"this" lost the closured scope, "this" is not bind anymore.
There are various ways to address that problem, but one often-repeated solution is var self = this;.

The var self = this "solution" just dispenses with the whole problem of understanding and properly using "this" binding, and instead falls back to something we're perhaps more comfortable with: lexical scope.

"self" becomes just an identifier that can be resolved via lexical scope and closure, and cares not what happened to the this binding along the way.

This could also be fixed by using the arrow function notation
setTimeout( () => { // arrow-function ftw?
				this.count++;
				console.log( "awesome?" );
			}, 100 );

The short explanation is that arrow-functions do not behave at all like normal functions when it comes to their this binding. They discard all the normal rules for this binding, and instead take on the this value of their immediate lexical enclosing scope, whatever it is.

Maybe another way is to embrace "this" as dynamic, not force it into a lexycal "this", and just bind it.

var obj = {
	count: 0,
	cool: function coolFn() {
		if (this.count < 1) {
			setTimeout( function timer(){
				this.count++; // this` is safe because of bind(..)
				console.log( "more awesome" );
			}.bind( this ), 100 ); // look, bind()!
		}
	}
};

obj.cool(); // more awesome




# Closures

comes from Lambda functions

Def: Closure is when a function remembers its lexical scope even when it is executed outside of that lexical scope.


    function foo(){
        var bar = "bar";

        function baz(){
            console.log(bar); // bar is not in baz lexical scope, go fish, but it finds it in its upper bubble scope, foo() scope, which is part of baz() lexical scope.
        }

        bam(baz); // as JS has first class functions, the functions can be passed around, and be executed in different context than its original defined lexical scopes. In this case we are passing a reference to the function baz and taking it OUTSIDE of the function foo()
    }

    function bam(baz){
        baz(); // "bar" // now baz is being executed from another context than its original lexical scope, but still remembers its lexical scope, so it can access the bar variable. It can access its author defined lexical scope, even though it was executd outside of that lexical scope
    }

    foo();

    baz is being executed outside of the bubble it was defined, the bubble of foo(), but still able to access that bubble variables -> that is Closure
    , the fact that its lexical scope is attahced to that function no matter where it is transported, and that scope is NOT A COPY, is the unique an original one.

## Closure examples

### You can return functions from functions

    function foo(){
        var bar = "bar";

    // return anonymous function
        return function(){
            console.log(bar);
        };
    }

    function bam(){
        // get the anon func back, it is transported OUTSIDE of its lexical scope, but when executes, its original scope is still accesible and had "bar" in it, so it can print it. And the ability to access its original scope is Closure
        foo()(); // "bar"
    }

    bam();

### Another example, setTimeout, callbacks

    function foo(){

        var bar = "bar";

        // pass a function into a setTimeout utility, or any kind of callback, tht function is ABLE TO REMEMBER the variables of its lexical scope !!

        setTimeout(function(){
            console.log(bar);
        }, 1000);

    }

    foo();


the setTimeout in the engine executes the callback function after 1000 ms, and when that function is executed is well outside of its lexical scope, but he fucntion still remembers it.
Remember the scope is a ref to the original scope, if you chnage something in the scope, when the callback function is executed it will access the state at that moment, the updated state.
i.e. before 1000 ms, you change the value of bar, that value will be printed.


### Example: handlers

    function foo(){

        var bar = "bar";

        $("#btn").click(function(evt){
            console.log(bar);
        });

    }

    foo();

the click handlers are available to remember something about the lexical environment, thats entirely because of closure
when the user actaully clicks, the function is executed from somehwere different from the foo() bubble, but still remembers the scope and access the bar value


## Closure is a neccesary mechanism for a language  with first-class functions as values, to be useful
If funtions can be passed around as values but could not remember anything about their lexical scope, passing them around would be useless. That passing around is useful beacuse it goes with its scope, because of Closure


### Example: Shared scope


     function foo(){

        var bar = 1;

        setTimeout(function(){
            console.log(++bar);
        }, 1000);


        setTimeout(function(){
            console.log(++bar);
        }, 2000);

    }

    foo(); // 0 1


### When you run a function, it creates a scope object, if there is anybody that has a reference to that scope object
### via closure, that scope does not get garbage collected when that function ends.

    function foo(){

        var bar = 1;

        setTimeout(function(){

            var baz = 2;

            console.log(++bar);

            setTimeout(function(){

                console.log(bar + baz + ' ' + time);

            }, 2000);

        }, 1000);
    }

    foo(); // 2  4

### Example with loops

    for (var i=1; i<=5; i++){
        setTimeout(function(){

            console.log("i: " + 1);

        }, i * 1000);
    } // prints "i: 6" 5 times

the setTimeout functions obviously run after the for loop has ended, so i = 6, and ALL the function calls have a
reference to the SAME closure, which is the for(){} closure, where i is 6 by the time all the timeouts execute.

I DONT HAVE A DIFF i VALUE PER LOOP ITERATION
We have here FIVE diff functions that are enclosing over the same scope

#### how can I fix this
What could I do to this piece of code that would allow it to have a different i for each iteration ?, to have a whole
diff scope for each iteration

1 - use an IIFE
Remember how functions create scope
So if we put an IIFE INSIDE of the loop, each iteration would get its own scope and i value

      for (var i = 1; i <= 5; i++) {
          (function (i) {
                  setTimeout(function () {

                      console.log("i: " + i);

                  }, i * 1000);
              }
          )(i);
      }

2 - use the "let" keyword. loop + block scope
let creates a block scope where it is defined
so in this case, its like having a new scope for each iteration, with a brand new i ++ in each iteration,

    for (let i = 1; i <= 5; i++) {
                   setTimeout(function () {

                       console.log("i: " + i);

                   }, i * 1000);
               }
       }

It binds the "i" not just to the for loop, it's re binding that "i" for each iteration of the for loop
So it will create a brand new i for each iteration.
A polyfill for ES5, will create a try catch block in each iteration, to simulate the let block scope creation.
In ES6 that would be optimized



### Example with objects

    var foo = (function () {

        var o = {bar: "bar"};

        return {obj: o};

    })();

    console.log(foo.obj.bar); // "bar"

so finally I have foo = {obj: o}
and outside of the function I am able to access something from inside of the function

BUT THIS IS NOT CLOSURE, as there is no function being transported outside of its original lexical scope and
executed elsewhere.
This code is just returning an OBJECT that has a prop that points to another OBJECT that has a "bar" prop with the
"bar value".
By definition this is not Closure, it is object referencing.



Closure: when a FUNCTION remembers its lexical scope even if it is not EXECUTED in its lexical scope

# Using Closure

## classic module pattern
IIFE is the other common pattern where Closure is useful.

The other most common is the classic module pattern, which has two must have characteristics:

- there has to be an outer wrapping function that gets executed, not neccesarily has to be an IIFE, like the example,
but it has to be an outer function and
has to get executed

- one or more inner functions (i.e. in an object) have to be returned from that outer function called, that will have
a closure over that private outer function inner scope


    var foo = (function () {

        var o = {bar: "bar"}; // module internal state

        return {
            bar: function(){
                console.log(o.bar);
            } // object representing the module public API , that will have closure over the internal state
        };

    })();

    foo.bar();

    console.log(foo.obj.bar); // "bar"

  CONS: no reference to the returning object

  The Object that is returned, ends up in foo.

  All the stuff declared inside the foo function definition is like private members of a module definition, and the
  returned object is like the public API, which has access, by Closure, to the internal module state.

  Based on the OOP idea of encapsulation, keeping the impl details hidden, based on the principle of least privilege /
  least exposure

### Variation: return a named object

      var foo = (function () {

        var state = {pepe: "fdfd"};

        var publicAPI = {

            bar: function(){
                publicAPI.baz(); // referencing the API
            },

            baz: function(){
                console.log("baz");
            }
        };

        publicAPI.newMethod = function aNewMethodForTHeAPI(){
           console.log(state.pepe);
        } // modifying the API

        return publicAPI;

      })();

      foo.bar();// "baz"
      foo.newMethod();// "fdfd"

Stilisticaly, helps to identify publicAPI in the inner code of the wrapper function -> helps to keep track of public
vs private

Functionally, you can modify the API at runtime, INSIDE YOUR module, keeping a reference to the object you can add/remove methods at
runtime, BECAUSE both foo and publicAPI will be references to the same object.

So you could do ?? no funciona ...




### modern module pattern

    define("foo", function () {

        var o = {bar: "bar"};

        return {
            bar: function () {
                console.log(o.bar);
            }
        }

    })

Looks like how module loaders, and require, works.
It takes a name and a function that returns an API, and object with function props.
- It does not need the execution of the function and assigns it to the variable named as the first param, THAT IS THE
PART the library does for you.

## Another variation for using Closure to define modules: ES6 module pattern
We don't have to code the wrapping function, we can do it in a cleaner way.
- Its file based
- It treats the content of the file as the returning function, but we dont have to write it and its going to have its own
scope
- Instead of "return" we use the "export" keyword
- you can use "Export" many times and all will be added to tha public API for that module


> foo.js

    var o = { bar : "bar"};

    export function bar(){
        return o.bar;
    }

### and you can import it in two ways.

    import bar from "foo";
    bar(); // "bar"

Allows to import one or many members of the API/Module as first class things

or

    module foo from "foo";
    foo.bar(); // "bar"

Imports the whole API/Module as a traditional object reference, this option probably has been rejected in ES6, @TODO double check



# Quiz

- What is a closure and how it is created?
Its a function that remembers its lexical scope when called from somewhere else than the defined lexical scope.
Its created when an inner function is transported outside if the outer function

- How long does its scope stay around?
A closure is like a reference to a hidden scope object, As long as there are functions using it, it will

- Why doesn't a function callback inside a loop behave as expected? How do we fix it?
because in each iteration there was not a variable being created, all iterations were SHARING the same scope, not scope
was being created in each iteration - fixed with IIFE or let keyword to create function or let block scope

- How do you use Closure to create and encapsulated module? what are the benefits of that approach?
    1 - create a wrapper function
    2 - return one or more inner function/s, preferably named functions, that could be contained in an object, and those
     returned functions will have closure over the wrapper function scope

    Benefits? Encapsulation, hiding stuff, principle of least exposure
    Cons?
        - Having hidden functions makes them not easy to test, but you can test the public API ... its about opinions.
        - When you create  amodule many times you make lots of copies of the same functionality.

# Excercise


## Instructions

   1. In this exercise, you will modify existing code for a simple note taking app. You will not add/remove
   functionality per se, but instead organize the code into a more proper module design and make it more
   flexible/reusable.

   2. Using what you learned about closure and the module pattern, modify your previous code to wrap all the
   functionality up into a simple object (call it "NotesManager" or something appropriate), with a simple API,
   consisting of:
     - an `init()` method, which you will call from the outside when jQuery's `document.ready` event is fired,
     and pass in the data from the "database".
     - a public method to add in notes "in bulk" after retrieval from the "database". hint: this can/should be
     called **before** you run the "init" method.

   3. Make sure you have a "private" storage of the `notes` data list inside your module. Why is it a good idea to keep
   the data "private" inside the module?

   4. What do you notice about the structure of this code as it relates to the DOM access and the usage of jQuery?
   Would it make sense to "generalize" this code so that the module didn't have hardcoded into it the various DOM
   elements it would operate on? Explore how you would modify the code in this fashion. What are the benefits and
   tradeoffs?


## initial code

    // assume this data came from the database
    var notes = [
        "This is the first note I've taken!",
        "Now is the time for all good men to come to the aid of their country.",
        "The quick brown fox jumped over the moon."
    ];

    function addNote(note) {
        $("#notes").prepend(
            $("<a href='#'></a>")
            .addClass("note")
            .text(note)
        );
    }

    function addCurrentNote() {
        var current_note = $("#note").val();

        if (current_note) {
            notes.push(current_note);
            addNote(current_note);
            $("#note").val("");
        }
    }

    function showHelp() {
        $("#help").show();

        document.addEventListener("click",function __handler__(evt){
            evt.preventDefault();
            evt.stopPropagation();
            evt.stopImmediatePropagation();

            document.removeEventListener("click",__handler__,true);
            hideHelp();
        },true);
    }

    function hideHelp() {
        $("#help").hide();
    }



### refactored into a module


    var NotesManager = (function NotesModule() {

        var notes = [];

        function addNote(note) {
            $("#notes").prepend(
                $("<a href='#'></a>")
                    .addClass("note")
                    .text(note)
            );
        }

        function addCurrentNote() {
            var current_note = $("#note").val();

            if (current_note) {
                notes.push(current_note);
                addNote(current_note);
                $("#note").val("");
            }
        }

        function showHelp() {
            $("#help").show();

            document.addEventListener("click", function __handler__(evt) {
                evt.preventDefault();
                evt.stopPropagation();
                evt.stopImmediatePropagation();

                document.removeEventListener("click", __handler__, true);
                hideHelp();
            }, true);
        }

        function hideHelp() {
            $("#help").hide();
        }

        function handleOpenHelp(evt) {
            if (!$("#help").is(":visible")) {
                evt.preventDefault();
                evt.stopPropagation();

                showHelp();
            }
        }

        function handleAddNote(evt) {
            addCurrentNote();
        }

        function handleEnter(evt) {
            if (evt.which == 13) {
                addCurrentNote();
            }
        }

        function handleDocumentClick(evt) {
            $("#notes").removeClass("active");
            $("#notes").children(".note").removeClass("highlighted");
        }

        function handleNoteClick(evt) {
            evt.preventDefault();
            evt.stopPropagation();

            $("#notes").addClass("active");
            $("#notes").children(".note").removeClass("highlighted");
            $(evt.target).addClass("highlighted");
        }

        function init() {
            // build the initial list from the existing `notes` data
            var html = "";
            for (i = 0; i < notes.length; i++) {
                html += "<a href='#' class='note'>" + notes[i] + "</a>";
            }
            $("#notes").html(html);

            // listen to "help" button
            $("#open_help").bind("click", handleOpenHelp);

            // listen to "add" button
            $("#add_note").bind("click", handleAddNote);

            // listen for <enter> in text box
            $("#new_note").bind("keypress", handleEnter);

            // listen for clicks outside the notes box
            $(document).bind("click", handleDocumentClick);

            // listen for clicks on note elements
            $("#notes").on("click", ".note", handleNoteClick);
        }

        function loadData(data) {
            notes.concat(data);
        }

        var publicAPI = {
            init: init,
            loadData: loadData
        }
        return publicAPI
    })();


    // assume this data came from the database
    var notes = [
        "This is the first note I've taken!",
        "Now is the time for all good men to come to the aid of their country.",
        "The quick brown fox jumped over the moon."
    ];

    NotesManager.loadData(notes);

    $(document).ready(NotesManager.init());


We used an IIFE because we only wanted one module, if you want more modules ...
You can remove the IIFE, use the factory and create many instances
Like:

    function NotesModule() {
        ...
    }

    var notesManager1 = NotesModule();
    var notesManager2 = NotesModule();

    notesManager1.loadData(notes);

So modules don't require an IIFE, but in many cases you create a module and only create it once. Singleton pattern.

### replacing the DOM dependencies, references.


    $("#notes").html(html);

replace with JQuery

Convention, not requirement, put $ sign in front of variables that have JQuery references

    var NotesManager = (function () {

        function addNote(note) {
            $domRefs.notes.prepend(
                $("<a href='#'></a>")
                    .addClass("note")
                    .text(note)
            );
        }

        function addCurrentNote() {
            var current_note = $new_note.val();

            if (current_note) {
                notes.push(current_note);
                addNote(current_note);
                $domRefs.new_note.val("");
            }
        }

        function showHelp() {
            $domRefs.help.show();

            document.addEventListener("click", function __handler__(evt) {
                evt.preventDefault();
                evt.stopPropagation();
                evt.stopImmediatePropagation();

                document.removeEventListener("click", __handler__, true);
                hideHelp();
            }, true);
        }

        function hideHelp() {
            $domRefs.help.hide();
        }

        function handleOpenHelp(evt) {
            if (!$domRefs.help.is(":visible")) {
                evt.preventDefault();
                evt.stopPropagation();

                showHelp();
            }
        }

        function handleAddNote(evt) {
            addCurrentNote();
        }

        function handleEnter(evt) {
            if (evt.which == 13) {
                addCurrentNote();
            }
        }

        function handleDocumentClick(evt) {
            $domRefs.notes.removeClass("active");
            $domRefs.notes.children(".note").removeClass("highlighted");
        }

        function handleNoteClick(evt) {
            evt.preventDefault();
            evt.stopPropagation();

            $domRefs.notes.addClass("active");
            $domRefs.notes.children(".note").removeClass("highlighted");
            $(evt.target).addClass("highlighted");
        }

        function loadData(data) {
            for (var i = 0; i < data.length; i++) {
                notes.push(data[i]);
            }
        }

        function init(domRefs) {
            // cache references to the DOM elements we need to manage
            $domRefs = domRefs;

            // build the initial list from the existing `notes` data
            var html = "";
            for (i = 0; i < notes.length; i++) {
                html += "<a href='#' class='note'>" + notes[i] + "</a>";
            }
            $domRefs.notes.html(html);

            // listen to "help" button
            $domRefs.open_help.bind("click", handleOpenHelp);

            // listen to "add" button
            $domRefs.add_note.bind("click", handleAddNote);

            // listen for <enter> in text box
            $domRefs.new_note.bind("keypress", handleEnter);

            // listen for clicks outside the notes box
            $domRefs.doc.bind("click", handleDocumentClick);

            // listen for clicks on note elements
            $domRefs.notes.on("click", ".note", handleNoteClick);
        }


        var
            // private `notes` data
            notes = [],

            // DOM refs
            $domRefs,

            // module API
            publicAPI = {
                loadData: loadData,
                init: init
            }
        ;

        return publicAPI;
    })();


    // assume this data came from the database
    NotesManager.loadData([
        "This is the first note I've taken!",
        "Now is the time for all good men to come to the aid of their country.",
        "The quick brown fox jumped over the moon."
    ]);


    $(document).ready(function () {
        NotesManager.init({
            doc: $(document),
            notes: $("#notes"),
            new_note: $("#note"),
            add_note: $("#add_note"),
            help: $("#help"),
            open_help: $("#open_help")
        });
    });


We have to use a function to defer the execution when on ready

    $(document).ready(function(){});

If we just pass the desired object, the code inside the ready params will be executed straight away and we want ot wait
till is ready

    $(document).ready(
        NotesManager.init({
            doc: $(document),
            ...
    });
