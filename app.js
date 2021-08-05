// factory func for player creation
const newPlayer = (mark, color) => {
    return { mark, color }
}

// factory func for gameboard creating
const getGameBoard = () => {
    let moves = ["", "", "", "", "", "", "", "", ""]
    let roundsPlayed = 0

    //generate new players
    const player1 = newPlayer("x", "blue")
    const player2 = newPlayer("o", "red")

    const getMoves = () => {
        console.log(moves, "roundsPlayed: " + roundsPlayed)
    }

    const determinePlayer = () => {
        if (roundsPlayed % 2 === 0) {
            return player1
        } else {
            return player2
        }
    }

    const logPlayers = function () {
        console.log(player1, player2)
    }

    const makeMove = function (i) {

        let gameOutcome = "ongoing"

        // prevent players from playing into a taken field
        if (moves[i] === player1.mark || moves[i] === player2.mark) {
            const isFieldTaken = true
            return { gameOutcome, isFieldTaken }
        }

        // if the move is legal, not into a taken field
        if (moves[i] !== player1.mark || moves[i] !== player2.mark) {
            const activePlayer = determinePlayer(roundsPlayed) //determine player to play
            roundsPlayed++
            moves.splice(i, 1, activePlayer.mark)
            return { gameOutcome, activePlayer }
        }
    }

    const determineOutcome = function () {

        // winning combinations
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

        // check for winning with the last move
        // if is win, game stops
        for (let combo of combosArr) {
            if (moves[combo[0]] === moves[combo[1]] && moves[combo[1]] === moves[combo[2]] && moves[combo[0]] !== "") {
                gameOutcome = "win"
                const winner = determineWinner(moves[combo[0]])
                return { gameOutcome, winner } // win, returns "win" & winner
            }
        }

        if (roundsPlayed === 9) {
            gameOutcome = "tie"
            return { gameOutcome } // tie, returns "tie"
        } else {
            gameOutcome = "ongoing"
            return { gameOutcome } // no result, returns "ongoing"
        }

    }

    const determineWinner = function (symbol) {
        if (symbol === player1.mark) {
            return player1
        }

        if (symbol === player2.mark) {
            return player2
        }

        if (symbol !== player1.mark && symbol !== player2.mark) {
            console.log("oops, something is wrong")
            return null
        }
        
    }

    const resetGameboard = function () {
        moves = ["", "", "", "", "", "", "", "", ""]
        roundsPlayed = 0
    }

    return { makeMove, getMoves, determineOutcome, resetGameboard, logPlayers };
}

//generate new gameboard
const gameBoard = getGameBoard();

// module responsible for DOM manipulation
const gameBoardUI = (() => {

    const gameBoxes = document.querySelectorAll('.play-box')
    const announcementSpan = document.querySelector('.announcement-span')
    const blocker = document.querySelector('.blocker')

    //attach listeners to divs in grid
    const attachEventListenersToPlayField = () => {
        for (let [i, gameBox] of gameBoxes.entries()) {

            // on click, the dom adds player.mark to the div
            gameBox.addEventListener('click', (e) => {

                // const gameBoxID = e.target.dataset.boxId;
                const moveResult = gameBoard.makeMove(i);

                //if field is taken
                if (moveResult.gameOutcome === "ongoing" && moveResult.isFieldTaken) {
                    announcementSpan.textContent = "field is already taken, play again"
                    return // dont do anything, wait for a valid move
                } else {
                    if (moveResult.activePlayer.mark === "x") {
                        gameBox.classList.toggle('blue')
                    } else {
                        gameBox.classList.toggle('red')
                    }
                    gameBox.textContent = moveResult.activePlayer.mark
                    announcementSpan.textContent = "nice move, keep going!"

                }

                // after legal move, check if game is over
                const outcome = gameBoard.determineOutcome()

                if (outcome.gameOutcome === "ongoing") {
                    return // game's not over, keep playing
                }

                if (outcome.gameOutcome === "win") {
                    announcementSpan.textContent = `${outcome.winner.mark} is the winner! Care for a rematch?`
                    showRematchBtn()
                    return
                }

                if (outcome.gameOutcome === "tie") {
                    announcementSpan.textContent = `It's a tie! Care for a rematch?`
                    showRematchBtn()
                    return
                }

            })
        }
    }
    attachEventListenersToPlayField()

    const resetGameUI = function () {
        for (let gameBox of gameBoxes) {
            gameBox.textContent = "" //delete x and o from divs
            gameBox.classList.remove('red', 'blue')
        }
        announcementSpan.textContent = `Click any field to start playing!`
    }
    
    const showRematchBtn = () => {
        blocker.classList.toggle('show')
        const rematchBtn = document.createElement('button')
        rematchBtn.textContent = "rematch"
        rematchBtn.classList.add('rematch-btn')
        blocker.appendChild(rematchBtn)
        
        rematchBtn.addEventListener('click', (e) => {
            gameBoard.resetGameboard()
            resetGameUI()
            blocker.classList.toggle('show')
            blocker.innerHTML = ""
        })
    }

})()


