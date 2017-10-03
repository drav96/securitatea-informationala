const net = require('net');
const readline = require('readline');
let client = new net.Socket();
let interval;
client.connect(6000, '127.0.0.1', () => {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});


	rl.question('What do you want to send to the server? ', (message) => {
		rl.question('Would you like to setInterval? ', (answerInterval) => {
			var patt = /^(?:y(?:es)?|1)$/i;
			var result = patt.test(answerInterval);
			if (result) {
				rl.question('Which interval? ', (intervalNumber) => {
					rl.close();
					interval = intervalNumber;
					setInterval(function () {
						client.write(message);
					}, parseInt(intervalNumber));

				});
			} else {
				client.write(message);
			}

		})
	});

});

client.on('data', (data) => {
	console.log('Received: ' + data);
	// client.destroy(); // kill client after server's response
});

client.on('close', () => {
	console.log('Connection closed');
});


