const gameBoxes = document.querySelectorAll(".play-box");

// gameboard [] populates grid in html using data-box-id
const gameBoard = (() => {
    const playerMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    const roundsPlayed = 0;

    const updatePlayerMoves = function (i, value) {
        playerMoves.splice(i, 1, value);
        roundsPlayed++;
    }
 
    return {updatePlayerMoves};
})();

//attach listeners to divs in grid
const attachEventListenersToPlayField = () => {
    for ([i, gameBox] of gameBoxes.entries()) {

        gameBox.addEventListener('click', (e) => {

            const gameBoxId = e.target.dataset.boxId;

            if (player1.playCount <= player2.playCount) {
                player1.makeMove(gameBoxId);
            } else {
                player2.makeMove(gameBoxId);
            }
        })
    }
}

//factory function to create players
const newPlayer = (playerName, mark) => {
    let playCount = 0;

    function makeMove (gameBoxId) {
        const gameBoxTextContent = document.querySelector(`[data-box-id='${gameBoxId}']`).textContent;
        if ( gameBoxTextContent === "x" || gameBoxTextContent === "o" ) {
        } else {
            document.querySelector(`[data-box-id='${gameBoxId}']`).textContent = mark;
            gameBoard.updatePlayerMoves(gameBoxId, mark);
            this.playCount++;
        }
    }

    return {playCount, makeMove}
}

const player1 = newPlayer("player1", "x");
const player2 = newPlayer("player2", "o");

//on load 
window.addEventListener('load', () => {
    attachEventListenersToPlayField();
})