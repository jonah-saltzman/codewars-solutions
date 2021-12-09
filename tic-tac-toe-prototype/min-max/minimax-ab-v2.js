

function alphaBetaDriver(board, playerIndex) {
	const player = playerIndex === 0 ? 'x' : 'o'
	const bestMoves = findBestMove(board, player)
	return bestMoves
}

function findBestMove(board, player) {
	const _PLAYER = player
	const _OPPONENT = _PLAYER === 'x' ? 'o' : 'x'
	const moves = board
		.map((position, index, board) => {
			if (!position) {
				const newBoard = [...board]
				newBoard[index] = _PLAYER
				return {
					move: {
						player: _PLAYER,
						toIndex: index,
					},
					score: minMax(
						newBoard,
						0,
						false,
						_PLAYER,
						_OPPONENT,
						Number.NEGATIVE_INFINITY,
						Number.POSITIVE_INFINITY
					),
				}
			}
		})
		.filter((board) => board)

	const bestMoveScore = moves.reduce((highScore, move) => {
		return move.score > highScore ? move.score : highScore
	}, Number.NEGATIVE_INFINITY)

	return moves.filter((move) => move.score === bestMoveScore)
}

function minMax(board, depth, isMaximizer, _PLAYER, _OPPONENT, alpha, beta) {
    const indent = ''.padEnd(depth * 1)
    console.log(indent, `depth: ${depth}; alpha: ${alpha}; beta: ${beta}`)
	const score = evaluateBoard(board, _PLAYER, _OPPONENT)
	if (score === 10) {
        return score - depth
	}
    if (score === -10) {
        return score + depth
    }
	if (isGameOver(board)) {
        console.log(indent, 'returning 0')
		return 0
	}

    const boards = generateBoards(board, isMaximizer ? _PLAYER : _OPPONENT)

    //boards.sort((a, b) => 0.5 - Math.random())

    if (isMaximizer) {
        for (let i = 0; i < boards.length; i++) {
            score = minMax(boards[i], depth + 1, false, _PLAYER, _OPPONENT)
            if (score > alpha) {
                alpha = score
            } else if (alpha >= beta) {
                return alpha
            }
        }
        return alpha
    } else {
        for (let i = 0; i < boards.length; i++) {
            score = minMax(boards[i], depth + 1, true, _PLAYER, _)
        }
    }

    let bestMove = isMaximizer ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY

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
	if (
		abConditions.some((condition) =>
			condition.every((pos) => board[pos] === _PLAYER)
		)
	) {
		return 10
	}
	if (
		abConditions.some((condition) =>
			condition.every((pos) => board[pos] === _OPPONENT)
		)
	) {
		return -10
	}
	return 0
}

function isGameOver(board) {
	if (board.every((position) => position)) {
        // console.log(`draw!`)
		return true
	}
	return false
}

const abConditions = [
	[0, 1, 2, 3, 4],
	[5, 6, 7, 8, 9],
	[10, 11, 12, 13, 14],
	[15, 16, 17, 18, 19],
	[20, 21, 22, 23, 24],
	[0, 5, 10, 15, 20],
	[1, 6, 11, 16, 21],
	[2, 7, 12, 17, 22],
	[3, 8, 13, 18, 23],
	[4, 9, 14, 19, 24],
	[0, 6, 12, 18, 24],
	[4, 8, 12, 16, 20],
]

const testBoard = [
    'x', null, null, null, null,
    null, null, null, null, null,
    null, null, null, null, null,
    null, null, null, null, null,
    null, null, null, null, null,
]

console.log(alphaBetaDriver(testBoard, 1)) 