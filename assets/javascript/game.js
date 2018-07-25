var wordChoices = ["basketball", "baseball", "cricket", "rugby", "football", "hockey"];
var wordSelected = "";
var lettersinWord = [];
var numDashes = 0;
var dashesAndSuccesses = [];
var wrongLetters = [];


var winCount = 0;
var lossCount = 0;
var guessesRemaining = 9;


function startGame() {
    wordSelected = wordChoices[Math.floor(Math.random() * wordChoices.length)];
    lettersinWord = wordSelected.split("");
    numDashes = lettersinWord.length;


    guessesRemaining = 9;
    wrongLetters = [];
    dashesAndSuccesses = [];


    for (var i = 0; i < numDashes; i++) {
        dashesAndSuccesses.push("_");
    }


    document.getElementById("wordToGuess").innerHTML = dashesAndSuccesses.join(" ");
    document.getElementById("remainGuesses").innerHTML = guessesRemaining;
    document.getElementById("winCounter").innerHTML = winCount;
    document.getElementById("lossCounter").innerHTML = lossCount;


}

function letterCheck(letter) {


    var letterInWord = false;

    for (var i = 0; i < numDashes; i++) {
        if (wordSelected[i] == letter) {
            letterInWord = true;
            dashesAndSuccesses[i] = letter;

        }
    }

    if (!letterInWord) {

        wrongLetters.push(letter);
        guessesRemaining--
    }





}

function roundDone() {


    document.getElementById("remainGuesses").innerHTML = guessesRemaining;
    document.getElementById("wordToGuess").innerHTML = dashesAndSuccesses.join(" ");
    document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");

    if (lettersinWord.toString() == dashesAndSuccesses.toString()) {
        winCount++;
        alert("You Won!");

        document.getElementById("winCounter").innerHTML = winCount;

        startGame();
    } else if (guessesRemaining == 0) {

        lossCount++;
        alert("You Lost!");


        document.getElementById("lossCounter").innerHTML = lossCount;
        startGame();
    }

}



startGame();



document.onkeyup = function (event) {
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    letterCheck(letterGuessed);
    roundDone();


}