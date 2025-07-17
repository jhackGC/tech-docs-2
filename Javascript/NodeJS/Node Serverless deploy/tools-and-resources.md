# AWS diagrams

cloudcraft.co

# DBs

## Amazon Aurora (Relational DB) Serverless: spins up a db server and charge per use

## Fauna DB

allows to spin dbs per request, with just a request you createa db ?
good for multitenant dbs (otherwise you have one db and userid in each element to separate the tenants data)

## Azure Cosmos

multi model SQL / NoSQL / Documental
good for globally distributed lambdas

## DBs abstraction for Dynamo DB

Dynamo DB native SDK is hard, try dynogels to help you abstract

# Kepp Lambdas WARM

Containers spins up everytime the lambda is accesed, and stays for some time.
keep in warm, avoiding cold starts,
or use a middle ground with a traditional server like "AWS fargate"
