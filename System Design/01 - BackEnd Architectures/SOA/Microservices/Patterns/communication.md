# Communication

Patterns and best practices for service-to-service communication in microservices.

---

## Overview

Communication between services is a cornerstone of any microservice architecture. It can be:

- **Synchronous:** The calling service waits for a response (e.g., REST, gRPC, GraphQL).
- **Asynchronous:** The calling service does not wait; the response may come later (e.g., message brokers, queues).

---

## Synchronous Communication

- **REST, gRPC, GraphQL:** Popular choices for direct, blocking communication.
- **Analogy:** Like a phone call—waiting for the other person to reply.

---

## Asynchronous Communication

- **Message Brokers:** Systems like RabbitMQ or Apache Kafka hold messages until they can be processed.
- **Queues:** Store messages until recipients are ready; can prioritize and ensure durability.
- **Analogy:** Like sending an email—do other things while waiting for a reply.

**Common tools/products:**

- **Message Brokers:**
  - RabbitMQ _(widely used in Node.js, with amqplib and other npm packages)_
  - Apache Kafka _(Node.js clients available, e.g., kafka-node, kafkajs)_
  - NATS _(lightweight, Node.js client available)_
- **Queues:**
  - Redis _(used as a queue with Node.js libraries like bull, bee-queue)_
  - Amazon SQS _(can be integrated with Node.js via AWS SDK)_
  - Azure Service Bus _(Node.js SDK available)_

### Benefits

- **Decoupling:** Services don't need to know about each other directly.
- **Scalability:** Brokers and queues can handle traffic bursts and scale easily.

---

## API Gateway

- Acts as the single entry point for clients.
- Routes requests to appropriate microservices.
- Handles cross-cutting concerns: authentication, SSL termination, rate limiting, caching.
- Should not contain business logic.

**Common tools/products:**

- **API Gateways:**
  - Express Gateway _(Node.js native API gateway)_
  - Kong _(can be used with Node.js services)_
  - NGINX _(popular reverse proxy, often used as an API gateway for Node.js apps)_
  - AWS API Gateway _(integrates with Node.js Lambda functions and services)_
  - Azure API Management _(works with Node.js backends)_

**Benefits:**

- Simplifies client interactions with many microservices.
- Centralizes common functionality.

---

## Summary

Microservices communicate using synchronous (REST, gRPC, GraphQL) and asynchronous (message brokers, queues) patterns. API gateways provide a unified entry point and handle common concerns, improving scalability and maintainability.
