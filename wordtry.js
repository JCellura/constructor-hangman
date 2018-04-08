var Letter = require('./letter.js')

function Word(wrd) {
    this.word = wrd;
    this.letters = [];
    this.wordFound = false;

    // gets letters and pushes to letters array
    this.getLetters = function () {
        for (var i = 0; i < this.word.length; i++) {
            var newLetter = new Letter(this.word[i]);
            this.letters.push(newLetter);
        };
    };

    this.checkWord = function () {
        if (this.letters.every(function (lttr) {
            return lttr.appear === true;
        })) {
            this.wordFound = true;
            return true;
        };
    };
};

var test = new Word("HELLO");
test.getLetters();
console.log(test.word);
console.log(test.word.length);
console.log(test.letters);
console.log(test.letters[0]);
console.log(test.letters[0].letter);
console.log(test.letters[0].letterRender());
// var test = "Hello";
// console.log(test.length);
// var lettersArray = [];
// for (var i = 0; i < test.length; i++) {
//     var newLetter = test[i];
//     lettersArray.push(newLetter);
// };
// console.log(lettersArray);