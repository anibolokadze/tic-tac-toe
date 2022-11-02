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

let xPlayer = document.querySelector('.X-wrapper');
let oPlayer = document.querySelector('.O-wrapper');

let cells = document.querySelectorAll('.cell');
let statusText = document.getElementById('statusText');

let resetBtn = document.getElementById('resetBtn');

let resultX = document.getElementById("x-player-span");
let resultO = document.getElementById("o-player-span");
let resultTies = document.getElementById('ties-span');
let xPlayerTitle = document.getElementById('xPlayerTitle');
let oPlayerTitle = document.getElementById('oPlayerTitle');

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer;

let xIcon = '<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="#31C3BD" fill-rule="evenodd"/></svg>';
let oIcon = '<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" fill="#F2B137"/></svg>';

let running = true;


let player;

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


xPlayer.addEventListener('click', () => {
  currentPlayer = xPlayer.value;
  newGamePlayer.disabled = false;
});

oPlayer.addEventListener('click', () => {
  currentPlayer = oPlayer.value;
  newGamePlayer.disabled = false;
});

if(currentPlayer == null){
  newGamePlayer.disabled = true;
}



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
  statusText.textContent = `${currentPlayer} turn`;
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
  cell.innerHTML = currentPlayer === "X" ? xIcon : oIcon;
}
function changePlayer(){
  currentPlayer = (currentPlayer == "X") ? "O" : "X";
  statusText.textContent = `${currentPlayer} turn`;
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
  window.location.reload();
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
