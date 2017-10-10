const net = require('net');
const readline = require('readline');

let client = new net.Socket();

let interval;
let patt = /^(?:y(?:es)?|1)$/i;

client.connect(6000, '127.0.0.1', () => {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	rl.question('What message do you want to send to the server? ', (message) => {
		rl.question('Would you like to set an interval for messages? ', (answerInterval) => {
			let result = patt.test(answerInterval);
			if (result) {
				rl.question('Set interval time ? ', (intervalNumber) => {
					interval = intervalNumber;
					rl.question('Maximum number of messages? ', (numberOfMessages) => {
						rl.close();

						setIntervalLimited(function () {
							client.write(message);

						}, parseInt(intervalNumber), parseInt(numberOfMessages))

					});
				})
			} else {
				client.write(message);
			}

		})
	});

});

client.on('data', (data) => {
	console.log('Received: ' + data);
});

client.on('close', () => {
	console.log('Connection closed');
});


// Definition
function setIntervalLimited(callback, interval, x) {

	for (let i = 0; i < x; i++) {
		setTimeout(callback, i * interval);
	}

}
