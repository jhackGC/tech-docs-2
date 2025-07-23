# Resilience and Fault Tolerance

Strategies for building resilient microservices and handling failures gracefully.

As our systems grow in complexity, being prepared for failure isn't just a good practice, it's a necessity. When running software in thousands of machines communicating over the network, it's just a matter of time until one service is low or unresponsive, a computer crashes, the networks get partitioned or packages get lost.

It's also expected to see different amounts of traffic throughout the day or in particular days.

For an event platform, this is very natural. As you can imagine, when a very popular artist announces a new show, they get a spike in traffic from customers wanting to buy tickets, and they need to be able to handle this gracefully.

There are many patterns to make microservices more resilient. Here are some common examples.

## Load Balancing

First, load balancing. This basically distributes incoming requests across multiple servers. This is critical in microservices to ensure that no single node becomes a bottleneck, thus improving reliability and availability.

**Common tools/libraries:**

- NGINX _(reverse proxy, widely used for load balancing Node.js apps)_
- HAProxy _(high-performance load balancer)_
- AWS Elastic Load Balancer _(cloud-based)_

## Caching

Next, caching, which stores copies of frequently accessed data that's expensive to fetch or compute. It's common for services to cache data from their own database or from other services to avoid making extra requests, which would slow down the response time.

**Common tools/libraries:**

- Redis _(in-memory cache, popular in Node.js with ioredis, node-redis)_
- Memcached _(supported in Node.js via memjs, memcached)_
- Node-cache _(simple in-memory caching for Node.js)_

## Timeout and Retries

Next, services normally implement timeouts and retries. If service A calls service B, but it doesn't hear back, this could be because service B is unresponsive or crashed or maybe because the network is slow or partitioned or the bucket just got lost.
If service A keeps waiting for this response, this can be a domino effect, as the service that called service A in the first place originally might also be waiting.

**Common tools/libraries:**

- axios-retry _(retry logic for HTTP requests in Node.js)_
- node-fetch-retry _(fetch with retry support)_
- promise-retry _(generic retry logic for promises)_
- got _(HTTP client with built-in retry and timeout support)_

## Rate Limiting and Circuit Breakers

Finally, services can implement rate limiters and circuit breakers. A rate limiter makes sure that when service A calls service B, it does not make more requests per second than a specified threshold to avoid overwhelming B.

**Common tools/libraries:**

- express-rate-limit _(rate limiting middleware for Node.js/Express)_
- rate-limiter-flexible _(advanced rate limiting for Node.js)_

A circuit breaker is a pattern that service A can use when requests to service B are failing.
It consists on service A opening the circuit and automatically failing all requests without actually calling B, trying to allow it to recover.

**Common tools/libraries:**

- opossum _(circuit breaker for Node.js)_
- Brakes _(circuit breaker library for Node.js)_

A actually makes one request to be every now and then to check if it's still failing. And when it sees that it's up again, it can close the circuit and allow all requests to go through.

These two patterns can improve the stability of the whole system and make it more resilient to traffic bursts.

There are some tools and libraries, which already implement many of these patterns so developers don't have to rewrite them from scratch, in most cases.
