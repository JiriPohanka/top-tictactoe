// factory func for player creation
const newPlayer = (mark) => {
    return { mark }
}

// factory func for gameboard creating
const getGameBoard = () => {
    const moves = ["", "", "", "", "", "", "", "", ""];
    let roundsPlayed = 0;

    //generate new players
    const player1 = newPlayer("x");
    const player2 = newPlayer("o");

    const getMoves = () => {
        console.log(moves, "roundsPlayed: " + roundsPlayed);
    }

    const determinePlayer = () => {
        if (roundsPlayed % 2 === 0) {
            return player1;
        } else {
            return player2;
        }
    }

    const makeMove = function (i) {

        // prevent players from playing into a taken field
        if (moves[i] === player1.mark || moves[i] === player2.mark) {
            console.log("field is taken, move again")
        } else {
            const activePlayer = determinePlayer(roundsPlayed)
            moves.splice(i, 1, activePlayer.mark);
            roundsPlayed++;
            return activePlayer
        }

        if (isGameFinished()) {
            console.log("game's finished!")
            return
        }
    }

    const isGameFinished = function () {
        const combosArr = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        for (let combo of combosArr) {
            if (moves[combo[0]] === moves[combo[1]] && moves[combo[1]] === moves[combo[2]] && moves[combo[0]] !== "") {
                determineWinner(moves[combo[0]])
                return true
            }
        }
    }

    const determineWinner = function (symbol) {
        if (symbol === player1.mark) {
            console.log("player1 wins")
            return player1
        }

        if (symbol === player2.mark) {
            console.log("player2 wins")
            return player2
        }

        if (symbol !== player1.mark && symbol !== player2.mark) {
            console.log("oops, something is wrong")
            return null
        }
    }

    return { makeMove, getMoves, player1, player2 };
}


// module for manipulating DOM
const gameBoardUI = (() => {

    const gameBoxes = document.querySelectorAll('.play-box')


    //attach listeners to divs in grid
    const attachEventListenersToPlayField = () => {
        for (let [i, gameBox] of gameBoxes.entries()) {

            gameBox.addEventListener('click', (e) => {

                // const gameBoxID = e.target.dataset.boxId;
                const activePlayer = gameBoard.makeMove(i)
                gameBox.textContent = activePlayer.mark
            })
        }
    }
    attachEventListenersToPlayField()




})()


//generate new gameboard
const gameBoard = getGameBoard();






// //on load 
// window.addEventListener('load', () => {
//     attachEventListenersToPlayField();
// })