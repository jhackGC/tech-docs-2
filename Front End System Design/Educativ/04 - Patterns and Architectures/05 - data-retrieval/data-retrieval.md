# Data Retrieval in Frontend System Design

Understand and compare polling, WebSockets, and server-sent events (SSE) to choose the most efficient data-fetching strategy for real-time and dynamic frontend applications.

Imagine a user visiting a page to check their notifications, but nothing loads until they manually refresh. Now, picture an online stock trading app that updates so slowly that users miss critical price changes. These scenarios highlight inefficient data fetching patterns or techniques.

**Problem:** Modern web applications rely on dynamic, data-driven interfaces, but loading too much data or fetching it inefficiently leads to sluggish performance, delayed responses, and frustrated users.

**Solution:** To keep web apps fast and responsive, selecting the right data fetching strategy is crucial. Fetch data only when necessary, such as after a user action or in real-time if the application demands it. This approach minimizes delays and prevents unnecessary system load.

Let’s explore the key data fetching patterns and how they optimize performance.

---

## Introduction

Servers can send a large amount of data to connected clients daily in real-world applications. Different applications require a varied communication structure depending on their use cases; for example, a few applications are tolerant to some delays, while others might need near real-time updates. For example, real-time communication is needed with a navigation system, where the server tells the directions, and the client must repeatedly send its location.

This lesson will discuss different data fetching patterns and techniques to optimize applications’ performance while fetching larger server data. We’ll explore the following:

- Polling
- WebSockets
- Server-sent events

Let’s discuss the mentioned approaches one by one.

---

## Polling

Polling involves periodically sending requests to check for new data. It can be divided into the following two categories:

### Short polling to fetch data

With short polling, the client initiates a request to the server for a particular kind of data at regular intervals (usually < 1 minute). When the server gets the request, it must respond with either the updated data or an empty message. Even though the small polling interval is nearly real time, deciding the polling frequency is crucial. Short polling is viable if we know the exact time frame when the information will be available on the server. The illustration below represents the short polling procedure between the client and server:

Press

- to interact

Short polling approach making needless requests to a particular server

Short polling approach making needless requests to a particular server

**Problems with the short polling approach are as follows:**

- Unnecessary requests when there are no frequent updates on the server side. In this case, clients will mostly get empty responses as a result.
- When the server has an update, it can’t send it to the client until the request comes.

Let’s take a look at the following illustration to understand the problems mentioned above better:

Press

- to interact

Short polling problem: Delay in fetching updates

Short polling problem: Delay in fetching updates

The illustration shows the server has new data to send immediately after the first response. However, the client has to wait for a predetermined interval until the next request to receive the data arrives.

---

### Long polling to fetch data

Long polling operates the same way as short polling, but the client stays connected and waits for the response from the server until it has new updates. This approach is also referred to as hanging get. In long polling, the server does not give an empty response; there is an acceptable waiting time after which the client has to request again. However, this strategy is appropriate when data is processed in real time to minimize long waiting intervals for a response. However, it does not deliver significant performance because the client may have to reconnect to the server multiple times after a timeout to get new data. Let’s see the illustration below to understand how the client faces idle time and places a new request if there is no server-side update after an interval:

Press

- to interact

Long polling problem: long wait time for updates

Long polling problem: long wait time for updates

**Problems that come with long polling include:**

- The delays while waiting for the occurrence of an update or timeouts.
- The server has to manage the unresolved states of numerous connections and their timeout details.
- The client must establish multiple concurrent connections by sending another request to get new information. Otherwise, it must wait for a response or timeout of the already-established connection.

**Note:** The TCP connection between the client and server used by the approaches discussed above can be persistent or non-persistent. The client or server opens a TCP connection once to establish a persistent connection. However, for non-persistent, it regularly initiates TCP/IP connections for each request.

To overcome these challenges, we need to opt for a real-time data fetching technique, and WebSocket is the one. Let’s discuss that.

---

## WebSocket for real-time data retrieval

WebSocket is a persistent full-duplex communication protocol that runs on a single TCP connection. In real-time applications, clients sometimes need to send requests frequently to the server. For instance, if the client initiates a request and receives part of the response instead of a complete response, the client can send another request over the same TCP connection. This is achieved by requesting to upgrade the connection from TCP to WebSocket. At the same time, we need low latency and efficient resource utilization. For this, WebSocket is ideal, allowing full-duplex communication over a single TCP connection, as shown below:

Press

- to interact

Data fetching through WebSocket

Data fetching through WebSocket

In the illustration above, the client and server can communicate data whenever needed, and such scenarios are important for many real-time applications. The stateful attribute of the WebSocket also gives an advantage by allowing for the reuse of the same open TCP connection. This approach suits multimedia chat, multiplayer games, notification systems, etc. A WebSocket connection must be upgraded from a typical HTTP connection.

### How does WebSocket work?

WebSockets is great for specific scenarios, such as multiplayer gaming, live streaming, and video conferencing, but it also has some limitations:

- Horizontal scaling is complex because we can’t load balance and reroute requests coming from a client once the connection is upgraded to WebSocket.
- Connection failures greatly affect the sending and receiving ends. As the connection is stateful and the request headers carry no information about the sending and receiving ends, it’s difficult to recover the lost connection.

Although WebSockets excel in interactive applications like chat or gaming, they introduce complexity in scenarios that only require server-to-client updates. This is where Server-Sent Events (SSE) shine, offering a simpler, more reliable solution for streaming updates like news feeds and stock prices.

---

## Server-sent events

Server-sent events (SSE) are a unidirectional (server-to-client) server push approach and a component of the HTML5 specification. A server push means that the specified client automatically gets data from the server after the initial connection has been set up. In SSE, the client requests the URL through a standard EventSource interface to enable an event stream from the server. Additionally, the client defines the text/event-stream under the Accept header in the request. Here, the event-stream represents a media type known as MIME. Before initiating the request, the client-side application also checks the server-sent event support on the client (browser).

This approach is mainly used for the notification system, where clients get notified by the server upon update. Let’s see the illustration below to understand the SSE approach:

Press

- to interact

Data fetching using SSE

Data fetching using SSE

In the illustration above, the client automatically gets notifications until the client or server terminates the connection.

**The drawbacks that come with the SSE approach are as follows:**

- When we use SSE over HTTP/1.1, the browsers allow limited connections per domain because each requested resource requires a separate TCP connection. However, HTTP/2 has resolved this issue by multiplexing all requests and responses over a single TCP connection; we must ensure this compatibility in our applications if we opt for SSE.
- Another major problem with SSE is that it only allows text-based streaming due to data format limitations, such as not supporting binary data. So, we can’t use it for other streaming data such as video, audio, etc.

Applications use SSE for different purposes. For example, Twitter, Instagram, and Meta use SSE for newsfeed updates. Stock applications use SSE for real-time stock updates. Sports applications use SSE for live score updates.

---

## Points to Ponder!

1.  Assuming that a network is flaky between the client and the server, it isn’t easy to guarantee consistent connections in real-world applications. How will SSE recover when the connection drops?

Show Answer
Q1 / Q2

Imagine you're building a live sports score or stock market dashboard where the server continuously pushes updates to thousands of users. In this case, why might Server-Sent Events (SSE) be a better choice than WebSockets? Provide your response in the widget located below.

Want to know the correct answer?
SSE for Live Updates

---

## Comparison of data fetching techniques

Now, we’ll compare each approach, considering a real-time application. The table below compares the data-fetching approaches discussed above:

**Data Polling Approaches**

|      Approach |                                 Low Latency                                  |                          Efficient Bandwidth Usage                          | Full Duplex | Browser's Compatibility |
| ------------: | :--------------------------------------------------------------------------: | :-------------------------------------------------------------------------: | :---------: | :---------------------: |
| Short polling | No (can lower by it using 0 timeout, but at the expense of poor network use) | No (can be better by increasing timeout but at the expense of higher delay) |     No      |           Yes           |
|  Long polling |                       Yes (better than short polling)                        |                       Yes (better than short polling)                       |     No      |           Yes           |
|     WebSocket |                                     Yes                                      |                                     Yes                                     |     Yes     |           Yes           |
|           SSE |                                     Yes                                      |                                     Yes                                     |     No      |           Yes           |

We can opt for the right data fetching pattern based on the application’s requirements, and in some cases, we can opt for a hybrid approach to cut the cost. On the other hand, we can also use different approaches to optimize data fetching, as discussed earlier in optimizing performance, such as pre-fetching data, lazy loading, on-demand data fetching, etc.

When building frontend systems at scale, treating data reads and writes the same way is tempting. But in reality, they often have very different needs. This is where CQRS (command query responsibility segregation) becomes a useful pattern. It separates the logic for reading data (queries) from updating data (commands), allowing each side to evolve independently. We can optimize reads on the frontend for speed and usability while keeping writes clean and consistent. Especially in micro-frontends or modular apps, CQRS helps prevent tangled state flows and makes complex UIs easier to reason about.

---

## Conclusion

Choosing the right data fetching pattern is crucial for maintaining performant, responsive applications. Polling, WebSockets, and SSEs offer flexibility, but understanding when to apply each technique ensures an optimal user experience. Short polling can add a substantial delay by introducing a wait time between two requests. Long polling tackles this problem by sending a request that can remain outstanding on the server for some time. In WebSocket, the client or the server can talk to each other in a full-duplex mode.
