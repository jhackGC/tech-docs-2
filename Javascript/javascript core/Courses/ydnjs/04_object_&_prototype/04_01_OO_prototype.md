# Object oriented

## Common OO patterns
### Singleton
### Observer

## Prototype mechanism
Every single "object" is built by a constructor function, actually a constructor call, as, wehn we call new with a function
it creates an object. That is not the same thing as instantiating a class, it is creating an object.
In JS you can create an object without a class, that's why it is not instantiated, just an object is created.
So these constructors in JS are not instantiated from classes, they are created out of thin air.
But every single object that gets built is done so with this constructor calls (with "new") , either directly or indirectly.

The constructor makes and OBJECT that is LINKED TO its own prototype.


## the "new" keyword 

When used before a function: 

1 - creates a brand new object
2 - links this object internally (prototype linkage) to the function's prototype object (previously created when 
declaring the function)
3 - sets the newly created object as the "this" keyword in the function and executes the function 
4 - returns "this" if the function does not return anything excplicitly 



## Prototypes explanation

1.    function Foo(who) {
2.        this.me = who;
3.    }
4.    
5.    Foo.prototype.identify = function () {
6.        return "I am " + this.me;
7.    }
8.    
9.    var a1 = new Foo("a1");
10.   var a2 = new Foo("a2");
11.    
12.    a2.speak = function () {
13.        alert("Hello, " + this.identify() + ".");
14.    };
15.    
16.    console.log(a1.constructor === Foo); // true
17.    a1.constructor === a2.constructor;
18.    a1.__proto__ === Foo.constructor;
19.    a1.__proto__ === a2.__proto__;
    


Before the first line is executed the JS engine has available a function called Object, and that function points to an 
object, is LINKED to an object through a prop called ".prototype".

so ".prototype" has several functions like:
- toString
- valueof
- etc

            Object (Function)
            .prototype ----------->  Object's prototype's object (Object)
                       <-----------  .constructor
                                     - toString
                                     - valueof


In line 1 a function is created called Foo, that links to a ".prototype" object
And the linked object has a link in the opposite direction, pointing to the function, the link is called ".constructor"

        Foo (Function)
        .prototype ----------->  Foo's prototype object (Object)
                   <-----------  .constructor 

.constructor could have had any name, it does not points to the function that constructed this object, it looks like 
it should, but it doesn't.

In line 5 we start adding properties to this .prototype object, we put "identify" directly on the object


        Foo (Function)
        .prototype ----------->  Foo's prototype object (Object)
                   <-----------  .constructor 
                                 identify
                                 
                                 
In line 9 we execute "new Foo(...)" , four things happen when a new Function() gets executed
    1 - A brand new object gets created
    2 - Linked to the function's prototype object
    3 - the object will the the "this" keyword in the execution of Foo()
    4 - returns "this"
    
    
        Foo (Function)
        .prototype ----------->  Foo's prototype object (Object)
                   <-----------  .constructor 
                                 identify
                                     
                                 aNewObject (linked to Foo's prototype object)
                                   - this aNewObject is the "this" keyword now.
                                   
So in line 2 when we add a prop to "this" we put it in the newly created object, and in line 9 that newlyCreated object
 with the prop added is then returned and set into a1. Same for line 10, another execution of Foo and it is assigned to a2                
                                   
        Foo (Function)
        .prototype ----------->  Foo's prototype object (Object)
                   <-----------  .constructor 
                                 identify
                                 
                                     
                                 a1
                                 aNewObject (linked to Foo's prototype object)
                                    (this aNewObject is the "this" keyword now when the function is executed)
                                  - me = "a1"
                                   
                                 a2
                                 anotherNewObject (also linked to Foo's prototype object)
                                    (this anotherNewObject is the "this" keyword now when the function is executed)
                                  - me = "a1"
                                   
In line 12, we add a method, or to be precise, a prop with a function, to a2   
    
    12. a2.speak   = function(...){...} 
    
    see diagram for details

In line 16

    16.    a1.constructor === Foo;
    
    see diagram
    
There is no constructor in a1, so if you ask for the constructor and it doesnt exist , it goes to the linked prototype 
object and try to find it, and so on higher in the prototype chain.
The links are called 'prototype links', tha linkages are calles [[ Prototype ]]
They are internal linkages, not visible from outside.


 So, when I ask for a1.constructor, it will try to find it in the object, it won't find it so it starts to follow the prototype chain up, 
 it goes first to its link trough [[Prototype]] and lands in Foo's prototype object, which has a link called .constructor that point to Foo().
 So a1.prototype === Foo
 This lookup IS NOT SAYING that Foo is the function that constructed me, it is just a coincidence in this example.
 
 
 In line    
 
    18.    a1.__proto__ === Foo.constructor; // false

There is no __proto__ property in the a1 object, so it follows the [[ P ]] internal linkage, but the prop does not 
exists in its [[ P ]] linkage, Foo's prototype object, so it keeps going up the [[ P ]] chain up to the built-in Object 
function's .prototype object, and there is one prop called like that there. See diagram. 

__proto__ is not actually a property is a getter function, so in line 17 it is like making a function call.

*That function call does RETURN the internal prototype linkage of whatever the "this" binding is.*

    __proto__ -> return this.[[ P ]]

* so we can say that the public link for the internal link is __proto__ *

or that __proto__ is a public property that references an internal characteristic.


Then, for a1, it returns the [[ Prototype ]] linkage of a1 to the Foo's function .prototype object (the one that has the identify function/method)
Imagine that we actually runa function 
--> a1.__proto__()  --> the "this" keyword when that function runs would be a1 (when a function is called from a container 
object, tha container object becomes the "this" keyword)
So __proto__ will return a1's [[ P ]] which is Foo's object prototype

An issue with __proto___ is that is not standarised, it was invented by mozilla and adopted by all less IE.
Until ES6, when it was standarised and IE adopted it in IE 11.

To estandarise it before ES6, they provided a method to access it:

    Object.getPrototypeOf(); an utility to get __proto__ if browser has
    
so for IE9 to IE11 you can use 

    Object.getPrototypeOf(a1)

    so 
        
    console.log('a1.__proto__ === Object.getPrototypeOf(a1)', a1.__proto__ === Object.getPrototypeOf(a1)); // true, using utility function


for <IE9 there is another way, a very hacky way, which is : 

    a1.__proto__ === a2.constructor.prototype
    
    so 
    
    console.log('a2.__proto__ === a2.constructor.prototype', a1.__proto__ === a2.constructor.prototype); // true

So, 3 ways to get to the internal linkage of an object.

1 - All browsers + IE11 (ES6), __proto__ standarised,
    
    a1.__proto__
    
2 - All Browsers + IE9 to IE11 (ES5)

    Object.getPrototypeOf(a1)
    
3 - All Browsers + <IE9 (ES3)

    a1.constructor.prototype
    
   the problem with this option is that both the constructor prop and the prototype prop, are props that are defaulted to 
   __prop__, but being a prop makes them writable, so they can be changed, if changed, you lose the reference to __proto__
    


### Full test code
    
    function Foo(who) {
        this.me = who;
    }
    
    Foo.prototype.identify = function () {
        return "I am " + this.me;
    }
    var a1 = new Foo("a1");
    var a2 = new Foo("a2");
    a2.speak = function () {
        alert("Hello, " + this.identify() + ".");
    };
    
    console.log('a1.constructor === Foo', a1.constructor === Foo); // true
    console.log('a1.constructor === a2.constructor', a1.constructor === a2.constructor); // true
    // console.log('a1.__proto__', a1.__proto__);
    // console.log('Foo.constructor', Foo.constructor);
    console.log('a1.__proto__ === Foo.constructor', a1.__proto__ === Foo.constructor); // false, Foo.constructor points to Foo, no to its prototype object
    console.log('a1.__proto__ === Foo.prototype', a1.__proto__ === Foo.prototype); // true
    console.log('a1.__proto__ === a2.__proto__', a1.__proto__ === a2.__proto__); // true
    
    
    console.log('a1.__proto__ === Object.getPrototypeOf(a1)', a1.__proto__ === Object.getPrototypeOf(a1)); // true, using utility function
    console.log('a2.constructor === Foo', a2.constructor === Foo); // true
    console.log('a2.__proto__ === a2.constructor.prototype', a1.__proto__ === a2.constructor.prototype); // true
    
    
## Prototype Linkage explanation

Call function in a1

    a1.identify

It goes to a1, it's not there, follows the [[P]] to the Foo's prototype object, and it finds it there    

**So one of the benefits of the prototype linkage is that we can delegate to a different object to handle a method call 
or a property reference**

All the references a1, a2, a3, ... etc. will point to the same [[P]]

So as identify has a reference to "this" in the code, each object would be the "this" (a1, a2, a3 ...) , for implicit 
linking of the "this" keyword

       Foo.prototype.identify = function () {
            return "I am " + this.me;
       }

That is exactly what we want so methods defined in the constructor call prototype become available to all the objects 
created with that constructor call (new Foo())

So the this mechanism works well when dealing with delegation of the prototype chain ONLY WHEN WE BEHAVE BY THE RULES

We can override this "inherited" method, with is actually SHADOWING the prototype property.
Properties in the prototype chain can shadow each other

    a1.identify = function b(){
        console.log('I am a1 own identify function');
    }
    
    
One of the benefits of polymorphism in the Class pattern, is to be able to call a method with the same name at diff levels

But, to implement that is JS could be troublesome as:


    //shadowing with "explicit polymorphism:
    a1.identify = function () {
        alert("Hello, " + Foo.prototype.identify.call(this) + ".");
    }
    
    console.log('a1.identify() after 2nd shadowing: ', a1.identify());

So, here, to implement "polymorphism" in JS, with shadowing and be able to use the same method same in various levels 
of your prototype chain, you have to write that type of hacks. Thats what you have to do if you want ot work with Classes
in JS.

But if you call the new method with another name, you can call the prototype method with no hacks.


    //not shadowing
    a1.identify2 = function () {
        alert("Hello, " + this.identity + ".");
    }
    
    console.log('a1.identify() after 2nd shadowing: ', a1.identify());



OR



    1.    function Foo(who) {
    2.        this.me = who;
    3.    }
    4.    
    5.    Foo.prototype.identify = function () {
    6.        return "I am " + this.me;
    7.    }
    8.    
    9.    var a1 = new Foo("a1");
    10.   var a2 = new Foo("a2");
    11.    
    12.    a2.speak = function () {
    13.        alert("Hello, " + this.identify() + ".");
    14.    };
    
            a2.speak();

**So, its much easier to DELEGATE that SHADOW (Classes)**

## lexical scope vs this mechanism
they dont cross with each other
- in the lexical, you traverse up in the scopes if you dont find some prop, go up in the bubbles
- in the this or prototype mechanism,  you traverse up in the prototype chain using object linkage,
 if you dont find some prop, go up in the prototype chain using the prototype links
 
 
# Prototype object linking

Here, we ar etrying to create a Class (Foo function), and add a method to it, Foo.prototype.identify , and then
we try to create another class, Bar, that inherits from Foo.


    function Foo(who) {
        this.me = who;
    }
    
    Foo.prototype.identify = function () {
        return "I am " + this.me;
    }
    
    function Bar(who) {
        Foo.call(this, who);
    }
    
    // Bar.prototype = new  Foo()
    
    // Or ...
    Bar.prototype = Object.create(Foo.prototype);
    // NOTE: .constructor is borked here need to fix ...
    
    
    Bar.prototype.speak = function () {
        alert('Hello, ' + this.identify() + '.');
    }
    
    var b1 = new Bar("b1");
    var b2 = new Bar("b2");
    
    b1.speak();
    b2.speak();
    
    
So, you need Bar's prototype to extend Foo's prototype, like     

    Bar.prototype = Object.create(Foo.prototype);

what you really need is BAr prototype to LINK TO Foo's prototype

You could try and do 

    Bar.prototype = new  Foo() 
    // assigning a bran new object that is linked the Foo's prototype, to Bar's prototype
    
But that will have the side effect, that it will EXECUTE the constructor Foo() and add properties to Bar like the prop "me"
So we can use Object.create() (standarised in ES5, and for <ES5 the is a simple polyfill)

    Bar.prototype = Object.create(Foo.prototype);

It does the first 2 of the 4 steps the "new" keyword does
1 - creates a brand new object
2 - links it to Foo.prototype
3 - NOT EXECUTED - as there is not constructor in Foo.prototype
4 - NOT EXECUTED - NO CONSTRUCTOR NO NEED TO RETURN IT

It creates a brand new object linked to Foo.prototype and assigns it to Bar.prototype

So its good for our need of copying/assign function prototypes without executing the function.

So, when we do

    b1.speak();

1 - It will look for the speak prop in b1, not found, delegate the call to upper prototype ...
2 - goes to b1 prototype to find speak(), it finds it, and executes  this.identify()
3 - so, who is "this", the b1 object (for implicit binding of "this", a function called via an object)
"this" will always be b1 even if we execute the code 15 levels up in the chain.
4 - it tries to find identify in b1, not found, delegate the call to upper prototype
5 - so, it goes to b1 Bar prototype to find identify(), not found, keeps going up in the chain
6 - goes up to Foo prototype as linked in line 

    Bar.prototype = Object.create(Foo.prototype);

and finds identify() in Foo's prototype and executes this.identify()

chain: 
b1 -> Bar prototype (finds speak and executes), now needs to find identify() -> starts again in b1 -> Bar prototype -> 
Foo prototype  


## Another issue
What happens when you call

    Bar.prototype = Object.create(Foo.prototype);
    // NOTE: .constructor is borked here need to fix ...
    b1.constructor
    
We would want the b1.constructor to be the Bar function , IF .constructor means that b1 was constructed by.
But ...
b1 has a constructor prop on it? no
Goes to Bar prototype, does it have a constructor prop on it? not anymore as:
    
- the default .constructor was created when doing 

         function Bar(who) {
             Foo.call(this, who);
         }
         
- but then we replaced it with Foo prototype created by the Object.create(Foo.prototype), and because it was constructed
 that way, that prototype DOES NOT HAVE a .constructor.

So, we delegate the search to Foo's prototype, it finds it and it points to Foo's constructor which is the Foo Function.

So b1.constructor === Foo

    console.log(b1.constructor === Foo); // true
    
But you could fix it by adding the .constructor prop to Bar prototype, and point it manually at Bar, but in that case you 
have created an innumerable property, and that could break for "for in" loops ...

It sucks, that's why using JS for Classes requires libraries to avoid having to write all this code.
Syntactic issues to force JS to behave like Classes

### Link review

b1 -- [[Prototyped linked to ]] --> Bar.prototype  -- [[Prototyped linked to ]] --> Foo.prototype

see diagram 04_01_prototype.jpg

## Linked Prototype Diagram

see diagram 04_02_prototype_object_links.jpg

Print it to follow this concept in your code ...

Take away, the consistency
e.g.

When we said and defined 

    Function.prototype.bind
    
and then Foo could call Foo.bind

Tht is possible because Bar and Foo are objects or functions , that have an internal [[ P ]] linkage to Function's prototype
so they delegate to Function prototype, that is how they get .call, .apply and .bind, see diagram 04_02_prototype_object_links.jpg

So all the mechanisms that are found trough the language are explainable thru these relationships, which is a nice internal consistency

BUt, when we see the diagram, the stuff is happening mostly in the squares, the objects, rather than the Functions
it would be good to be able to see or use only the squares, the objects

# Quiz

What is a constructor?
- AKA constructor call. It is a function that is called with the "new" keyword in front of it (.constructor is a property)

What is [[ Prototype ]], the prototype linkage, and where does it come from?
1. Is a linkage from one object to another object. It is create din two ways:
    - We can get that linkage from Object.create(...), which just links it to another arbitrary object
    - Or we can get it as the step 2 of the constructor function
    
2. How does the [[ Prototype ]] affect an object?
    - It gives the object a prototype chain to rely on, you can call a property or method on an object reference, and if it 
    can't handle that property or method reference, it delegates up to the prototype chain.
    
3. How do we find out where an object's [[ Prototype ]] points to? (there are 3 ways)
    1. __proto__ (dunder proto)
    2. Object.getPrototypeOf(obj) (utility)
    3. obj1.constructor.prototype
    
    
### this redux
When dealing with the prototype chain, we still have the same issues regarding the "this" binding.  



    function Foo(who) {
        this.me = who;
    }
    
    Foo.prototype.speak = function () {
        alert('Hello, ' + this.me + '.');
    }
    
    var a1 = new Foo("a1");
    
    $("#speak").click(a1.speak);
    
Jquery will treat "this" as th button clicked, same issues as with a normal callback function, no special behaviour here
 just for being a function delegated in the prototype chain.

        alert('Hello, ' + this.me + '.');
        
        
        
# Exercise


# Instructions


1. Using what you learned about `prototype` to construct an object instance, modify your previous code to not use
module/encapsulation pattern, but instead create a `this` based object.
Your public API should stay the same from exercise 2 (although everything will be public now).
The main difference will be that you have a constructor function called "NotesManager" (or whatever), and then you
will need to create an instance of that object, and can call it something useful, like "myNotes".

2. Pay particular attention to your event handlers and what we learned about how `this` gets reassigned.
What have we learned about how to fix that?

3. Because a `this` based object does not have "private" (encapsulated) data, your data will be publicly available
on the instance, as well as all your helper methods.
How does this change the maintainability and robustness of your code and implementation?

4. What benefits do you see to structuring your code this (`prototype`-based) way? What are the tradeoffs?


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
    
    
    $(document).ready(
        NotesManager.init({
            doc: $(document),
            notes: $("#notes"),
            new_note: $("#new_note"),
            add_note: $("#add_note"),
            open_help: $("#open_help")
        })
);




Solution Steps:
- Remove the wrapping IIFE function
- create a function (that will have a prototype object associated with it).
- start adding those function properties or methods to the prototype
- modify/replace the references to internal state in the previous module approach, for references to "this"











## about point 2 - how to treat event bindings
    NotesManager.prototype.showHelp = function () {
        this.$domRefs.help.show();
    
        document.addEventListener("click", function __handler__(evt) {
            evt.preventDefault();
            evt.stopPropagation();
            evt.stopImmediatePropagation();
    
            document.removeEventListener("click", __handler__, true);
            this.hideHelp(); 
        }.bind(this), true);
    }
    
We have the issue here that "this" will be the button, as the cant be sure what "this" will be in a callback, 
and in this case JQUery will replace it with an instance of the button.

-  one solution would be to fix this with hard binding
but that creates another problem, when we try to remove the listener callback function, unbind it, for that we use a 
named function so we can remove the listener later on, its called __handler__(evt){...}
but I cant unbind it anymore as the name of the function isnt actually the function that was bound ...
the function that was bound was that new hardbound function, we cant find the named function anymore

- another option is to jump and abandon the "this" mechanism, and fallback into lexical scope with


            NotesManager.prototype.showHelp = function () {
                 this.$domRefs.help.show();
                 
                 var self = this;
                 
                 document.addEventListener("click", function __handler__(evt) {
                     evt.preventDefault();
                     evt.stopPropagation();
                     evt.stopImmediatePropagation();
             
                     document.removeEventListener("click", __handler__, true);
                     self.hideHelp(); 
                 }, true);
             }
             
Using  var self = this forces a lexical scope variable , and is not generally a good practice as it may show that
you dont understand how "this" and linkage works, and you have to fallback to lexical scope.
But, for this case is a far easier way than another.

same treatment for the other callback function calls

    NotesManager.prototype.init = function (domRefs) {
        // cache references to the DOM elements we need to manage
        this.$domRefs = domRefs;
    
        // build the initial list from the existing `notes` data
        var html = "";
        for (var i = 0; i < notes.length; i++) {
            html += "<a href='#' class='note'>" + this.notes[i] + "</a>";
        }
        this.$domRefs.notes.html(html);
    
        // listen to "help" button
        this.$domRefs.open_help.bind("click", this.handleOpenHelp.bind(this));
    
        // listen to "add" button
        this.$domRefs.add_note.bind("click", this.handleAddNote.bind(this));
            
        ...
        
        
 at the end we remove all the varaibles and just create an object bound to the prototype and start calling methods on it
 
 
    var myNotes = new NotesManager();
    
    
    // assume this data came from the database
    myNotes.loadData([
        "This is the first note I've taken!",
        "Now is the time for all good men to come to the aid of their country.",
        "The quick brown fox jumped over the moon."
    ]); 
    
And finally as we need to have soe state to tack the notes we add it the function scope, so it would act as object state

    function NotesManager() {
        this.notes = [];
    };
    
    
 # Module pattern vs Class pattern
 Probably the Module is more practical and easier to implement