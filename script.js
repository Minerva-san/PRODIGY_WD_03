const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let gameActive = true;
let gameState = [
    "", "", "",
    "", "", "",
    "", "", ""
];
const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function handleCellClick(event){
    const cell = event.target;
    const index = cell.getAttribute("data-index");
    if(gameState[index] !== "" || !gameActive){
        return;
    }
    gameState[index] = currentPlayer;
    cell.innerHTML = currentPlayer;
    cell.classList.add(
        currentPlayer.toLowerCase()
    );
    checkWinner();
}

function checkWinner(){
    let roundWon = false;
    for(let i = 0; i < winningConditions.length; i++){
        const condition = winningConditions[i];
        const a = gameState[condition[0]];
        const b = gameState[condition[1]];
        const c = gameState[condition[2]];
        if(a === "" || b === "" || c === ""){
            continue;
        }
        if(a === b && b === c){
            roundWon = true;
            cells[condition[0]].classList.add("winner");
            cells[condition[1]].classList.add("winner");
            cells[condition[2]].classList.add("winner");
            break;
        }
    }
    if(roundWon){
        statusText.innerHTML =
            `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }
    if(!gameState.includes("")){
        statusText.innerHTML =
            "It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer =
        currentPlayer === "X"
        ? "O"
        : "X";
    statusText.innerHTML =
        `Player ${currentPlayer}'s Turn`;
}

function restartGame(){
    currentPlayer = "X";
    gameActive = true;
    gameState = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];
    statusText.innerHTML =
        `Player X's Turn`;
    cells.forEach(cell => {
        cell.innerHTML = "";
        cell.classList.remove("x");
        cell.classList.remove("o");
        cell.classList.remove("winner");
    });
}

cells.forEach(cell => {
    cell.addEventListener(
        "click",
        handleCellClick
    );
});
restartBtn.addEventListener(
    "click",
    restartGame
);