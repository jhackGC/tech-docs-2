# express.js

- creating server made easy
- routing
- middleware

# create server

    import express from 'express';
    import config from './config';

    // create server
    const server = express();

    // listen with config
    server.listen(config.PORT, ()=>{
        console.info('Node JS Server started, listening to port: ', config.PORT);
    });

    //express can listen to mapped requests, it handles server side routing for us
    server.get('/', (req, res) => {
        res.send('Hello Express 3');
    });

# routing

    //express can listen to mapped requests, it handles server side routing for us
    server.get('/', (req, res) => {
        res.send('Hello Express 3');
    });

You may want to put them outside the server.js config

// api/index.js

    import express from 'express';

    const router = express.Router();

    router.get('/', (req, res) => {
        res.send('Hello Express 3 from routing');
    });

    export default router; // export it to be used ... by server.js

// server.js

    // API routing
    server.use('/api', apiRouter); // first arg is prefix, second router

test it with

http://localhost/api

when you have many API endpoint you can put them in a separate file

# Middlewares

They are functiosn that have access to our req and response objects, change them if needed and then call another function in the stack using next().

Each piece of middleware is a function that receives 3 params: req, res, next

- next function is what you invoke when you are finished.

You add functionality to the request/response pipeline.

e.g.

- log request
- serve static files
- handle json

Whenever we have a request it will go trough all these app.use functions until we return a response.

To let the request go to the next middleware we invoke: next(). - if we don't so it and either dont return the response, it will hang.

- hand made custom middleware

        app.route('/testMiddleware').get(
            (req, res, next) => {
                // middleware example that logs request data before moving on to next
                console.log(`Request from: ${req.originalUrl}`);
                console.log(`Request type: ${req.method}`);
                next();
            },
            (req, res, next) => {
                res.send('GET request successfull AFTER middleware!!!');
            },
        );

_next()_ allows us to move into the next function

## Log requests (custom middleware)

    server.use(function);

## Static file server

    // express.static will serve everything in 'client' as a static resource.
    // when the server recevies a GET request to '/', express.static will
    // automatically serve the index.html file on that dir.
    server.use(express.static('public'));

in a prod environment, you dont have your static assets in the node server, they are usually in nginx served by a
web server which is faster

test

    http://localhost:3000/index.html

## Handle JSON

    // By default express doesnt know how to handle json, we have to do it ourselves, or use a library.

    //body parser makes it possible to post JSON to the server.
    // we can access data we post on as req.body
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());


    Tell the server to listen
    app.listen(300);

    // brief info to the user
    console.log('Express app running in port 3000');

    // export app to be available to be used by other files (e.g. to test it !!! )
    module.exports = app;

## Provide a json api url endpoint

    app.get("/logodata-api", function(req, res){
      res.json(logoData);
    });

The res and req objects have been decorated , extended by express to provide us more functionality out of the box,
like setting the headers and stringify the json data.

## Req params

From https://expressjs.com/en/guide/routing.html

Route parameters

Route parameters are named URL segments that are used to capture the values specified at their position in the URL. The captured values are populated in the req.params object, with the name of the route parameter specified in the path as their respective keys.

Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }

To define routes with route parameters, simply specify the route parameters in the path of the route as shown below.

    app.get('/users/:userId/books/:bookId', function (req, res) {
        res.send(req.params)
    })

# Server Side Templating

## ejs

\$ npm i -S ejs

// server.js

    server.set('view engine', 'ejs');

by default express will look for ejs templates under a 'views' folder

// /views/index.js

    <html>
    <body>
        This is a EJS template page
        This is a math random nbr: <%= Math.random() %>
    </body>
    </html>

to parse and complete

    response.render()

    e.g.
    server.get('/template', (req, res) => {
        res.render('index');
    });

### use params

pass data into the tempalte as it will be seen as regular JS vars inside the template

    res.render('index', {
        content: 'content passed as param'
    });

// views/index.js

    <html>
    <body>
        This is a EJS template page
        This is a math random nbr: <%= content %>
    </body>
    </html>

by default params are sanitized and scaped, if you dont want that use

<%- content %>

e.g.

    res.render('index', {
        content: '<b>content passed as param</b>'
    });



    <html>
    <body>
        This is a EJS template page
        This is a math random nbr: <%- content %>
    </body>
    </html>

### ejs partial views

<%- include(page) -%>

header.ejs

    //index.ejs

    <html>
    <body>
        This is a EJS template page
        <%- include('header') -%>
        This is a math random nbr: <%- content %>
    </body>
    </html>

## other templating engines

sails: MVC
hapi: API oriented
koa
pug: indentation oriented
handlebars: semantic oriented
