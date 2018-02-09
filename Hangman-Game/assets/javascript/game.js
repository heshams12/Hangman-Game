//GLOBAL VARIABLES - variables that will be accessed all across the code file.
//---------------------------------------------------------------
// arrays and variables forholding data
var wordChoices = ["basketball", "baseball", "cricket", "rugby", "football", "hockey"];
var wordSelected = "";
var lettersinWord = [];//number of letters in word
var numDashes = 0;//number of dashes in word
var dashesAndSuccesses = [];//holds the successful guesses of letter and remaining dashes.
var wrongLetters = [];

// Game Counters
var winCount = 0;
var lossCount = 0;
var guessesRemaining = 9;

//FUNCTIONS - reusable blocks of code that are called upon when needed.
//------------------------------------------------------------------
function startGame() {
    wordSelected = wordChoices[Math.floor(Math.random() * wordChoices.length)];
    lettersinWord = wordSelected.split("");//allow me to have array of individual letters.
    numDashes = lettersinWord.length;

    //Reset
    guessesRemaining = 9;
    wrongLetters = [];
    dashesAndSuccesses = [];

    //Populate dashes and successes with right number of dashes.
    for (var i = 0; i < numDashes; i++) {
        dashesAndSuccesses.push("_");
    }

    // Change HTML to reflect round conditions
    document.getElementById("wordToGuess").innerHTML = dashesAndSuccesses.join(" ");
    document.getElementById("remainGuesses").innerHTML = guessesRemaining;
    document.getElementById("winCounter").innerHTML = winCount;
    document.getElementById("lossCounter").innerHTML = lossCount;
    //Testing / Debugging
    console.log(wordSelected);
    console.log(lettersinWord);
    console.log(numDashes);
    console.log(dashesAndSuccesses);
}

function letterCheck(letter) {
    // Check if letter exists in code at all

    var letterInWord = false;

    for (var i = 0; i < numDashes; i++) {
        if (wordSelected[i] == letter) {
            letterInWord = true;

        }
    }
    //Check where in the word the letter exists, then populate out dashesAndSuccesses array.
    if (letterInWord) {
        for (var i = 0; i < numDashes; i++) {
            if (wordSelected[i] == letter) {
                dashesAndSuccesses[i] = letter;
            }
        }

    }
     //Letter wasn't found
    else {
        wrongLetters.push(letter);
        guessesRemaining--
    }
    // Testing and Debugging
    console.log(dashesAndSuccesses);



}

function roundDone() {
    console.log("Win Count: " + winCount + " | Loss Count: " + lossCount + " | Number Of Guesses Remaining: " + guessesRemaining);
    // Update the HTML to reflect the most recent count stats
    document.getElementById("remainGuesses").innerHTML = guessesRemaining;
    document.getElementById("wordToGuess").innerHTML = dashesAndSuccesses.join(" ");
    document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");
    // Check if user won
      if (lettersinWord.toString() == dashesAndSuccesses.toString()) {
          winCount++;
          alert("You Won!");
          // Update the win counter in the HTML
          document.getElementById("winCounter").innerHTML = winCount;
          
          startGame();
      }
    // Check if user lost
    else if (guessesRemaining == 0) {

        lossCount++;
        alert("You Lost!");

    // Update HTML
      document.getElementById("lossCounter").innerHTML = lossCount;
      startGame();
    }

}
//MAIN PROCESS - where we actually call upon to make something happen.
//----------------------------------------------------------------------

// Initiates the code the first time
startGame();

//Register Key Clicks

document.onkeyup = function (event) {
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    letterCheck(letterGuessed);
    roundDone();
    // Testing / Debugging
    console.log(letterGuessed);
}



