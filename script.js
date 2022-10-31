"use strict"
let startContainer = document.getElementById('start-container');
let newGameCPU = document.getElementById("newGameCPU");
let newGamePlayer = document.getElementById("newGamePlayer");
let boardWrapper = document.getElementById('board-wrapper');


let losingSection = document.getElementById('losing');
let winningSection = document.getElementById('winning');
let restartSection = document.getElementById('restart');
let playerWins = document.getElementById('playerWins');
let tieSection = document.getElementById('tie');


const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('statusText');
const resetBtn = document.getElementById('resetBtn');

let resultX = document.getElementById("x-player-span");
let resultO = document.getElementById("o-player-span");
let options = ["", "", "", "", "", "", "", "", ""];

let x = document.createElement('img');
x.src = "assets/icon-x.svg";
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

newGameCPU.addEventListener('click', newGame);
function newGame(){
    startContainer.style.display = "none";
    newGameCPU.style.display = "block";
    newGamePlayer.style.display = "none";
    boardWrapper.style.display = "block";
};
newGamePlayer.addEventListener('click', newGameP);
function newGameP(){
    startContainer.style.display = "none";
    newGameCPU.style.display = "none";
    newGamePlayer.style.display = "block";
    boardWrapper.style.display = "block";

    initializeGame();
}


function initializeGame(){
  cells.forEach(cell => cell.addEventListener('click',cellClicked));
  resetBtn.addEventListener('click', restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  resultO.innerHTML = 0;
  resultX.innerHTML = 0;
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
    } else{
      resultO.innerHTML ++;
    }

    running = false;
  } else if(!options.includes("")){
    console.log('draw');
  } else{
    changePlayer();
  }
}
function restartGame(){
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${currentPlayer}'s turn`;
  cells.forEach(cell => cell.textContent = "");
  running = true;
}

// https://dev.to/bornasepic/pure-and-simple-tic-tac-toe-with-javascript-4pgn
