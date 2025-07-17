routing in prod

Routing in prod
----------------------
With webpack, in dev, it takes care of mapping /users or any other url to the react app, but in prod, in a real world web server, no matter what url we ask, we are delivered to the real http address, and it usually wont be found 404.

Example of a node express server in prod:

> server.js

const express = require('express');
const path = require('path');
const port = 8080;
const app = express();

app.use(express.static(__dirname));

app.listen(port);
console.log('Server started');


So, in prod, we have to tell the server that any url has to always be redirected to index.html, this html page has the bundle.js script which loads everything and boots up React Router, React Router will check the url and serve the corresponding components.
