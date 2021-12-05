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

function compMove(board, lastMove, score) {
    console.log(`score: ${score}`)
    if (gameOver(board)) {
        if (checkXWin(board)) return [score[0]++, score[1], score[2]]
        else if (checkOWin(board)) return [score[0], score[1]++, score[2]]
        else return [score[0], score[1], score[2]++]
    }
    console.log(`game is not over`)
    const nextMove = lastMove === 'x' ? 'o' : 'x'
    const nextBoards = []
    const moves = []
    board.forEach((position, index) => {
        if (!position) {
            nextBoards.push(board.map((oldPos, oldIndex) => index === oldIndex ? nextMove : oldPos))
            moves.push([nextMove, index, []])
        }
    })
    nextBoards.forEach((nextBoard, index) => {
        const scores = compMove(nextBoard, nextMove, score)
        moves.forEach((moveRecord, i) => {
            if (index === i) {
                moveRecord[2].push(scores)
            }
        })
    })
    return moves
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

const results = compMove(compBoard, 'x', [0, 0, 0])
for (const result of results) {
    console.log(`'${result[0]}' to board[${result[1]}]: ${result[2][0]} wins / ${result[2][1]} losses / ${result[2][2]} ties`)
}