# Basic setup

// package.json
    {
    "name": "graphqlessential",
    "version": "0.1.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "nodemon ./index.js  --exec babel-node -e js"
    },
    "author": "JH",
    "license": "ISC",
    "dependencies": {
        "express": "^4.16.3",
        "express-graphql": "^0.6.12",
        "graphql": "^14.0.2",
        "nodemon": "^1.18.4"
    },
    "devDependencies": {
        "babel-cli": "^6.26.0",
        "babel-preset-env": "^1.7.0",
        "babel-preset-stage-0": "^6.24.1"
    }
    }

// .babelrc

{
    "presets": [
        "env",
        "stage-0"
    ]
}

// index.js

    import express from 'express';
    import graphqlHTTP from 'express-graphql';
    import schema from './schema';

    const app = express();

    app.get('/', (req, res) => {
        res.send('GraphQL is amazing');
    });

    //resolvers
    const root = { helloQuery: () => "Hi, Im Javier" };

    app.use('/graphql', graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true
    }));

    app.listen(8080, () => console.log('Running server on localhost:8080/graphql'));


// schema.js

    import { buildSchema } from 'graphql';

    const schema = buildSchema(`
        type Query {
            helloQuery: String
        }
    `);

    export default schema;

# Basics

## Schema and Query
To be able to make GraphQL queries you need to define a schema that defines a Query type and a resolver for each query input.

So type definitions provides what type of data we expect, and the resolver gets the data for us.



// definitions (types) in the schema (API definition)
    
    type Friend {
        id: ID
        firstName: String
        gender: String
        language: String
        email:String
    }

    type Query {
        friendQuery: Friend // this has to be resolved
    }


// server resolver , how the server resolves that query

    const root = {
        friendQuery: () => ({
            "id": 1,
            "firstName": "Pepe",
            "gender": "Moreira",
            "language": "Somali",
            "email": "pepe@moreira.com"
        })
    };


// client query

    query {
        friendQuery {
            email
            firstName
        }
    }

### Query with params

//schema
    type Query {
        getFriend(id: ID): Friend
    }

//resolver

    import Friend from './Friend';

    const friendsDatabase = [];

    const resolversRoot = {
        getFriend: ({ id }) => new Friend(id, friendsDatabase[id]),
    };

    export default resolversRoot;


**Client call**
query {
  getFriend(id: "882cfd5fa59ccbbee515"){
    firstName
  }
}



## Mutation
### Create

**Define the mutation type**

// schema
    
    type Mutation {
        createFriend(input: FriendInput): Friend
    }

**Define the mutation input type: What input your mutations will take**

// schema

    input FriendInput {
        id: ID
        firstName: String!
        lastName: String
        gender: String
        language: String
        email: String
    }

**Add the resolver**

//resolvers.js
import Friend from './Friend';

const friendsDatabase = [];

const resolversRoot = {
    ...
    createFriend: ({ input }) => {
        let id = require('crypto').randomBytes(10).toString('hex');
        friendsDatabase[id] = input; // save it
        return new Friend(id, input); // what the resolver returns
    }
};

export default resolversRoot;

**Use the resovler in the graphql setup**

//index.js

import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema';
import resolvers from './resolvers';

const app = express();

app.use('/graphql', graphqlHTTP({
    ...
    rootValue: resolvers,
    ...
}));

app.listen(8080, () => console.log('Running server on localhost:8080/graphql'));

**Client call**

    mutation {
    createFriend(input: {
        firstName: "Javier"
        lastName: "Hack"
        gender: "male"
        email:"javierhack@gmail.com"
    }){
        id
    }
    }



## Types
Everything is graphql is defined by types.

[] -> array of ...
! -> mandatory

eg. Change the email for emails , a collection

// schema
    
    type Friend {
        ...
        emails: [Email]!
    }
    type Email {
        email: String
    }

//resolvers

    const root = {
        friendQuery: () => ({
            ...
            "emails": [
                { "email": "pepe@moreira.com" },
                { "email": "pese@pers.com" }
            ]
        })
    };

// query

    query {
        friendQuery {
            emails {
                email // define each field you want , also in the nested objects like here
            }
            firstName
        }
    }


## Queries and mutations
They are also types, like anything in graphQL , they are also defined in the schema
Mutations: create, update, delete data.


##  Resolver
Functions that respond to queries and mutations, the functions that gives us the reults of the query.
And because the convention is to leave the schema JUST FOR TYPE DEFINITIONS, we create those functions separate from the SCHEMA.

So you can have them in a separate file or import them into your main server file, or have them into your main entry server file like the index.js.

The function that returns the data that we need when we make a query with GraphQL

# Scalar types

Int
Float
String
ID:unique id for each entry in graphql
Boolean
 
## Enum types
Special scalar type that allows you to define a specific set of data the field takes and restrict the input to what is defined in that list in the enum type.

// schema

    enum Gender {
        MALE
        FEMALE
        OTHER
    }

    type Friend {
        ...
        gender: Gender
    }
    
    input FriendInput {
        ...
        gender: Gender
    }


// resolver
export default class Friend {
    constructor(id, { firstName, lastName, gender, age,language, email }) {
        ...
        this.gender = gender;
        ...
    }
}


// client mutation

 mutation {
    createFriend(input: {
        ...
        gender: MALE
        ...
    }){
        id
    }
}


 // ask for it

query {
  getFriend(id: "5ec915653bb5083cd25f"){
    ...
    gender
  }
}

 
## List types inside another


//schema

    type Contact {
        firstName: String
        lastName: String
    }

    type Friend {
        ...
        contacts: [Contact]
    }

Dont forget the inputs

//schema

    input FriendInput {
        ...
        contacts: [ContactInput]
    }

    input ContactInput {
        id: ID
        firstName: String!
        lastName: String
    }



// resolvers
export default class Friend {
    constructor(id, { firstName, lastName, gender, age, language, email, contacts }) {
        ...
        this.contacts = contacts;
    }
}

//client mutation & query

    mutation {
        createFriend(input: {
            firstName: "Javier"
            lastName: "Hack"
            gender: MALE
            age:"42"
            email:"javierhack@gmail.com"
        contacts:[
            {firstName:"Lolo" lastName:"Mun"},
            {firstName:"Lulu" lastName:"Min"}
        ]
        }){
            id
        }
    }


    
    query {
    getFriend(id: "658fbafa9dd0ae8133de"){
        firstName
        age
        gender
        contacts{
        firstName
        }
    }
    }

 

## When adding new fields to types
CHECK:
- schema type itself
- schema input types
- resolvers


remember to add them to the inputs so its saved.


    type Friend {
        ...
        age: String
    }

    input FriendInput {
        ...
        age: String
    }

And update the resolvers and/or classes used by them

And update the queries in the clients if needed ...

# Schema tools
$ npm install -S graphql-tools

we'll need to refactor a bit our code to use this tool
This tool will help when we add persistence managers like MongoDB


// schema.js

    //Now we import the resolvers into the schema instead of the index.js
    import resolvers from './resolvers';

    import { makeExecutableSchema } from 'graphql-tools';

    const typesDef = `
        type Contact {
            firstName: String
            lastName: String
        }
        ...
    `;

    // And create another type of schema with graphql-tools
    const schema = makeExecutableSchema(typesDef, resolvers);

    // We export it now inside of an object, as an object prop, not fully exported
    export default { schema };



// index.js

    import graphqlHTTP from 'express-graphql';
    // We import them destructured
    import { schema } from './schema';

    app.use('/graphql', graphqlHTTP({
        schema: schema,
        graphiql: true
    }));



# Persistence in MongoDB

with homebrew

$ brew update
$ brew install mongodb
or $ brew update mongodb


To have launchd start mongodb now and restart at login:

  brew services start mongodb

Or, if you don't want/need a background service you can just run:

  mongod --config /usr/local/etc/mongod.conf

data in /data/db

find / -type d -name "*data/db*"

db.adminCommand("getCmdLineOpts").parsed.dbpath

ps -xa | grep mongod


## mongoose
npm i -S mongoose

## re-arrange data files
move schema and resolvers to /data

and create a file to connect to the DBs
// ./data/dbConnectors.js


## get rid of the in memory db and model class

// resolvers.js

import { Friends } from './dbConnectors';
// import Friend from '../Friend';

// const friendsDatabase = [];

// resolver map

export const resolversRoot = {
    Query: {
        getHello: () => "Hi, Im Javier",
        getFriend: ({ id }) => new Friend(id, friendsDatabase[id]),
    },
    Mutation: {
        createFriend: ({ input }) => {
            let id = require('crypto').randomBytes(10).toString('hex');
            friendsDatabase[id] = input; // save it
            return new Friend(id, input);
        }
    }
};

// replace the mutations from in-memory db style to monggose style

    Mutation: {
        createFriend: ({ input }) => {
            let id = require('crypto').randomBytes(10).toString('hex');
            friendsDatabase[id] = input; // save it
            return new Friend(id, input);
        }
    }


## Test with RoboT3



# Persistence in SQLite
npm i --save casual lodash sequelize sqlite3

// dbConnectors.js


// SQL connection
const sequelize = new Sequelize('database', null, null, {
    dialect: 'sqlite',
    storage: './aliens.sqlite'
});

const Aliens = sequelize.define('aliens', {
    firstName: { type: Sequelize.STRING },
    lastName: { type: Sequelize.STRING },
    planet: { type: Sequelize.STRING }
});

Aliens.sync({ force: true }).then(() => _.times(10, (i) => {
    Aliens.create(
        {
            firstName: 'Name_' + i,
            lastName: 'LastName_' + i,
            planet: 'World_' + i
        }
    )
}));


export { Friend, Aliens };
