/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player who reach 100 points on GLOBAL score wins the game

*/
var diceImgs = document.querySelectorAll(".dice");



var scoreTotal1 = document.querySelector("#score-1");
var scoreTotal2 = document.querySelector("#score-2");
var roundScore1 = document.querySelector("#current-1");
var roundScore2 = document.querySelector("#current-2");

var activePlayer = 1;

var diceScore = Math.floor(Math.random() * 12) + 1;

document.querySelector("#current-" + activePlayer).textContent = diceScore;
// Start new game
function startGame() {
  for (var i = 0; i < diceImgs.length; i++) {
    diceImgs[i].style.display = "none";
  }
  scoreTotal1.textContent = 0;
  scoreTotal2.textContent = 0;
  roundScore1.textContent = 0;
  roundScore2.textContent = 0;
  activePlayer = 1;
}

function changeActivePlayer() {
  document.querySelector(".playerPanel-1").classList.toggle("active");
  document.querySelector(".playerPanel-2").classList.toggle("active");
}

// Hold current score
function holdScore() {
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


document.querySelector("#newGame").addEventListener("click", startGame);
document.querySelector("#hold").addEventListener("click", holdScore);
