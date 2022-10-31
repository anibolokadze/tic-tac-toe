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

const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
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
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartBtn = document.getElementById('restartBtn')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

let X_Wrapper = document.getElementsByClassName('.X-wrapper');
let O_Wrapper = document.getElementsByClassName('.O-wrapper');
let btn = document.getElementsByClassName('.btn');



newGameCPU.addEventListener('click', newGame);
function newGame(){
    startContainer.style.display = "none";
    newGameCPU.style.display = "inline";
    newGamePlayer.style.display = "none";
    boardWrapper.style.display = "block";

    losingSection.style.display = "none";
    winningSection.style.display = "none";
    restartSection.style.display = "none";
    playerWins.style.display = "none";
    tieSection.style.display = "none";
}
newGamePlayer.addEventListener('click', newGameP);
function newGameP(){
    startContainer.style.display = "none";
    newGameCPU.style.display = "none";
    newGamePlayer.style.display = "inline";
    boardWrapper.style.display = "block";

    losingSection.style.display = "none";
    winningSection.style.display = "none";
    restartSection.style.display = "none";
    playerWins.style.display = "none";
    tieSection.style.display = "none";
}






// startGame();
// restartBtn.addEventListener('click',startGame);

// function startGame(){
//     cellElements.forEach(cell => {
//         cell.classList.remove(X_CLASS);
//         cell.classList.remove(CIRCLE_CLASS);
//         // restartBtn.style.display = "inline";
//         cell.removeEventListener('click',handleClick);
//         cell.addEventListener('click', handleClick, {once: true})
//     });
//     setBoardHoverClass();

//     winningMessageElement.classList.remove('show');
// }

// function handleClick(e){
//     const cell = e.target;
//     const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    
//     placeMark(cell, currentClass);
//     // check for win
//     if(checkWin(currentClass)){
//         endGame(false);
//     } else if(isDraw()){
//         endGame(true);
//     } else{
//         swapTurns();
//         setBoardHoverClass();
//     }
// }

// function placeMark(cell, currentClass){
//     cell.classList.add(currentClass);
// }
// function swapTurns(){
//     circleTurn = !circleTurn
// }
// function setBoardHoverClass(){
//     board.classList.remove(X_CLASS);
//     board.classList.remove(CIRCLE_CLASS);
//     if(circleTurn){
//         board.classList.add(CIRCLE_CLASS);
//     } else{
//         board.classList.add(X_CLASS);
//     }
// }
// function checkWin(currentClass){
//     return WINNING_COMBINATIONS.some(combinations =>{
//         return combinations.every(index => {
//             return cellElements[index].classList.contains(currentClass)
//         })
//     })
// }

// function endGame(draw) {
//     if (draw) {
//       winningMessageTextElement.innerText = 'Draw!'
//     } else {
//       winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
//     }
//     winningMessageElement.classList.add('show')
// }
// function isDraw(){
//     return [...cellElements].every(cell => {
//         return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
//     })
// }


// https://dev.to/bornasepic/pure-and-simple-tic-tac-toe-with-javascript-4pgn




























