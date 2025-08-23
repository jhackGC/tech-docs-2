# UDP

A protocol for communication that does not ensure delivery, ordering, or error checking. It is a connectionless protocol that is often used for real-time applications where speed is more critical than reliability, such as video streaming or online gaming.

## Web RTC

A protocol that enables peer-to-peer connections and real-time communication between browsers. It is designed for low-latency audio and video streaming and is often used in applications like video conferencing and streaming.

## QUIK

### HTTP 3 - Based on QUIK

# TCP

Ensures reliable, ordered, and error-checked delivery of data between applications running on hosts communicating via an IP network. It is a connection-oriented protocol that establishes a connection before transmitting data.

3-way Handshake:

- SYN
- SYN-ACK
- ACK

  An only then comes the

- Client request

All this networking dialog increases time, so it's slower than UDP.

This ensures that the data between the client and the server is received accurately and in the correct order.

## HTTP

Based on TCP

# Fetching data

## Automatically refresh data in the client

### Long polling with HTTP

Set up an interval and repeatedly send requests to the server to get the latest data.

Issues: the HTTP1 protocol

- DNS look up
- Handshake
- request
  3 network trips

Energy/CPU: When we open a HTTP connection we open a TCP socket and it takes CPU cycles to establish the connection, which adds latency.
Also you need to maintain the socket open, draining battery.

Data size: sends all headers every time (HTTP 2 compresses the headers, so, it has some improvement)

In mobiles, they have a Mobile Network Module, that can operate in mono (receive only, energy efficient) or Duplex (Bi-directional, high energy consuming).

#### Summary

**_Pros_**

1. Easy & cheap to implement
2. No additional infrastructure is needed.
3. 99.9% of servers will support that

**_Cons_**

1. Battery inefficient (High CPU usage due to open TCP
   connection and transmitter usage)
2. Network & Data inefficient
3. HTTP 1.1 requires request headers to be sent with every
   request
4. Latency can degrade very quick on mobile networks (network reconnections while moving)

**_When to use it_**
A desktop web application where some delays are acceptable.
For instance, loading new group posts is totally fine with long
polling on a desktop.

**_When to avoid_**
Mobile web application

### Server side events

Based on HTTP 2, which supports multiplexing, allowing it to handle multiple requests with the same TCP socket.

Also, handshake happens only once, initial connection. Then the server pushes data to the client.
Pros

1. Duplex communication is only used when
   establishing initial connection
2. It doesn't send junk data (unnecessary
   headers)
3. Reconnection is handled automatically
4. Easy to scale since servers don't need to
   know the state
5. Since SSE is HTTP2 based, it can re-use
   existing TCP connection with a server
6. Battery efficient (uses only receiver antenna)
7. Relatively easy to scale in terms of infrastructure
8. Minimal network overhead (you only receive the
   actual data without header overhead)
9. Fast

Cons:

1. You can’t push the data to the server.
2. Only string data is supported - you’ll have to parse
   the payload

When to use it:

1. A desktop / mobile web application where you
   must receive data with minimum latency.
2. It can also be an alternative to Web-
   Sockets when some minor latency is
   acceptable.
3. Large text-data streaming

When to avoid

- Simple desktop apps, you'll be fine with long-polling

### WebSockets

1. The client sends a handshake request with UPGRADE headers, using HTTP protocol
2. The server responds with a successful request.
3. Browser upgrades the protocol to Web-Sockets and now the communication is done at the TCP level
4. Client and Server has a bi-directional communication meaning
   that in will use TCP connection to send binary packages

Then the client and the server push data to each other as needed, without the overhead of HTTP headers.

**_How web-sockets are different from HTTP requests?_**

In WebSockets

1. HTTP is used make only initial handshake
2. Pure TCP connection is used afterwards
3. TCP-protocol allows to establish ~65K connections within one socket

Pros:

1. web-sockets provide almost real-time communication
   mechanism
2. Unlimited number of connections

Cons:

1. Infrastructure cost.
2. Engineering cost. Really hard to maintain.
3. Reconnection is not implemented.
4. Web-Sockets are stateful. If you loose the connection, you loose all the data in the websocket. So sometimes you need to setup another infrastructure to store the state of the sockets, e.g. a DB, in case they disconnect
5. Computing resource ineffeciency.
6. needs to maintain a constant TCP connection,
7. uses duplex antenna -> drains energy and utilizes CPU

When to use it

- Real-time communication environments. This is a huge advantage of the protocol.
  Environments such as:

1. Work with machine sensors / controls
2. Online gaming
3. Trading
4. Precise location tracking

# Conclusion

It's all related to the requirements, and you have to use your options wisely.
For example, if you build a messaging service you may not need full duplex real time comms, you can combine protocols to save time and energy, e.g.: using http for sending messages and server side events for receiving updates.

Another example, in a shop admin app we can:
Summary: API Design example

endpoint: **_getShoppingOrders_**

- For Mobile: SSE (better performance)
- For desktop: Long-polling
- endpoint shape: getShoppingOrders(timestamp: number, count: number, token): Order

endpoint: **_getNewMessages_**

- For Mobile: SSE
- For desktop: Short-polling, SSE
- endpoint shape: getNewMessages(timestamp: number, count: number, token): Message

endpoint: **_sendMessage_**

- For Mobile: HTTP POST, no need for WebSSockets for this, too expensive
- For desktop: HTTP POST
- endpoint shape: sendMessage(message, token): Message
  ![API Design Example](./API%20Design_Example.png)

Q: SSE for media content?
A: No, use WebRTC
