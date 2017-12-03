let caesarShift = require('./caesarShift');
let countLetterOccurence = require('./countLetterOccurence');
let frequencyAnalyse = require('./frequencyAnalyse');

let frequentEnglishLetters = require('./frequentEnglishLetters.json');

let englishAlphabet = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(",");

let text = "text to decipher"

let countedLetters = countLetterOccurence(text);
let secretKeys = frequencyAnalyse(englishAlphabet, frequentEnglishLetters, countedLetters);

for (let secretKey in secretKeys) {
	console.log(`Shift with key: ${secretKeys[secretKey]} and the decipherd text is: ${caesarShift(text, secretKeys[secretKey])}`)
}
