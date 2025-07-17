# YDNJS - Up & Going

- Expressions
- Statements
- Interpreted or compiled ?

# Expressions

A coherent unit of stuff.

- An expression is any reference to a variable or value, or a set of variable(s) and value(s) combined with operators.
Either on the left of right of the operators.

For example:

    a = b * 2;

This statement has four expressions in it:

- '2' is a literal value expression
- 'b' is a variable expression, which means to retrieve its current value
- 'a' is a variable expression, which means to receive the assigned expression on the right
- 'b * 2' is an arithmetic expression, which means to do the multiplication
- 'a = b * 2' is an assignment expression, which means to assign the result of the b * 2 expression to the variable a (more on assignments later)
- 'alert(a)' -> call expression, parenthesis with name at the front.


        a = b * 2 + foo(c * 3);

        [ [a] = [ [ [b] * [2] ] + [ foo([ [c] * [3] ]) ] ] ];
        - in this example operator precedence is applied.


# Statements
Group of words, numbers and operators that perform a specific task.

Statements are made up of one, or more expressions.
    
    a = b * 2;
    left hand side = right hand side;
    target = source;
    
Most statements in JavaScript conclude with a semicolon (;) at the end.
Try to use them, while not mandatory is a best practice

# Running a program.

## Interpreted or compiled

It's typically asserted that JavaScript is interpreted, because your JavaScript source code is processed each time it's run.

But that's not entirely accurate. The JavaScript engine actually compiles the program on the fly and then immediately runs the compiled code.

### Compiled language
Several passes through the program:
- understand it, scan it, check syntax
- execute it

### Interpreted lang
Executes line by line till it finishes or finds an error. It has no idea what comes in the next line.


## JS ENGINE

Takes the source and turns it into running code (assemblr, and then zeros and ones to be executed by the hardware)


JS is compiled (there is more than a pass to the program):
- if there is an syntactical error in the program it will not execute the preceding correct lines.
- the first pass is not concerned about executing the program, is concerned with understanding the program

In JS:
- check valid syntax, understanding
- run

Scripting lang would be bash, line one will run and when triws to run line 2, error.

The compilation may or may not produce a file that has to be deployed.



# Input & Output

## input
- forms
- prompt ("pls tell me your age") --> prompt statement

## output
- console.log() , prints to the stdoutput, in the browser is the console viewer.
- 'alert' statement, is not part of Javascript, is given to you by the browser.
statement expressions can or not have a return value, console will print the return value of statements.
e.g. the return vaue for an assigment statement is the value assigned:
a = 2;
>2 --> return value printed in the console

e.g.
var a; has no return value
> undefined --> return value printed in the console

# Operators

## Declaring variables
	var
 
## Assignment
 	=

## Arithmetic
	-
	+
	*
	/

## Compound assingment
	+=
	-=
	*=
	/=

 ## Increment, decrement

    --
    ++ 

 ## Object property access

    . (a dot)

## Equality

 	==  loose equals, same value
	=== (strict equals) same value same type
	!=  loose diff, diff value
	!== (strict not-equals) diff value diff type

 
## Comparison
 
    <
 	>
 	<=
 	>=

## void

    void 43; sets the variable to undefined

## Logical

 	&& (and)
 	|| (or)

# Operators precedence

    * /
    + -

- Force precedence using parentheses
- Execution is left to right, except modified by precedence forcing the executionof the right part of something before the left.
- The precedence order is only modified by using parentheses.

    a = b + 2 * foo( c * 3 )

    why is important? because it can change your calculation:
    
    2 * 3 + 4 = 10 or 14?
    is 10 as 2 * 3 is executed first, calculated first as per operator precedence
    
# Values and Types

- number 
        e.g.: 42
- string 
        e.g: "im a str" or 'im a str'
- boolean
        e.g: true false
        
- null and undefined 

- object
    - objects {}
    - arrays []
    - functions a{}

- symbol

        var a;
        typeof a;				// "undefined"

        a = "hello world";
        typeof a;				// "string"

        a = 42;
        typeof a;				// "number"

        a = true;
        typeof a;				// "boolean"

        a = null;
        typeof a;				// "object" -- weird, bug

        a = undefined;
        typeof a;				// "undefined"

        a = { b: "c" };
        typeof a;				// "object"




## Literals
- Values that are included directly in the source code are called literals.
- String literals are surrounded by double quotes "..." or single quotes ('...') -- the only difference is stylistic preference.
- number and boolean literals are just presented as is (i.e., 42, true, etc.).

## Converting types

### Coercion/Conversion or Explicit and implicit coersion

Printing values require them to be string. Artimethic operations requires values to be numbers.
Therefore you have to convert them.

#### Implicit coersion

    var a = 42;
    console.log(a) -> implicit conversion of a type to a string type.

    var n1 = "45";
    var n2 = '40';
    var sum = n1 + n2;  -> no implicit conversion, this will concatenate of 2 string types to a concatenated string, to convert string to numbers you need a Explicit conversion.

#### Explicit coersion using built in functions

    var a = Number(b);
    amount = "$" + String(amount)

# Comments

Should explain WHY, not WHAT. For the WHAT the code should explain it itself.
Optionally explain HOW if the code is particularly confusing.

## single line

    // This is a single-line comment, used to explain a statement

## multiline or block

    /*  But this is a multiline
        comment. used to explain blocks of code ...
        They can be put inline in the middle of a statement as it has a closing end symbol
     */
                      
## Doc
    /**
     * I am a documentation comment
     */


# Variables

Symbolic containers which content can vary.

Static typing or type enforcement, you declare the var in a type and only can hold that type.
Dynamic typing, Javascript, canhold any type of value during its lifetime.

Javascript has dynamic typing.

Convention: capitalized with separating underscores in between words.

vars have no type, values do.

## Variables declarations

        var a;
        var a = 45;
        let a = 45; ES6
        const a = 45; ES6
        function a(){};

## Constant - ES6

Declare a variable with a value and intend for that value to not change throughout the program.

Is only constant by convention -- there's nothing special in the language that prevents it from being changed.

ES6 allows the declaration of contants

    // as of ES6
    const TAX_RATE = 0.15;


# Code Block or Block

- One or more statements inside a curly-brace pair { .. }
- Tipically attached to control statements like if, while, do, etc.
- Does not need a semicolon to end it.

A standalone { .. } general block is valid, but isn't as commonly seen in JS programs. 
Typically, blocks are attached to some other control statement, such as an if statement (see "Conditionals") or a loop (see "Loops") or a function.

Blocks don't need semicolon to conclude them, statements do.

# Conditionals

    if(cond){
        ...
    }else{
        ...
    }
    
## Falsy and Truty

JavaScript defines a list of specific values that are considered "falsy" because when coerced to a boolean, they become false.

The specific list of "falsy" values in JavaScript is as follows:

        "" (empty string)
        0, -0, NaN (invalid number)
        null, undefined
        false

 Any other value not on the "falsy" list is automatically "truthy" -- when coerced to a boolean they become true.
 e.g.
 
        "hello"
        42
        true
        [ ], [ 1, "2", 3 ] (arrays)
        { }, { a: 42 } (objects)
        function foo() { .. } (functions)


Values that aren't already of an expected type are often coerced to that type.
The if statement expects a boolean, but if you pass it something that's not already boolean, coercion will occur.

# Loops

The loop runs until something is false.

## For

    for(var i = 0; i <=9; i = i + 1){

    }

The for loop has three clauses:
 - initialization clause: var i = 0;
 - conditional test clause: i <=9;
 - update clause: i = i + 1
 
 The for always runs, and it stops when the condition FAILS.
 
all are optional
        valid, and runs forever becasue the condition never FAILS
        
        for(;;){

        }

## While

    while(){

    } --> condition tested before first iteration.

    do{

    } while(); --> condition tested after first iteration, note the semicolon to close it.

## example

    for (a = 5 ; a < 10 ; a = a + 1){
        console.log(a);
    }

    conceptually it works like:  
    
    a = 5;
    while(true){
        is (a >= 10){
            break;
        }
        console.log(a);
        a = a + 1;
    }
    
    //it stops when condition is false

# Functions

- Named block of code that can be called
- Can receive params and return results


// when we receive the variables are called PARAMETERS
foo(param){


}
//when we call the function we pass ARGUMENTS
foo(arg);


//args are assigned to params ...


try to avoid accesing parent scope variables, use return. as doin git could bring side effects

if you dont put a return, implicititly returns undefined.

# Scope, or technically called "lexical scope"

In JavaScript, each function gets its own scope.

Scope is basically a collection of variables as well as the rules for how those variables are accessed by name. Only code inside that function can access that function's scoped variables.

A variable name has to be unique within the same scope.

Scopes can be nested, and the inner scope can access the outer scope's variables (bubbles)

But, the outer scope can not access the inner scope's variables (because those variable's were defined in the inner funcion scopes).

Lexical scope rules say that code in one scope can access variables of either that scope or any scope outside of it.

