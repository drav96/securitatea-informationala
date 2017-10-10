const net = require('net');

let client = new net.Socket();


client.connect(6000, '127.0.0.1', () => {
	console.log('connected to server!');
	client.write('world!\r\n');


});

client.on('data', (data) => {
	console.log('Received: ' + data);
});

client.on('close', () => {
	console.log('Connection closed');
});

const chunks = []
client.on('data', chunk => chunks.push(chunk))
client.on('end', () => {
	const file = Buffer.concat(chunks)
	// do what you want with it
})