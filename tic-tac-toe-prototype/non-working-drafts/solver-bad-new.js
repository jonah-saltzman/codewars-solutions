const boardNumbers = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8]
]

const conditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
]

const board = ['x', null, null, null, null, null, null, null, null]

const compBoard = [...board]

function compMove(board, lastMove, score, player) {
    console.log(`score: ${score}`)
    if (gameOver(board)) {
        if (checkOWin(board)) return [score[0]++, score[1], score[2]]
        else if (checkXWin(board)) return [score[0], score[1]++, score[2]]
        else return [score[0], score[1], score[2]++]
    }
    console.log(`game is not over`)
    const nextMove = lastMove === 'x' ? 'o' : 'x'
    const moves = []
    let boardID = 0
    board.forEach((position, index) => {
        if (!position) {
            moves.push({
                toPosition: index,
                boardIndex: boardID,
                board: board.map((oldPos, oldIndex) => index === oldIndex ? nextMove : oldPos),
            })
        }
    })
    moves.forEach(move => move.scores = compMove(move.board, nextMove, score))
    let highestScore = null
    const playerIndex = player === 'x' ? 0 : 1
    for (const move of moves) {
        if (!highestScore) {
            highestScore = move
        }
        if (move.scores[playerIndex] > highestScore.scores[playerIndex]) {
            highestScore = move
        }
    }
    console.log(`highest scoring move: `)
    console.log(highestScore)
}

function checkOWin(board) {
    for (const condition of conditions) {
        if(condition.every(pos => board[pos] === 'o')) return true
    }
    return false
}

function checkXWin(board) {
    for (const condition of conditions) {
        if(condition.every(pos => board[pos] === 'x')) return true
    }
    return false
}


function gameOver(board) {
    if (board.every(pos => pos) || checkOWin(board) || checkXWin(board)) return true
    return false
}

const results = compMove(compBoard, 'x', [0, 0, 0], 'o')
