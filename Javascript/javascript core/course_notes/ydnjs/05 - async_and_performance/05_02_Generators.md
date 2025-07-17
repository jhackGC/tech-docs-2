# Intro
A new type of function that can pause itself int he middle of its execution, and can be resumed later

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function%2A

    function* gen() {
        console.log("Hello");
        yield null;
        console.log("World");
    }

    var it = gen(); // constructs an iterator and returns it, to control the operation of our generator

    it.next(); // print "Hello", runs till the next yield statement, and pauses, and returns control to the caller
    it.next(); // print "World"

yield stops execution and passes back control

yield takes out the value, it yields it out.
so , it also acts as a message passing mechanism, a two way passing mechanism actually
We can pass msgs into our generator and back from it.

1. var run = coroutine(function* () {
2.        var x = 1 + (yield null); // x = 11
3.        var y = 1 + (yield null); // y = 31
4.        yield (x + y);
5.    });
6.
7.    run(); // returns null
8.    run(10);
9.    console.log("Meaning of life: " + run(30).value);

Lets see what it does
- in line 7 the function is executed, it runs till line 2, where it returns to the caller with "yield", returning null.
- in line 8 it runs again, sending a "10", the control goes back to line 2, and that param value replaces the "yield null" expression.
so line 2 now looks like var x = 1 + 10.
- the flow stays in the function and goes to line 3, where it finds another "yield" that returns null (is like an input request sort of)
- the flow goes outside to line 9 and runs run() again with a input param of "30"
the flow then goes back to line 3, the line it was last time it yielded, and replaces the expression "yield null" for "30"
so now , with the input value, line 3 looks like var y = 1 + 30;
- now it continues the execution in line 4, and finds another yield that is returning (x + y), which is something that has a
.value with the returning value (42)
 now x = 11



## How Generators help with asyncrhonicity

    //async function
    function getData(d) {
        setTimeout(function () {
            run(d)
        }, 1000)
    };

    var run = coroutine(function* () {
        var x = 1 + (yield getData(10)); // asynch call iteration after 1 sec,
         // when it comes back will execute run again, so putting its result into yield

        var y = 1 + (yield getData(30));
        var answer = (yield getData("Meaning of life: " + (x + y)));
        console.log(answer);
    });

    run(); //first call/iteration, then will be called from the callback

Each call to run() is considered an iteration thru the generator

The code in the coroutine looks synchronous, but underneath the cover this code will start and stop asynchronously
and that's the power of the generators solving the asynch flow control. It will continue (iterate) when it comes back.
it gives of a perfectly synch looking syntax but allows us to hide the asynchronicity behind the scenes.
a generator can iterate, be called many times, synchronously like in

     var run = coroutine(function* () {
            var x = 1 + (yield null); // x = 11
            var y = 1 + (yield null); // y = 31
            yield (x + y);
        });

        run(); // returns null
        run(10);
        console.log("Meaning of life: " + run(30).value);


but also can iterate, execute many times, asynchronously like in

    //async function
    function getData(d) {
        setTimeout(function () {
            run(d)
        }, 1000)
    };

    var run = coroutine(function* () {
        var x = 1 + (yield getData(10)); // asynch call iteration after 1 sec,
         // when it comes back will execute run again, so putting its result into yield

        var y = 1 + (yield getData(30));
        var answer = (yield getData("Meaning of life: " + (x + y)));
        console.log(answer);
    });

    run();

