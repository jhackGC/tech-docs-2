Microservices communicate with each other using well-defined APIs over a network.

The most common communication methods are:

1. HTTP/REST
   Services expose RESTful endpoints.
   Other services make HTTP requests (GET, POST, PUT, DELETE) to interact.
   Simple and widely supported.

2. Messaging (Asynchronous)
   Services use message brokers (e.g., RabbitMQ, Apache Kafka, Azure Service Bus).
   Communication happens via messages, events, or queues.
   Enables decoupling and scalability.

3. gRPC / Protocol Buffers
   High-performance, binary protocol for remote procedure calls.
   Used for efficient, strongly-typed communication.

4. GraphQL
   Services expose GraphQL APIs for flexible queries.
   Useful for aggregating data from multiple microservices.

5. Service Mesh
   Infrastructure layer (e.g., Istio, Linkerd) manages service-to-service communication, security, and observability.

## References:

Microservices Communication Patterns (Microsoft Learn)
Martin Fowler: Microservices
