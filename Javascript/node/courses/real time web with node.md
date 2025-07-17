real time web with node
---------------------------
- HTML5
- Node
- WebRTC --> Allows peer to peer communication, no server involved !!!


HTML5
--------
API Facades
Very thin layer of abstraction on top of a native API, it is NOT:
- a polyfill, it does not brings the gap like them
- is does not add new functionality

Main goal: thin layer of insulation that isolates your production app from the native APIs (browser specific) that sometimes have bugs, or change, and brake your prod app.
So if you have accesed native API you have to go and fix them.

If you use facades or frameworks is better for maintenance, frameworks are more complex that facades, they provide lots of functionality.

h5 projects
Kyle Simpson Facades for HTML5 APIs
https://github.com/getify/h5ive-DEPRECATED.git

HTML5 Storage
-------------
Persistence storage up to a maximum in a browser

Cookies stores but are tramitted in every single request to the server ...
Session cookies, live while browser is open. Multiple tabs share session cookies

- Session storage: session. Based on the TAB session, not the window session like the cookies.
- Local storage: forever, unless cleaned up by the user or your app, diff cleaning method thatn cookies

Local storage is cross windows and emmits events, so if one window changes it the other may listen and update !

HTML5 canvas
----------------
Had issues with rotation, it rotates the coordinates system not the object.
also has cross broswer issues with starting points for paths.
canvas.h5ive.js

HTML5 getUserMedia
------------------
allows us to atttach to certain user media streams and pul out some media, like video.

webcam, microfone, screen stream

requestAnimationFrame
------------------------
API designed to fix a problem. Is about I have a functionadn in that function Im gonna make some visual updates to a page.
Any visual update.
It is for doing: this is my function mr browser, and it has visual updates to be done, you please call this at the most optimal time for avisual update to occur.

Call it, not now that I am executing the JS, but when you do your next dislay repaint (ina 60 htz monitor is usually 1 update per mill)
Is like a queue.
The browser is continually repainting all the time, and with this API you are queueing your visual changes to occur at the next paint. Used for very performant situations needed.
https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame

WebSockets
------------------
Usually wrapped by frameworks like socket.io
Ajax requesta have overhead, and if you have to do ajax requests 5 times a second, that is killing, you dont want ot use that. Average for ajax, 500 to 800 ms, total rountrip.
WebSockets starts with a request like ajax, with headers to establish that connection of up to 12k bytes, but the connection keeps open and the following interactions do not need a fully headed connection, just uses a header of 8 bytes ... reducing round trips to 50 - 100 ms. BUt still can be slow e.g. high performance online gaming.
socket.io
If you work with Node, JS in the server, and in the client, the socket.io API is identical.

https://socket.io/

listen and emit, for the client and the server.
the server has some extra functionality like broadcasting.