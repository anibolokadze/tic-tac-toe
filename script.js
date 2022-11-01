"use strict"
let startContainer = document.getElementById('start-container');
let newGameCPU = document.getElementById("newGameCPU");
let newGamePlayer = document.getElementById("newGamePlayer");
let boardWrapper = document.getElementById('board-wrapper');

let restartSection = document.getElementById('restart');
let playerWins = document.getElementById('playerWins');
let tieSection = document.getElementById('tie');

let XWINS = document.getElementById('x-wins');
let OWINS = document.getElementById('o-wins');

let O_IMG = document.getElementById('o-img');
let X_IMG = document.getElementById('x-img');

let cells = document.querySelectorAll('.cell');
let statusText = document.getElementById('statusText');

let resetBtn = document.getElementById('resetBtn');

let resultX = document.getElementById("x-player-span");
let resultO = document.getElementById("o-player-span");
let resultTies = document.getElementById('ties-span');

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = true;
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

newGameCPU.addEventListener('click', newGameC);
function newGameC(){
  startContainer.style.display = "none";
  newGameCPU.style.display = "block";
  newGamePlayer.style.display = "none";
  boardWrapper.style.display = "block";
};

newGamePlayer.addEventListener('click', newGameP);
function newGameP(){
  startContainer.style.display = "none";
  newGameCPU.style.display = "none";
  boardWrapper.style.display = "block";

  startGame();
}


function startGame(){
  cells.forEach(cell => cell.addEventListener('click',cellClicked));
  statusText.textContent = `${currentPlayer}'s turn`;
  resultO.innerHTML = 0;
  resultX.innerHTML = 0;
  resultTies.innerHTML = 0;
}
function cellClicked(){
  const cellIndex = this.getAttribute("cellIndex");
  if(options[cellIndex] != "" || !running){
    return;
  } else{
    updateCell(this, cellIndex);
    checkWinner();
  }
}
function updateCell(cell, index){
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}
function changePlayer(){
  currentPlayer = (currentPlayer == "X") ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
}
function checkWinner(){
  let roundWon = false;
  for(let i = 0; i < WINNING_COMBINATIONS.length; i++){
    const condition = WINNING_COMBINATIONS[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if(cellA == "" || cellB == "" || cellC ==""){
      continue;
    }
    if(cellA == cellB && cellB == cellC){
      roundWon = true;
      break;
    }
  }
  if(roundWon){
    if(`${currentPlayer}` == "X"){
      resultX.innerHTML ++;
      playerWins.style.display = "block";
      XWINS.style.display = "block";
      OWINS.style.display = "none";
    } else{
      resultO.innerHTML ++;
      playerWins.style.display = "block";
      OWINS.style.display = "block";
      XWINS.style.display = "none";
    }
    running = false;

  } else if(!options.includes("")){
    resultTies.innerHTML++;
    tieSection.style.display = "block";
  } else{
    changePlayer();
  }
}

function showRestart(){
  restartSection.style.display = "block";
}
function cancel(){
  restartSection.style.display = "none";
}
function restart(){
  restartSection.style.display = "none";
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${currentPlayer}'s turn`;
  cells.forEach(cell => cell.textContent = "");
  running = true;
  resultO.innerHTML = 0;
  resultX.innerHTML = 0;
  resultTies.innerHTML = 0;
}
function nextRound(){
  playerWins.style.display = "none";
  tieSection.style.display = "none";
  options = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => cell.textContent = "");
  running = true;
}
function quit(){
  window.location.reload();
}
