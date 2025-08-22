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

Based on HTTP 2
Handshake happens only once, initial connection
Then the server pushes data to the client
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
