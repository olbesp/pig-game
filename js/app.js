// Select dice images
var diceImgs = document.querySelectorAll(".dice");
var imgSource = [
  "img/dice-1.png",
  "img/dice-2.png",
  "img/dice-3.png",
  "img/dice-4.png",
  "img/dice-5.png",
  "img/dice-6.png",
];
// All changable areas on player panel
var totalScore1 = document.querySelector("#score-1");
var totalScore2 = document.querySelector("#score-2");
var roundScore1 = document.querySelector("#current-1");
var roundScore2 = document.querySelector("#current-2");
var player1 = document.querySelector(".playerPanel-1");
var player2 = document.querySelector(".playerPanel-2");
var name1 = document.querySelector("#name-1");
var name2 = document.querySelector("#name-2");
// Buttons and input
var newGameBtn = document.querySelector("#newGame");
var rollDiceBtn = document.querySelector("#rollDice");
var holdBtn = document.querySelector("#hold");
var userInput = document.querySelector("input");
// Defaul winning score
var finalScore = 100;

var diceScore = [];
var activePlayer;


function reset() {
  // Resets names to default (after winning)
  // Resets names
  name1.textContent = "Player 1";
  name2.textContent = "Player 2";
  // Resets name color
  name1.style.color = "#232323";
  name2.style.color = "#232323";
  // Resets all scores
  totalScore1.textContent = 0;
  totalScore2.textContent = 0;
  roundScore1.textContent = 0;
  roundScore2.textContent = 0;
  // Makes buttons enabled
  rollDiceBtn.disabled = false;
  holdBtn.disabled = false;
  userInput.disabled = false;
}

function controlScore() {
  // Controls if at least one of dice == 1
  // If both of dice != 1
  if (diceScore.indexOf(1) === -1) {
    var roundScore = document.querySelector("#current-" + activePlayer);
    // Add dice values to the current player score
    var currentSum = Number(roundScore.textContent) + diceScore[0] + diceScore[1];
    roundScore.textContent = currentSum;
  } else {
    // If at least one of dice == 1
    var roundScore = document.querySelector("#current-" + activePlayer);
    roundScore.textContent = 0;
    diceScore = [];
    changeActivePlayer();
  }
}

function changeActivePlayer() {
  // Changes player's turn
  if (player1.classList.contains("active")) {
    player1.classList.remove("active");
    player2.classList.add("active");
    activePlayer = 2;
  } else {
    player1.classList.add("active");
    player2.classList.remove("active");
    activePlayer = 1;
  }
}

function showDice() {
  // Shows dice images
  for (var i = 0; i < diceImgs.length; i++) {
    diceImgs[i].style.display = "block";
  }
}

function hideDice() {
  // Hides dice images
  for (var i = 0; i < diceImgs.length; i++) {
    diceImgs[i].style.display = "none";
  }
}

function setDice() {
  // Sets dice images
  for (var i = 0; i < diceImgs.length; i++) {
    diceImgs[i].setAttribute("src", imgSource[diceScore[i] - 1]);
    // Increase the size of dice with 1 point
    diceScore[i] === 1 ?
      diceImgs[i].style.cssText = "transform: translateX(-50%) scale(1.15); z-index: 200; transition: transform 1s" :
      diceImgs[i].style.cssText = "transform: translateX(-50%) scale(1); z-index: ''";
  }
}

function startGame() {
  // Starts new game
  hideDice();
  reset();
  changeActivePlayer();
}

function rollDice() {
  // Executes score calculation relatively the dice values
  // Save values of dice
  diceScore[0] = Math.floor(Math.random() * 6) + 1;
  diceScore[1] = Math.floor(Math.random() * 6) + 1;
  setDice();
  showDice();
  controlScore();
}

function holdScore() {
  // Holds current score to the global
  hideDice();
  if (activePlayer == 1) {
    var sumOfRound = Number(totalScore1.textContent) + Number(roundScore1.textContent);
    totalScore1.textContent = sumOfRound;
    roundScore1.textContent = 0;
    checkWinner();
    changeActivePlayer();
  } else {
    var sumOfRound = Number(totalScore2.textContent) + Number(roundScore2.textContent);
    totalScore2.textContent = sumOfRound;
    roundScore2.textContent = 0;
    checkWinner();
    changeActivePlayer();
  }
}

function checkWinner() {
  // Checks winner
  if (totalScore1.textContent >= finalScore) {
    win();
  } else if (totalScore2.textContent >= finalScore) {
    win();
  }
}

function win() {
  // Changes player's name when wins and make buttons disabled
  var winner = document.querySelector("#name-" + activePlayer);
  winner.textContent = "Winner!";
  winner.style.color = "#e92a40";
  rollDiceBtn.disabled = true;
  holdBtn.disabled = true;
  userInput.disabled = true;
}

// Buttons functionality
newGameBtn.addEventListener("click", startGame);
rollDiceBtn.addEventListener("click", rollDice);
holdBtn.addEventListener("click", holdScore);
userInput.addEventListener("change", function() {
  finalScore = Number(this.value);
});
// Starts new game when the user opens the web page
startGame();
