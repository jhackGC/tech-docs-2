# Node JS
Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive
real-time applications that run across distributed devices.

## CLI commands
run a js file:
$ node file.js

## hot reload
npm install -g nodemon
same as node but restart whe nmaking changes to a file
does not refreshes the browser, just the server



## Node core
Based on V8 google runtime for browsers

Usual ES5 JS syntax, Primitives, Object, Arrays

Has ES6 by default
	- ES6 template string: `flkwdjfwlkjg ${var}`

Uses CommonJS by default, which means all scope is in each modules, every node js file that we create sia  module and
its scope is u to that module.

The global object is "global" , in the broswer is "window"


The global objects namespace
----------------------------
https://nodejs.org/dist/latest-v6.x/docs/api/globals.html

The global objects namespace is what we can access in a js file without having to require anything.

In the global namespace we find:

	- console()

	- __dirname : the path to where this module is located

	- __fileneme : the path to where this module is located including the file/module name

	- require():
				function to import other node.js modules, they could be available form your intallation of node js.
				If we would like to make items consumable by other Javascript files, we can export them with 'module export'
				module.exports is an object.
				module.exports is the object that is returned to the require statement;
				e.g. module.exports = Person;

	- process : node process instance

		- argv: variables used to start the process
				- default values are the node command, and module being executed
					$ console.log(process.argv);
					[ '/usr/local/Cellar/node/7.10.0/bin/node',
	  				'/Users/javierhack/Documents/dev/projects/node/Ex_Files_Nodejs_EssT/Exercise Files/Ch03/03_02/start/app' ]

		- stdin, stdout: Used to communicate with the process.
						 e.g. Read and write ops with the terminal, or communicating with a child process
						 stdout writes to std out (usually the terminal) but does not add line breaks
						 console.log() uses stdout, and add line breaks

						 - listening to events in the stdin or stdout

						 process.stdin.on('data', callBack FCN with the input data as arg).

						 process.stdout.on('data', callBack FCN with the input data as arg).

						 - For he stdin, when a user types in the stdin (usually the terminal) and hits enter, that will raise the data event and pass the input as the first arg.

						 Trim data as it comes with \n \r leading and ending. so, data.toString().trim()

						 - for the stdout, when the proc writes in the stdout, the event is trigered and pass/inject the output written  as the first arg. to the callback


						 - by placing an event listener to stdin, the process will run indefinetely, and it will wait for input to come, so we use node asynchronously this time, as it has to wait for the user to put some data to keep running.
						 Everytime you hit enter you raise a data event. and the process does not stop. This is called a running process or application.

						 -	Manipulate the std output:
						 	process.stdout.clearLine();
  							process.stdout.cursorTo(0);

		- exit the process with exit();

		- process can listen to events too. as it is an object.
			process.on('exit', function(){

			});



	- Timing functions: one way to use Node Js Asynchronously is with events, another is using the tiing functions.
						Available globally, and work the same as in the browser.

						- setTimeOut: create a delay of a certain time and then callback a function.
						After running the callback func, the process exits, which means that during that time the process was waiting AND running.

						- clearInterval clerTimeout func are used to stop them.


	-

built in functions?
---------------------
- hello.slice(17); the slice function on Strings.






argument variabes with process.argv
-----------------------------------
https://nodejs.org/dist/latest-v6.x/docs/api/process.html#process_process
- One important object that is available to us globally is the process object.
It can be accessed from anywhere, and it contains functionality that allows us to interact with information
about the current process instance. We can use the process object to get environment information, read
environment variables, communicate with the terminal, or parent processes, through standard input and
standard output. We can even exit the current process. This object essentially gives us a way to work
with the current process instance. One of the the things that we can do with the process object is to
collect all the information from the terminal, or command prompt, when the application starts.

All of this information will be saved in a variable called process.argv


- One important object that is available to us globally is the process object. It can be accessed from anywhere, and it contains functionality that allows us to interact with information about the current process instance. We can use the process object to get environment information, read environment variables, communicate with the terminal, or parent processes, through standard input and standard output. We can even exit the current process. This object essentially gives us a way to work with the current process instance. One of the the things that we can do with the process object is to collect all the information from the terminal, or command prompt, when the application starts.

All of this information will be saved in a variable called process.argv


$ node app --user Javier --greeting "Gday mate"
[ '/usr/local/Cellar/node/7.10.0/bin/node',
  '/Users/javierhack/Documents/learning/projects/node/Ex_Files_Nodejs_EssT/Exercise Files/Ch03/03_02/start/app',
  '--user',
  'Javier',
  '--greeting',
  'Gday mate' ]

var flag = '--user';
var index = process.argv.indexOf(flag); // 2
var flagValue = process.argv[index + 1]; // Javier


Every file that we create in Node.js is it's own module, and every varible that we create in a js file is scoped only to that module.
That means that our variables that are created in a file are not added to the global scope, as in the browser.


--------------------------------
default NODE JS modules - CORE MODULES
--------------------------------
- path

	e.g. 	let filename = path.basename(__filename);
			var dirUploads = path.join(__dirname, 'www', 'files', 'uploads');

- utils

	logs with date and time e.g.


- v8

	- Node JS is built on top of Google Chrome V8's processor
	- could be usefl for checking memory usage e.g.

- readline

	Allows us to ask questions to our terminal user.
	With lots of helper methods, and we dont have to 		use stin and stdout directly
	It's a wrapper around stdout, stdin objects.
	Once data collected, ap keeps running, we didnt tell readline to close.
	While readline is still listening the app is still running.


	rl.question('What is the name of a real person?', function(answer) {
	  realPerson.name = answer;
	  rl.setPrompt(`What would ${realPerson.name}`);
	  util.log(answer);
	});

	rl.prompt(); // propts the user with the text set in the setPrompt(...) method.

	rl.prompt(); // propts the user with the text set in the setPrompt(...) method.

	rl.on('line', function(inputData)){};

- events

	The EventEmmiter is the Node JS implementation of the publisher/subscriber design pattern. And allows us to create patterns for an emit custom Events.

	var events = require('events');
	var emitter = new events.EventEmitter();

	// Trigger
	emitter.emit('customEvent', "This is the message", 200);

	// Subscribe
	emitter.on('customEvent', function(message, status){
	  custom.log(`status ${status} -  message ${message}`);
	});

	The event emitter is usually inherited. for that we use the inherits() function of the 'utils' module, that allows us to add an object to the prototype of an existing object. That is how JS handles inheritance.
	e.g.

	util.inherits(Person, EventEmitter);

	var ben = new Person("Ben Franklin");

	ben.on("speak", function(said, status){
	  console.log(`${this.name} said: ${said} with status ${status}`);
	})

	ben.emit('speak', "I am ben franklin", 200);

	The EventEmitter provides us a way to create custom objects that raise custom events that can be handled asynchronously.

	And because the events are handled asynchronously, it is a very important tool in node.js.


- child_process

	Node.js comes with a Child Process module which allows you to execute external processes in your environment. In other words, your Node.js app can run and communicate with other applications on the computer that it is hosting.

	- exec

		With the Node.js execute function we can actually execute these external commands from our Node.js modules.

		e.g.

			require("child_process")

			exec("open -a Terminal .");

		Now every time we've been executing any of these processes any data that gets returned by the process would be returned to the second argument in the execute function, a call back function

			e.g.
			exec("ls -la", function(err, stdoutResults){
			  if (err){
			    throw err;
			  }else{
			    console.log('Listing finished');
			    console.log(stdoutResults);
			  }

			});

			exec is more for processes in asyncrhonous situations (the exec has a callback func that will be called asynchronously when the results are returned to the stdout by the child proc)
			Those processes usually return small bits of data and run for a shor period of time.

	- spawn

		Used for running child processes that produce a large amount of data or/and long running proccesses.
		e.g.

		var spawn = require("child_process").spawn;

		var cp = spawn("command", []);// second arg is an array of args

		var cp = spawn("node", ["alwaysTalking"]);

		the child process instance, cp, has its own stdout, which is going the be used in the child to output data, and also is a EventEmmiter, and as we have seen before, it can listen to 'data' events, data written in the stdout by the child.
		So the parent sets a listener on the child stdout on 'data' event, meaning that when the child writes to the stdout, the parent subscription event allback will be called.

		e.g.

		var cp = spawn("node", ["alwaysTalking"]);

		//Every time the alwaysTalking proc, writes on its stdout, we want to catch that event ('data') and print it with the prefix: STDOUT
		cp.stdout.on("data", function(data){
		  console.log(`STDOUT: ${data}`)
		});

		Another thing we can do with the child process is that we can listen for when they close. A close event will be raised on the child proc when it closes.

		We can also SEND dat ato this child process using its stdin object.

		setTimeout(function(){
  			cp.stdin.write("stop");//that will stop the child proc and force it to emit
  			// the close event.
		}, 4000);

		So, with spawn, we also can communicate with those child procs using their stdin and stdout.

# fs : File System

	Interact with the file system. Sync or Async.
	If you have an error in a fs Sync function, it will throw an error AND CRASH YOUR PROCESS, so it should be caught with a catch().

	- List files and directories

		Reading files Synchronously:

		var fs = require('fs');
		var files = fs.readdirSync('./lib');

		CAREFUL, reading files synchronously, may block the single  Node JS thread, so all other connections will wait for the file recall.
		Mostly used to read config files at app start up, but when actually running the app, use async, or you will loose the advantages of NodeJS asynch I/O nature.
		But many times, writing shloud be sync as it need to finish if we want to do something else with the file, like appending ...
		Its a case by case situation.

		Better use async reading, removing the Sync word

		e.g.

		fs.readdir('./lib', function(err, files){
		  if (err){
		    throw err;
		  }else {
		    console.log(files);
		  }
		});

		// check data about the file/dir
		var stats = fs.statSync(file);
		stats.isFile();

	- Read content of files.

		By default reads them as binaries, if you read text, send the text encoding param.
		e.g.

		Synch
		-----
		var contents = fs.readFileSync("./lib/sayings.md", "UTF-8");

		Asynch
		------
		fs.readFile('./lib/sayings.md', "UTF-8", function(err, contents){
		  if (err){
		    console.log(err);
		  }else {
		    console.log(contents);
		  }
		});

	- Write to files. Create or append.

		fs.writeFile("sample.md", md.trim(), function(err){
  			console.log('File Created');
		});

		use Synch version when you really want the file created before doing something else like Appending to it !

		e.g
		fs.writeFileSync(
			realPerson.name + '.md', // filename
		`${realPerson.name}\n==================\n\n` // content
		);

		Appending could be done async ... depending on the next steps.

	    fs.appendFile(
	        realPerson.name + '.md', // filename
	        `${saying.trim()}\n` // content
	        // optional callback func, e.g. managing errors
	    );

	- Create Directories

		- fs.mkdir

			var fs = require("fs");

			fs.mkdir("lib", function(err){
			  if(err){
			    console.log(err);
			  }else{
			    console.log('Directory created');
			  }
			});

			//check if exists
			if (fs.existsSync("lib")({

			})

	- Move/rename or remove files

		- Rename

		fs.renameSync("./lib/project-config.js", "./lib/config.json");

		- Remove

		//Sync
		try{
		  fs.unlinkSync("./lib/config.json");
		  console.log('./lib/config.json removed');
		}catch(err){
		  console.log(err);
		}

		//Async
		fs.unlink("./lib/notes.md", function(err){
		  if (err){
		    console.log(err);
		  }else{
		    console.log('Notes.md removed');
		  }
		});

	- Move/rename or remove dirs
		- rename or move is the same as with files
		fs.renameSync("./assets/logs", "./logs");

		- remove uses rmdir() - It has to be empty.
		fs.rmdir("./assets", function(err){
		  if (err){
		    throw err;
		  }else{
		    console.log("Assets dir removed");
		  }
		});

		- removing files first.
		fs.readdirSync("./logs").forEach(function(fileName){
		  fs.unlinkSync("./logs/" + fileName);
		});

	- File Streams: Give us a way to asynchronously handle continuous data flows.
		Streams in NodeJS are implementations of the underlying abstract Stream interface.
		We have used Streams before, process.stdout and process.stdin, both implement the Stream interface.
		stdout is a writtable Stream.
		stdin is a readable Stream


		#### Reading streams

		Comparison with readFile:

		fs.readFile("./chat.log", "UTF-8", function(err, chatlog){

		});

		The process will wait for the entire chat.log file to be read in the memory buffer, to execute the callback func.
		It also buffers the entire file in one variable.

		If our big data app has heavy traffic, readFile:
		- will create latency
		- will take a lot of memory, potentially having an impact on it.

		So, we could use Streams.

			var stream = fs.createReadStream("./chat.log", "UTF-8");
			var data = "";


			// once, event subscription to execute only once, first time data is raised.
			stream.once("data", function(){
			  console.log("\n\n\n");
			  console.log("Data is being read ...");
			  console.log("\n\n\n");
  			});

			//everytime data is read from the stream, data is raised
			stream.on("data", function(chunk){
			  process.stdout.write(`    chunk: ${chunk.length}`);
			  data += chunk;
			});

			// when stream finishes, end is raised.
			stream.on("end", function(){
			  console.log("\n\n\n");
			  console.log("Data read: ");
			  console.log(`${data.length} long`);
			  console.log("\n\n\n");
			});

		// @TODO WHAT TRIGGERS THE READ, THE data EVENT ??

		#### Write Stream
		Instead of writing files Sync with writeFile, we can do it Async with
		fs.createWriteStream, writing chunks of data to our file.

		e.g.

		  var stream = fs.createWriteStream(realPerson.name + '.md');
		  stream.write(`${realPerson.name}\n==================\n\n`);
	      stream.write(`* ${saying.trim()} \n`);
	      stream.close();


HTTP Module
------------
	We have http module and the https module, if we want to work with the https module, we have to supply the security certificate.

	When requesting for https sites, we have to use the https module.
	The callback func receives a response object, which is a Stream !.


HTTP module
----------------
Making a request
----------------
If you want to request to a http server you have to use the http module, same for https.

var https  =  rehe liked your stuff same question
quire('https');
var fs  =  require('fs');

var options = {
  hostname: 'en.wikipedia.org',
  port: 443,
  path: '/wiki/George_Washington',
  method: 'GET'
};

var req = https.request(options, function(res){
  var responseBody = "";


  console.log("Response from server started ...");
  console.log(`Server status: ${res.statusCode}`);
  console.log("Headers status: %j", res.headers);

   //ensure the stream will come in as text. By default comes binary.
  res.setEncoding("UTF-8");

  res.once('data', function(){
    console.log
  });
});


Creating a server
------------------
http.createServer(function(req, res){
	//function that listens to requests
}).listen(3000);


SERVING FILES
--------------------

//create the server and listen to port 3000
http.createServer(function(req, res){
	//listen for requests
  console.log(`method: ${req.method} requested for ${req.url}`);

  // if req is for home all good, otherwise return a 404 header
  if(req.method === '/'){
  	res.writeHead
  }else{

	res.writeHead(404, {"Page not found"});

  }

}).listen(3000);

// finished ...

var http = require('http');
var fs = require('fs');
var path = require('path');

http
  .createServer(function(req, res) {

    const url = req.url;

    if (url === '/') {
      fs.readFile('./public/index.html', 'UTF-8', function(err, fileContent) {

        if (err) {
          sendError(500, '404 File Not Found', res);
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(fileContent);
        }
      });
    } else if (url.match(/.css$/)) {

      // faster retrieve with file stream.
      var cssPath = path.join(__dirname, 'public', req.url);
      var fileStream = fs.createReadStream(cssPath, 'UTF-8');
      res.writeHead(200, { 'Content-Type': 'text/css' });
      fileStream.pipe(res);

    }else if (url.match(/.jpg$/)) {

      // faster retrieve with file stream.
      var imgPath = path.join(__dirname, 'public', req.url);
      var fileStream = fs.createReadStream(imgPath);//default binary
      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      fileStream.pipe(res);

    } else {
      sendError(400, '400 URL not found', res);
    }
  })
  .listen(3000);

function sendError(errCode, err, res) {
  // console.log('Error: ', err);
  res.writeHead(errCode, { 'Content-Type': 'text/html' });
  res.end(err);
}

run it with:
$ node fileserve.js


SERVING json (json APIs)
===================
var http = require('http');
var data = require('./data/inventory.json');

http
  .createServer(function(req, res) {
    let resData = [];

    console.log(`${req.method} to ${req.url}`);

    if (req.url === '/stock'){
      resData = listInStock(data);
      sendData(resData, res);
    }else if (req.url === '/backorder'){
      resData = listOnBackOrder(data);
      sendData(resData, res);
    }else if (req.url === '/'){
      resData = data;
      sendData(resData, res);
    }else{
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('URL not found');
    }
  })
  .listen(3000);

console.log('Server listening on port 3000');

function listInStock(data){
  var inStock = data.filter(function(item){
    return item.avail === "In stock"
  });
  return inStock;
}

function listOnBackOrder(data){
  var onOrder = data.filter(function(item){
    return item.avail === "On back order"
  });
  return onOrder;
}

function sendData(resData, res) {
  res.writeHead(200, {'Content-Type': 'text/json'});

  res.end(JSON.stringify(resData));
}


POSTING JSON - Collecting POST json data
========================================
var http = require('http');
var fs = require('fs');

http
  .createServer(function(req, res) {
    if (req.method === 'GET') {
      res.writeHead(200, {'Content-Type': 'text/html'});
      fs.createReadStream("./public/form.html", "UTF-8").pipe(res);
    } else if (req.method === 'POST'){
      // req is a stream. check for data coming in from the browser ...
      let body = '';
      req.on('data', chunk => body += chunk);

      req.on('end', ()=>{
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(`
          <!DOCTYPE html>
          <html>
            <head>
              <title> Form Results</title>
            </head>
            <body>
              <h1>Your Form Results</h1>
              <p>${body}</p>
            </body>
          </html>
        `);
      })
    }
  })
  .listen(3000);

console.log('Server listening on port 3000');


Node and socket.io
==================

NODE JS
--------------
What is NODE for? sweet spot for Node

- Super efficient in doing communication, socket, peer to peer commms, high throughput low latency.
Not s good at serving big static files (video cdn server)

middle end.com
Middle end tasks, front end concerning points (templating, routing, validating, etc.) that used to be managed deeply into the back end (jsps, routing, double r triple validation points, client, server, database ).
So those tasks that we front enders need to contro more, are in the back, abstracted in the stack back end !
So, can we put them in a middle end tier?

WHAT IF W EIMPLEMENT THIS MIDDLE END TIER USING SERVER SIDE JAVASCRIPT?
Dont have to rewrite the whole back end, but relieve the back end fro doing front end concerns ...
So now you can validate only once on the server side with JAvascript, not in the jquery, not in java not in the db.

Node is based and EXTENDS V8 JS engine, it extends it with I/O. V8 has no idea of I/O as it can run anywhere, and I/O is different in each platform (web, bulb, mobile, rasperry pi, etc.)
Node provides a HOSTING ENVIRONMENT for that JS, V8.
The broswer does the same, provides a hosting environment for that JS. Same for the raspberry pi SDK, and what it does is to extend what you can do with javascript to an environment, like writing to a screen, or open a file, make an ajax request.

Many things done in the browser ar e not javascript, are extensions provided b the hosting environment, the browser.
S when you do console.log, that uses environment hooks to do something, inthe browser the dev tools print it to the console, in the node env, it prints to the std out.
so in the node env, console.log(...) means process.stdout.write(...);


- Is good for scripting in JS, create command line programs, like unix bash scripts in JS running in Node. You use JS in Node instead of
	You can ue the bash style annotation to make a node script (JS) into an executable bash style script like:
	#!/usr/bin/env node

	var args = require('minimist')(process.argv.slice(2), {string: "name"});
	var nameParam = args.name;

	console.log("Hello: " + nameParam);

	change the file to be executable
	$ chmod 700 1.js

	execute it
	$ ./1.js --name=World

	-- finish a program:  process.exit(1);


FILE I/O
----------------------
In CommonJS (Node default lang) anything you declare in a file is private to that file (module)
So you have to expose them as a public API with module.exports.say = say;
All which is reltd with data tranfers, like file read, or streams, is done not in terms of strings, is not pulling in a string, is creating
an array buffer, which is a efficient binary representation of our data. To return our buffer into something readable, we define its encoding
when reading it or force it with toString().

- using toString
contents = fs.readFileSync(filename);
contents.toString();

- or read it with a encoding defined
contents = fs.readFileSync(filename, 'UTF-8');

Reading with fs is raw reading, it reads /n and ANY content in you file, therefore when you print it it will show these.
No fancy formatting or anything there.

NOTE: the way you usually and naturally organize your code in Node JS is with the require import module system, you may use delegation,
or inheritance if you want to

- Sync

> main.js
    var hello = require('./file_io_async_module.js');

    var contents = hello.say(fileName)

    console.log(contents.toString());

> file_io_sync_module.js
    var fs = require('fs');

    function say(filename){
        return fs.readFileSync(filename);
    }

    module.exports.say = say;

- Async
Callbacks in CommonJS (Node), are in the style (err, value), called err style callback. The first param in a callback is reserved for
errors.

> main.js
    var hello = require('./file_io_async_module.js');

    var contents = hello.say(fileName, function(err, content) {
      if (err) {
        console.log(err);
      } else {
        console.log(contents.toString());
      }
    });

> file_io_sync_module.js
    var fs = require('fs');

    function say(filename, callback){
        return  contents = fs.readFile(filename, callback);
    }

    module.exports.say = say;

- Introducing a forced delay to simulate AJAX.

> file_io_sync_module.js
    var fs = require('fs');

    function say(filename, callback) {
      //simulates an ajax call or db request by adding a delay to the callback calling
      return (contents = fs.readFile(filename, function(err, contents) {
        if (err) {
          callback(err);
        } else {
          setTimeout(function() {
            callback(null, contents);
          }, 3000);
        }
      }));
    }

    module.exports.say = say;

NOTE: Careful with nested Callbacks


