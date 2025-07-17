# Routing with Express

Using Express in Lambda Functions is a good transition approach from a traditional Node / Express architecture to Lambda.

# resources

- front end masters course
- https://claudiajs.com/tutorials/serverless-express.html
- https://serverless.com/blog/serverless-express-rest-api/

## Limitations

There are big limitations of the platform that are important to note, as they won’t prevent you from deploying the code, but it will just not work.
Your code is running in a serverless environment.
You cannot rely on your server being 'up' in the sense that you can/should not use in-memory sessions, web sockets, etc.
You are also subject to provider specific restrictions on request/response size, duration, etc.

Limitations:

- API Gateway does not support sending binary content.
  That’s just not possible at the moment. As a workaround, put binary assets (such as images), somewhere else – for example S3, or CloudFront. (For performance reasons you should put binary content on a static asset server or CDN anyway).

- Lambda is essentially stateless
  Two requests from the same user might hit the same virtual machine container, but they might not.
  There is no way for you as a customer to influence that, so apps relying on saving state in-memory on the server will be broken in lots of wonderful ways.
  As a workaround, you’ll have to save state in a database (such as DynamoDB) or move it to the client.

- Websockets don’t work with AWS Lambda.
  That’s because your server doesn’t exist when there are no requests. Some limited support for websockets is available through AWS IOT websockets over MQTT protocol.

- Upload to the file system will not work either
  Unless you are uploading to the /tmp folder.
  That’s because the AWS Lambda function is read-only.
  Even if you upload files to /tmp folder, they will exist for a short time, while the function is still “warm”.
  To make sure your upload feature is working fine, you should upload files to AWS S3.

  - Execution limits can also affect your serverless Express app.
    Because API Gateway has a timeout of 30 seconds, and AWS Lambda’s maximum execution time is 5 minutes.

## Various approaches

a) 3 different functions that have 3 diff http routes, one to one match.

If your app becomes varied and big, maybe it's better to split it in diff functions, to take advantage of microservices and serverless architecture following the software design priciple of single responsibility

If, using normal lambda functions, you can take advantage of NATIVE EVENTS and support that AWS will give you. (events coming from other places than http requests from API Gateway)

b) 3 diff routes pointing to the same function, same handler

c) 1 route to 1 function and then that route is routed with express, just like you normally would in a node express api
This is useful for small APIs or if you already have an express app .

So it's probably wise to use the first approach unless you already have an express app and want to quiclky migrate, and then you break it down into smaller pieces/functions.

### Option c) 1 route to 1 function and then that route is routed with express, just like you normally would in a node express api

// serverless.yaml

service: serverless

    provider:

      name: aws

      runtime: nodejsXXXX

      profile: femasters
      # AWS profile to use to deploy. If it doesnt work put the profile or the credentials in the command when deploying

      region: us-east-1

      stage: dev

    plugins:

      - serverless-offline

    functions:

      api:

        handler: src/api/api.handler

        events:
          - http: ANY /
          - http: 'ANY /{param+}'

**All the http events (HTTP triggers) with or without params will be handled by our handler**

**We've used a very broad path matching so that all requests on this domain are routed to this function. All of the HTTP routing logic will be done inside the Express application.**

// api.js

You will need some helper libraries:

The "serverless-http" package is a handy piece of middleware that handles the interface between your Node.js application and the specifics of API Gateway (isBase64Encoded flag, response code, body response shape, stringyfy the body, headers?`)

    const express = require('express');
    const serverless = require('serverless-http');

    const app = express();

    app.get('/', (req, res) => {
      res.json({ message: 'ok' });
    });

    // unlike traditional express servers the app will not listen, but it will be exported as a handler function, which is our application wrapped in the serverless package.

    module.exports.handler = serverless(app)

# Require and use own code in your app thru npm

Two ways

a)

    1.  add the below lines to package.json

        "dependencies": {

            "report": "file:./Hello"

        }

    2.  install as npm package

        npm install

    3.  require it as normal node_modules.

        const report = require('Hello');

OR

b) You can require your own files using relative paths as you would any other time (as long as you upload the files as part of your deployment package).

    const Hello = require('./Hello');

e.g.

    const express = require('express');
    const http = require('serverless-http');
    const _ = require('lodash');
    const Hello = require('./Hello');

    const app = express();

    app.get('/', (req, res) => {
        res.json({ message: Hello.sayHello() });
    });

    module.exports.handler = http(app)
