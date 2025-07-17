---
title: JavaScript Scope & Variable Visibility
layout: clean
---

# Scope

Where to look for variables, lexical identifiers.
JS is compiled every single time that is run.
Compiler will run at least 3 times:

- Initial pass thru the code to compile it, tokenize it, syntax check
- one more pass, probably to identify members
- another pass to execute it

## Compiler runs thru the code and put vars in scopes

The compiler will look for this blocks of scope, in the current ES5 spec, the smallest block of scope is a function.

```javascript
var foo = "bar";

function bar() {
  var foo = "baz";
}

function baz(foo) {
  foo = "bam";
  bam = "yay";
}
```

Compiler will find declarations of vars and functions and put them in the correct scope slot.

In terms of syntax this is a single statement:

```javascript
var foo = "bar";
```

- foo is declared, in what scope? the global

For the compiler these are 2 entirely separated operations, that happen at totally different times:

- declaration operation, which will be picked up at the identifying pass of the compiler
- assignment operation

Compiling function scope, bar function scope

- bar function is declared, in what scope? the global

```javascript
function bar() {
  var foo = "baz";
}
```

recursively descent into the function and compile its contents.

- foo is declared, in what scope? the function

- baz function is declared, in what scope? the global

```javascript
function baz(foo) {
  foo = "bam";
  bam = "yay";
}
```

- foo local var (param) is declared, in what scope? the function, a name parameter is treated like a local variable
- foo local var is assigned

we are done compiling the program for the purposes of scope resolution

remember:

- if you repeat the var foo declaration many times, it does not matter as the compiler already has that declared and do not re-declares it. so its ignored, and the variables won't be "overridden" at runtime
- if the case is for a function, it will override it

## Now the code is run

- in the run phase:
  - there are not var anymore, the first line will be read as `foo = "bar";`
    if you find many var foo, only one will be taken into account in compilation time.

## LHS and RHS of an assignment, the equals operator

```javascript
foo = "bar";
```

- foo LHS
- "bar" RHS

but there are many ways of assignment that don't have an equal sign so the correct definition would be:

- **LHS**: target
- **RHS**: source

compiler asks scope manager if the LHS ref is in the current execution scope, i.e. global scope

if a LHS var is not found in the scope it bubbles up in the scopes, i.e. goes to the global, if it can't be found at the global level, **IT CREATES ONE** in the **GLOBAL** scope, just because it was a LHS reference (non-strict mode)

so here,

```javascript
function baz(foo) {
  foo = "bam";
  bam = "yay";
}
```

we are assigning "yay" to a **GLOBAL** var called bam

This is called **LEAKAGE OF GLOBAL VARIABLES**

**undeclared** (not declared) <> **undefined** (might have been declared, with a var keyword, but is not initialized)

"undefined" is a value in the specs, is a type with just one value

## Exercise

### Compiling phase

```javascript
var foo = "bar"; // var foo registered on global scope

function bar() {
  // function bar registered in the global scope, name and contents
  var foo = "baz"; // var foo registered on bar scope

  function baz(foo) {
    // function baz registered in the bar scope, name and contents, named param foo declared too in this scope
    foo = "bam";
    bam = "yay"; // var bam registered on baz scope
  }
  baz();
}

bar();
foo; // "bar"
bam; // "yay"
baz();
```

### Runtime - functions and var declarations compiled away

```javascript
foo = "bar"; // LHS of foo in the global scope

bar(); // RHS of bar in the global scope, why RHS because is not an LHS !, there is not an assignment, the
// bar reference is not being assigned, its being USED
// get the value of it, which is a function object, and the parentheses will ATTEMPT to execute it
foo; // "bar"
bam; // "yay"
baz(); // RHS of baz in the global scope, NOT FOUND, REFERENCE ERROR, can't create a baz function from thin air as it can't even see it ... it exists but was not registered in the scope where it wants to be run
```

### Execution of function bar

```javascript
function bar() {
  foo = "baz"; // LHS var foo in the bar scope, and it finds it.
  baz(); // RHS baz var in the bar scope, and finds it, its value is a function object, and executes its content
}
```

### Execution of function baz

```javascript
function baz(foo) {
  foo = "bam"; // LHS var foo in the baz scope, and it finds it in the baz scope, as a local param and sets its value
  bam = "yay"; // LHS var foo in the baz scope, and it DOES NOT find it in the baz scope, goes up to
  // the bar scope, not found, and goes global and creates one and sets its value
}
```

local var with the same name as a global one, is **SHADOWING** the global var

# Function declarations and function expressions

```javascript
1  var foo = function bar(){
2      var foo = "baz";
3
4      function baz(foo){
5          foo = bar;
6          foo; // function ...
7      }
8      baz();
9  };
10
11 foo();
12 bar(); // Error!
```

line 1 is a func declaration or expression? **expression**
to be a declaration, to declare it in the current existing scope, the keyword function has to be the first word in the statement.
It can be named, like bar, but it is not declared in the scope as it is an expression.
it is declared in its own scope, so we can reference it inside itself, but not outside, that is why line 12 is error and why it can be used to be assigned to another variable like in line 5

line 4 is a function declaration, so it is bound to the scope where it is defined (the bar function scope)

- **named**: `function bar()`
- **anon**: `function()`

## Function expression can be used as anonymous functions expressions

## Named vs Anonymous function expressions

**Named are good**

**Anon cons:**

- inside the function there is no way to refer to ourselves, the anon function can do a self reference
  - i.e. recursion, binding things. Remember the "this" keyword is NOT a reference to yourself
- prod code errors won't show the place it happened, they are not useful when debugging, as it says anon function ...
- it does not document itself, as you have to research the big picture to understand what the function does

## try/catch block scopes

the catch block is a block and has its scope, anything defined there belongs to that scope
err only exists in the catch block scope

```javascript
var foo;

try {
  foo.length;
} catch (err) {
  console.log(err); // TypeError
}

console.log(err); // ReferenceError
```

# Nested scope

## Lexical and Dynamic scopes

**Lexical**, parsing stage called lexing, meaning compile time scope. All the scoping decisions are defined in the compile time and stays like that.
They are nested, bubble each other

## cheating the compile time scope: eval()

the eval function receives a string and treats it as if it is code

```javascript
var bar = "bar";

function foo(str) {
  eval(str); // cheating
  console.log(bar); // 42
}

foo("var bar = 42;");
```

the function foo does not have "bar" variable declared ... but by using eval we dynamically **MODIFIED** its existing lexical scope of function foo, we added a new declaration at runtime.
Using eval makes the execution slower, can't assume scopes anymore, so it does not optimize at all at compile time. and runs slower.
Just by having the eval function present, it has to disable some of the optimizations.

in **STRICT mode** it creates a **NEW** scope for the eval code, but does not **MODIFY** the existing ones (invalidating them), therefore running faster while having eval

setTimeout with a string param will use eval, because it has to run that code, with a function reference it won't.

## cheating the compile time scope: with()

```javascript
var obj = {
  a: 2,
  b: 3,
  c: 4,
};

obj.a = obj.b + obj.c;
obj.c = obj.b + obj.a;

with (obj) {
  a = b + c;
  c = b - a;
  d = 3; // ??, asks the scope of with statement (obj), do you have a var called d? no, go fish, and then goes to the global and asks for a LHS ref for d, and not I haven't, and CREATES a new one !!
}

obj.d; // undefined
d; // 3 -- ooops !
```

with is used to de-structure the object and access its members without the obj. reference preceding them
the compiler treat the with statement as a lexical scope

SO its so easy to leak globals when using with() ... that don't use it
eval() modifies the lexical scope.
the with() creates a whole new lexical scope at runtime, so it kills your scoping assumptions when writing the code and disables optimizations too. In strict mode the with() function is just disallowed

# IIFE pattern - Immediately Invoked Function Expression

useful use of functions and scopes

```javascript
1   var foo = "foo";
2
3   (function myIIFE(){
4       var foo = "foo2";
5       console.log(foo); // "foo2"
6   })();
7
8   console.log(foo); // "foo"
```

I want to hide in a new scope lines 4 and 5, so as the function is the smaller unit of scope, I need to create one somewhere, and that's how I get a new block of scope around my code.
I could have used a named function and then just call it. But the problem with that is that I am creating, or leaking out, a ref name (named function) in the global scope. which is not the idea as I want to hide stuff, not to pollute the existing scope
With the enclosing parenthesis we avoid declaring it, and then with the outer parenthesis it executes it. That's the IIFE pattern.
Anyway we should name it to avoid anon functions issues.

It does not fit as a lexical identifier, is an immediate value

## passing params to an IIFE function

all inside the IIFE becomes private, not able to be seen from outside its scope

```javascript
1   var foo = "foo";
2
3   (function myIIFE(bar){
4       var foo = bar;
5       console.log(foo); // "foo"
6   })(foo);
7
8   console.log(foo); // "foo"
```

another example using the global object to make obvious in my code that I refer to the global scope

```javascript
1   var foo = "foo";
2
3   (function myIIFE(global){
4       var foo = global.foo;
5       console.log('from myIIFE: ', foo); // "foo"
6   })(window);
7
8   console.log('from global scope: ', foo); // "foo"
```

same if you want to guarantee that the jQuery $ dollar sign is the jQuery object, in case it collides with another framework

```javascript
1   var foo = "foo";
2
3   (function myIIFE(global, $){
4       var foo = global.foo;
5       console.log('from myIIFE: ', foo); // "foo"
6   })(window, jQuery);
7
8   console.log('from global scope: ', foo); // "foo"
```

So the IIFE pattern allows of to manually pass in an alias variable form the enclosing scope

# ES6 block scope with the keyword "let"

when we use it with a identifier we attach that variable to the block where it resides, instead of the enclosing function scope.
this is called implicit block scoping

i.e. using var

```javascript
1 function foo(){
2       var bar = "bar";
3       for (var i=0; i<bar.length; i++ ){
4           console.log(bar.charAt(i));
5       }
6       console.log(i) // "3"
7   }
8   foo();
```

when using var, the i variable gets leaked to the function scope, so it prints "3"

when using let, the i variable stays in the block scope where it has been defined, so it fails at the function scope

```javascript
1 function foo(){
2       var bar = "bar";
3       for (let i=0; i<bar.length; i++ ){
4           console.log(bar.charAt(i));
5       }
6       console.log(i) // ReferenceError
7   }
8   foo();
```

## Issues with the let keyword

- it does not **HOIST**, it becomes available where its defined, so put them at the top of the block.
  vars are
- extra mental effort to follow the let scope creation, more work to follow things when block scoping is introduced
- another issue is that it is implicit and now I have if statement that are scope blocks without explicitly defining them,
  to avoid that we can use explicit let declarations

```javascript
function foo(bar){
   let (baz = bar){
       console.log(baz); // "bar"
   }
   console.log(baz) // Error
}

foo("bar");
```

could be better to force your declarations to the top of the block, and reduces the effort to identify implicit block scopes

**BUT IT WAS REJECTED BY TC39** so, you can instead use a predefined block with {}

```javascript
function foo(bar) {
  {
    let baz = bar;
    console.log(baz); // "bar"
  }
  console.log(baz); // Error
}

foo("bar");
```

# Dynamic scope

Defining scopes at runtime, based on where were things called from ...

## Quiz

### What type of scoping rule(s) does JS have?

- Lexical scoping, at compile time

### Any exceptions to those rules? how do we cheat them?

- Using the eval and with keywords

### What are the different ways you can create a new scope?

- function declaration or expression
- try catch, the catch block.
- ES6: let keyword, and curly braces {}
- block

### difference between undeclared and undefined

**undeclared** == not declared with var or in global
**undefined** is a value that is set to a declared variable that has not been yet assigned or initialized, or it has
been deliberately assigned the undefined value.

# Hoisting

Conceptual model on how JS works. not in the specs, is a mental concept to describe the behavior of JS.

```javascript
a; // ???
b; // ???
var a = b;
var b = 2;
b; // 2
a; // ???
```

after compilation, the declarations will be done first, the compiler "moves" the var declarations at compile time to
the top, that "moving" is the **HOISTING**
They are **HOISTED** to the top of the code, that is said to describe the compiler actions when registering them in the
scope **BEFORE** execution.

```javascript
var a; // compile phase
var b; // compile phase

//execution phase
a; // ???
b; // ???
a = b;
b = 2;
b; // 2
a; // ???
```

This is how the JS engine will treat those variables

What about functions?

```javascript
var a = b(); // undefined will be assigned to a
var c = d(); // at this point of execution d is undefined, will try to execute a function that is undefined => Error !
// the function expression was not HOISTED, as it was not registered at compile time, variable d was registered
// at compile time and its value is undefined. therefore here we are trying to execute a variable that is undefined.
a; // ???
c; // ???

function b() {
  return c;
}

var d = function () {
  return b();
};
```

After compilation, hoisted code looks like this: Functions get moved to the top first, then vars

```javascript
//compile phase, hoisting
function b() {
  return c;
}

var a;
var c;
var d;

//execution phase

a = b();
c = d();
a; // ???
c; // ???

d = function () {
  return b();
};
```

Proving that functions get hoisted first

```javascript
foo(); // foo !!!

var foo = 2;

function foo() {
  console.log("bar");
}

function foo() {
  console.log("foo");
}
```

Hoisted code:

```javascript
function foo() {
  console.log("bar");
} // hoisted first

function foo() {
  console.log("foo");
} // hoisted second and overrides prev foo function

var foo; // foo declared, but it actually has been declared before, so IT IS AN IGNORED DECLARATION as it has been declared before, and it keeps holding the second declared function

foo(); // foo !!!

foo = 2;
```

Why functions are overridden? because at declaration, compile time they come with the value assigned (the function code), and variables not, are set to undefined and its value will be given at runtime.

Compile time declarations, compile and then run, allow mutual recursion, a function calling another and viceversa, if the lang is interpreted, a function will be declared and try to use a function that has not been declared yet, so an interpreted lang will not allow mutual recursion

## let gotcha for hoisting

```javascript
function foo(bar) {
  if (bar) {
    console.log(baz); // ReferenceError, baz has not been declared, let DOES NOT HOIST
    let baz = bar;
  }
}

foo("bar");
```

# From YDNJS

# Scope & Closures

## CHAPTER 1: WHAT IS SCOPE?

The ability to store values and pull values out of variables is what gives a program state.

Scope: rules for storing variables in some location, and for finding those variables at a later time.

## Compiled/Interpreted

In traditional compiled-language process, a chunk of source code, your program, will undergo typically three steps before it is executed, roughly called "compilation":

- Tokenizing/Lexing

  Breaking up a string of characters into meaningful (to the language) chunks, called tokens.

- Parsing

  Taking a stream (array) of tokens and turning it into a tree of nested elements, which collectively represent the grammatical structure of the program. This tree is called an "AST" (Abstract Syntax Tree).

- Code-Generation

  The process of taking an AST and turning it into executable code. Turn it into a set of machine instructions to actually create a variable called a (including reserving memory, etc.), and then store a value into a variable.

In JS the compilation happens, in microseconds (or less!) before the code is executed.

Any snippet of JavaScript has to be compiled before (usually right before!) it's executed.

## var lookup - LHS and RHS

LSH
Left Hand Side -> THE VAR IS LOOKED UP TO BE A TARGET OF AN OPERATION / JUST TO SET ITS VALUE, DONT CARE ABOUT CURRENT VAL -> that is a LSH lookup

RSH
Right Hand Side -> THE VAR IS LOOKED UP TO BE THE SOURCE OF AN OPERATION / JUST TO RETRIEVE ITS VALUE -> that is a RSH lookup

REMEMBER: FUNCTIONS ARE VARIABLES WHICH CONTENT CAN BE EXECUTED using the (), so functions are looked up too.

## Actors in the scope conversation

Engine: responsible for start-to-finish compilation and execution of our JavaScript program.

Compiler: one of Engine's friends; handles all the dirty work of parsing and code-generation.

Scope: another friend of Engine; collects and maintains a look-up list of all the declared identifiers (variables), and enforces a strict set of rules as to how these are accessible to currently executing code.

var a = 2;

To summarize: two distinct actions are taken for a variable assignment:
1 - First, Compiler declares a variable (if not previously declared in the current Scope)
2 - Second, when executing, Engine looks up the variable in Scope and assigns values to it, if found.

When I say:

console.log( a );

The reference to "a" is an RHS reference, because nothing is being assigned to "a" here. Instead, we're looking-up to retrieve the value of "a", so that the value can be passed to console.log(..).

By contrast:

a = 2;

The reference to a here is an LHS reference, because we don't actually care what the current value is, we simply want to find the variable as a target for the = 2 assignment operation.

Consider this program, which has both LHS and RHS references:

function foo(a) {
console.log( a ); // 2
}

foo( 2 );

The last line that invokes foo(..) as a function call requires an RHS reference to foo, meaning, "go look-up the value of foo, and give it to me." Moreover, (..) means the value of foo should be executed, so it'd better actually be a function!

There's a subtle but important assignment here. Did you spot it?

You may have missed the implied a = 2 in this code snippet. It happens when the value 2 is passed as an argument to the foo(..) function, in which case the 2 value is assigned to the parameter a.

To (implicitly) assign to parameter a, an LHS look-up is performed. LHS are lookups in the scope table.

## Engine/Scope Conversation

function foo(a) {
console.log( a ); // 2
}

foo( 2 );

Let's imagine the above exchange (which processes this code snippet) as a conversation. The conversation would go a little something like this:

- Engine: Hey Scope, I have an RHS reference for foo ( "foo( 2 )" ). Ever heard of it?
- Scope: Why yes, I have. Compiler declared it just a second ago. He's a function. Here you go.
- Engine: Great, thanks! OK, I'm executing foo.
- Engine: Hey, Scope, I've got an LHS reference for a, ever heard of it?
- Scope: Why yes, I have. Compiler declared it as a formal parameter to foo just recently. Here you go.
- Engine: Helpful as always, Scope. Thanks again. Now, time to assign 2 to a.
- Engine: Hey, Scope, sorry to bother you again. I need an RHS look-up for console. Ever heard of it?
- Scope: No problem, Engine, this is what I do all day. Yes, I've got console. He's built-in. Here ya go.
- Engine: Perfect. Looking up log(..). OK, great, it's a function.
- Engine: Yo, Scope. Can you help me out with an RHS reference to a. I think I remember it, but just want to double-check.
- Scope: You're right, Engine. Same guy, hasn't changed. Here ya go.
- Engine: Cool. Passing the value of a, which is 2, into log(..).

Compiler parses and lexic analysis, stores variable sand functions in Scope, Engine executes and checks with Scope.

## Quiz

Check your understanding so far. Make sure to play the part of Engine and have a "conversation" with the Scope:

1 function foo(a) {
2 var b = a;
3 return a + b;
4 }
5  
6 var c = foo( 2 );

remember that 1 function foo(a) could be read as

Identify all the LHS look-ups (there are 3!).
Identify all the RHS look-ups (there are 4!).

- RHS of foo in 6

This line that invokes foo(..) as a function call requires an RHS reference to foo, meaning, "go look-up the value of foo, and give it to me." Moreover, (..) means the value of foo should be executed, so it'd better actually be a function!

It NOT something similar to var foo = function (a), as that would be a LHS look-up, function lookup is always a RHS look-up at run time (Engine), as Compiler would have already "done" the steps to convert function foo(a) to foo = function (a). That look-up is non-existent for Engine.

Compiler handles both the declaration and the value definition during code-generation, such that, when Engine is executing code, there's no processing necessary to "assign" a function value to foo. Thus, it's not really appropriate to think of a function declaration as an LHS look-up assignment in the way we're discussing them here.

- LHS of a in 1
- RHS of a in 2
- LHS of b in 2
- RHS of b in 3
- RHS of a in 3
- LHS of c in 6

## Nested Scope

We said that Scope is a set of rules for looking up variables by their identifier name. There's usually more than one Scope to consider, however.
If a variable cannot be found in the immediate scope, Engine consults the next outer containing scope, continuing until found or until the outermost (aka, global) scope has been reached.

## Errors

Why does it matter whether we call it LHS or RHS?

Because these two types of look-ups behave differently in the circumstance where the variable has not yet been declared (is not found in any consulted Scope).

If an RHS look-up fails to ever find a variable, anywhere in the nested Scopes, this results in a ReferenceError being thrown by the Engine. It's important to note that the error is of the type ReferenceError.

By contrast, if the Engine is performing an LHS look-up and arrives at the top floor (global Scope) without finding it, and if the program is not running in "Strict Mode", then the global Scope will create a new variable of that name in the global scope, and hand it back to Engine.

"Strict Mode" was added in ES5, has a number of different behaviors from normal/relaxed/lazy mode. One such behavior is that it disallows the automatic/implicit global variable creation. In that case, there would be no global Scope'd variable to hand back from an LHS look-up, and Engine would throw a ReferenceError similarly to the RHS case.
"No, there wasn't one before, but I was helpful and created one for you."

Now, if a variable is found for an RHS look-up, but you try to do something with its value that is impossible, such as trying to execute-as-function a non-function value, or reference a property on a null or undefined value, then Engine throws a different kind of error, called a TypeError.

ReferenceError is Scope resolution-failure related, whereas TypeError implies that Scope resolution was successful, but that there was an illegal/impossible action attempted against the result.

## Summary

Scope is the set of rules that determines where and how a variable (identifier) can be looked-up.

This look-up may be for the purposes of assigning to the variable, which is an LHS (left-hand-side) reference, or it may be for the purposes of retrieving its value, which is an RHS (right-hand-side) reference.

LHS references result from assignment operations.
Scope-related assignments can occur either with the = operator or by passing arguments to (assign to) function parameters.

The JavaScript Engine first compiles code before it executes, and in so doing, the Comipiler splits up statements like var a = 2; into two separate steps:

First, the Compiler takes "var a" to declare it in that Scope.
This is performed at the beginning, before code execution.

Later, the Engine, uses "a = 2" to look up the variable (LHS reference) and assign to it if found.

Both LHS and RHS reference look-ups start at the currently executing Scope, and if they don't find what they're looking for there, they work their way up the nested Scope, one scope (floor) at a time, looking for the identifier, until they get to the global (top floor) and stop, and either find it, or don't.

Unfulfilled RHS references result in ReferenceErrors being thrown.

### Unfulfilled LHS references result in an automatic, implicitly-created global of that name (if not in "Strict Mode"), or a ReferenceError (if in "Strict Mode").

# CHAPTER 2: LEXICAL SCOPE

the first traditional phase of a standard language compiler is called lexing (aka, tokenizing). If you recall, the lexing process examines a string of source code characters and assigns semantic meaning to the tokens as a result of some stateful parsing.

lexical scope is based on where variables and blocks of scope are authored, by you, at write time, and thus is (mostly) set in stone by the time the lexer processes your code.

Scope look-up stops once it finds the first match
The same identifier name can be specified at multiple layers of nested scope, which is called "shadowing" (the inner identifier "shadows" the outer identifier). Regardless of shadowing, scope look-up always starts at the innermost scope being executed at the time, and works its way outward/upward until the first match, and stops.

Note: Global variables are also automatically properties of the global object (window in browsers, etc.), so it is possible to reference a global variable not directly by its lexical name, but instead indirectly as a property reference of the global object.

window.a

This technique gives access to a global variable which would otherwise be inaccessible due to it being shadowed. However, non-global shadowed variables cannot be accessed.

The lexical scope look-up process only applies to first-class identifiers, such as the a, b, and c. If you had a reference to foo.bar.baz in a piece of code, the lexical scope look-up would apply to finding the foo identifier, but once it locates that variable, object property-access rules take over to resolve the bar and baz properties, respectively.

## Cheating the lexical scope

### with EVAL

Allows you to modify the lexical scope environment by cheating and pretending that author-time (aka, lexical) code was there all along.

function foo(str, a) {
eval( str ); // cheating!
console.log( a, b );
}

var b = 2;

foo( "var b = 3;", 1 ); // 1 3

The string "var b = 3;" is treated, at the point of the eval(..) call, as code that was there all along. Because that code happens to declare a new variable b, it modifies the existing lexical scope of foo(..). In fact, as mentioned above, this code actually creates variable b inside of foo(..) that shadows the b that was declared in the outer (global) scope.
So eval(..) can at runtime modify an author-time lexical scope.

eval(..) when used in a strict-mode program operates in its own lexical scope, which means declarations made inside of the eval() do not actually modify the enclosing scope.

function foo(str) {
"use strict";
eval( str );
console.log( a ); // ReferenceError: a is not defined
}

foo( "var a = 2" );

The use-cases for dynamically generating code inside your program are incredibly rare, as the performance degradations are almost never worth the capability.

## with WITH

with statement actually creates a whole new lexical scope out of thin air, from the object you pass to it.

---

## Performance

Both eval(..) and with cheat the otherwise author-time defined lexical scope by modifying or creating new lexical scope at runtime.
The JavaScript Engine has a number of performance optimizations that it performs during the compilation phase.

So most of those optimizations it would make are pointless if eval(..) or with are present, as ithe compiler doesnt know what coming on eval or with at compile time, so it simply doesn't perform the optimizations at all.

Your code will almost certainly tend to run slower simply by the fact that you include an eval(..) or with anywhere in the code.
There's no getting around the fact that without the optimizations, code runs slower.

## Review

Lexical scope means that scope is defined by author-time decisions of where functions are declared. The lexing phase of compilation is essentially able to know where and how all identifiers are declared, and thus predict how they will be looked-up during execution.

Two mechanisms in JavaScript can "cheat" lexical scope: eval(..) and with. The former can modify existing lexical scope (at runtime) by evaluating a string of "code" which has one or more declarations in it. The latter essentially creates a whole new lexical scope (again, at runtime) by treating an object reference as a "scope" and that object's properties as scoped identifiers.

The downside to these mechanisms is that it defeats the Engine's ability to perform compile-time optimizations regarding scope look-up, because the Engine has to assume pessimistically that such optimizations will be invalid. Code will run slower as a result of using either feature. Don't use them.

---

## CHAPTER 3: Function vs. Block Scope

What exactly makes a new bubble? Is it only the function? Can other structures in JavaScript create bubbles of scope?

## Function scope

Function scope encourages the idea that all variables and identifiers (nested functions) belong to the function, and can be used and reused throughout the entirety of the function (and indeed, accessible even to nested scopes).

You can "hide" variables and functions by enclosing them in the scope of a function.

Why would "hiding" variables and functions be a useful technique?

There's a variety of reasons motivating this scope-based hiding. They tend to arise from the software design principle "Principle of Least Privilege", also sometimes called "Least Authority" or "Least Exposure". This principle states that in the design of software, such as the API for a module/object, you should expose only what is minimally necessary, and "hide" everything else.

Functions can be nested , defined, inside functions, to allow hididng inplementation details

function doSomething(a) {
function doSomethingElse(a) {
return a - 1;
}

    var b;

    b = a + doSomethingElse( a * 2 );

    console.log( b * 3 );

}

doSomething( 2 ); // 15

Now, b and doSomethingElse(..) are not accessible to any outside influence, instead controlled only by doSomething(..). The functionality and end-result has not been affected, but the design keeps private details private, which is usually considered better software.

Another benefit of "hiding" variables and functions inside a scope is to avoid unintended collision between two different identifiers with the same name but different intended usages. Collision results often in unexpected overwriting of values.

function foo() {
function bar(a) {
i = 3; // changing the `i` in the enclosing scope's for-loop
console.log( a + i );
}

    for (var i=0; i<10; i++) {
    	bar( i * 2 ); // oops, infinite loop ahead!
    }

}

foo();

The i = 3 assignment inside of bar(..) overwrites, unexpectedly, the i that was declared in foo(..) at the for-loop. In this case, it will result in an infinite loop, because i is set to a fixed value of 3 and that will forever remain < 10.

## Global "Namespaces"

A particularly strong example of (likely) variable collision occurs in the global scope. Multiple libraries loaded into your program can quite easily collide with each other if they don't properly hide their internal/private functions and variables.

Such libraries typically will create a single variable declaration, often an object, with a sufficiently unique name, in the global scope.

This object is then used as a "namespace" for that library, where all specific exposures of functionality are made as properties off that object (namespace), rather than as top-level lexically scoped identifiers themselves.

For example:

var MyReallyCoolLibrary = {
awesome: "stuff",
doSomething: function() {
// ...
},
doAnotherThing: function() {
// ...
}
};

## Functions as scopes

We've seen that we can take any snippet of code and wrap a function around it, and that effectively "hides" any enclosed variable or function declarations from the outside scope inside that function's inner scope.

While this technique "works", it is not necessarily very ideal. There are a few problems it introduces. The first is that we have to declare a named-function foo(), which means that the identifier name foo itself "pollutes" the enclosing scope (global, in this case). We also have to explicitly call the function by name (foo()) so that the wrapped code actually executes.

It would be more ideal if the function didn't need a name (or, rather, the name didn't pollute the enclosing scope), and if the function could automatically be executed.

(function foo(){ // <-- insert this
var a = 3;
console.log( a ); // 3

})(); // <-- and this

First, notice that the wrapping function statement starts with (function... as opposed to just function.... While this may seem like a minor detail, it's actually a major change. Instead of treating the function as a standard declaration, the function is treated as a function-expression.

The key difference we can observe here between a function declaration and a function expression relates to where its name is bound as an identifier.

Compare the previous two snippets. In the first snippet, the name foo is bound in the enclosing scope, and we call it directly with foo(). In the second snippet, the name foo is not bound in the enclosing scope, but instead is bound only inside of its own function.

In other words, (function foo(){ .. }) as an expression means the identifier foo is found only in the scope where the .. indicates, not in the outer scope. Hiding the name foo inside itself means it does not pollute the enclosing scope unnecessarily.

## Anonymous vs. Named

setTimeout( function(){
console.log("I waited 1 second!");
}, 1000 );
anonymous function expression: function()... has no name identifier on it.

Function expressions can be anonymous, but function declarations cannot omit the name -- that would be illegal JS grammar.

## several draw-backs to consider:

- Anonymous functions have no useful name to display in stack traces, which can make debugging more difficult.

- Without a name, if the function needs to refer to itself, for recursion, etc., the deprecated arguments.callee reference is unfortunately required. Another example of needing to self-reference is when an event handler function wants to unbind itself after it fires.

- Anonymous functions omit a name that is often helpful in providing more readable/understandable code. A descriptive name helps self-document the code in question.

Inline function expressions are powerful and useful. Providing a name for your function expression quite effectively addresses all these draw-backs, but has no tangible downsides. The best practice is to always name your function expressions:

setTimeout( function timeoutHandler(){ // <-- Look, I have a name!
console.log( "I waited 1 second!" );
}, 1000 );

## Invoking Function Expressions Immediately

var a = 2;

(function foo(){

    var a = 3;
    console.log( a ); // 3

})();

console.log( a ); // 2
Now that we have a function as an expression by virtue of wrapping it in a ( ) pair, we can execute that function by adding another () on the end, like (function foo(){ .. })(). The first enclosing ( ) pair makes the function an expression, and the second () executes the function.

This pattern is so common, a few years ago the community agreed on a term for it: IIFE, which stands for Immediately Invoked Function Expression.

Naming an IIFE has all the aforementioned benefits over anonymous function expressions, so it's a good practice to adopt.

(function IIFE(){

    console.log( 'blsah' );

})();

passing params
(function IIFE( global ){

    var a = 3;
    console.log( a ); // 3
    console.log( global.a ); // 2

})( window );

Still another variation of the IIFE inverts the order of things, where the function to execute is given second, after the invocation and parameters to pass to it. This pattern is used in the UMD (Universal Module Definition) project. Some people find it a little cleaner to understand, though it is slightly more verbose.

var a = 2;

(function IIFE( def ){
def( window );
})(function def( global ){

    var a = 3;
    console.log( a ); // 3
    console.log( global.a ); // 2

});

The def function expression is defined in the second-half of the snippet, and then passed as a parameter (also called def) to the IIFE function defined in the first half of the snippet. Finally, the parameter def (the function) is invoked, passing window in as the global parameter.

## BLOCK SCOPES

for (var i=0; i<10; i++) {
console.log( i );
}

We declare the variable i directly inside the for-loop head, most likely because our intent is to use i only within the context of that for-loop, and essentially ignore the fact that the variable actually scopes itself to the enclosing scope (function or global).

That's what block-scoping is all about. Declaring variables as close as possible, as local as possible, to where they will be used.

We are using a bar variable only in the context of the if-statement, so it makes a kind of sense that we would declare it inside the if-block. However, where we declare variables is not relevant when using var, because they will always belong to the enclosing scope.

On the surface, JavaScript has no facility for block scope.

## try/catch

It's a very little known fact that JavaScript in ES3 specified the variable declaration in the catch clause of a try/catch to be block-scoped to the catch block.

For instance:

try {
undefined(); // illegal operation to force an exception!
}
catch (err) {
console.log( err ); // works!
}

console.log( err ); // ReferenceError: `err` not found

As you can see, err exists only in the catch clause, and throws an error when you try to reference it elsewhere.

## let

ES6 introduces keyword let which sits alongside var as another way to declare variables.

The let keyword attaches the variable declaration to the scope of whatever block (commonly a { .. } pair) it's contained in.

let implicitly hijacks any block's scope for its variable declaration.

example:
var foo = true;

if (foo) {
var bar = foo \* 2;
bar = something( bar );
console.log( bar );
}

console.log( bar ); // all good

but if you change var bar for let bar, it won;t be accesible from outside the { ... } block

var foo = true;

if (foo) {
let bar = foo \* 2;
bar = something( bar );
console.log( bar );
}

console.log( bar ); // ReferenceError

As it can be confusing, maybe it's better to explicitly wrap code in {}

if (foo) {
{ // <-- explicit block
let bar = foo \* 2;
bar = something( bar );
console.log( bar );
}
}
We can create an arbitrary block for let to bind to by simply including a { .. } pair anywhere a statement is valid grammar. In this case, we've made an explicit block inside the if-statement, which may be easier as a whole block to move around later in refactoring, without affecting the position and semantics of the enclosing if-statement.

## isolating blocks to facilitate garbage collection

Block-scoping can address this concern, making it clearer to the engine that it does not need to keep someReallyBigData around:

function process(data) {
// do something interesting
}

// anything declared inside this block can go away after!
{
let someReallyBigData = { .. };

    process( someReallyBigData );

}

var btn = document.getElementById( "my_button" );

btn.addEventListener( "click", function click(evt){
console.log("button clicked");
}, /_capturingPhase=_/false );

## let loops

for (let i=0; i<10; i++) {
console.log( i );
}

console.log( i ); // ReferenceError

console.log( i ); // ?? we dont want i in our scope any more !

## Review

Functions are the most common unit of scope in JavaScript.
Variables AND functions that are declared inside another function are essentially "hidden" from any of the enclosing/outer "scopes", which is an intentional design principle of good software.

But functions are by no means the only unit of scope.
Block-scope refers to the idea that variables and functions can belong to an arbitrary block (generally, any { .. } pair) of code, rather than only to the enclosing function.

Starting with ES3, the try/catch structure has block-scope in the catch clause.

In ES6, the let keyword (a cousin to the var keyword) is introduced to allow declarations of variables in any arbitrary block of code. if (..) { let a = 2; } will declare a variable "a" that essentially hijacks the scope of the if's { .. } block and attaches itself there. Not allowing the usage of "a" aouotside the block { .. }

Though some seem to believe so, block scope should not be taken as an outright replacement of var function scope.
Both functionalities co-exist, and developers can and should use both function-scope and block-scope techniques where respectively appropriate to produce better, more readable/maintainable code.

---

## Chapter 4: Hoisting

There's a temptation to think that all of the code you see in a JavaScript program is interpreted line-by-line, top-down in order, as the program executes. While that is substantially true, there's one part of that assumption which can lead to incorrect thinking about your program.

Consider this code:

a = 2;

var a;

console.log( a ); // 2, not "undefined", the variable is not redefined. ...

another
console.log( a );
var a = 2; // "undefined" is printed, not "ReferenceError"

## The compiler ...

As JS actually compiles first and then executes .... the best way to think about this is that all declarations, both variables and functions, are processed first, before any part of your code is executed.

When you see var a = 2;, you probably think of that as one statement.

But JavaScript actually thinks of it as two statements:
var a;
and
a = 2;

The first statement, the declaration, is processed during the compilation phase.
The second statement, the assignment, is left in place for the execution phase.

Soooo ...

Our first snippet:
a = 2;
var a;
console.log( a );

It will be handled like this:

1. var a;

2. a = 2;
   console.log( a );

Where the first part is the compilation and the second part is the execution ...

Same for this snippet

console.log( a );
var a = 2;

It will be handled like this:

1.         var a;

2.         console.log( a );
    a = 2;

So, one way of thinking, sort of metaphorically, about this process, is that variable and function declarations are "moved" from where they appear in the flow of the code to the top of the code. This gives rise to the name "Hoisting".
ONLY the declarations themselves are hoisted, not the executing code.
That's why functions can be up or down and still available to be executed ... !!!

foo();

function foo() {
console.log( a ); // undefined
var a = 2;
}

In compile time the function is moved up, so then it can be called from foo();

Function declarations are hoisted, as we just saw. But function expressions are not.

foo(); // not ReferenceError, but TypeError!

var foo = function bar() {
// ...
};

Fater compilation and hoisting of the foo var.

1.         var foo; // hoisted to the enclosing scope (global)
2.         foo(); // foo exists in the LFR look-up, but it's not been defined yet, has not value  (as it would if it had been a true function declaration instead of expression)

    So, foo() is attempting to invoke the undefined value, which is a TypeError illegal operation.

        foo = function bar() {
        	// ...
        };

Also recall that even though it's a named function expression, the name identifier is not available in the enclosing scope:

    foo(); // TypeError, var exists but is undefined
    bar(); // ReferenceError, func does not exists

    var foo = function bar() {
    	// ...
    };

The previous snippet, after compilation and hoisting:

    var foo;

    foo(); // TypeError
    bar(); // ReferenceError

    foo = function() {
    	var bar = ...self...
    	// ...
    }

## Functions First

A subtle detail (that can show up in code with multiple "duplicate" declarations) is that functions are hoisted first, and then variables.
foo(); // 1

var foo;

function foo() {
console.log( 1 );
}

foo = function() {
console.log( 2 );
};

1 is printed instead of 2! This snippet is interpreted by the Engine as:

function foo() {
console.log( 1 );
}
// var foo ignored as it is repeated ...

foo(); // 1

foo = function() {
console.log( 2 );
};

While multiple/duplicate var declarations are effectively ignored, subsequent function declarations do override previous ones.

## Review

We can be tempted to look at var a = 2; as one statement, but the JavaScript Engine does not see it that way.
It sees var a and a = 2 as two separate statements, the first one a compiler-phase task, and the second one an execution-phase task.

What this leads to is that all declarations in a scope, regardless of where they appear, are processed first before the code itself is executed. You can visualize this as declarations (variables and functions) being "moved" to the top of their respective scopes, which we call "hoisting".

Declarations themselves are hoisted, but assignments, even assignments of function expressions, are not hoisted.

Be careful about duplicate declarations, especially mixed between normal var declarations and function declarations -- peril awaits if you do!
