// 'use strict';
//Create an array of words for the game
var safariAnimals = ["lion", "leopard", "rhinoceros", "elephant", "hippopotamus", "cheetah", "wildebeest", "giraffe", "zebra", "crocodile", "hyena"];

// const maxTries = 10;
//estblish variables for the game/score
var wins = 0;
var maxTries = 10;
var guessedLetters = []; //stores the letter the user guessed
var currentWord = ""; //index of the current word in the array
var guessingWord = []; //This will be the word we actually build to match the current word 
var remainingGuesses = 0; // how many tries a player has left
var gameOver = false;



//this will the beginning of the functions of the game

function startGame() {
    //clear the scores
    remainingGuesses = maxTries;
    guessedLetters = [];
    guessingWord = [];
    
    
    //pick a random word for play
    currentWord = safariAnimals[Math.floor(Math.random() * safariAnimals.length)];

    //loop for the game to play and push out the n;acl spots
    for (var i = 0; i < currentWord.length; i++) {
        guessingWord.push('_');
    }   
    
    updateDisplay();
};

//update the elements in the html dusplay to refelect the start of a new game
function updateDisplay() {

    document.getElementById("totalWins").textContent = wins;
    //update the total win count on the display
    var guessingWordText = "";
    for (var i = 0; i < guessingWord.length; i ++){
        guessingWordText += guessingWord[i];
    }

    document.getElementById("currentWord").textContent = guessingWord.join("");
    document.getElementById("remainingGuesses").textContent = remainingGuesses;
    document.getElementById("guessedLetters").textContent = guessedLetters;
};

//evaluate player input - find all instances of a letter in the guessing word
function evaluateGuess(letter) {
    //an array for the letters in the string
    var positions = [];

    for (var i = 0; i < safariAnimals[currentWord].length; i++) {
        if (safariAnimals[currentWord][i] === letter) {
            positions.push(i);
        }
    }
    //if the letter is not correct remove a guess
    if (positions.length <= 0) {
        remainingGuesses--;
    } else {
        // add a loop to replace '_' with a letter
        for (var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};
//a function to see if the player has won
function declareWin() {
    if (guessingWord.indexOf('_') === -1) {
        wins++;
        gameOver = true;
    }
};
//a function to see if the player has lost
function declareLoss() {
    if (remainingGuesses <= 0) {
        gameOver = true;
    }
};

//a function for the player guessing the letter
function makeGuess(letter) {
    if (remainingGuesses > 0) {
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
};

//add an Event Listener
document.onkeyup = function(event) {
    if(gameOver) {
        startGame();
        gameOver = false;
    } else {
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
            updateDisplay();
            declareWin();
            declareLoss();
        }

    }
};


