function driver(board, playerIndex) {
    const player = playerIndex === 0 ? 'x' : 'o'
    const bestMoves = findBestMove(board, player)
    return bestMoves
}

function findBestMove(board, player) {
    const _PLAYER = player
    const _OPPONENT = _PLAYER === 'x' ? 'o' : 'x'
    // board, depth, isMaximizer, _PLAYER, _OPPONENT
    const moves = board.map((position, index, board) => {
        if (!position) {
            const newBoard = [...board]
            newBoard[index] = _PLAYER
            const newScore = minMax(newBoard, 0, false, _PLAYER, _OPPONENT)
            return {
                move: {
                    player: player,
                    toIndex: index,
                },
                score: newScore
            }
        }
    }).filter(board => board)
    console.log(moves)
    const bestMoveScore = moves.reduce((highScore, move) => {
			return move.score > highScore ? move.score : highScore
		}, Number.NEGATIVE_INFINITY)

    const allBestMoves = moves.filter(move => move.score === bestMoveScore)

    return allBestMoves
}

function minMax(board, depth, isMaximizer, _PLAYER, _OPPONENT) {
    const score = evaluateBoard(board, _PLAYER, _OPPONENT)
    if (score === 10) return (score - depth)
    if (score === -10) return (score + depth)
    if (isGameOver(board)) return 0
    if (depth >= 5) return 0
    if (isMaximizer) {
        console.log(`generating boards for isMax: ${isMaximizer}`)
        return generateBoards([...board], _PLAYER).reduce((maxScore, currentBoard) => {
            const boardScore = minMax(currentBoard, depth + 1, !isMaximizer, _PLAYER, _OPPONENT)
            return boardScore > maxScore 
                ? boardScore 
                : maxScore
        }, Number.NEGATIVE_INFINITY)
    } else {
        console.log(`generating boards for isMax: ${isMaximizer}`)
        return generateBoards([...board], _OPPONENT).reduce((minScore, currentBoard) => {
            const boardScore = minMax(currentBoard, depth + 1, !isMaximizer, _PLAYER, _OPPONENT)
            return boardScore < minScore
                ? boardScore
                : minScore
        }, Number.POSITIVE_INFINITY)
    }
}

function generateBoards(board, mover) {
    const boards = []
    board.forEach((position, index) => {
        const newBoard = [...board]
        if (!position) {
            newBoard[index] = mover
            boards.push(newBoard)
        }
    })
    return boards
}

function evaluateBoard(board, _PLAYER, _OPPONENT) {
    if (conditions.some(condition => condition.every(pos => board[pos] === _PLAYER))) {
        console.log(`found player win`)
        return 10
    }
    if (conditions.some(condition => condition.every(pos => board[pos] === _OPPONENT))) {
        console.log(`found opponent win`)
        return -10
    }
    return 0
}

function isGameOver(board) {
    return board.every(position => position)
}

const testBoard = [
    'x', 'o', null, null, 
    null, 'x', 'o', null, 
    null, null, null, null, 
    null, null, null, null
]

const conditions = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10, 15],
    [3, 6, 9, 12]
]

function randomBoard() {
	const choices = ['x', 'o', null]
	let board = []
	for (let i = 0; i < 9; i++) {
		board.push(choices[Math.floor(Math.random() * 3)])
	}
	return board
}

const board = randomBoard()
const result = driver(testBoard, 1)
console.log(result)