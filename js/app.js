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

var scoreTotal1 = document.querySelector("#score-1");
var scoreTotal2 = document.querySelector("#score-2");
var roundScore1 = document.querySelector("#current-1");
var roundScore2 = document.querySelector("#current-2");

var activePlayer = 1;

// Change player's turn
function changeActivePlayer() {
  document.querySelector(".playerPanel-1").classList.toggle("active");
  document.querySelector(".playerPanel-2").classList.toggle("active");
}

// Show dice images
function showDice() {
  for (var i = 0; i < diceImgs.length; i++) {
    diceImgs[i].style.display = "block";
  }
}

// Hide dice images
function hideDice() {
  for (var i = 0; i < diceImgs.length; i++) {
    diceImgs[i].style.display = "none";
  }
}


// Start new game
function startGame() {
  hideDice();
  scoreTotal1.textContent = 0;
  scoreTotal2.textContent = 0;
  roundScore1.textContent = 0;
  roundScore2.textContent = 0;
  activePlayer = 1;
}

// Execute score calculation relatively the dice values
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

// Hold current score to the global
function holdScore() {
  hideDice();
  if (activePlayer == 1) {
    var sumOfRound = Number(scoreTotal1.textContent) + Number(roundScore1.textContent);
    scoreTotal1.textContent = sumOfRound;
    roundScore1.textContent = 0;
    activePlayer = 2;
    changeActivePlayer();
  } else {
    var sumOfRound = Number(scoreTotal2.textContent) + Number(roundScore2.textContent);
    scoreTotal2.textContent = sumOfRound;
    roundScore2.textContent = 0;
    activePlayer = 1;
    changeActivePlayer();
  }
}

// Buttons functionality
document.querySelector("#newGame").addEventListener("click", startGame);
document.querySelector("#rollDice").addEventListener("click", rollDice);
document.querySelector("#hold").addEventListener("click", holdScore);
