# readline : Allows us to ask questions to our terminal user.
With lots of helper methods, and we dont have to use stin and stdout directly
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
