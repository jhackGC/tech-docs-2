# https : The HTTP Module

Can be used for server or client actions

We have http module and the https module, if we want to work with the https module, we have to supply the
security certificate.
When requesting for https sites, we have to use the https module.
The callback func receives a response object, which is a Stream !.

# importing

//ES5 - if not using babel
    var https  =  require('https');
    var fs  =  require('fs');

//ES6 - using Babel
    import https from 'https';
    import fs from 'fs';


## Making a request


If you want to request to a http server you have to use the http module, same for https.



// httpClient.js

    import https from 'https';
    import fs from 'fs';

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


## Creating a server


    import http from 'http';

    // create server
    const server = http.createServer();

    // listens to port
    server.listen(3000);

    // subscribe to request events
    server.on('request', (req, res) => {
        //function that listens to requests
        console.info('req', req);
        res.write('Hello HTTP!\n');
        res.end();
    });

## https: SERVING FILES

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


    http.createServer(function(req, res) {

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


## SERVING json (json APIs)
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


# POSTING JSON - Collecting POST json data
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