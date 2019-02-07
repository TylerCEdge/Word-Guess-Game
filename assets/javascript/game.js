
var pokemonNames = ["PIKACHU", "SQUIRTLE", "CHARMANDER", "BULBASAUR", 
"GENGAR", "DRAGONITE", "ARCANINE", "GYARADOS", "MEW", "MEWTWO"];
var totalGuesses = 9;       // number of tries
var userGuesses = [];       // letters the user guessed
var computerPick;           // array number the machine choose randomly
var wordGuessed = [];       // This will be the word we actually build to match the current word
var guessesLeft = 0;        // How many tries the player has left
var finishedGame = false;   // Flag for 'press any key to try again'     
var wins = 0;               //wins
var losses = 0;             //losses

// start the game
function startGame() {
    guessesLeft = totalGuesses;

    //grab a random number from the pokemonNames array  (number of words)
    computerPick = Math.floor(Math.random() * (pokemonNames.length));

    if (pokemonNames[computerPick] == pokemonNames[0]) {
        $('.clue').html("<img src='assets/images/pikachu.png' width='300'/>");
    } else if (pokemonNames[computerPick] == pokemonNames[1]) {
        $('.clue').html("<img src='assets/images/squirtle.png' width='300'/>");
    } else if (pokemonNames[computerPick] == pokemonNames[2]) {
        $('.clue').html("<img src='assets/images/charmander.png' width='300'/>");
    } else if (pokemonNames[computerPick] == pokemonNames[3]) {
        $('.clue').html("<img src='assets/images/bulbasaur.png' width='300'/>");
    } else if (pokemonNames[computerPick] == pokemonNames[4]) {
        $('.clue').html("<img src='assets/images/gengar.png' width='300'/>");
    } else if (pokemonNames[computerPick] == pokemonNames[5]) {
        $('.clue').html("<img src='assets/images/dragonite.png' width='300'/>");
    } else if (pokemonNames[computerPick] == pokemonNames[6]) {
        $('.clue').html("<img src='assets/images/arcanine.png' width='300'/>");
    } else if (pokemonNames[computerPick] == pokemonNames[7]) {
        $('.clue').html("<img src='assets/images/gyarados.png' width='300'/>");
    } else if (pokemonNames[computerPick] == pokemonNames[8]) {
        $('.clue').html("<img src='assets/images/mew.png' width='300'/>");
    } else if (pokemonNames[computerPick] == pokemonNames[9]) {
        $('.clue').html("<img src='assets/images/mewtwo.png' width='300'/>");
    } else ($('.clue').text('neither of these'));

    // Clear out arrays
    userGuesses = [];
    wordGuessed = [];

    //build the word with blanks
    for (var i = 0; i < pokemonNames[computerPick].length; i++) {
        wordGuessed.push("_");
    }

    //refresh the screen
    refreshScreen();
};

//  Updates the display on the HTML Page
function refreshScreen() {

    document.getElementById("gameWins").innerText = wins;
    document.getElementById("gameLosses").innerText = losses;

    var guessingWordText = "";
    for (var i = 0; i < wordGuessed.length; i++) {
        guessingWordText += wordGuessed[i];
    }

    //update guesses, word, and letters entered
    document.getElementById("currentWord").innerText = guessingWordText;
    document.getElementById("guessesLeft").innerText = guessesLeft;
    document.getElementById("userGuesses").innerText = userGuesses;
};

//compare letters entered to the character you're trying to guess
function evaluateGuess(letter) {
    var positions = [];

    for (var i = 0; i < pokemonNames[computerPick].length; i++) {
        if (pokemonNames[computerPick][i] === letter) {
            positions.push(i);
        }
    }

    if (positions.length <= 0) {
        guessesLeft--;
    } else {
        for (var i = 0; i < positions.length; i++) {
            wordGuessed[positions[i]] = letter;
        }
    }
};

//check if all letters have been entered.
function checkWin() {
    if (wordGuessed.indexOf("_") === -1) {
        wins++;
        finishedGame = true;
    }
};

//check if the user is out of guesses
function checkLoss() {
    if (guessesLeft <= 0) {
        losses++;
        finishedGame = true;
    }
}

//guessing
function makeGuess(letter) {
    if (guessesLeft > 0) {
        // Make sure we didn't use this letter
        if (userGuesses.indexOf(letter) === -1) {
            userGuesses.push(letter);
            evaluateGuess(letter);
        }
    }
};

// Event listener
document.onkeydown = function (event) {
    //if the game is finished, restart it.
    if (finishedGame) {
        startGame();
        finishedGame = false;
    } else {
        // Check to make sure a-z was pressed.
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toUpperCase());
            refreshScreen();
            checkWin();
            checkLoss();
        }
    }
};



