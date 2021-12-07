function driver(board, playerIndex) {
    const player = playerIndex === 0 ? 'x' : 'o'
    const bestMove = findBestMove(board, player)
    const bestMoveObj = {
        move: {
            player: player,
            toIndex: bestMove.index
        },
        score: bestMove.score
    }
    return bestMoveObj
}

function findBestMove(board, player) {
    const _PLAYER = player
    const _OPPONENT = _PLAYER === 'x' ? 'o' : 'x'
    console.log(`player: ${_PLAYER}; opponent: ${_OPPONENT}`)
    let bestMoveScore = Number.NEGATIVE_INFINITY
    let bestMoveIndex;
    for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
            board[i] = _PLAYER
            const moveScore = minMax(board, 0, false, _PLAYER, _OPPONENT)
            board[i] = null
            if (moveScore > bestMoveScore) {
                bestMoveIndex = i
                bestMoveScore = moveScore
            }
        }
    }
    console.log(`the best move is to index [${bestMoveIndex}]; score: ${bestMoveScore}`)
    const bestmove = {
        index: bestMoveIndex,
        score: bestMoveScore
    }
    return bestmove
}

function minMax(board, depth, isMaximizer, _PLAYER, _OPPONENT) {
    const score = evaluateBoard(board, _PLAYER, _OPPONENT)
    if (score === 10) return score - depth
    if (score === -10) return score - depth
    if (isGameOver(board)) return 0
    let best
    if (isMaximizer) {
        best = Number.NEGATIVE_INFINITY
        for (let i = 0; i < 9; i++) {
            if (board[i] === null) {
                board[i] = _PLAYER
                best = Math.max(best, minMax(board, (depth + 1), !isMaximizer, _PLAYER, _OPPONENT))
                board[i] = null
            }
        }
        return best
    }
    else {
        best = Number.POSITIVE_INFINITY
        for (let i = 0; i < 9; i++) {
            if (board[i] === null) {
                board[i] = _OPPONENT
                best = Math.min(best, minMax(board, (depth + 1), !isMaximizer, _PLAYER, _OPPONENT))
                board[i] = null
            }
        }
        return best
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
    if (conditions.some(condition => condition.every(pos => board[pos] === _PLAYER))) return 10
    if (conditions.some(condition => condition.every(pos => board[pos] === _OPPONENT))) return -10
    return 0
}

function isGameOver(board) {
    return board.every(position => position)
}

function randomBoard() {
    const choices = ['x', 'o', null]
    let board = []
    for (let i = 0; i < 9; i++) {
        board.push(choices[Math.floor(Math.random() * 3)])
    }
    return board
}

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

const testBoard = [
    'o', 'x', null, 
    'o', null, 'x', 
    null, null, 'x'
]

const overBoard = ['x', 'x', 'o', 'x', 'x', 'o', 'o', 'x', 'o']

const board = randomBoard()

const result = driver(testBoard, 1)
console.log(result)