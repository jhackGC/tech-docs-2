

# Inheritance

## Classical Inheritance

Foo parent class
when a1 is intanstiated there is a COPY of behavior form parent to child

Bar inherits from Foo
- b1 instance of Bar
- b2 instance of Bar

    
    Foo -----> a1  (arrow goes in that direction as it is a copy)



Once copied, instance created, there is no relationship with the creator

Everyhting in inheritane means COPY

The mechanism in JS does not do COPY, so its not inheritance fully



## prototypal inheritance
IUts a falacy as prototypes are different from inheritance, they are different mechanisms and naming them similar wont 
change that but anyway.

    Foo.prototype <----- a1  (arrow goes in that direction as it is not a copy is a behavior LINK, a DELEGATION link)
    
arrows go from right to left, bottom to top, opposite of inheritance

**see js_inheritance.jpg diagram**

For years we have been trying to force the prototype mechanism to work as the inheritance mechanism (e.g. 
mixin pattern, copies behavior)

So, "prototypal inheritance" should be properly called BEHAVIOR DELEGATION, which is a design pattern.

in this code


    function Foo(who) {
        this.me = who;
    }
    
    Foo.prototype.speak = function () {
        alert("Hello, I am " + this.me + ".");
    };
    
    var a1 = new Foo("John");

    a1.speak(); //     
    
 a1 does not have a copy of speak method, it delegates 
 
 
 ## OOLO - Objects Linked to Other Objects
 same behavior, without the confusion 
 We only actually care in JS, about an object and its link to another and another up in the chain, so we can delegate
 
 The constuctors, the object creation, the .prototype references, the "new" keyword is just a distraction to get to 
 these three objects LINKED to each other
 
 - Foo.prototype
 - Bar.prototype
 - b1
 
 Can we create the objects without the distractions and get the same benefits?
 
 So we are going to simplify this code, pay attention at the mentioned objects and how they evolve.
 
 
 Initial code with "prototypal class approach"
 
 
     function Foo(who) {
         this.me = who;
     }
     
     Foo.prototype.identify = function () {
         return "I am " + this.me;
     }
     
     function Bar(who) {
         Foo.call(this, who);
     }
     
     Bar.prototype = Object.create(Foo.prototype);
     
     Bar.prototype.speak = function () {
         alert('Hello, ' + this.identify() + '.');
     }
     
     var b1 = new Bar("b1");
     
     b1.speak();
 
 Step 1: get rid of "new" constructors, that's class oriented thinking, more complex.
 
 so,
 
    var b1 = new Bar("b1");
    
 becomes
 
    var b1 = Object.create(Bar.prototype); // link b1 to Bar.prototype, which is what we want
    Bar.call(b1, "b1"); // temporarily I have to call the Bar function with b1 as the context ("this")
    
now we are not doing "class instantiation " anymore with the "new" keyword, just linking objects
now b1 is linked to Bar.prototype which is already linked with Foo.prototype



Step 2: get rid of constructor and prototype references.


    function Foo(who) {
        this.me = who;
    }
    
    Foo.prototype.identify = function () {
        return "I am " + this.me;
    }
    
    var Bar = Object.create(Foo.prototype);
    
    Bar.init = function (who) {
        Foo.call(this, who);
    }
    
    Bar.speak = function () {
        alert('Hello, ' + this.identify() + '.');
    }
    
    var b1 = Object.create(Bar);
    b1.init("b1");
    b1.speak(); // alerts

we dont have to add methods to the prototype, now directly to the Bar object

Object.create becomes the tool of choice as it creates the objects without all the other stuff

A this point we still have b1 linked to Bar, prototype which is also linked to Foo prototype

Step 3: get rid of prototypes and constructors, just leave objects connected by [[P]]

    var Foo = {
        init: function (who) {
            this.me = who;
        },
        identify: function () {
            return "I am " + this.me;
        }
    }
    
    var Bar = Object.create(Foo);
    
    
    Bar.speak = function () {
        alert('Hello, ' + this.identify() + '.');
    }
    
    var b1 = Object.create(Bar);
    b1.init("b1");
    b1.speak(); // alerts
 
 
 Foo is an object, Bar is another object that gets linked to Foo, b1 is an object that gets linked to Bar.
 So when we do b1.init, it goes up the chain to Foo and executes
 
        function (who) {
             this.me = who;
         },
         
 So when we do b1.speak(), it goes up the chain to Bar and executes this.identify(), which is found in Foo.
 
 So now we have the same funcitonality but we removed the syntax that is related with Object Oriented thinking, classes 
 thinking. It's just peer objects that delegates to each other.
 e.g. Foo can have utility methods to fallback on.
 
 # Questions
 You can delegate to ONly 1 object, as there is only 1 prototype per object.
 Do you want to shadow, polymorphism? not a good idea as you come back to the previous issues.
 If you choose behavior delegation then make this objects to have unqiue names for their unique tasks.
 Is more about reuse by delegation that polymorphism
 No constructors, if we need initialisation tasks better put them in methods that do it.
 
 Having the construction and initialisation in two diff steps makes it 2 lines of code , as compared with 1 line in a 
 constructor , 
 but gives you the possibility to execute construction and init, in different times.
 
 this approac , OOLO, is exaclty the same as the prototype approach, it does the same in the back, Object.create(), 
 but less code.
 
 
 Now we have a simpler diagram for this approach, see 04_03_OOLO.jpg
 
 
 # Object.create polyfill for <ES5
 
     if (! Object.create){
        Object.create = function (o){
            function F(){}
            F.prototype = o;
            return new F();
        }
     }
     
AS you see you have now all the prototype references and new constructors, we took all that from our code and hide it 
in an nice and clean utility

# Reflection in OOLO

see https://gist.github.com/getify/5572383

# QUiz

1. How is JS [[ Prototype ]] chain not like traditional / classical inheritance?
- [[P]] links objects, classical copies objects

2. What does "behavior delegation" mean and how does it describe object linking in JS?
- objects can delegate behavior using its linkage [[P]], to other objects up in the [[P]] chain

3. What is the benefits of the delegation design pattern?
- With delegation we are EMBRACING the fact that all objects continue to exists and they are dynamic and change, and 
that linkage that occurs is a dynamic linkage at runtime.
- With classes they are a sort of snapshot copy that occurs at instantiation time. If I change the parent at some later 
time, it does not affect the child
- With delegation we embrace the idea that the parent cna change and the child can access those changes at runtime
- Delegation is more powerful than classes because you can implement classes in delegation, but you cant implement 
delegation in classes
- Cons: you can Shadow cleanly.
- Cons: everything is public, you loos encapsulation, different from modules were you can hide.  


# summary
Mostly use modules , so you can hide.
If you need to reuse code between objects (rarely), use delegation over prototypal inheritance.


# exercise 4

see diagram in ex4.jpg

Instructions

1. In this exercise, you will practice what you learned about creating an object that "inherits from" 
(aka, "delegates its behavior to") another object. The "ex4.js" file provides you a simple definition for a "Widget" 
object, as well as the start of a "Button" object.

2. Finish out the definition of the `Button` object:
  - define `Button` so that it "inherits from" (aka "delegates to") `Widget`.
  - the Button constructor should have a `width`, `height`, and `label` parameter passed to it.
  - uncomment the Button's `render` and `onClick` function shells, and correctly define them.
  - make the `onClick` handler print with the console "Button ___ clicked!", where "___" is that particular button's 
  label

3. Uncomment the `$(document).ready(..)` handler at the bottom of the file, and correct the instantiations of the two 
button objects, so that they create buttons with 2 different sizes and labels.

4. BONUS: The code given to you is clearly in the "old style" function/constructor/new style of defining objects and 
"inheritance". Using what we learned about OLOO-style code with `Object.create()`, rewrite the code using behavior 
delegation and OLOO-style. Hint: don't think of parent/child, think of two peer objects, one who delegates to the other.


    function Widget(width,height) {
        this.width = width || 50;
        this.height = height || 50;
        this.$elem = null;
    }
    
    Widget.prototype.render = function($where){
        if (this.$elem) {
            this.$elem.css({
                width: this.width + "px",
                height: this.height + "px"
            }).appendTo($where);
        }
    };
    
    function Button(/* ... */) {
    /*
        ...
        this.$elem = $("<button>").text(this.label);
    */
    }
    
    /*
    Button -> render = function($where) {
        // call the parent render()
        // add a click handler -> onClick
    }
    
    Button -> onClick = function(evt) {
        console.log("...");
    }
    
    $(document).ready(function(){
        var $body = $(document.body);
        var btn1 = ...;
        var btn2 = ...;
    
        btn1.render($body);
        btn2.render($body);
    });
    */


First
Class orientation tells us that we should ahve a render method in the parent class which is sort of generic or abstract
and our child class would override the render and add additional behavior

We have the parent constructor

    // Widget constructor
    function Widget(width,height) {
        this.width = width || 50;
        this.height = height || 50;
        this.$elem = null;
    }


Lets start defining out child Button constructor

    // Button constructor
    function Button(width, height, label) {
        this.$elem = $("<button>").text(this.label);
    }
    
We want to call our parent from the child, we dont have the keyword "super" in JS, so we do manual polymophism

    // Button constructor
    function Button(width, height, label) {
    
        // calls the Widget function, with button as "this" and the params,
        // some way of saying super(width, height)
        Widget.call(this, width, height);
    
        // The parent constructor does not know anything about the 'label' so we have to set it here, extra functionality
        // in the child
        this.label = label;
    
        this.$elem = $("<button>").text(this.label);
    }
    
Next, we need to start adding methods to the public API, so the way we do it in the classical approach is:

    Button.prototype.render = function ($where) {
        // call the parent render()
        // similar way that we called the parent constructor
        Widget.prototype.render.call(this, $where);
    
        // add a click handler -> onClick
        this.$elem.bind("click", this.onClick().bind(this)) // make a hard binding so its not lost in the callback
    }

add event handler to Button (it will forcibly be PUBLIC)

    Button.prototype.onClick = function (evt) {
        console.log("Button '" + this.label + "' clicked! ");
    }
    
    
VERY IMPORTANT: link the two prototypes

    Button.prototype = Object.create(Widget.prototype);

once done create the objects, execute the constructors ...

    var btn1 = new Button(10, 30, 'hola');
    var btn2 = new Button(40, 90, 'hello');
    

Final 
    
    // Widget constructor, handling width and height
    function Widget(width, height) {
        this.width = width || 50;
        this.height = height || 50;
        this.$elem = null;
    }
    
    
    Widget.prototype.render = function ($where) {
        if (this.$elem) {
            this.$elem.css({
                width: this.width + "px",
                height: this.height + "px"
            }).appendTo($where);
        }
    }
    
    
    // Button constructor
    function Button(width, height, label) {
    
        // calls the Widget function, with button as "this" and the params,
        // some way of saying super(width, height)
        // "super" constructor call
        Widget.call(this, width, height);
    
        // The parent constructor does not know anything about the 'label' so we have to set it here, extra functionality
        // in the child.
        // "this" is the newly created object linked [[P]] to Button.prototype
        this.label = label;
        console.log('setting this.$elem', this.$elem);
    
        this.$elem = $("<button>").text(this.label);
        console.log('after setting this.$elem', this.$elem);
    
    }
    
    // link the two prototypes with Object.create(...)
    // 1 - creates a brand new object
    // 2 - links it to the passed param
    // so, here, we created a new object, linked it internally to Widget.prototype, and assigned to Button.prototype
    // replacing the original Button.prototype
    Button.prototype = Object.create(Widget.prototype);
    
    
    // add the "overloaded" method to Button.prototype
    Button.prototype.render = function ($where) {
        // call the parent render()
        // similar way that we called the parent constructor
        // "super" call
        Widget.prototype.render.call(this, $where);
    
        // add a click handler -> onClick
        this.$elem.click(this.onClick.bind(this)) // make a hard binding so its not lost in the callback (when clicked)
    }
    
    
    Button.prototype.onClick = function (evt) {
        console.log("Button '" + this.label + "' clicked! ");
    }
    
    
    $(document).ready(function () {
        var $body = $(document.body);
    
        // "new"
        // 1 - creates a brand new object
        // 2 - links it to the Function's prototype
        // 3 - puts the newly created and linked object as the "this" keyword
        // 4 - executes the function and returns "this" if no return in function
        var btn1 = new Button(10, 30, 'hola');
        var btn2 = new Button(40, 90, 'hello');
    
        btn1.render($body);
        btn2.render($body);
    })

## exercise 4 with OOLO

we only want
 - Widget.prototype
 - Button.prototype
 - btn1
 - btn2

         // OOLO approach
         // we only want
         // - Widget.prototype
         // - Button.prototype
         // - btn1
         // - btn2

         // Step 1: get rid of "new" constructors, use Object.create
         // Step 2: get rid of constructors, use init prop in objects
         // Step 3: link them with Object.create(...)
         // Step 4: add additional methods to lower object
         // Step 5: put generic methods, reusable methods, in upper objects in the chain


         var Widget = {
             init: function (width, height) {
                 this.width = width || 50;
                 this.height = height || 50;
                 this.$elem = null;
             },
             // renamed "render" to "insert", so buttons can have render and use Widget.insert, instead of having the same method
             // name and overriding it, and causing polymorphic shadowing headaches
             insert: function ($where) {
                 if (this.$elem) {
                     this.$elem.css({
                         width: this.width + "px",
                         height: this.height + "px"
                     }).appendTo($where);
                 }
             }
         }

         // Step 3
         // link the two prototypes with Object.create(...)
         // 1 - creates a brand new object
         // 2 - links it to the passed param
         // so, here, we created a new object, linked it internally to Widget.prototype, and assigned to Button.prototype
         // replacing the original Button.prototype
         //
         //Create one object (Button) that in LINKED for delegation to another object (Widget).
         var Button = Object.create(Widget);

         // Step 4
         Button.setup = function (width, height, label) {

             // change Widget.call(this, width, height); for this.init, a delegated call.
             // now I can take advantage of delegation because the method names are different
             // and properly delegate to the utility object
             this.init(width, height);

             this.label = label || "Default";

             this.$elem = $("<button>").text(this.label);
         }

         // renamed fron "render" to "build" to avoid shadowing
         Button.build = function ($where) {
             // delegate the call to the peer
             this.insert($where);

             // add a click handler -> onClick
            // make a hard binding so its not lost in the callback (when clicked)
             this.$elem.click(this.onClick.bind(this))
         }

         Button.onClick = function (evt) {
             console.log("Button '" + this.label + "' clicked! ");
         }


         $(document).ready(function () {
             var $body = $(document.body);

             // Object.create(...)
             // 1 - creates a brand new object
             // 2 - links it to the param passed object
             var btn1 = Object.create(Button);
             btn1.setup(10, 30, 'hola');

             // now we have two steps, create and init
             var btn2 = Object.create(Button);
             btn2.setup(40, 90, 'mundo');

             btn1.build($body);
             btn2.build($body);
         })

## Transform the utility object to a module.

        // wrap the API, the methods, in an IIFE
       var Widget = (function () {
           return {
               init: function (width, height) {
                   this.width = width || 50;
                   this.height = height || 50;
                   this.$elem = null;
               },
               insert: function ($where) {
                   if (this.$elem) {
                       this.$elem.css({
                           width: this.width + "px",
                           height: this.height + "px"
                       }).appendTo($where);
                   }
               }
           }
       })();


       var Button = (function () {

           var _width, _height, _label, $elem;

           var publicAPI = {};

           publicAPI.setup = function (width, height, label) {

               this.init(width, height);

               _label = label || "Default";

               $elem = $("<button>").text(this.label);
           };

           publicAPI.build = function ($where) {
               this.insert($where);

               $elem.click(this.onClick.bind(this));
           };

           publicAPI.onClick = function (evt) {
               console.log("Button '" + _label + "' clicked! ");
           }

           return publicAPI;
       })();

Now we have two independent and ENCAPSULATED modules, that want to talk with each other? sharing state? but now the state
is hidden, mhhm

Soon, you will see that the delegation and modules pattern dont work together as the idea of delegation would be
to use other objects methods, but now they are hidden, and the closures are independent.

i.e.

when calling from Button to Widget something like:

    var Button = (function () {

           var _width, _height, _label, $elem;

           var publicAPI = {};

           publicAPI.setup = function (width, height, label) {

               Widget.init(width, height);


and Widget will execute

        var Widget = (function () {
                return {
                    init: function (width, height) {
                        _width = width || 50;
                        // who is "this" ?? I cant see _width from here
                        // as I am in another closure
                        ...
                    },

 You could do this, make your publicAPI to delegate to Widget, so they are still modules and are encapsulated
 but now they can share the publicAPI as it is defined in Button but linked to Widget

    var Button = (function () {

        var _width, _height, _label, $elem;

        var publicAPI = Object.create(Widget);

        publicAPI.setup = function (width, height, label) {

            this.init(width, height);

            publicAPI.width = width; // still public :-/
            publicAPI.height = height; // still public :-/

            _label = label || "Default";

            $elem = $("<button>").text(this.label);
        };

        publicAPI.build = function ($where) {
            this.insert($where);

            $elem.click(this.onClick.bind(this));
        };

        publicAPI.onClick = function (evt) {
            console.log("Button '" + _label + "' clicked! ");
        }

        return publicAPI;
    })();

 Mixing these two patterns , keeps things private and expose some functionality to delegate to, is a bit weird