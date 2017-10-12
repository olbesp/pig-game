/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player who reach 100 points on GLOBAL score wins the game

*/
var diceImgs = document.querySelectorAll(".dice");

var diceScore = [];

var totalScore1 = document.querySelector("#score-1");
var totalScore2 = document.querySelector("#score-2");
var roundScore1 = document.querySelector("#current-1");
var roundScore2 = document.querySelector("#current-2");
var player1 = document.querySelector(".playerPanel-1");
var player2 = document.querySelector(".playerPanel-2");
var activePlayer;
var finalScore = 100;

// Changes player's turn
function changeActivePlayer() {
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

// Shows dice images
function showDice() {
  for (var i = 0; i < diceImgs.length; i++) {
    diceImgs[i].style.display = "block";
  }
}

// Hides dice images
function hideDice() {
  for (var i = 0; i < diceImgs.length; i++) {
    diceImgs[i].style.display = "none";
  }
}

// Starts new game
function startGame() {
  hideDice();
  totalScore1.textContent = 0;
  totalScore2.textContent = 0;
  roundScore1.textContent = 0;
  roundScore2.textContent = 0;
  changeActivePlayer();
  document.querySelector("#name-1").textContent = "Player 1";
  document.querySelector("#name-2").textContent = "Player 2";
  document.querySelector("#rollDice").disabled = false;
  document.querySelector("#hold").disabled = false;
}

// Executes score calculation relatively the dice values
function rollDice() {
  // Save values of dice
  diceScore[0] = Math.floor(Math.random() * 6) + 1;
  diceScore[1] = Math.floor(Math.random() * 6) + 1;
  showDice();
  // If both of dice != 1
  if (diceScore[0] != 1) {
    var roundScore = document.querySelector("#current-" + activePlayer);
    // Add dice values to the current player score
    var currentSum = Number(roundScore.textContent) + diceScore[0] + diceScore[1];
    roundScore.textContent = currentSum;
  } else {
    // If at least one of dice == 1
    var roundScore = document.querySelector("#current-" + activePlayer);
    roundScore.textContent = 0;
    diceScore = [];
    hideDice();
    changeActivePlayer();
  }
}

// Holds current score to the global
function holdScore() {
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

// Checks winner
function checkWinner() {
  if (totalScore1.textContent >= 100) {
    gameWin();
  } else if (totalScore2.textContent >= 100) {
    gameWin();
  }
}

// Changes player's name when wins
function gameWin() {
  var winner = document.querySelector("#name-" + activePlayer);
  winner.textContent = "Winner!";
  winner.style.color = "#e92a40";
  document.querySelector("#rollDice").disabled = true;
  document.querySelector("#hold").disabled = true;
}

// Buttons functionality
document.querySelector("#newGame").addEventListener("click", startGame);
document.querySelector("#rollDice").addEventListener("click", rollDice);
document.querySelector("#hold").addEventListener("click", holdScore);
