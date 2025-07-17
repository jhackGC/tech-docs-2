--------------------------------------------------------------------------------------------------------
OBJECTS
--------------------------------------------------------------------------------------------------------



syntax
---------------------------------------------------
Literal syntax:

var myObj = {
	key: value
	// ...
};

The constructed syntax:

var myObj = new Object();
myObj.key = value;


types
---------

primitives
----------
	- string
	- number
	- boolean
	- null
	- undefined

- object
	- functions (object subtype or complex-primitive)
		function is a sub-type of object (technically, a "callable object"). Functions in JS are said to be "first class" in that they are basically just normal objects (with callable behavior semantics bolted on), and so they can be handled like any other plain object.
	- Arrays (object subtype or complex-primitive)
		Arrays are also a form of objects, with extra behavior. The organization of contents in arrays is slightly more structured than for general objects.
		String
	- Number (built-in object)
	- Boolean (built-in object)
	- Object (built-in object)
	- Function (built-in object)
	- Array (built-in object)
	- Date (built-in object)
	- RegExp (built-in object)
	- Error (built-in object)

	 in JS, these are actually just built-in functions. Each of these built-in functions can be used as a constructor (that is, a function call with the new operator -- see Chapter 2), with the result being a newly constructed object of the sub-type in question.

var strPrimitive = "I am a string";
typeof strPrimitive;							// "string"
strPrimitive instanceof String;					// false

var strObject = new String( "I am a string" );
typeof strObject; 								// "object"
strObject instanceof String;					// true


	 ### Useful TIPS
	 -------------------------------
	 // inspect the object sub-type
	Object.prototype.toString.call( strObject );	// [object String]

	The primitive value, is not an object, it's a primitive literal and immutable value. To perform operations on it, such as checking its length, accessing its individual character contents, etc, a String object is required.


	var strPrimitive = "I am a string";

	console.log( strPrimitive.length );			// 13

	console.log( strPrimitive.charAt( 3 ) );	// "m"

In both cases, we call a property or method on a string primitive, and the engine automatically coerces it to a String object, so that the property/method access works.
Same for numbers and booleans. They will be coerced to the obj form.
null and undefined don't have obj forms.
Date only has a object form not a literal.

Objects, Arrays, Functions, and RegExps (regular expressions) are all objects regardless of whether the literal or constructed form is used. The constructed form does offer, in some cases, more options in creation than the literal form counterpart. Since objects are created either way, the simpler literal form is almost universally preferred. Only use the constructed form if you need the extra options.

Contents:
--------------

It's important to note that while we say "contents" which implies that these values are actually stored inside the object, that's merely an appearance. The engine stores values in implementation-dependent ways, and may very well not store them in some object container. What is stored in the container are these property names, which act as pointers (technically, references) to where the values are stored.

var obj = {
	a: 'value'
}

key access to property/content: obj['a']
property access to property/content: obj.a
They are the same but obj[..] allows any UTF-8/unicode string, and property access no. e.g. obj['Funny Day - $']

As the obj[..] method allows a string as key, we can programatically specify the location, build the key on the fly.
e.g. 
var key = 'a';
obj[key];

In objects, property names are always strings. If you use any other value besides a string (primitive) as the property, it will first be converted to a string. This even includes numbers, which are commonly used as array indexes, so be careful not to confuse the use of numbers between objects and arrays.

Computed Property Names
--------------------------
The myObject[..] property access syntax we just described is useful if you need to use a computed expression value as the key name, like myObject[prefix + name]. But that's not really helpful when declaring objects using the object-literal syntax.

ES6 adds computed property names, where you can specify an expression, surrounded by a [ ] pair, in the key-name position of an object-literal declaration:

var prefix = "foo";

var myObject = {
	[prefix + "bar"]: "hello", // ES2015
	[prefix + "baz"]: "world" // ES2015
};

myObject["foobar"]; // hello
myObject["foobaz"]; // world


Property vs Methods
----------------------
Technically, functions never "belong" to objects, so saying that a function that just happens to be accessed on an object reference is automatically a "method" seems a bit of a stretch of semantics.

Every time you access a property on an object, that is a property access, regardless of the type of value you get back.

If you happen to get a function from that property access, it's not magically a "method" at that point.
There's nothing special about a function that comes from a property access. 


function foo() {
	console.log( "foo" );
}

var someFoo = foo;	// variable reference to `foo`

var myObject = {
	someFoo: foo
};

foo;				// function foo(){..}

someFoo;			// function foo(){..}

myObject.someFoo;	// function foo(){..}

someFoo and myObject.someFoo are just two separate references to the same function, and neither implies anything about the function being special or "owned" by any other object. If foo() above was defined to have a this reference inside it, that myObject.someFoo implicit binding would be the only observable difference between the two references. Neither reference really makes sense to be called a "method".


The safest conclusion is probably that "function" and "method" are interchangeable in JavaScript.

Even when you declare a function expression as part of the object-literal, that function doesn't magically belong more to the object -- still just multiple references to the same function object:

var myObject = {
	foo: function foo() {
		console.log( "foo" );
	}
};

var someFoo = myObject.foo;

someFoo;		// function foo(){..}

myObject.foo;	// function foo(){..}

Methods usually belongs to a class or object, and cant be "assigned" to another outside variable ...

Arrays
------------------
Arrays also use the [ ] access form, but as mentioned above, they have slightly more structured organization for how and where values are stored (though still no restriction on what type of values are stored). Arrays assume numeric indexing

Arrays are objects, so even though each index is a positive integer, you can also add properties onto the array:
Notice that adding named properties (regardless of . or [ ] operator syntax) does not change the reported length of the array. (length only takes into account NUMERIC indices)
Careful if you add a named prop wich looks like a number as myArray["33"]

You could use an array as a plain key/value object, and never add any numeric indices, but this is a bad idea because arrays have behavior and optimizations specific to their intended use, and likewise with plain objects. Use objects to store key/value pairs, and arrays to store values at numeric indices.


Duplicating Objects
----------------------
Not so easy.

Deep copy
----------
Arrays and objects properties are references ... so, in a deep copy (the whole graph/object tree is copied), there could be a circular reference situation if the referenced objects have references to the containing object.

var myObject = {
	a: 2,
	b: anotherObject,	// reference, not a copy!
	c: anotherArray,	// another reference!
	d: anotherFunction
};

anotherArray.push( anotherObject, myObject );//myObject references anotherArray, and anotherArray references myObject
In a deep copy situation  we have an infinite circular duplication problem because of the circular reference.


One subset solution is that objects which are JSON-safe (that is, can be serialized to a JSON string and then re-parsed to an object with the same structure and values) can easily be duplicated with:

var newObj = JSON.parse( JSON.stringify( someObj ) );

Of course, that requires you to ensure your object is JSON safe. For some situations, that's trivial. For others, it's insufficient.

A shallow copy
----------------
so ES6 has now defined Object.assign(..) for this task.
The duplication that occurs for Object.assign(..) however is purely = style assignment, so any special characteristics of a property (like writable) on a source object are not preserved on the target object.

---------------------
Property Descriptors (ES5)
---------------------

Prior to ES5, the JavaScript language gave no direct way for your code to inspect or draw any distinction between the characteristics of properties, such as whether the property was read-only or not.

But as of ES5, all properties are described in terms of a property descriptor.

var myObject = {
	a: 2
};

Object.getOwnPropertyDescriptor( myObject, "a" );
// {
//    value: 2,
//    writable: true,
//    enumerable: true,
//    configurable: true
// }


value
writable
configurable
enumerable

---------------------
Immutability (ES5)
---------------------

It's important to note that all of these approaches create shallow immutability. 
That is, they affect only the object and its direct property characteristics. If an object has a reference to another object (array, object, function, etc), the contents of that object are not affected, and remain mutable.

myImmutableObject.foo; // [1,2,3]
myImmutableObject.foo.push( 4 );
myImmutableObject.foo; // [1,2,3,4]

4 ways to make your properties or object immutable
--------------------------------------------------
- Object constant
- Prevent extensions
- Seal
- Freeze


Object Constant
-------------------
By combining writable:false and configurable:false, you can essentially create a constant (cannot be changed, redefined or deleted) as an object property, like:

var myObject = {};

Object.defineProperty( myObject, "FAVORITE_NUMBER", {
	value: 42,
	writable: false,
	configurable: false
} );
myImmutableObject.foo; // [1,2,3,4]


Prevent extensions (ES5)
------------------------
If you want to prevent an object from having new properties added to it, but otherwise leave the rest of the object's properties alone, call Object.preventExtensions(..)

Seal (ES5)
-----------
Object.seal( ... )

- Prevent extensions on object
+ all its existing properties to configurable:false

So, not only can you not add any more properties, but you also cannot reconfigure or delete any existing properties (though you can still modify their values).


Freeze (ES5)
------------

Object.freeze(..)

- Seal + sets all data props to writable:false

This approach is the highest level of immutability that you can attain for an object itself, as it prevents any changes to the object or to any of its direct properties (though, as mentioned above, the contents of any referenced other objects are unaffected).



[[ GET ]]
-------
One important result of this [[Get]] operation is that if it cannot through any means come up with a value for the requested property, it instead returns the value undefined.

var myObject = {
	a: 2
};

myObject.b; // undefined

This behavior is different from when you reference variables by their identifier names. 

If you reference a variable that cannot be resolved within the applicable lexical scope look-up, the result is not undefined as it is for object properties, but instead a ReferenceError is thrown.


[[Put]]

If the property is present, the [[Put]] algorithm will roughly check:

1) Is the property an accessor descriptor (see "Getters & Setters" section below)? If so, call the setter, if any.

2) Is the property a data descriptor with writable of false? If so, silently fail in non-strict mode, or throw TypeError in strict mode.


3) Otherwise, set the value to the existing property as normal.


If the property is not yet present on the object in question, the [[Put]] operation is even more nuanced and complex. We will revisit this scenario in Chapter 5 when we discuss [[Prototype]] to give it more clarity.


Getters & Setters (ES5)
------------------------
ES5 introduced a way to override part of these default operations, not on an object level but a per-property level.

Getters are properties which actually call a hidden function to retrieve a value. Setters are properties which actually call a hidden function to set a value.

For accessor-descriptors, the value and writable characteristics of the descriptor are moot and ignored, and instead JS considers the set and get characteristics of the property (as well as configurable and enumerable).

var myObject = {
	// define a getter for `a`
	get a() {
		return 2;
	}
};

Object.defineProperty(
	myObject,	// target
	"b",		// property name
	{			// descriptor
		// define a getter for `b`
		get: function(){ return this.a * 2 },

		// make sure `b` shows up as an object property
		enumerable: true
	}
);

myObject.a; // 2

myObject.b; // 4

getter and setter
------------------

var myObject = {
	// define a getter for `a`
	get a() {
		return this._a_;
	},

	// define a setter for `a`
	set a(val) {
		this._a_ = val * 2;
	}
};

myObject.a = 2;

myObject.a; // 4

Existence
-------------

var myObject = {
	a: 2
};

("a" in myObject);				// true
("b" in myObject);				// false

myObject.hasOwnProperty( "a" );	// true
myObject.hasOwnProperty( "b" );	// false

"in" checks for prop in object and upper in prototype
"hasOwnProperty" checks ONLy in the object, not the upper chain.

hasOwnProperty is inherited / delegated from Prototype, if the object is not linked to a Prototype that method will fail when called on the object.

In that scenario, a more robust way of performing such a check is
 Object.prototype.hasOwnProperty.call(myObject,"a")

which borrows the base hasOwnProperty(..) method and uses explicit this binding (see Chapter 2) to apply it against our myObject

Enumeration: Object property enumerability
------------------------------------------
"enumerable" basically means "will be included if the object's properties are iterated through".

var myObject = { };

Object.defineProperty(
	myObject,
	"a",
	// make `a` enumerable, as normal
	{ enumerable: true, value: 2 }
);

Object.defineProperty(
	myObject,
	"b",
	// make `b` NON-enumerable
	{ enumerable: false, value: 3 }
);

myObject.b; // 3
("b" in myObject); // true
myObject.hasOwnProperty( "b" ); // true

// .......

for (var k in myObject) {
	console.log( k, myObject[k] );
}
// "a" 2

Note: for..in loops applied to arrays can give somewhat unexpected results, in that the enumeration of an array will include not only all the numeric indices, but also any enumerable properties. It's a good idea to use for..in loops only on objects, and traditional for loops with numeric index iteration for the values stored in arrays.

propertyIsEnumerable(..) tests whether the given property name exists directly on the object and is also enumerable:true.

Object.keys(..) returns an array of all enumerable properties, whereas Object.getOwnPropertyNames(..) returns an array of all properties, enumerable or not.
Both inspect only the direct object specified.


Iteration
------------
The for..in loop iterates over the list of enumerable properties on an object (including its [[Prototype]] chain)

But what if you instead want to iterate over the values?

forEach(..), every(..), and some(..) (ES5)
------------------------------------------
- forEach(..)
will iterate over all values in the array, and ignores any callback return values

- every(..)
keeps going until the end or the callback returns a false (or "falsy") value

- some(..)
keeps going until the end or the callback returns a true (or "truthy") value.
























