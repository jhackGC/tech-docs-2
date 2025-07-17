# SQL Abstraction library and Object Relational Mapper

http://docs.sequelizejs.com/

Used for:

- MySQL
- SQLite
- PostgreSQL
- Microsoft SQL Servers

# install

    npm i -S sequelize

# install CLI

    npm install -g sequelize-cli

# Install the desired DB pkg (mysql, postgres, etc.)

    npm i --save mysql2

# IF using typescript install the types for that pkg

        npm i --save-dev types/mysql2#semver:^1.0.0

    results:

        "@types/mysql2": "github:types/mysql2#semver:^1.0.0",

# config file

Next, we need to configure Sequelize for our project.
For that, we will create a .sequelizerc file in our project's root folder.

In this file, we are going to be specifying the paths to files required by Sequelize.

Put the following content into this file:

    const path = require('path');

    module.exports = {
      "config": path.resolve('./server/config', 'config.json'),
      "models-path": path.resolve('./server/models'),
      "seeders-path": path.resolve('./server/seeders'),
      "migrations-path": path.resolve('./server/migrations')
    };

## OR mapping

    const Car = sequelize.define('Car', {
        make: Sequelize.String
    })

## Transactions

    return sequealize.transaction((t) => {


    }

# References and documentation

https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize


# Models
DAOs
Define how the tables are mapped and have class methods to get stuff