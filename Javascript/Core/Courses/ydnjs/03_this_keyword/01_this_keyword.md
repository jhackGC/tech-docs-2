# from advanced JS course

# Scope
Where to look for variables, lexical identifiers.
JS is compiled every single time that is run.
Compiler will run at least 3 times:
- Initial pass thru the code to compile it, tokenize it, syntax check
- one more pass, probably to identify members
- another pass to execute it


## Compiler runs thru the code and put vars in scopes

The compiler will look for this blocks of scope, in the current ES5 spec, the smallest block of scope is a function.

    var foo = "bar";
    
    function bar(){
        var foo = "baz";
    }
    
    function baz(foo){
        foo = "bam";
        bam = "yay";
    }

Compiler will find declarations of vars and functions and put them in the correct scope slot.

In terms of sintax this is a single statement

    var foo = "bar";

- foo is declared, in what scope? the global

For the compiler these are 2 entirely separated operations, that happen at totally diff times

    - declaration operation, which will be picked up at the identifying pass of the compiler
    - assigment operation


Compiling function scope, bar function scope

- bar function is declared, in what scope? the global
    
    function bar(){
        var foo = "baz";
    }

recursively descent into the function and compile its contents.
- foo is declared, in what scope? the function


- baz function is declared, in what scope? the global

    function baz(foo){
        foo = "bam";
        bam = "yay";
    }

- foo local var (param) is declared, in what scope? the function, a name parameter is treated like a local variable
- foo local var is assigned

we are done compiling the progrma for the purposes of scope resolution

remember
- if you repeat the var foo declaration many times, it does not matter as the compiler already has that declared and do not re-declares it. so its ignored, and the variables wont be "overriden" at runtime
- if the case is for a function, it will override it

## Now the code is run
- in the run phase:
    - there are not var anymore, the first line will be read as foo = "bar";
    if you find many var foo, only one will be taken into account in compilation time.


## LHS and RHS of an assigment, the equals operator

foo = "bar"
foo LHS
"bar" RHS

but there are many ways of assigment that dont have an equla sign so the correct definition would be:
- LHS: target
- RHS: source

compiler asks scope maager if the LHS ref is in the current execution scope, i.e. global scope


if a LHS var is not found in the scope it bubbles up in the scopes, i.e. goes to the global, if it cant be found at the global level, IT CREATES ONE in the GLOBAL scope, just because it was a LHS reference (non-strict mode)

so here,

    function baz(foo){
        foo = "bam";
        bam = "yay";
    }
    
we are assigning "yay" to a GLOBAL var called bam

This is called LEAKAGE OF GLOBAL VARIABLES


undeclared (not declared) <> undefined (might have been declared, with a var keyword, but is not initialized)

"undefined" is a value in the specs, is a type with just one value  



## Excersice

compiling phase

    var foo = "bar"; // var foo registered on global scope

    function bar(){ // function bar registered in the global scope, name and contents
        var foo = "baz"; // var foo registered on bar scope

        function baz(foo){ // function baz registered in the bar scope, name and contents, named param foo                         // declared too in tis scope
            foo = "bam"; 
            bam = "yay"; // var bam registered on baz scope
        }
        baz();
    }
    
    bar();
    foo;// "bar"
    bam; // "yay"
    baz();

runtime - functions and var declarations compiled away
    
    foo = "bar"; // LHS of foo in the global scope
    
    bar();  // RHS of bar in the global scope, why RHS because is not an LHS !, there is not an assigment, the         // bar reference i snot being assigned, its being USED
            // get the value of it, which is a function object, and the parentheses will ATTEMPT to execute it
    foo; // "bar"
    bam; // "yay"
    baz(); // RHS of baz in the global scope, NOT FOUND, REFERENCE ERROR, cant create a baz function from thin air as it cant even see it ... it exists but was not registered in the scope where it wants to be run
    
execution of function bar
    
    function bar(){ 
        foo = "baz"; // LHS var foo in the bar scope, and it finds it.
        baz(); // RHS baz var in the bar scope, and finds it, its value is a function object, and executes its content
    }
    
execution of function baz
        
        function baz(foo){ 
            foo = "bam"; // LHS var foo in the baz scope, and it finds it in the baz scope, as a local param                // and sets its value
            bam = "yay"; // LHS var foo in the baz scope, and it DOES NOT find it in the baz scope, goes up to 
                         // the bam scope, not found, and goes global and creates one and sets its value
        }

local var with the same name as a global one, is SHADOWING the global var

# Function declarations and function expressions

1    var foo = function bar(){
2        var foo = "baz";
3
4        function baz(foo){
5            foo = bar; 
6            foo; // function ...
7        }
8        baz();
9    };   
10
11   foo();
12   bar(); // Error!

line  1 is a func declaration or expression? expression
to be a declaration, to declare it in the current existing scope, the keyword function has to be the first word in the statement.
It can be named, like bar, but it is not declared in the scope as it is an expression.
it is declared in its own scope, so w ecan reference it inside itself, but not outside, that is why line 12 is error and why it can be used to be assigned to another variable like in line 5

line 4 is a function declaration, so it is bound to the scope where it is defined (the bar function scope)
- named: function bar()
- anon: function()

## Function expression can be used as anonymous functions expressions

## Named vs Anonymous function expressions
Named are good
Anon cons:

- inside the function there is no way to refer to ourselves, the anon function can do a self reference   
    - i.e. recursion, binding things. Remember the "this" keyword is NOT a reference to yourself

- prod code errors won't shoe the place it happened, they are not useful when debugging, as it says anon function ...

- it does not document itself, as you have to research the big picture to understand what the funcion does

## try/catch block scopes
the catch block is a block and has its scope, anything defined there belongs to that scope
err only exists in the catch block scope

    var foo;
    
    try{
        foo.length;
    }catch (err){
        console.log(err) // TypeError
    }
    
    console.log(err); // ReferenceError

# Nested scope

## Lexical and Dynamic scopes
Lexical, parsing stage called lexing, meaning compile time scope. All the scoing desicions are defined in the compile time and stays like that.
They are nested, buble each other

## cheating the compile time scope: eval()
the eval function receives an estring and treats it as if it is code

    var bar = "bar";
    
    function foo(str){
        eval(str); // cheating
        console.log(bar); // 42
    }
    
    foo("var bar = 42;");

the funtion foo does not have "bar" variable declared ... but by using eval we dinamically MODIFIED its existing lexical scope of function foo, we added a new declaration at runtime. 
Using eval makes the execution slower, cant assume scopes anymore, so it does not optimise at all at compile time. and runs slower.
Just by having the eval function present, it has to disable some of the optimisations.

in STRICT mode it creates a NEW scope for the eval code, but does not MODIFY the existing ones (invalidating them), therefore running faster while having eval

setTimeout with a string param will use eval, because it has to run that code, with a function reference it wont.

## cheating the compile time scope: with() 

    var obj = {
        a: 2,
        b: 3,
        c: 4
    };
    
    obj.a = obj.b + obj.c;
    obj.c = obj.b + obj.a;
    
    with(obj){
        a = b + c;
        c = b - a;
        d = 3; // ??, asks the scope of with stetement (obj), do you have a var called d? no, go fish, and then goes to the global and asks for a LHS ref for d, and not I havent, and CREATES  a new one !!
    }
    
    obj.d; // undefined
    d; // 3 -- ooops !

with is used to de-structure the object and access its members withu the obj. reference preceding them
the compiler treat the with statement as a lexical scope

SO its so easy to leak globals when using with() ... that dont use it
eval() modifies the lexical scope.
the with() crates a whole noew lexical scope at runtime, so it kills your scoping assumptions when writing the code and disables optimisations too. In strict mode the with() function is just disallowed


# IIFE pattern - Immediately Invoked Function Expression
useful use of functions and scopes

    1   var foo = "foo";
    2
    3   (function myIIFE(){
    4       var foo = "foo2";
    5       console.log(foo); // "foo2"
    6   })();
    7
    8   console.log(foo); // "foo"

I want to hide in a new scope lines 4 and 5, so as the funtion is the smaller unit of scope, I need to create one somewhere, and thats how I get a new block of scope around my code.
I could have used a named functiona dn then just call it. But the problem with that is that I am creating, on leaking out, a ref name (named function) in the global scope. which is not the idea as I want to hide stuff, not to pollute the existing scope     
With the enclosing parenthesis we avoid declaring it, and then with the outer parenteshis it executes it. Thats the IIFE pattern.
Anyway we should name it to avoid anon functions issues.


It does not fit as an lexical identifier, is an immediate value

## passing params to an IIFE function


all inside the IIFE becomes private, not able to be seen from outside its scope
    
    1   var foo = "foo";
    2
    3   (function myIIFE(bar){
    4       var foo = bar;
    5       console.log(foo); // "foo"
    6   })(foo);
    7
    8   console.log(foo); // "foo"
    
another example using the global object to make obvious in my code that I refer to the global scope
    
    1   var foo = "foo";
    2
    3   (function myIIFE(global){
    4       var foo = global.foo;
    5       console.log('from myIIFE: ', foo); // "foo"
    6   })(window);
    7
    8   console.log('from global scope: ', foo); // "foo"
    
same if you want ot gurantee that the JQUery $ dolalr sign is the JQuery object, in case it collides with another framework

    1   var foo = "foo";
    2
    3   (function myIIFE(global, $){
    4       var foo = global.foo;
    5       console.log('from myIIFE: ', foo); // "foo"
    6   })(window, JQuery);
    7
    8   console.log('from global scope: ', foo); // "foo"

So the IIFE pattern allows of to manually pass in an alias variable form the enclosing scope


# ES6 block scope with the keyword "let"
when we use it with a identifier we attach that variable to the block where it resides, instead of the enclosing function scope.
this is called implicit block scoping

i.e. using var

    1 function foo(){
    2       var bar = "bar";
    3       for (var i=0; i<bar.length; i++ ){
    4           console.log(bar.charAt(i));
    5       }
    6       console.log(i) // "3"
    7   }
    8   foo();
when using var, the i variable gets leaked to the function scope, so it prints "3"

when using let, the i variable stays in the block scope where it has been defined, so it fails at the function scope

    1 function foo(){
    2       var bar = "bar";
    3       for (let i=0; i<bar.length; i++ ){
    4           console.log(bar.charAt(i));
    5       }
    6       console.log(i) // ReferenceError
    7   }
    8   foo();

## Issues with the let keyword

- it does not HOIST, it becames available where its defined, so put them at the top of the block.
vars are 
- extra mental effort to follow the let scope creation, more work to follow things when block scoping is introduced
- another issue is that it is implicit and now I have if statement that are scope blocks withut explicitly defining them, 
to avoid that we can use explicit let declarations 

    function foo(bar){
       let (baz = bar){
           console.log(baz); // "bar"
       }
       console.log(baz) // Error
    }
    
    foo("bar");
could be better to force your declarations to the top of the block, and reduces the effort to identify implicit bock scopes

BUT IT WAS REJECTED BY TC39 so, you can instead use a predefined block with {}


    function foo(bar){
        { 
            let baz = bar;
            console.log(baz); // "bar"
        }
        console.log(baz) // Error
    }
    
    foo("bar");

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
undeclared == not declared with var or in global
undefined is a value that is set to a declared variable that has not been yet assigned or initialized, or it has been deliberately assigned the undefined value.

# Hoisting
Conceptual model on how JS works. not in the specs, is a mental concept to describe the behavior of JS.


    a; // ???
    b; // ???
    var a = b;
    var b = 2;
    b; // 2
    a; // ???

after compilation, the declarations will be done first, the compiler "moves" the var declarations at compile time to the top, that "moving" is the HOISTING
They are HOISTED to the top of the code, that is said to describe the compiler actions when registering them in the scope BEFORE execution.
    
    var a; // compile phase
    var b; // compile phase
    
    //execution phase
    a; // ???
    b; // ???
    a = b;
    b = 2;
    b; // 2
    a; // ???
    
This is how ths JS engine will treat those variables

What about functions?

	    var a = b(); // undefined will be assigned to a
	    var c = d(); // at this point of execution d is undefined, will try to execute a function that is undefined => Error !
	    // the function expression was not HOISTED, as it was not registered at compile time, variable d was regitered at compile time and its value is udefined. therefore here we are tryng to execute a variable that is undefined.
	    a;  // ???
	    c;  // ???

	    function b(){
	        return c;
	    }
	    
	    var d = function(){
	        return b();
	    };

After compilation, hoisted code looks like this: Functions get moved to the top first, then vars
		
		//compile phase, hoisting
		function b(){
	        return c;
	    }

		var a;
		var c;
		var d;

		//execution phase

		a = b(); 
	    c = d();
	    a;  // ???
	    c;  // ???

	    d = function(){
	        return b();
	    };

Probing that functions get hoisted first


	foo(); // foo !!!

	var foo = 2;

	function foo(){
	   console.log("bar");
	}

	function foo(){
	   console.log("foo");
	}
HOisted code
	function foo(){
	   console.log("bar");
	} // hoisted first

	function foo(){
	   console.log("foo");
	} // hoisted second and overrides prev foo function
	
	var foo; // foo declared, but it actually has been declared before, so IT IS AN IGNORED DECLARATION as it has been declared before, and it keeps holding the second declared function

	foo(); // foo !!!

	foo = 2;

Why functions are overriden? because at declaration, compile time they come with the value assigned (the function code), and variables not, are set to undefined and its value will be given at runtime.


Compile time declarations, compile and then run, allow mutual recursion, a function calling another and viceversa, it the lang is interpreted, a function will be declared and try to use a function that has not been declared yet, so an interpreted lang will not allow mutual recursion

## let gotcha for hoisting

	function foo(bar){
		if (bar){
			console.log(baz); // ReferenceError, baz has not been declared, let DOES NOT HOIST
			let baz = bar;
		}
	}

	foo("bar");


# this Keyword

Every function, while executing, has a reference to its current execution context, called this.
Execution context is related with where is the function called or how the function is called when its called

	function foo(){
		console.log(this.bar);
	}

	var bar = "bar 1";
	var o2 = { bar: "bar2", foo: foo };
	var o3 = { bar: "bar3", foo: foo };

	foo();		// "bar1"
	o2.foo();	// "bar2"
	o3.foo();	// "bar3"

Rules for how the this keyword gets bound: it depends on the call site, which is the place in the code where the 
function is executed, with its open close () parenthesis.

The order of prcedence is:

1 - ?
2 - Explicit binding rule - using call() / apply() or bind() 
3 - Implicit binding rule (The function is called as a prop of an object)
4 - default binding: Plain old function call -> global or undefined (strict mode)


## 4 - default binding: Plain old function call.
The function is called plain from the origin. same for IIFE functions. so, this has the scope from where it was called, thats why it prints "bar1"
Normal function call, both for declared functions or IIFEs, in this case default binding applies.
This is the default rule, is the default or catchall rule, as any of the preceding ones applies.
If the code running inside the function foo is in strict mode (not actually the strict mode of the whole program): the default rule will set the this keyword to undefined
If NOT in strict mode in the function: default rule will set the this keyword to the global object

## 3 - Implicit binding rule
The function is called as a prop of an object.
In JS everything are references to an object, or function
We put explicitly a ref to an function object in the o2 object.

	var o2 = { bar: "bar2", foo: foo };

then execute it via the object prop reference

	o2.foo();	// "bar2"

in this case, the base object becomes the THIS keyword., in our case o2 is he this keyword when referenced from function foo()


### Binding confusion
The lexical binding mechanism is totally different and independent from the THIS binding mechanism

	function foo(){
		var bar = "bar1";
		baz();
		console.log(this.bar);
	}

	function baz(){
		console.log(this.bar); // we want the this reference here in baz(), to reference our lexical context inside foo(), to force it somehow, as, currently, it references the baz context and the global by lexical rules, not the foo() lexical context
	}

	var bar = "bar2";
	foo(); /// ???

usually this confusion happens when someone wants from another function, to use the function bar() (could be a function in a 3rd party lib) and you want that function to use your calling function context environment, you want the this object of that function to be YOUR FUNCTON this context, like forcing it into baz().

Attempted solution

	function foo(){
		var bar = "bar1";
		this.baz = baz; // make the baz function part of the function scope and execute it ...
		this.baz();
	}

	function baz(){
		console.log(this.bar);
	}

	var bar = "bar2";
	foo(); /// ???

but the this reference gets set by the CALL site of the function call, in foo case is global, as it is called from global, so in line 

		this.baz = baz;

we try to set a baz var that overrides the baz global function, so on line 

		this.baz();

means global.baz(), global is an object so the implicit this bindign will apply, the context of the containing object.

@TODO review this item, its confusing.

## 2 - Explicit binding rule
If you use .call(...) or .apply(...) at the call site, those utilities take as the first param the THIS binding, called the THIS arg. If passed, it will be used as your this inside that function.

	function foo(){
		console.log(this.bar);
	}

	var bar = "bar1";
	var obj = {bar:"bar2"};

	foo(); // "bar1", normal defautl binding rule
	
	foo.call(obj); // "bar2", now our THIS keyword points to obj

### hard binding


	function foo(){
		console.log(this.bar);
	}

	var obj1 = {bar:"bar1"};
	var obj2 = {bar:"bar2"};

	var orig = foo; // this coul dbe improved by being hidden in a function , see bind() method next

	foo = function(){ orig.call(obj1); }; 
	// redefines the foo function but when it executes it will received a hard binded this object pointing to the obj1
	// no matter how foo gets called, it will always have the this ref hard binded to obj1

	foo(); // "bar1"
	foo.call(obj2); // ??? tryig to overrride the binding, nope, will print "bar1", as the foo function completely ignores the this binding of the wrapper.


So this allow us to pass the foo function around, as callbacks for ajax calls for example, and it will predictable have a this object which is hard wired.

So it reduces the this keyword binding flexibility but stops people from using your function incorrectly.

Can we make the process better, less clunky? create a bind utility.

	function bind(fn, o){
		return function(){
			fn.call(o); 
			// call attachs o as this, to fn . the utility function creates a function that is HARCODED to call fn with o as its // "this"
		}; 
	}
	// scope of bind has fn and o variables
	// scope of anon function has not fn or o, so it falls into its enclosing scope, function bind


	function foo(){
		console.log(this.bar);
	}

	var obj1 = {bar:"bar1"};
	var obj2 = {bar:"bar2"};

	foo = bind(foo, obj1); // foo function ref, is replaced by the result of the execution of bind, which is another function that is a wrapper, whose scope has fn and o, fn being the original foo() function, and o being the passed obj.

	// another caveat, the call site not the global, is inside the wrapper function ... in this case 
		return function(){
			fn.call(o); // call site
		}; 



	foo(); // "bar1", so now, when calling foo() the calling site is .... ??? and it will execute fn.call(o), how does fn and o keep the values ? and returns "bar1" as o is the this keyword in the fn function execution scope.

	foo.call(obj2); // ??? tryig to overrride the binding, nope, will print "bar1", as the foo function completely ignores the this binding of the wrapper.

@TODO I dont get it after running foo = bind(foo, obj1); how do fn and o stay harcoded? why are fn and o persistent, even exist when foo() gets executed.


you could eventually apply this utility to the Function prototype to make it avail for all functions
just for example purposes we use the bind2 name

	if (! Function.prototype.bind2){
		Function.prototype.bind2 = 
			function(o) {
				var fn = this; // the function !, "this" is the object where bind2 has been called, see 3 - Implicit binding rule, a little trick that saves us from passing around the foo function
				return function(){
					// we want to pass arguments so we use "apply"
					return fn.apply(o, arguments); 
				};
			};
	}


	function foo(baz){
		console.log( this.bar + " " + baz);
	}

	var obj = { bar : "bar" };


	foo = foo.bind2(obj); // implicit binding rule of "this" binding applies, executing a function that resides as a property of an object, makes the "this" keyword in that function execution, the containing object, rule 3 - Implicit binding rule

	foo("baz"); // "bar baz"
	
	


#### bind is already built in ES5
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind
it also has a polifyll for pre-ES5 browsers
if you need a polifyll use the provided by MDN


## 4 - using the "new" keyword

"new" Binding

BEWARE: there really is no connection to class-oriented functionality implied by the "new" keyword usage in JS.

In JS constructors are just Functions that happen to be called with the new operator in front of them:
	- THEY ARE NOT ATTACHED TO ANY CLASS
	- THEY ARE NOT INSTANTIATING A CLASS
	- THEY ARE NOT SPECIAL TYPE OF FUNCTION

They're just regular functions that are, in essence, hijacked by the use of new in their invocation.

When a function is invoked with new in front of it, also known as a "constructor call", the following things are 
done automatically:

1 - a brand new OBJECT is created (aka, constructed) out of thin air
2 - the newly constructed object is [[Prototype]]-linked
3 - the newly constructed object is set as the "this" binding for that function call
4 - unless the function returns its own alternate object, the new-invoked function call will automatically return 
the newly constructed object.

### Consider: 

function foo(a) {
	this.a = a; // this is bar as defined in step 3
}

var bar = new foo( 2 ); // bar is a new object as defined in step 1/3

console.log( bar.a ); // 2

By calling foo(..) with new in front of it, we've constructed a new object 
and set that new object as the "this" for the call of foo(..).
