var wordList = ["javascript", "html", "css"];
var wordToGuess = wordList[Math.floor(Math.random() * wordList.length)];
var remainingGuesses = 6;
var correctGuesses = [];

function handleGuess(guess) {
  if (wordToGuess.indexOf(guess) === -1) {
    remainingGuesses--;
  } else {
    for (var i = 0; i < wordToGuess.length; i++) {
      if (wordToGuess[i] === guess) {
        correctGuesses[i] = guess;
      }
    }
  }
  updateScreen();
  checkForWin();
}

function updateScreen() {
  var wordOnScreen = "";
  for (var i = 0; i < wordToGuess.length; i++) {
    wordOnScreen += correctGuesses[i] || "_";
  }
  document.getElementById("word-to-guess").innerHTML = wordOnScreen;
  document.getElementById("remaining-guesses").innerHTML = remainingGuesses;
}

function checkForWin() {
  var message = document.getElementById("message");
  if (correctGuesses.join("") === wordToGuess) {
    message.innerHTML = "You won! The word was " + wordToGuess + ".";
    message.style.display = "block";
  } else if (remainingGuesses === 0) {
    message.innerHTML = "You lost! The word was " + wordToGuess + ".";
    message.style.display = "block";
  }
}

document.getElementById("guess-form").addEventListener("submit", function(event) {
  event.preventDefault();
  console.log("form submitted")
  console.log(document.getElementById("guess-input").value)
  handleGuess(document.getElementById("guess-input").value);
});


document.getElementById("reset-button").addEventListener("click", resetGame);
function resetGame() {
  wordToGuess = wordList[Math.floor(Math.random() * wordList.length)];
  remainingGuesses = 6;
  correctGuesses = [];
  updateScreen();
  document.getElementById("guess-input").value = "";
  document.getElementById("message").style.display = "none";
}