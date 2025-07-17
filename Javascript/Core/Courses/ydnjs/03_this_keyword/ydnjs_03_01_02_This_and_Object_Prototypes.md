 ----------------------------
 This & Object Prototypes
 ----------------------------

Chapter 1: this Or That?
Chapter 2: this All Makes Sense Now!
Chapter 3: Objects
Chapter 4: Mixing (Up) "Class" Objects
Chapter 5: Prototypes
Chapter 6: Behavior Delegation
Appendix A: ES6 class

----------------------------------------------------------------------------------------------

 ----------------------------
 Chapter 1: this Or That?
 ----------------------------
"this" is NOT:
- a reference to the container function

see:
-----------
function foo(num) {
	console.log( "foo: " + num );

	// keep track of how many times `foo` is called
	this.count++;
}

foo.count = 0;

var i;

for (i=0; i<10; i++) {
	if (i > 5) {
		foo( i );
	}
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9

// how many times was `foo` called?
console.log( foo.count ); // 0 -- WTF?

When the code executes foo.count = 0, indeed it's 
adding a property count to the function object foo.
Rememeber functions are objects, foo doesnt have a prop called count, so when you set a inexsitent property, JS creates it.
but the "this" inside the foo cfunction is NOT pointing to that function/object, and so even though the property names are the same "count", the root objects (foo function object and ... this is the global context) are different, and confusion ensues.

as "this" is the global context when you do this.count we are actually, again, creating a property, it does  Right lookup in the function scope, and is not there, it doeas a R lookup in the global scope and is not there, so it creates a global variable in the global scope.
Remeber if using "strict mode" you cant do that, will complain about using count and not being defined anywhere.



HACK around
-------------
Create another global object to hold the data ...

function foo(num) {
	console.log( "foo: " + num );

	// keep track of how many times `foo` is called
	data.count++;
}

var data = {
	count: 0
};

var i;

for (i=0; i<10; i++) {
	if (i > 5) {
		foo( i );
	}
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9

// how many times was `foo` called?
console.log( data.count ); // 4

Falling back to lexical scope because we dont understand how to use "this"....


To reference a function object from inside itself, "this" by itself will typically be insufficient. You generally need a reference to the function object via a lexical identifier (variable) that points at it.

function foo() {
	foo.count = 4; // `foo` refers to itself
}

setTimeout( function(){
	// anonymous function (no name), cannot
	// refer to itself
}, 10 );


SOOOO. What is THIS?
------------------------
When a function is invoked, an activation record, otherwise known as an execution context, is created.
This record contains information about:
- Where the function was called from (the call-stack)
- How the function was invoked
- What parameters were passed, etc. 

One of the properties of this record is the "this" reference which will be used for the duration of that function's execution.

Review
----------------

"this" binding is a constant source of confusion for the JavaScript developer who does not take the time to learn how the mechanism actually works.

To learn this, you first have to learn what "this" is not.
This is neither a reference to the function itself, nor is it a reference to the function's lexical scope.

"this" is actually a binding that is made when a function is invoked, and what it references is determined entirely by the call-site where the function is called.




----------------------------------------------
Chapter 2: this All Makes Sense Now!
----------------------------------------------
"this" is a binding made for each function invocation, based entirely on its call-site (how the function is called).

The location in code where a function is called (not where it's declared)

But it's not always that easy, as certain coding patterns can obscure the true call-site.

The call-site we care about is in the invocation before the currently executing function.

The caller

Another way of seeing the call-stack is using a debugger tool in your browser. 

---------------------
Rules for binding
---------------------

Default binding
---------------------

function foo() {
	console.log( this.a );
}

var a = 2;

foo(); // 2

Note: variables declared in the global scope (var a = 2), are synonymous with global-object properties of the same name (this.a)

Secondly, we see that when foo() is called, "this.a" resolves to our global variable "a".
Why? Because in this case, the default binding for this applies to the function call, and so points this at the global object.

foo() is called with a plain, un-decorated function reference.
None of the other rules we will demonstrate will apply here, so the default binding applies instead.

the global object is only eligible for the default binding if the contents of foo() are not running in strict mode; 
function foo() {
	"use strict";
	console.log( this.a );
}

-----------------------------
Implicit Binding
-----------------------------
When there is a context object for a function reference, the implicit binding rule says that it's that object which should be used for the function call's this binding.

function foo() {
	console.log( this.a );
}

var obj = {
	a: 2,
	foo: foo
};

obj.foo(); // 2

Because obj is the this for the foo() call, this.a is synonymous with obj.a

Only the top/last level of an object property reference chain matters to the call-site. For instance:

function foo() {
	console.log( this.a );
}

var obj2 = {
	a: 42,
	foo: foo
};

var obj1 = {
	a: 2,
	obj2: obj2
};

obj1.obj2.foo(); // 42


Implicitly Lost
------------------
One of the most common frustrations that this binding creates is when an implicitly bound function loses that binding, which usually means it falls back to the default binding, of either the global object or undefined, depending on strict mode.

function foo() {
	console.log( this.a );
}

var obj = {
	a: 2,
	foo: foo
};

var bar = obj.foo; // function reference/alias!, obj will be jumped.

var a = "oops, global"; // `a` also property on global object

bar(); // "oops, global"

Even though bar appears to be a reference to obj.foo, in fact, it's really just another reference to foo itself. 

Moreover, the call-site is what matters, and the call-site is bar(), which is a plain, un-decorated call and thus the default binding applies.


The more subtle, more common, and more unexpected way this occurs is when we consider passing a callback function:

1 function foo() {
2 	console.log( this.a );
3 }
4
5 function doFoo(fn) {
6	// `fn` is just another reference to `foo`
7
8	fn(); // <-- call-site!
9 }
10
11 var obj = {
12		a: 2,
13		foo: foo
14 };

var a = "oops, global"; // `a` also property on global object

doFoo( obj.foo ); // "oops, global"

REMEMBER: as per viewed in previous chapters, PARAMETER PASSING is an implicit assignment, so we are actually doing fn = obj.foo IN LINE 5.

If the function you are using to pass a callback function is a built-in fcn? not your own as doFoo()?
same result:

function foo() {
	console.log( this.a );
}

var obj = {
	a: 2,
	foo: foo
};

var a = "oops, global"; // `a` also property on global object

setTimeout( obj.foo, 100 ); // "oops, global"

It's quite common that our function callbacks lose their this binding, as we've just seen. 
But another way that this can surprise us is when the function we've passed our callback to intentionally changes the this for the call. 

Event handlers in popular JavaScript libraries are quite fond of forcing your callback to have a this which points to, for instance, the DOM element that triggered the event. While that may sometimes be useful, other times it can be downright infuriating. Unfortunately, these tools rarely let you choose.

Either way the this is changed unexpectedly, you are not really in control of how your callback function reference will be executed, so you have no way (yet) of controlling the call-site to give your intended binding. We'll see shortly a way of "fixing" that problem by fixing the this.


-----------------------
Explicit Binding
-----------------------
"All" functions in the language have some utilities available to them (via their [[Prototype]]. Like call(..) and apply(..).

How do these utilities work? They both take, as their first parameter, an object to use for the this, and then invoke the function with that this specified.
Since you are directly stating what you want the this to be, we call it explicit binding.

function foo() {
	console.log( this.a );
}

var obj = {
	a: 2
};

foo.call( obj ); // 2


Invoking foo with explicit binding by foo.call(..) allows us to force its this to be obj.

If you pass a simple primitive value (of type string, boolean, or number) as the this binding, the primitive value is wrapped in its object-form (new String(..), new Boolean(..), or new Number(..), respectively). This is often referred to as "boxing".

Unfortunately, explicit binding alone still doesn't offer any solution to the issue mentioned previously, of a function "losing" its intended this binding, or just having it paved over by a framework, etc.

-----------------------------------------------
So we use HARD BINDING (explicit and secure)
-----------------------------------------------

1  function foo() {
2	 console.log( this.a );
3  }
4
5  var obj = {
6	 a: 2
7  };
8
9  var bar = function() {
10 	foo.call( obj );
11 };
12
13 bar(); // 2
14 setTimeout( bar, 100 ); // 2, whatever the setTimeout function does, it will always call back bar in any form and it will anyway call foo with obj. as it is hardcoded. in line 10
15 
16 // `bar` hard binds `foo`'s `this` to `obj`
17 // so that it cannot be overriden
18 bar.call( window ); // 2 - even though we explicitly set bar with "window" the 

No matter how you later invoke the function bar (line 18, setting window would explicitly override this with window in bar, but as bar is just a wrapper to allow the calling of foo with a fixed/hard this assignment, obj), it will always manually invoke foo with obj.
This binding is both explicit and strong, so we call it hard binding.

The most typical way to wrap a function with a hard binding creates a pass-thru of any arguments passed and any return value received:


Another way to express this pattern is to create a re-usable helper:

function foo(something) {
	console.log( this.a, something );
	return this.a + something;
}

// simple `bind` helper
function bind(fn, obj) {
	return function() {
		return fn.apply( obj, arguments );
	};
}

var obj = {
	a: 2
};

var bar = bind( foo, obj );

var b = bar( 3 ); // 2 3
console.log( b ); // 5


Since hard binding is such a common pattern, it's provided with a built-in utility as of ES5: Function.prototype.bind, and it's used like this:

function foo(something) {
	console.log( this.a, something );
	return this.a + something;
}

var obj = {
	a: 2
};

var bar = foo.bind( obj );

var b = bar( 3 ); // 2 3
console.log( b ); // 5

bind(..) returns a new function that is hard-coded to call the original function with the this context set as you specified.

Note: As of ES6, the hard-bound function produced by bind(..) has a .name property that derives from the original target function. For example: bar = foo.bind(..) should have a bar.name value of "bound foo", which is the function call name that should show up in a stack trace.

API Call "Contexts"
-----------------------
Many libraries' functions, and indeed many new built-in functions in the JavaScript language and host environment, provide an optional parameter, usually called "context", which is designed as a work-around for you not having to use bind(..) to ensure your callback function uses a particular this.

For instance:

function foo(el) {
	console.log( el, this.id );
}

var obj = {
	id: "awesome"
};

// use `obj` as `this` for `foo(..)` calls
[1, 2, 3].forEach( foo, obj ); // 1 awesome  2 awesome  3 awesome


-----------------------------
"new" Binding
-----------------------------
BEWARE: there really is no connection to class-oriented functionality implied by new usage in JS.
In JS constructors are just Functions that happen to be called with the new operator in ftont of them:
	- THEY ARE NOT ATTACHED TO ANY CLASS
	- THEY ARE NOT INSTANTIATING A CLASS
	- THEY ARE NOT SPECIAL TYPE OF FUNCTION

They're just regular functions that are, in essence, hijacked by the use of new in their invocation.

When a function is invoked with new in front of it, otherwise known as a constructor call, the following things are done automatically:

1 - a brand new OBJECT is created (aka, constructed) out of thin air
2 - the newly constructed object is [[Prototype]]-linked
3 - the newly constructed object is set as the this binding for that function call
4 - unless the function returns its own alternate object, the new-invoked function call will automatically return the newly constructed object.

Consider: 
----
function foo(a) {
	this.a = a; // this is bar as defined in step 3
}

var bar = new foo( 2 ); // bar is a new object as defined in step 1/3

console.log( bar.a ); // 2

By calling foo(..) with new in front of it, we've constructed a new object 
and set that new object as the this for the call of foo(..).

-----------------------------------------------------
So, the 4 rules for binding "this" in function calls
-----------------------------------------------------

Now you only have to inspect the call site and inspect it to see which rule applies.

But if the call site, the caller , has many of these rules applied, we need an order.

It should be clear that the default binding is the lowest priority rule of the 4. So we'll just set that one aside. If any of the other applies, then default will be it.

Which is more precedent, implicit binding or explicit binding? Let's test it:

 function foo() {
	console.log( this.a );
 }

var obj1 = {
	a: 2,
	foo: foo
};

var obj2 = {
	a: 3,
	foo: foo
};

(1) obj1.foo(); // 2
obj2.foo(); // 3

(2) obj1.foo.call( obj2 ); // 3
obj2.foo.call( obj1 ); // 2

a) When (1) runs, the "this" in function referenced in obj1 (foo) binds to obj1 as the function is contained in an obj.

b) when executing (2) the same function called with "call" and passed an obj (obj2) , will set "this" to obj2 instead of what is done in a)
Soooo. Explicit has precedence over implicit

------------
Now, we just need to figure out where new binding fits in the precedence.

1  function foo(something) {
2	 this.a = something;
3  }
4
5  var obj1 = {
6	 foo: foo
7  };
8
9  var obj2 = {};
10 
11 obj1.foo( 2 );
12 console.log( obj1.a ); // 2 // implicit in action, in this case var a is created in obj1 by Left look-up

13 obj1.foo.call( obj2, 3 ); // explicit in action, obj2 is set in "this" by call( .. ), in this case var a is created in obj2 by Left look-up

14 console.log( obj2.a ); // 3
15 
16 var bar = new obj1.foo( 4 );
17 console.log( obj1.a ); // 2
18 console.log( bar.a ); // 4


...... 
confusing stuff around here ...
......
THIS PART SHOULD BE RE-VISITED
......



Priority:
------------

hard explicit binding
	No matter how you later invoke the wrapper function (bar), it will always manually invoke the main function (foo) with obj as a explicit bind (this = obj).
	This binding is both explicit and strong, so we call it hard binding.

"new" binding
	By calling foo( .. ) with new in front of it, we've constructed a new object and set that new object as the this for the call of foo(..).

explicit binding
	Using call, bind, etc, to force the binding of a "this" object to a function.

implicit binding
	When there is a context object for a function reference.

default binding
	"this" is set dinamically according to its call-site.


----------------------------------------------------------------------------
----------------------------------------------------------------------------
Determining "this"
----------------

Now, we can summarize the rules for determining this from a function call's call-site, in their order of precedence. 

Ask these questions in this order, and stop when the first rule applies.

1) Is the function called with new (new binding)?
If so, "this" inside foo function is the newly constructed object.

var bar = new foo()

2) Is the function called with call or apply (explicit binding), even hidden inside a bind hard binding? If so, this is the explicitly specified object.

var bar = foo.call( obj2 )

3) Is the function called with a context (implicit binding), otherwise known as an owning or containing object? If so, this is that context object.

var bar = obj1.foo()

4) Otherwise, default the this (default binding).
If in strict mode, pick undefined, otherwise pick the global object.

var bar = foo()

That's it. That's all it takes to understand the rules of this binding for normal function calls. Well... almost.


-------------------------------------------------------------
Ignored this, or setting "this" param to null
----------------------------------------------

If you pass null or undefined as a this binding parameter to call, apply, or bind, those values are effectively ignored, and instead the default binding rule applies to the invocation.

It's quite common to use apply(..) for spreading out arrays of values as parameters to a function call. Similarly, bind(..) can curry parameters (pre-set values), which can be very helpful.
function foo(a,b) {
	console.log( "a:" + a + ", b:" + b );
}

// spreading out array as parameters
foo.apply( null, [2, 3] ); // a:2, b:3

// currying with `bind(..)`
var bar = foo.bind( null, 2 );
bar( 3 ); // a:2, b:3

Both these utilities require a this binding for the first parameter.
sETTING THIS TO NULL COULD BE A HACK AROUND, BUT IT COULD BE DANGEROUS, if somehow this is references in the function.

Better is a safer emty object for this.
// our DMZ empty object
var emptyObj = Object.create( null );

// spreading out array as parameters
foo.apply( emptyObj, [2, 3] ); // a:2, b:3

// currying with `bind(..)`
var bar = foo.bind( emptyObj, 2 );
bar( 3 ); // a:2, b:3

------------------------------------------
Indirection
------------------------------------------
Be aware of "this" indirection.
Another thing to be aware of is you can (intentionally or not!) create "indirect references" to functions, and in those cases, when that function reference is invoked, the default binding rule also applies.

One of the most common ways that indirect references occur is from an assignment:

function foo() {
	console.log( this.a );
}

var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4 };

o.foo(); // 3
(p.foo = o.foo)(); // 2
The result value of the assignment expression p.foo = o.foo is a reference to just the underlying function object. As such, the effective call-site is just foo(), not p.foo() or o.foo() as you might expect. Per the rules above, the default binding rule applies.
Remeber the rules for "use strict" regarding the function code.

------------------------------------------
Softening Binding
------------------------------------------
The softBind(..) utility provided here works similarly to the built-in ES5 bind(..) utility, except with our soft binding behavior. It wraps the specified function in logic that checks the this at call-time and if it's global or undefined, uses a pre-specified alternate default (obj). Otherwise the this is left untouched.


---------------------------------------
Lexical this
---------------------------------------

Normal functions abide by the 4 rules we just covered.
But ES6 introduces a special kind of function that does not use these rules: arrow-function.

Arrow-functions are signified not by the function keyword, but by the => so called "fat arrow" operator.
Instead of using the four standard this rules, arrow-functions adopt the this binding from the enclosing (function or global) scope.

e.g.

function foo() {
	// return an arrow function
	return (a) => {
		// `this` here is lexically adopted from `foo()`
		console.log( this.a );
	};
}

var obj1 = {
	a: 2
};

var obj2 = {
	a: 3
};

var bar = foo.call( obj1 ); // here, 
// obj1 is explicitly bound to foo "this" which is inherited by the arrow 
// function, so the arrow function "this" = obj1
// then foo returns the arrow function where "this" = obj1

bar.call( obj2 ); // 2, not 3!

// when bar, the arrow function, is called with call, instead of explicitley // setting its "this" to obj2, it still uses obj1 as when created and returned // by foo()


The arrow-function created in foo() lexically captures whatever foo()s this is at its call-time. Since foo() was this-bound to obj1, bar (a reference to the returned arrow-function) will also be this-bound to obj1. The lexical binding of an arrow-function cannot be overridden (even with new!).

While arrow-functions provide an alternative to using bind(..) on a function to ensure its this, which can seem attractive, it's important to note that they essentially are disabling the traditional this mechanism in favor of more widely-understood lexical scoping. 

----------------------------------------------------
Review
----------------------------------------------------
Determining the this binding for an executing function requires finding the direct call-site of that function.

Once examined, four rules can be applied to the call-site, in this order of precedence:

- Called with new? Use the newly constructed object.
- Called with call or apply (or bind)? Use the specified object.
- Called with a context object owning the call? Use that context object.
Default: undefined in strict mode, global object otherwise.

Be careful of accidental/unintentional invoking of the default binding rule. In cases where you want to "safely" ignore a this binding, a "DMZ" object like emptyObject = Object.create(null) is a good placeholder value that protects the global object from unintended side-effects.

Instead of the four standard binding rules, ES6 arrow-functions use lexical scoping for this binding, which means they adopt the "this" binding (whatever it is) from its enclosing function call.
They are essentially a syntactic replacement of self = this in pre-ES6 coding.

