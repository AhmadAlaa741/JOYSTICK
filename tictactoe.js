let board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

let turnSwitch = false;
let winner;

function reset() {
    board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    turnSwitch = false;
    trigger();
}

function trigger() {
    buttonRebuild();
    let winner = gameStatus(board);
    console.log(winner);
    if (winner === null) {
        document.getElementById("winner").innerHTML = "";
    } else {
        document.getElementById("winner").innerHTML = winner == 1 ? "You lose..." : winner == 0 ? "You win!" : winner == -1 ? "Oops, it's a tie." : "";
    }


}

function gameStatus(board) {

    // Check for a winning col, row, or diagonal arrangement
    valChain = [true, false];
    let nullCheck = true;
    for (let k = 0; k < valChain.length; k++) {
        let value = valChain[k];

        let fullDiag1 = true;
        let fullDiag2 = true;
        for (let i = 0; i < 3; i++) {
            if (board[i][i] != value) {
                fullDiag1 = false;
            }
            if (board[2 - i][i] != value) {
                fullDiag2 = false;
            }
            let fullRow = true;
            let fullCol = true;
            for (let j = 0; j < 3; j++) {
                if (board[i][j] != value) {
                    fullRow = false;
                }
                if (board[j][i] != value) {
                    fullCol = false;
                }
                if (board[i][j] == null) {
                    nullCheck = false;
                }
            }
            if (fullRow || fullCol) {
                return value ? 1 : 0;
            }
        }
        if (fullDiag1 || fullDiag2) {
            return value ? 1 : 0;
        }
    }
    if (nullCheck) {
        return -1;
    }
    return null;
}

function buttonRebuild() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            console.log("s" + i + "" + j);
            if(winner!==0||winner!==1||winner!==-1){
                document.getElementById("s" + i + "" + j).innerHTML = board[i][j] == false ? "X" : board[i][j] == true ? "O" : "";
            }
        }
    }
}

let count = 0;

function minMax(board, player) {
    count++;
    let winner = gameStatus(board);
    if (winner != null) {
        switch (winner) {
            case 1:
                // Computer wins
                return [1, board]
            case 0:
                // You win
                return [-1, board]
            case -1:
                // It's a tie
                return [0, board];
        }
    } else {
        // crawl potential future moves
        let squareForecast = null;
        let boardForecast = null;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == null) {
                    board[i][j] = player;
                    let value = minMax(board, !player)[0];
                    if ((player && (squareForecast == null || value > squareForecast)) || (!player && (squareForecast == null || value < squareForecast))) {
                        boardForecast = board.map(function (arr) {
                            return arr.slice();
                        });
                        squareForecast = value;
                    }
                    board[i][j] = null;
                }
            }
        }
        return [squareForecast, boardForecast];
    }
}

function drawToBoard() {
    board = minmaxStep(board);
    console.log(count);
    turnSwitch = false;
    trigger();
}

function minmaxStep(board) {
    count = 0;
    return minMax(board, true)[1];
}

if (turnSwitch) {
    drawToBoard();
}

document.getElementById("tictactoe").addEventListener("click", function (element) {
    // Tictactoe Squares
    if (element.target && element.target.matches(".square")) {
        let cell = element.target.id;
        console.log(cell);
        let row = parseInt(cell[1]);
        let col = parseInt(cell[2]);
        if (!turnSwitch) {
            board[row][col] = false;
            turnSwitch = true;
            trigger();
            drawToBoard();
        }
    } else if (element.target && element.target.matches("#restart")) {
        reset();
    }

});

trigger();