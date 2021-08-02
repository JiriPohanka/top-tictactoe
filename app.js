
// gameboard [] populates grid in html using data-box-id
const gameBoard = (() => {
    const playerMoves = [["x"], ["x"], ["o"], ["o"], ["x"], ["x"], ["o"], ["x"], ["o"]];
    const gameBoxes = document.querySelectorAll(".play-box");

    for ([i, gameBox] of gameBoxes.entries()) {
        console.log(i + " :" + gameBox);
        gameBox.innerHTML = playerMoves[i];
    }
})();


//factory function to create players
const newPlayer = (playerName, mark) => {
    return {playerName, mark}
}

const player1 = newPlayer("player1", "x");
const player2 = newPlayer("player2", "o");


//players need to take turns somehow

//each time player clicks a div, his "X or O" gets added to the gameboard []




