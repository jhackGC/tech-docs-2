# events

The EventEmmiter is the Node JS implementation of the publisher/subscriber design pattern.

And allows us to create patterns for an emit custom Events.

	var events = require('events');
	var emitter = new events.EventEmitter();

	// Trigger
	emitter.emit('customEvent', "This is the message", 200);

	// Subscribe
	emitter.on('customEvent', function(message, status){
	  custom.log(`status ${status} -  message ${message}`);
	});


The event emitter is usually inherited. for that we use the inherits() function of the 'utils' module, that allows us
to add an object to the prototype of an existing object. That is how JS handles inheritance.

e.g.

	util.inherits(Person, EventEmitter);

	var ben = new Person("Ben Franklin");

	ben.on("speak", function(said, status){
	  console.log(`${this.name} said: ${said} with status ${status}`);
	})

	ben.emit('speak', "I am ben franklin", 200);

The EventEmitter provides us a way to create custom objects that raise custom events that can be handled asynchronously.

And because the events are handled asynchronously, it is a very important tool in node.js.
