

// function foo(num) {
//     console.log( "foo: " + num );
//
//     // keep track of how many times `foo` is called
//     this.count++;
// }
//
// var count = 0;
//
// var i;
//
// for (i=0; i<10; i++) {
//     if (i > 5) {
//         foo( i );
//     }
// }
// // foo: 6
// // foo: 7
// // foo: 8
// // foo: 9
//
// // how many times was `foo` called?
// console.log( count ); // 0 -- WTF?
//
//
// function baz() {
//     // call-stack is: `baz`
//     // so, our call-site is in the global scope
//
//     console.log( "baz" );
//     bar(); // <-- call-site for `bar`
// }
//
// function bar() {
//     // call-stack is: `baz` -> `bar`
//     // so, our call-site is in `baz`
//
//     console.log( "bar" );
//     foo(); // <-- call-site for `foo`
// }
//
// function foo() {
//     // call-stack is: `baz` -> `bar` -> `foo`
//     // so, our call-site is in `bar`
//
//     console.log( "foo" );
// }
//
// baz(); // <-- call-site for `baz`



// function foo() {
//     console.log( this.a );
// }
//
// var a = 2;
//
// foo(); // 2

// function foo() {
//     console.log( this.a );
// }
//
// var obj = {
//     a: 2,
//     foo: foo
// };
//
// obj.foo(); // 2

// function foo(something) {
//     console.log( this.a, something );
//     return this.a + something;
// }
//
// // simple `bind` helper
// function bind(fn, obj) {
//     return function() {
//         return fn.apply( obj, arguments );
//     };
// }
//
// var obj = {
//     a: 2
// };
//
// var bar = bind( foo, obj );
//
// var b = bar( 3 ); // 2 3
// console.log( b ); // 5

// Which is more precedent, implicit binding or explicit binding? Let's test it:

// function foo() {
//     console.log( this.a );
// }
//
// var obj1 = {
//     a: 2,
//     foo: foo
// };
//
// var obj2 = {
//     a: 3,
//     foo: foo
// };
//
//
// obj1.foo.call( obj2 ); // 3
// obj2.foo.call( obj1 ); // 2
//
// obj1.foo(); // 2
// obj2.foo(); // 3


// function foo() {
//     // "use strict";
//     console.log( this.a );
// }
//
// var a = 2;
// var o = { a: 3, foo: foo };
// var p = { a: 4 };
//
// o.foo(); // 3
// (p.foo = o.foo)(); // 2

function foo() {
    setTimeout(() => {
        // `this` here is lexically adopted from `foo()`
        console.log( this.a );
},100);
}

var obj = {
    a: 2
};

var bar = foo.call( obj ); // 2