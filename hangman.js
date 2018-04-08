var inquirer = require('inquirer');
var isLetter = require('is-letter');

var Word = require('./word.js');
var Game = require('./game.js');

var hangManDisplay = Game.newWord.hangman;
var wordBank = Game.newWord.wordList;

// counter for guesses remaining
var guessesRemaining = 10;
// array for letters already guessed
var guessedLetters = [];
// counter variable for hangman display
var display = 0;

var currentWord;

startGame();

function startGame() {
    display = 0;
    
    console.log("----------------------");
    console.log("");
    console.log("Welcome To Hangman");
    console.log("");
    console.log("----------------------");

    // clears guessedLetters before a new game starts, if it isn't empty already
    if (guessedLetters.length > 0) {
        guessedLetters = [];
    };

    // ask the user if they are ready to play, and provide correct console.log responses to answer
    inquirer.prompt([
        {
            name: "play",
            type: "confirm",
            message: "Ready to Play?"
        }
    ]).then(function(answers) {
        if (answers.play) {
            console.log("");
            console.log("You Get 10 Guesses to Guess The Right");
            console.log("Good Luck!");
            newGame();
        }
        else {
            console.log("Good Then, Bye!");
        };
    });
};

function newGame() {
    if (guessesRemaining === 10) {
        console.log("----------------------")
    
    // generates random number based on the word bank
    var randNum = Math.floor(Math.random() * wordBank.length);
    currentWord = new Word(wordBank[randNum]);
    currentWord.getLetters();

    // displays currentWord as blanks
    console.log("");
    console.log(currentWord.wordRender());
    console.log("");
    promptUser();
    } else {
        resetGuessesRemaining();
        newGame();
    };
};

function resetGuessesRemaining() { 
    guessesRemaining = 10;
};

function promptUser() {
    inquirer.prompt([
        {
            name: "chosenLetter",
            type: "input",
            message: "Choose a Letter",
            validate: function(value) {
                if (isLetter(value)) {
                    return true;
                } else {
                    return false;
                };
            }
        }
    ]).then(function(value) {

        // turn letter into upper case and store in variable
        var letterReturned = (value.chosenLetter).toUpperCase();

        // check to see if you guessed that letter already and set flag to false
        var guessedAlready = false;
        for (var i=0; i<guessedLetters.lengt; i++ ) {
            if (letterReturned === guessedLettesr[i]) {
                guessedAlready = true;
            };
        };

        if (guessedAlready === false) {
            // push letter into array
            guessedLetters.push(letterReturned);
            
            // variable to check if letter was in the word
            var found = currentWord.checkIfLetterFound(letterReturned);

            if (found === 0) {
                console.log("Haha Wrong Guess!");

                guessesRemaining--;

                // counter for hangman display
                display++;

                console.log("Guesses Remaining: " + guessesRemaining);
                console.log(hangManDisplay[display - 1]) // prints the hangman display

                console.log('---------------------------------')
                console.log('')
                console.log(currentWord.wordRender())
                console.log('')
                console.log('---------------------------------')
                console.log('Letters guessed: ' + guessedLetters)
            } else {
                console.log("Yes! You Are Correct!");

                if (currentWord.checkWord() === true ) {
                    console.log("");
                    console.log(currentWord.wordRender());
                    console.log("");
                    console.log('----- YOU WIN -----');
                    startGame();
                } else {
                    console.log('Guesses remaining: ' + guessesRemaining);
                    console.log("");
                    console.log(currentWord.wordRender())
                    console.log("");
                    console.log('-----------------------------');
                    console.log('Letters guessed: ' + guessedLetters);
                };
            };
            
            // if theres guesses remaining and the current word isnt found, prmopt the user
            if (guessesRemaining > 0 && currentWord.wordFound === false) {
                promptUser();
            } 
            else if (guessesRemaining === 0) {
                // if you don't have any guesses left and haven't found the word you lose
                console.log('');        
                console.log('----- GAME OVER -----');
                console.log('');
                console.log('The word you were trying to guess was: ' + currentWord.word);
                console.log('');
            };
        
        } else {
            // prompts the user that they guessed that letter already
            console.log("You've Guessed That Letter Already!");
            promptUser();
        };
    });
};
