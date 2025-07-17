# child_process

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
