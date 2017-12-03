const readline = require('readline');
let caesarShift = require('./caesarShift');
let countLetterOccurence = require('./countLetterOccurence');
let frequencyAnalyse = require('./frequencyAnalyse');
let language = require('./language');
let frequentLettersINT = require('./frequentLetters.json');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

let decipherLang = process.env.LANG;
let alphabet;
let frequentLetters;

switch (decipherLang) {
	case "ENG":
		alphabet = language.englishAlphabet;
		frequentLetters = frequentLettersINT.english;
		break;
	case "RO":
		alphabet = language.romanianAlphabet;
		frequentLetters = frequentLettersINT.romanian;
		break;
	default:
		alphabet = language.englishAlphabet;
		frequentLetters = frequentLettersINT.english;

}
rl.question('Text to decipher: ', (text) => {
	rl.close();

	let countedLetters = countLetterOccurence(text);
	let secretKeys = frequencyAnalyse(alphabet, frequentLetters, countedLetters);

	for (let secretKey in secretKeys) {
		console.log(`Shift with key: ${secretKeys[secretKey]} and the decipherd text is: ${caesarShift(text, secretKeys[secretKey])}`)
	}

});

