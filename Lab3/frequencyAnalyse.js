let frequencyAnalyse = (alphabet, frequentLetters, countedLetters) => {
	let i;

	let secret;
	let secretKeys = [];
	for (i = 0; i < countedLetters.length; i++) {
		for (let key in frequentLetters) {
			let orderInAlphabet = alphabet.indexOf(countedLetters[i][0]) + 1;
			if (orderInAlphabet >= frequentLetters[key]) {
				secret = orderInAlphabet - frequentLetters[key];
				secretKeys.push(secret)
			} else {
				secret = frequentLetters[key]-orderInAlphabet ;
				secretKeys.push(secret)
			}

		}
	}
	return secretKeys.filter(function (elem, index, self) {
		return index === self.indexOf(elem);
	})


};
module.exports = frequencyAnalyse;
