# Front System Design - Network Performance

## Optimise network speed through better HTTP usage, caching, compression, and efficient resource loading.

Key network performance metrics
Network performance is crucial for ensuring that web applications respond quickly and reliably. To measure this, several key metrics provide insights into how well a network performs:

Latency: This is the time delay between sending a request and receiving the first byte of the response. Smaller latency is critical for a smooth user experience. Ideally, a latency of under 100 ms is considered excellent for real-time interactions, with 200 ms being acceptable for most web applications.

Bandwidth: This measures a network path’s maximum data transfer rate, typically expressed in megabits per second (Mbps). High bandwidth can support larger file transfers.

Throughput: This indicates the actual rate of successful data delivery over a network.

Time to first byte (TTFB): This metric measures the time from sending a request to receiving the first byte of the response. It helps diagnose server delays.

HTTP optimization techniques

- HTTP versions and request handling: Use the latest HTTP/2 or HTTP/3 protocols for multiplexing requests, reducing latency, and improving loading times.

- Reducing HTTP requests: e.g. using sprites or bundlers to minimize the number of requests made by the application.

- Connection Keep-Alive: Use persistent connections to reduce the overhead of establishing new connections for each request.

- Content compression: Implement gzip or Brotli compression to reduce the size of transmitted resources, improving load times.

## Caching strategies for faster load times

- Browser caching
  Browser caching, or client-side caching, improves performance by storing static assets—like images, CSS, and JavaScript, on the user’s device to reduce repeated network requests.
  Cache-Control being the preferred modern approach due to its flexibility.

  By combining browser caching with service workers, applications achieve faster load times, reduced bandwidth usage, and seamless offline support.

  - Network caching techniques
    Not all caching happens in the browser—several layers of network-level caching can drastically improve frontend performance. These include **_CDNs _** (content delivery networks), reverse proxies, edge servers, and even caches managed by ISPs.

### How does caching impact the performance of dynamic content, and what are the trade-offs?

Caching can speed up dynamic content delivery by reducing server load and latency, but it risks serving outdated data. To manage this, strategies like short-lived cache durations, conditional requests, and stale-while-revalidate are used. The trade-off is between speed and freshness. Caching speeds things up but might serve outdated data if not managed carefully.

## Optimizing network requests

### Reducing DNS lookups

By adding the following <link> tag in the HTML <head>, browsers resolve specified domains early:

```html
<link rel="dns-prefetch" href="//example.com" />
```

### Using prefetch, preload, and preconnect

Modern browsers provide resource hint directives—_prefetch_, _preload_, and _preconnect_—to prioritize critical assets and improve rendering speed:

- _prefetch_: Instructs the browser to fetch resources likely needed in the near future.

- _preload_: Allows us to specify resources that are critical for the current navigation.

- _preconnect_: Establishes early connections to important third-party origins.

For example, prefetching a font:

```html
<link
  rel="prefetch"
  href="fonts/myfont.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

## Synchronous and asynchronous resource loading

In HTML, synchronous load is the default behavior. In order to load scripts asynchronously, we can make use of the async and/or defer attributes.

- How do synchronous and asynchronous loading differ from prefetch and preload in web performance optimization?

Synchronous and asynchronous loading control the timing and execution of scripts, directly affecting the rendering process.
Synchronous loading blocks page rendering until the script is fully loaded and executed, which can delay the overall load time.
In contrast, asynchronous loading—using async or defer—allows scripts to load without blocking rendering, significantly improving performance and user experience.

On the other hand, prefetch and preload are resource hints that help the browser decide which assets to fetch early.
While preload is used to load critical resources needed during the current page load, prefetch fetches resources that might be needed shortly (e.g., for navigation to the next page).
Unlike async and defer, which focus on when a script runs, prefetch and preload focus on when a resource should be fetched.
Together, these techniques serve different roles but complement each other in optimizing page load and rendering performance.

# Tips

Tips to further boost network efficiency and enhance frontend performance:

- Appropriate API architecture
  Based on your application's needs, choose an efficient API architecture style, such as REST, GraphQL, or gRPC. For example, GraphQL allows clients to request only the data they need, reducing payload size and improving performance for mobile or low-bandwidth users.

- Mobile optimization
  Optimize for diverse devices by using responsive designs and minimizing resource-heavy operations. Adjust for slower networks and hardware limitations, ensuring smooth experiences across all devices.

- Caching strategies
  Use a combination of caching techniques—like browser, CDN, and server-side caching, tailored to your app’s needs for maximum performance and efficiency.

- Performance monitoring
  Regularly monitor performance using dev tools to catch bottlenecks early and maintain smooth user experiences.

# Conclusion

With smart use of HTTP, caching, compression, and careful resource loading, we can build apps that load faster and scale better.
