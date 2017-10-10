const request = require('request');
var url = process.env.HOST;

if (url) {
	request(url, {json: true}, (err, res, body) => {
		if (err) {
			return console.log(err);
		}
		console.log(body);
	});
} else {
	console.log('No website was passed ');
}