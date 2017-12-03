/**
 *
 * @param text
 * @returns {Array}
 */
let countLetterOccurence = (text) => {
	let textOnlyLetters = text.replace(/[^a-z]/gi, '').toLocaleLowerCase();

	let counts = {};
	let sortedLetterCounts = [];

// Misc vars
	let letter, i, len, count;

// Loop through the string...
	for (i = 0, len = textOnlyLetters.length; i < len; ++i) {
		// Get this character
		letter = textOnlyLetters.charAt(i);
		count = counts[letter];

		if (count) {
			counts[letter] = count + 1;
		} else {
			counts[letter] = 1;
		}
	}
	for (let letter in counts) {
		sortedLetterCounts.push([letter, counts[letter]]);
	}

	sortedLetterCounts.sort(function (a, b) {
		return b[1] - a[1];
	});
	return sortedLetterCounts;

};

module.exports = countLetterOccurence;
