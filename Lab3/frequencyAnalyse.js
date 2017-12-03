/**
 *
 * @param alphabet
 * @param frequentLetters
 * @param countedLetters
 * @returns {Array.<*>}
 */
let frequencyAnalyse = (alphabet, frequentLetters, countedLetters) => {
	let i;
	let secret;
	let secretKeys = [];
	let orderInAlphabet;
	for (i = 0; i < countedLetters.length; i++) {
		for (let key in frequentLetters) {
			orderInAlphabet = alphabet.indexOf(countedLetters[i][0]) + 1;

			if (orderInAlphabet > frequentLetters[key]) {
				secret = alphabet.length - orderInAlphabet + frequentLetters[key];
				secretKeys.push(secret)

			} else {
				secret = alphabet.length - frequentLetters[key] + orderInAlphabet;
				secretKeys.push(secret)

			}
		}
	}
	return secretKeys.filter(function (elem, index, self) {
		return index === self.indexOf(elem);
	})


};
module.exports = frequencyAnalyse;
