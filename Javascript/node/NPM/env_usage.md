.env usage
--------------------

ENV VARIABLES
---------------


SERVER SIDE APPS
-------> use dotEnv.
https://www.npmjs.com/package/dotenv

Install:

npm install dotenv --save

Usage

As early as possible in your application, require and configure dotenv.

require('dotenv').config()

e.g. 
> app.js of your node project root.

require('dotenv').config();
var express = require('express');
var path = require('path');
...

Create a .env file in the root directory of your project. Add environment-specific variables on new lines in the form of NAME=VALUE. For example:

DB_HOST=localhost
DB_USER=root
DB_PASS=s1mpl3

Add .env to .gitignore, it shouldnt be in the repo.

Access the vars: 
process.env.DB_HOST