
# fs : The File System
	Interact with the file system. Sync or Async.

	If you have an error in a fs Sync function, it will throw an error AND CRASH YOUR PROCESS, so it should be caught with a catch().

### List files and directories

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

### Read content of files.

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

### Write to files. Create or append.

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

### Create Directories

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

### Move/rename or remove files

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

### Move/rename or remove dirs

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

### File Streams: Give us a way to asynchronously handle continuous data flows.

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
	      stream.close();`