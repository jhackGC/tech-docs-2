# => vs "function"

=> no return, no function keyword, no function name

    foo = () => 2;

    function foo(){
        return 2;
    }


## Issues: variations in syntax

## declaration
() => 3
_ => 3
x => 3
(...x) => 3
(x,y) => 3
var placeholders can be used as _ or x.

If more than 1 params needs parenthesis, e.g. (...x)

## body
in the concise form, it's an expression, not a statement, so all legal expressions are valid.
in JS statement are not always expressions, so, some statements wont be allowed
e.g. if you have a statement like try{}catch(){} , you have to wrap it inside {}

e.g. not valid

    x => try {3;} catch(e){}

e.g. valid, wrapped in {}

    x => { try {3; } catch(e){} }

It implies that the expression is being returned, implies the return keyword before it.

if the body has curly braces, then you ned to use the "return" keyword, if needed

### returning object, can be confused with the enclosing braces

    x => { y : pom }

that is not returning an object, you have to either

    x => { return { y : pom } }
or
    x => ({ y : pom })

so, is the code cleaner with so many variations?

() => 3
_ => 3
x => 3
(...x) => 3
(x,y) => 3
x => { try {3; } catch(e){} }
x => { return { y : pom } }
x => ({ y : pom })
x => { 3; }

### the arrow functions are anonymous ALWAYS
cons:
    - hard to debug
    - cant be referenced for later use unless you save them in a var.
    - the code does not explains itself by named functions


#### name inference

    var foo = x => 3;
    foo.name; // "foo"

Guess the name base don the var name it's been assigned, but, 99.99 of arrow
functions will probably be
arguments to some other function call.
Like for example,

    foo ( x => 3 )

And in this case, can't know the name you want to call the arrow function as the
argument does not have name

## Promises and "this"

traditional

    p.then( function(v){ return v.id } )

better

    p.then( function extractId(v){ return v.id } )

arrow

    p.then( v => v.id ) // easily throws exception when null or undefined

## PROS

    var obj = {
        id: 42,
        foo: function foo() {
            setTimeout(function () {
                console.log(this.id);
            }, 1000)
        }
    };

    obj.foo(); // 42 ? no, undefined instead

the "this" keyword points to the global obj as its binding rule is the default
setTimeout specs says that it invokes explicitly in the windows object.

Possible usual fix, while instead of using "Self" as the name bette ruse "context" as "this" is not a reference to
the function, it's a ref to the context.
But its a terrible option as you are forcing the "this" mechanism to the lexical mechanism

    var obj = {
        id: 42,
        foo: function foo() {
            var self = this;
            setTimeout(function () {
                console.log(self.id);
            }, 1000)
        }
    };

Better solution

    var obj = {
        id: 42,
        foo: function foo() {
            setTimeout(function () {
                console.log(self.id);
            }.bind(this), 1000)
        }
    };

Here you force the setting of the this keyword inside of the function, to the param passed, in this case the context
(this) of the surrounding context, function foo(), and when you later call obj.foo(), the this keyword of the foo
function will be set to the object that contains the called function, implicit binding I think, soooo "this" in
setTimeout(...) will be explicitly bound, hard bound, to obj.

But there is a better solution ...
As the arrow function DOES NOT HAVE A "this" KEYWORD, it can't be bound to a "this" keyword, so IF YOU REFERENCE THE
"this" keyword inside of an arrow function, it will AUTOMATICALLY LEXICALLY go up one level, and use the this keyword of
 the surrounding context

Sooo you can replace your

    var self = this;

or
    .bind(this)

code for arrow functions



This is the case where arrow functions SHINE

    var obj = {
        id: 42,
        foo: function foo() {
            setTimeout( () =>
                console.log(self.id);
            }.bind(this), 1000)
        }
    };

"this" cant be found so it references foo()'s "this"

## concise body of the arrow function
if you want ot avoid using {} you have to use EXPRESSION instead of statements

- if you have ony one EXPRESSION, you dont need (), and the return keyword is implicit. Returning the result of the execution of
that unique statement.

    () => 3;

- if you have more than one EXPRESSION, you have to concatenate many statements with a comma operator and surround them with ()

    () => (var a = 2, var b = 5, a + b)

The comma operator turns many expressions in one expresion chanined together


# EXPRESSION vs STATEMENT
STATEMENT: sentence
EXPRESSION: phrase

Expressions are made up of statements, phrases are made up of sentences
So, in JS, a statement can't be used instead of an expression , but a expression can be used in place of a statement.
