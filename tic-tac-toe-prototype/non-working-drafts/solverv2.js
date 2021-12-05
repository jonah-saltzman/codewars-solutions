const boardNumbers = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
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

function getResult(board) {
	for (const condition of conditions) {
		if (condition.every((pos) => board[pos] === 'x')) return 'x'
		if (condition.every((pos) => board[pos] === 'o')) return 'o'
	}
	return board.every((pos) => pos)
}

function getWinCounts(board, previousMove, scores) {
    console.log('scores: ', scores)
    console.log(board)
    const currentResult = getResult(board)
    const currentScores = [...scores]
    if (currentResult) {
        if (currentResult === 'x') return [currentScores[0]++ ,currentScores[1]   ,currentScores[2]  ]
        if (currentResult === 'o') return [currentScores[0]   ,currentScores[1]++ ,currentScores[2]  ]
                                   return [currentScores[0]   ,currentScores[1]   ,currentScores[2]++]
    }

    const nextMove = previousMove === 'x' ? 'o' : 'x'
    const nextBoards = []
    for (let i = 0; i < 9; i++) {
        if (!board[i]) {
            nextBoards.push(board.map((existingPosition, index) => index === i ? nextMove : existingPosition))
        }
    }
    const moveScores = []
    nextBoards.forEach((nextBoard) => moveScores.push(getWinCounts(nextBoard, nextMove, currentScores)))
    console.log(moveScores)
}

getWinCounts(compBoard, 'x', [0, 0, 0])