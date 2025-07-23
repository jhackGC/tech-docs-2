# Common APIs

Let's now get familiar with some of the most common technologies used for implementing APIs using microservices.

## REST

Which stands for representational state transfer. It's an architectural style for designing network applications. It uses HTTP as a communication medium, and it revolves around the stateless operations, meaning each request from a client to a server must contain all the information needed to understand and process it.

It's resource‑oriented, focusing on manipulating resources, which are represented in formats like JSON or XML. It's stateless.

Each request is independent, and server‑side sessions are not maintained.

It's idempotent, meaning that multiple identical requests should have the same effect as a single request.

It uses HTTP methods like GET, POST, PUT or DELETE to perform operations.
And finally, it's simple and versatile, easily consumed by a variety of clients, including browsers and mobile devices.

## gRPC

GRPC is a high performance language agnostic RPC, which stands for remote procedure call.

It uses HTTP/2 for transport and protocol buffers, and protobuf, as its interface description language.
It's characterized by its efficiency, as it's optimized for low latency and high throughput. One problem with REST is that JSON and XML are not typed. GRPC is strongly typed.

It uses protocol buffers, which require a pre‑defined schema for data, which reduces the problems that can happen when microservice's APIs change over time.

It also supports streaming requests and responses. It provides tools to generate client and server code in multiple languages.

## GraphQL

GraphQL is a query language for APIs, as well as a server‑side runtime for executing queries.
One issue with REST and gRPC is that a user of the API needs to retrieve the full message, even if they only care about a single field.

GraphQL solves this, as it allows clients to request exactly the data they need, nothing more, nothing less.
So flexible queries are the main benefit.

Clients specify the structure of the response they need.
Similar to gRPC, GraphQL also has strongly‑typed schemas. This serves as a contract between the client and the server.

It's introspective.
You can query the API schema to discover the types and operations supported.
And typically, it exposes a single HTTP endpoint for all interactions, reducing the over‑fetching and under‑fetching of data.

It is not uncommon for companies which are using many microservices, to potentially combine all three of these APIs for different services with different requirements.
