# Lab 1

A little introduction to the `TCP` protocol:

By Wikipedia, Transmission Control Protocol:

>… provides reliable, ordered, and error-checked delivery of a stream of octets between applications running on hosts communicating over an IP network.

This means that the protocol can guarantee that what you send through the network and over IP is always arrived at the other end. TCP also has the special feature of keeping the connections opened for later referece and usage. An usual connection flow happens like this:

- Client connects to the server at an IP Address and a Port (Ex: 127.0.0.1:3000)
- Server accepts the connection, now the client can keep a reference to the “pipe” that goes to the server and the server can also do the same.
- Both send messages to each other.
- The connection can be closed by any side.

There are two categories of TCP socket programs you can write - 
- server
- client

A TCP server listens for connections to it from clients and send data to the client. A TCP client connects to a TCP server exchange data with it. The communication between client and server happens via sockets.
Programming TCP sockets in Node requires the net module, which is an asynchronous wrapper for network programming.

## What I did?
1. send `TCP` messages [script1]

Steps:
- Write a TCP server
- Write a TCP client
```
# start server
node server

# start client
node client

```

1.1 send a message at fixed intervals (every 5s send something, with the possibility to indicate the *maximum* number of messages)
- Add readline module which provides an interface for reading data from a Readable stream. 
- Ask client for what messages and what interval they want messages to be sent to the server.

2. Port scanner.

How this could be implemented and in what use-cases might it be useful to check if certain ports are open on a server.

- To test own equipment for weak security
- Port in use errors
- Harcoded port can be a frustration

3. get a page over http [script3]
- Simple http request

```
HOST="your host" node request
```

Why to use HTTPs?

HTTP stands for hypertext transfer protocol. It’s a protocol that allows communication between different systems. Most commonly, it is used for transferring data from a web server to a browser to view web pages.

The problem is that HTTP (note: no "s" on the end) data is not encrypted, and it can be intercepted by third parties to gather data being passed between the two systems.

This can be addressed by using a secure version called HTTPS, where the "S" stands for secure.

This involves the use of an SSL certificate -- "SSL" stands for secure sockets layer -- which creates a secure encrypted connection between the web server and the web browser.

Without HTTPS, any data passed is insecure. This is especially important for sites where sensitive data is passed across the connection, such as ecommerce sites that accept online card payments, or login areas that require users to enter their credentials.

5. send file over a network [script5]
```
FILE="your file" node request
```
