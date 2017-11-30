What is a Slowloris DDoS attack?
-
Slowloris is a denial-of-service attack program which allows an attacker to overwhelm a targeted server by opening and maintaining many simultaneous HTTP connections between the attacker and the target.
Basic useful feature list:<

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

