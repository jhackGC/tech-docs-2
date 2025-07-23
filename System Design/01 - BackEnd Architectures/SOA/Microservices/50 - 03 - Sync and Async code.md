# Async and Sync Code

Differences between the concepts of synchronous and asynchronous code, as this is key to understanding why the event loop architecture of Node.js is one of its advantages.

In synchronous code, each operation is executed sequentially, blocking the next one, so nothing else can happen until this operation finishes.

In asynchronous code, on the other hand, multiple operations can coexist. Even if the computer is single core and it can only execute one instruction at a time, it can still execute code where some operations are waiting for external resources, for example. The best way to understand these concepts is with a practical demo.

So we'll now see some of the different options to deal with synchronous and asynchronous code in Node.js.

## Functions and callbacks

It's worth noting that there are other ways of dealing with these concepts in JavaScript such as promises and the async await syntax, but this is just a simple demo to illustrate the main concepts.

For our first example, let's see how synchronous code looks like.

Here, we define a function called synchronous_operation, which just does a computation of a logarithm many times. This simulates some task that takes time to execute.

```javascript
function synchronous_operation() {
  let result = 0;
  for (let i = 0; i < 1e8; i++) {
    result += Math.log(i);
  }
  return result;
}

console.log("Start");
synchronous_operation();
console.log("End");
```

After defining the function, our program logs the message, Start. It executes the function, and it logs the message, End.

Since this is a blocking call, the message, End, won't be logged until the operation finishes executing.

As you can see from the execution log, this is the order we expected.

Let's now see a more interesting case. Here, we are using a callback function.

This asynchronous operation callback function we are defining takes one argument called callback. This argument is another function. To make the code run asynchronously, we use the setImmediate function, which tells Node.js to enqueue the function passed to it to the event loop.

```javascript
function asynchronous_operation(asyncCallback) {
  console.log("Start async operation");
  setImmediate(() => {
    let result = 0;
    for (let i = 0; i < 100000; i++) {
      result += i; // Simulating some work
    }
    console.log("Async operation finished inside setImmediate, result:", result);
    asyncCallback(result);
  });
  console.log("Async operation enqueued");
}

// results
Start async operation
Async operation enqueued
Async operation finished inside setImmediate, result: 4999950000
Asynchronous operation result: 4999950000
```

So it will be executed when the current task finishes.
We see that inside the callback passed to setImmediate, we call the asyncCallback passed to the asynchronous operation function.

You can imagine the event loop as a worker picking up tasks from a queue. When a task finishes, it picks up the next one. And then when we make an asynchronous call, we enqueue a callback to be executed sometime in the future.

This is a simplification, of course, as in reality, Node.js has a different number of queues for different types of events and each one with a different priority.

Now, in our program, we log the Start message, call the operation, and log the message the same as before. However, because this operation is asynchronous, our main program won't execute it right away.

It will just enqueue it for the event loop to pick it up later.
So, our code keeps executing without blocking, waiting for the asynchronous code to execute.

After the main task finishes, the event loop is now free to pick up the next task from the queue. So it executes the operation, and finally, our callback is called.

As you can see from the execution logs, Node.js does not block waiting for the operation to complete. In this case, this operation is CPU‑intensive, as we are doing some calculations. But if this was an operation that's I/O intensive like waiting for a database to fetch some data, this could mean that we can keep doing other things while we wait for that operation to complete, and we'll get a callback once it's done.
