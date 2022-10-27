let startContainer = document.getElementById('start-container');
let newGameCPU = document.getElementById("newGameCPU");
let newGamePlayer = document.getElementById("newGamePlayer");
// let gameContainer = document.getElementById('gameContainer')
function myFunction() {
    switch(startContainer){
        case "cpu":
            startContainer.style.display = "none";
            newGameCPU.style.display = "inline";
            newGamePlayer.style.display = "none";
            break;
        case "player":
            startContainer.style.display = "none";
            newGameCPU.style.display = "inline";
            newGamePlayer.style.display = "none";
            break;    
        default:
            startContainer.style.display = "none";
            newGameCPU.style.display = "none";
            newGamePlayer.style.display = "none";
    }

}
