# GitHub repo

https://github.com/jhackGC/api_with_node

## Tools

When it comes to building out production-ready API's, there are several moving pieces, and for each one, there are several options.

## Runtime

We'll be using Node.js for this course. Why? Node.js uses JS as the language of choice.

## Framework

We could create an API without a framework, but that wouldn't be the best use of our time and isn't taking advantage of an amazing ecosystem at our fingertips. So, we'll be using Express to create our API inside of Node.js.

This project uses ES6 (modules) and Typescript

## Database

There are so many great options when choosing a database these days. We'll be using Psql or Postgres. It's one of the most popular DBs in the world and gives us tons of options when it's time to deploy our API. For the ORM, we'll use Prisma to interact with our DB. Prisma has proven to be a very valuable tool that can create schemas, query our DB, and even handle migrations. It also works with a variety of databases.

## Hosting

When it comes to hosting a Node.js based API, you can pretty much close your eyes then point in any direction and you'll be sure to land on a platform that supports
Node. This is not a DevOps class, so we want to use a platform that manages it all for us. For that, we'll be using Render.
Alternative we will give the option to deploy in EC2 and Lambda AWS services

# The App

We'll be building an API for a ChangeLog app.
This app allows a product manager or engineer post product updates for their users.
The user needs to be able to read, create, update, and delete product updates.

# Frameworks

## Express
