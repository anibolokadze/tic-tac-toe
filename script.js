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

let X_IMG = document.getElementById('x-img');
let O_IMG = document.getElementById('o-img');

let xPlayer = document.querySelector('.X-wrapper');
let oPlayer = document.querySelector('.O-wrapper');
let oPlayerYou = document.getElementById('oPlayerYou');
let xPlayerYou = document.getElementById('oPlayerYou');


let cells = document.querySelectorAll('.cell');
let statusText = document.getElementById('statusText');

let resetBtn = document.getElementById('resetBtn');

let resultX = document.getElementById("x-player-span");
let resultO = document.getElementById("o-player-span");
let text = document.getElementById('text');
let gameResults = document.getElementsByClassName('game-results');



let resultTies = document.getElementById('ties-span');
let xPlayerTitle = document.getElementById('xPlayerTitle');
let oPlayerTitle = document.getElementById('oPlayerTitle');
let player1Wins = document.getElementById('player1Wins');
let player2Wins = document.getElementById('player2Wins');




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
  newGameCPU.disabled = false;

  if(currentPlayer = xPlayer.value){
    xPlayerTitle.textContent = "X (YOU)";
    oPlayerTitle.textContent = "O (CPU)";
  } 
});

oPlayer.addEventListener('click', () => {
  currentPlayer = oPlayer.value;
  newGamePlayer.disabled = false;
  newGameCPU.disabled = false;

  if(currentPlayer = oPlayer.value){
    oPlayerTitle.textContent = "X (CPU)";
    xPlayerTitle.textContent = "O (YOU)";
  } 
});

if(currentPlayer == null){
  newGamePlayer.disabled = true;
  newGameCPU.disabled = true;
}

newGamePlayer.addEventListener('click', newGameP);
function newGameP(){
  startContainer.style.display = "none";
  newGameCPU.style.display = "none";
  boardWrapper.style.display = "block";
  xPlayerTitle.textContent = "X (P1)";
  oPlayerTitle.textContent = "O (P2)"
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
      X_IMG.style.display = "block";
      O_IMG.style.display = "none";
      player1Wins.style.display = "block";
      player2Wins.style.display = "none";

    } else{
      resultO.innerHTML ++;
      playerWins.style.display = "block";
      OWINS.style.display = "block";
      XWINS.style.display = "none";
      X_IMG.style.display = "none";
      O_IMG.style.display = "block";
      player1Wins.style.display = "none";
      player2Wins.style.display = "block";
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

  //  newGameC();
  
}
function quit(){
  window.location.reload();
}








// minimax

let origBoard;
const huPlayer = 'X';
const aiPlayer = 'O';

newGameCPU.addEventListener('click', newGameC);
function newGameC(){
  startContainer.style.display = "none";
  newGameCPU.style.display = "block";
  newGamePlayer.style.display = "none";
  boardWrapper.style.display = "block";

  

  startGameCPU();

};

function startGameCPU(){
  resultO.innerHTML = 0;
  resultX.innerHTML = 0;
  resultTies.innerHTML = 0;
  statusText.textContent = `${currentPlayer} turn`;
}



















// function startGameCPU(){
//   resultO.innerHTML = 0;
//   resultX.innerHTML = 0;
//   resultTies.innerHTML = 0;
//   statusText.textContent = `${currentPlayer} turn`;

//   origBoard = Array.from(Array(9).keys());
//   for(let i = 0; i < cells.length; i++){
//     cells[i].addEventListener('click', turnClick, false);
//   }
// }
// function turnClick(square){
//   if(typeof origBoard[square.target.id] == 'number'){
//     turn(square.target.id, huPlayer);
//     if(!checkTie()) turn(bestSpot(), aiPlayer);
//   }

// }
// function turn(squareId, player){
//   origBoard[squareId] = player;
//   document.getElementById(squareId).innerHTML = player === "X" ? xIcon : oIcon;
//   statusText.textContent = `${player} turn`;

//   let gameWon = checkWin(origBoard, player);
//   if(gameWon) gameOver(gameWon);
// }
// function checkWin(board, player){
//   let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
//   let gameWon = null;
//   for (let [index, win] of WINNING_COMBINATIONS.entries()) {
// 		if (win.every(elem => plays.indexOf(elem) > -1)) {
// 			gameWon = {index: index, player: player};
// 			break;
// 		}
// 	}
//   return gameWon;
// }
// function gameOver(gameWon) {
// 	for (let i = 0; i < cells.length; i++) {
// 		cells[i].removeEventListener('click', turnClick, false);
// 	}

  
//   declareWinner(gameWon.player == huPlayer ? resultX.innerHTML ++ : resultO.innerHTML ++) ? checkTie() : resultTies++;

// }


// function declareWinner(who) {
//   playerWins.style.display = 'block';
// }
// function emptySquares(){
//   return origBoard.filter(s => typeof s == 'number')
// }
// function bestSpot(){
//   return emptySquares()[0];
// }
// function checkTie() {
// 	if (emptySquares().length == 0) {
// 		for (let i = 0; i < cells.length; i++) {
// 			cells[i].removeEventListener('click', turnClick, false);
// 		}
//     declareWinner("Tie Game!");
// 		return true;

// 	}

// 	return false;
// }






