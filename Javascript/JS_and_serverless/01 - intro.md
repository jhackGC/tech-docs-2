# install

https://serverless.com/

https://serverless.com/framework/docs/getting-started

# Installing the serverless cli

npm install -g serverless

# create a project in your desired platform e.g. nodeJs

https://serverless.com/blog/serverless-express-rest-api/

    $ serverless create --template aws-nodejs

This creates the files needed to deploy a sls function in AWS (Lambda):

- handler.js: the function handler, the entry point for your functionality
- serverless.yml: sls config file

# config file

    //  Welcome to Serverless!
    //
    //  This file is the main config file for your service.
    //  It's very minimal at this point and uses default values.
    //  You can always add more config options for more control.
    //  We've included some commented out config examples here.
    //  Just uncomment any of them to get that config option.
    //
    //  For full config options, check the docs:
    //     docs.serverless.com
    //
    //  Happy Coding!

    service: swell-sls //  NOTE: update this with your service name

    //  You can pin your service to only deploy with a specific Serverless version
    //  Check out our docs for more details
    //  frameworkVersion: "=X.X.X"

    provider:
        name: aws
        runtime: nodejs8.10

    //  you can overwrite defaults here
    //   stage: dev
    //   region: us-east-1

    //  you can add statements to the Lambda function's IAM Role here
    //   iamRoleStatements:
    //     - Effect: "Allow"
    //       Action:
    //         - "s3:ListBucket"
    //       Resource: { "Fn::Join" : ["", ["arn:aws:s3:::", { "Ref" : "ServerlessDeploymentBucket" } ] ]  }
    //     - Effect: "Allow"
    //       Action:
    //         - "s3:PutObject"
    //       Resource:
    //         Fn::Join:
    //           - ""
    //           - - "arn:aws:s3:::"
    //             - "Ref" : "ServerlessDeploymentBucket"
    //             - "/*"

    //  you can define service wide environment variables here
    //   environment:
    //     variable1: value1

    //  you can add packaging information here
    // package:
    //   include:
    //     - include-me.js
    //     - include-me-dir/**
    //   exclude:
    //     - exclude-me.js
    //     - exclude-me-dir/**

    functions:
        hello:
            handler: handler.hello

    //     The following are a few example events you can configure
    //     NOTE: Please make sure to change your handler code to work with those events
    //     Check the event documentation for details
    //     events:
    //       - http:
    //           path: users/create
    //           method: get
    //       - s3: ${env:BUCKET}
    //       - schedule: rate(10 minutes)
    //       - sns: greeter-topic
    //       - stream: arn:aws:dynamodb:region:XXXXXX:table/foo/stream/1970-01-01T00:00:00.000
    //       - alexaSkill: amzn1.ask.skill.xx-xx-xx-xx
    //       - alexaSmartHome: amzn1.ask.skill.xx-xx-xx-xx
    //       - iot:
    //           sql: "SELECT * FROM 'some_topic'"
    //       - cloudwatchEvent:
    //           event:
    //             source:
    //               - "aws.ec2"
    //             detail-type:
    //               - "EC2 Instance State-change Notification"
    //             detail:
    //               state:
    //                 - pending
    //       - cloudwatchLog: '/aws/lambda/hello'
    //       - cognitoUserPool:
    //           pool: MyUserPool
    //           trigger: PreSignUp

    //     Define function environment variables here
    //     environment:
    //       variable2: value2

    //  you can add CloudFormation resource templates here
    // resources:
    //   Resources:
    //     NewResource:
    //       Type: AWS::S3::Bucket
    //       Properties:
    //         BucketName: my-new-bucket
    //   Outputs:
    //      NewOutput:
    //        Description: "Description for the output"
    //        Value: "Some output value"

functions:

    hello: // this will be the name of your lambda in Aws

      handler: handler.hello
      // source code that handles the function with its path, relative to the service
      // "handler" is the name of the file (handler.js)
      // .hello is the name of the export in the handlers file, it has to match

# run the lambda function

Is not an api yet, so I can run it as just that, invoke it locally.

    $ sls invoke local -f hello

it has to have "local" in the command, or it will go and try to do it in AWS.

## function structure

    // hello.js

    module.exports.handler = (evt, ctx, done) => {

    }

event: input/payload sent to the lambda, depending on the event you are suscribed, the evt will be diff

ctx: execution ctx in aws (stage, IAM user, etc ...)

## calling your lambda locally with events

// hello.js

    module.exports.handler = (evt, ctx, done) => {

        // const response = evt.message + 'World';

        const response = 'World';
        return done(null, response);

    }

// serverless.yaml

    service: testember-sls # NOTE: update this with your service name

    provider:
      name: aws
      runtime: nodejs12.x

    functions:
      helloFunction:
        handler: src/hello.handler

// event.json

    {
      "message": "hello"
    }

// run it

    $ sls invoke local -f helloFunction -p src/event.json

# Lambda events

## Ways to execute the Lambdas: Sync vs Async

### Sync mode

You call a Lambda and you wait for the function/api call to come back.

### Async mode

You call a Lambda and forget about it, you dont wait for it

## AWS Event types

All event types are in:

    https://docs.aws.amazon.com/lambda/latest/dg/invoking-lambda-function.html

To see them to be tested, when you have the test deployed, go to the test area of the function in AWS, choose one and see the event that is going to be used

like for a test event of: API Gateway AWS Proxy
the event payload would be:

    {
      "body": "{\"test\":\"body\"}",
      "resource": "/{proxy+}",
      "requestContext": {
      "resourceId": "123456",
      ...
    }

To test the function execution called from different events, you can copy the example into event.js and run the function locally with that as the event payload

**But if you need more reosurces from AWS, more dependencies, is harder to test locally, and you will have to test in AWS.**

## CloudFormation and serverless framework

Much of the config in Lambda is made by the severless framework, you dont have to touch much of the config there.

Cloudformation is a bunch of commands/scripts, a CLI that helps to configure a series of services in AWS.

So CloudFormation IS USED BY serverless to configure the lambda services.

CloudFormation is still hard to use, so serverless is an abstraction on top of CloudFormation.

That means whatever is avail on cloudformation is also avail on serverles, so it can be configurad in the yaml file.

## Create an API for lambda. API Gateway Routing

API Gateway: Is a proxy to AWS services, in our case, a Lambda function

It's responsible for routing our http events to Lambdas.

It's recommended to create/configure the API Gateway from sls config, not from the console directly.

The event we will be subscribing to will be API Gateway AWS Proxy (go and see them in the Test area of the lambda function)

So the payload showed in the test windows for that event, will be whats needed for your lambda to respond to a http request.

This event is formatted from the API Gateway.

**So when someone issues a http request to your API Gateway, in a normal way, the Gateway gets the caller's request, and uses that to format it's own event object based on the incoming request, and sends it to your lambda as an event**

## Setup API Gateway Locally

API Gateway sits between your client and the Lambda Function

So its a long lived process, a server.

We are going to emulate that server on our machine.

So our Local API gateway will execute the local Lambda functions passing its event formatted as if run in AWS.

AND our lambda now returns to API Gateway, so in order for API Gateway to respond our client in a predictable way we have to
respond to API Gateway in a predictable way.

That's why they give us a format to follow in the response to the API Gateway

    const responseBody = {
      data: {
        ...
      }
    },

    const response = {
      statusCode: 200,
      header: {} // optional
      body: JSON.stringify(responseBody) // whatever you send HAS TO BE STRINGYFIED
    }

    done(null, response);

Lambdas are very low level, they won't stringify it for you.

So with that response the Lambda is set up the properly respond to the event sent by APIGateway

Now we we'll create an "api" function suscribed to a HTTP event in the uri "/api".
We have to setup the EVENT

// serverless.yaml

    functions:
      api:
        handler: src/api/api.handler
        // add the event your Lambda subscribes to
        events:
          - http:
              method: GET
              path: /api

// function api.js

    module.exports.handler = (event, ctx, done) => {

      const responseBody = {
          data: {
            id: 1,
            name: 'coming from API',
            status: 'alive'
          }
        }

      const response = {
        statusCode: 200,
        body: JSON.stringify(responseBody)
      }
      done(null, response)
    }

Now when some service does a GET (SYNCH) request to /api it will emit an event, it will execute the handler for the function and it's gonna pass the event that the API Gateway formatted as the first arg., and it's going to WAIT for the response or error.

### test a http call - installing the API Gateway locally

You could run the local function using the event json as input, as brought from the test console, and it will kind of run.

But what we really want is to test if thorugh the API Gateway, so we have to install it locally. There is a server that simulates the API Gateway, that is implemented in serverless-offline pkg.

install the pkgs

    $ npm install express serverless-http serverless-offline

add serverless-offline to the framework config

// serverless.yaml

    plugins:
      - serverless-offline

Add a script to make it easier to run it

// package.json

    "scripts": {
      "dev": "sls offline start --port 4500",

Run it

    $ npm run dev

Test it

    http://localhost:4500/api

#### Using params in the API

// serverless.yaml

    functions:
          api:
            handler: src/api/api.handler
            // add the event your Lambda subscribes to
            events:
              - http:
                  method: GET
                  path: /api/{id}
                  request:
                    - parameters:
                        id: true // Explicit tell API Gateway to let it through

// function api.js

        module.exports.handler = (event, ctx, done) => {
          const responseBody = {
            data: {
              methodCalled: "get",
              params: event.pathParameters
            }
          };

          const response = {
            statusCode: 200,
            header: {}, // optional
            body: JSON.stringify(responseBody) // whatever you send HAS TO BE STRINGYFIED
          };

          done(null, response);
        }

# Deploy to AWS

## Configure your aws login

https://serverless.com/framework/docs/providers/aws/guide/credentials/

The sls framework user will have to:

- Create an S3 bucket for your function deployments
- Upload your function zip files to that S3 bucket
- Submit a CloudFormation template
- Create the log groups for your Lambda functions
- Create a REST API in API Gateway
- Create a DynamoDB table

* So, create a user in IAM with permissions:
  https://serverless.com/blog/abcs-of-iam-permissions/

  (this list can be narrowed down)

  - AWSLambda_FullAccess
  - AWSCloudFormationFullAccess
  - AmazonAPIGatewayAdministrator
  - IAMFullAccess

* Set a profile to deploy, using the newly user created keys

      $ vim ~/.aws/credentials

## Deploy full server

Deploys the complete serverless with all the functions
It overrides all the functions, the whole server.

based on:

    provider:

      name: aws

      runtime: nodejs12.x

      profile: your_aws_profile
      // if none, deploys to [default] profile in AWS config in your machine.
      // if it doesnt work put the profile or the credentials in the command when deploying

      region: us-east-1 // defaults to us-east-1

      stage: dev // defaults to dev, allows you to stage your functions, they will have their own API Gateway URI and so on

Run

    $ sls deploy

### NOTES: dont try to use env variables in the yaml file

Each function size is big as it contains all the node js modules

You can see now the services in the lambda console.

## Logs

Logs can be seen in CloudWatch ...

or

locally

      $ sls logs -f <fn name>

to stream / tail

      $ sls logs -f <fn name> -t

## Errors troubleshooting

The entry point for your Lambda is API Gateway, it will send API Gateway Http requests to your lambda and getting the responses and sending tham back to the client.

To research for potential errors, apart from the

### ERROR: Malformed Lambda proxy response

https://aws.amazon.com/premiumsupport/knowledge-center/malformed-502-api-gateway/

For API Gateway to handle a Lambda function's response, the response must be JSON in this format:

    {
        isBase64Encoded: true|false,
        statusCode: httpStatusCode,
        headers: { "headerName": "headerValue", ... },
        body: ...
    }

# Your lambda in the console

## Lambda DASHBOARD: Configuration

### Function Code

You can edit the code here if the function is hand made, small

### Env variables

you can se them here,

### Tags

set them or come set from the serverless config

### Besic settings

description
memory usage, dont change it unless really clear what for
hang out limit

### Execution roles

Your lambda needs to be invoked, assuming a role of some authorised user on AWS
You have to give the lambda some permission to execute, this tells you lambda wheter it can access other AWS resources or not, based on this execution authorisation.

e.g. So if you have a dynamo db table this roe has to have permission for that resource

BY DEFAULT SERVERLESS creates an execution lambda for your service with your namespace
You can go to IAM and find that role, and attach permissions to it. And thats how you can do things.
So if you have to access S3 or Dyanme inside of this lambda I have to go the IAM definition for that role and attach the S3 permissions to it so it can use it, orherwise I cant use it inside that lambda

### Network

Without a VPC your Lmabda CANT TALK TO THE INTERNET, e.g. an API call to something outside AWS, like a github call
The only way around is setting a VPC with Internet Gateway

### Debugging and error handling

### Concurency

how many parallel invocations to this function you can run at one time, max 1000.

### Admiting and compliance

## Lambda DASHBOARD: Monitoring

## Lambda in S3

Your function is deployed in S3

Good to check code lines as you dont have a stack trace or debugger.
or to double check if you deployed.
WHen cold loaded The lambdas have to be unzipped

## Use webpack to manage the deploy

use serverless-webpack

# VPC

AWS private cloud,
Each account has its own
Cant see what reaousrcs are connected to the VPC, you have to go and seearch each service for it.
Check the serverless docs for an explanation

# Closure

Anything declared outside of the lambda function export, stays in the container

If you mutate that reference in the lambda function you may have side effects

This could be useful for reusing dbs connections but maybe that makes it every request mutates the data shared.

i.e.

    const state = {name: 'John'};

    module.exports.handler = (evt, ctx, done) => {
      state.name = evt.name; // Im changing the state as it is in the closure, you are mutating the shared state
    }

    **a solution could be to make your state inmmutable**

    const state = {name: 'John'};

    module.exports.handler = (evt, ctx, done) => {
      const _state = {...state, name: evt.name; // becomes inmutable
    }

Best approach dono trely on closure, do not use shared state, keep lambda functions stateless.

# Testing Lambda

## debugging mode

export SLS_DEBUG=true

## testing

// package.json

    "scripts": {
      "test": "jest"
    },
    "devDependencies": {
      "jest": "^22.4.3"
    },
    "jest": {
      "testURL": "http://localhost/"
    }

## test your stuff

Dont test if something is coming from the event or context, that is not your responsibility, test your functions and wrap them if needed.

## testing a express function

    // package.json
    {
      "dependencies": {
        "express": "^4.16.3",
        "serverless-http": "^1.5.5",
        "serverless-offline": "^3.20.2"
      },
      "scripts": {
        "dev": "sls offline start --port 4500",
        "test": "jest"
      },
      "devDependencies": {
        "jest": "^22.4.3",
        "supertest": "^3.0.0"
      },
      "jest": {
        "testURL": "http://localhost/"
      }
    }

// serverless.yaml

    service: serverless

    provider:
      name: aws
      runtime: nodejs12.x
      profile: femasters
      region: us-east-1
      stage: dev

    plugins:
      - serverless-offline

    functions:
      api:
        handler: src/api/index.handler
        events:
          - http: ANY /
          - http: 'ANY {proxy+}'

    // src/api/index.js

      const serverless = require('serverless-http');
      const myApi = require('./api');

      module.exports.handler = serverless(myApi);

    // src/api/api.js

      const express = require('express')
      const app = express()

      app.get('/', (req, res) => {
        res.json({message: 'ok'})
      })

      app.get('/todos', (req, res) => {

        const todos = [
          {id: 1, name: 'clean up', status: 'open'},
          {id: 1, name: 'cook', status: 'done'}
        ]

        res.json({data: todos})
      })

      app.get('/todos/:todo', (req, res) => {
        res.json({id: 1, name: 'clean up', status: 'open'})
      })

      module.exports = app

// src/api/api.test.js

      const app = require('./api');
      const supertest = require('supertest');

      describe('API', () => {
        let request;

        beforeEach(() => {
          request = supertest(app);
        });

      test('should get todos', done => {
        request
        .get('/todos')
      .expect(200, (err, res) => {
      expect(res.body.data).toHaveLength(2);
      done();
      })
      })

      })

# Kepp Lambdas WARM

Containers spins up everytime the lambda is accesed , and stays for some time.
keep in warm, avoiding cold starts,

or use a middle ground with a traditional server like "AWS fargate"
