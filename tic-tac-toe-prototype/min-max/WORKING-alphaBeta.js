const alg = {
    wins: 0,
    losses: 0,
    draws: 0,
    moves: 0
}

function alphaBetaDriver(board, playerIndex, maxDepth) {
    const player = playerIndex === 0 ? 'x' : 'o'
    const bestMoves = findBestMove(board, maxDepth)
    return bestMoves
}

function findBestMove(board, maxDepth) {
	const moves = board
		.map((position, index, board) => {
			if (!position) {
				const newBoard = [...board]
				newBoard[index] = 'o'
				return {
					move: {
						player: 'o',
						toIndex: index,
					},
					score: minMax(
						newBoard,
						0,
						false,
						Number.NEGATIVE_INFINITY,
						Number.POSITIVE_INFINITY,
                        maxDepth
					),
				}
			}
		})
		.filter((board) => board)
    
    //console.log(`valid moves: `, moves)

	const bestMoveScore = moves.reduce((highScore, move) => {
		return move.score > highScore ? move.score : highScore
	}, Number.NEGATIVE_INFINITY)

	return moves.filter((move) => move.score === bestMoveScore)
}

function minMax(board, depth, isMaximizer, alpha, beta, maxDepth) {
    const indent = "".padEnd(depth * 4)
    alg.moves++
	const score = evaluateBoard(board)
	if (score) {
		return score > 0 ? score - depth : score + depth
	}
	if (isGameOver(board)) {
		return 0
	}
	if (depth >= maxDepth) {
		return 0
	}

	if (isMaximizer) {
		let maxScore = Number.NEGATIVE_INFINITY
		const nextBoards = generateBoards(board, 'o')
		for (let i = 0; i < nextBoards.length; i++) {
			maxScore = Math.max(
				maxScore,
				minMax(nextBoards[i], depth + 1, !isMaximizer, alpha, beta, maxDepth)
			)
			alpha = Math.max(alpha, maxScore)
			if (maxScore >= beta) {
                //console.log(indent, 'pruning lower scores')
				break
			}
		}
    //console.log(indent, 'isMax: ', maxScore)
	return maxScore
	} else {
		let minScore = Number.POSITIVE_INFINITY
		const nextBoards = generateBoards(board, 'x')
		//nextBoards.sort((a, b) => 0.5 - Math.random())
		for (let i = 0; i < nextBoards.length; i++) {
			minScore = Math.min(
				minScore,
				minMax(nextBoards[i], depth + 1, !isMaximizer, alpha, beta, maxDepth)
			)
			beta = Math.min(beta, minScore)
			if (minScore <= alpha) {
                //console.log(indent, 'pruning higher scores')
				break
			}
		}
        //console.log(indent, 'isMin: ', minScore)
		return minScore
	}
}

function generateBoards(board, mover) {
	const boards = []
	board.forEach((position, index) => {
		if (!position) {
            const newBoard = [...board]
			newBoard[index] = mover
			boards.push(newBoard)
		}
	})
	return boards
}

function evaluateBoard(board) {
	if (
		abConditions.some((condition) =>
			condition.every((pos) => board[pos] === 'o')
		)
	) {
        alg.wins++
		return 100
	}
	if (
		abConditions.some((condition) =>
			condition.every((pos) => board[pos] === 'x')
		)
	) {
        alg.losses++
		return -100
	}
	return 0
}

function isGameOver(board) {
	if (board.every((position) => position)) {
        alg.draws++
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
	'o', null, null, 'x', null,
	null, null, null, null, 'x',
	'o', null, null, null, 'o',
	null, null, null, null, null,
	'o', null, null, null, 'x',
]

console.log(`maxDepth: ${process.argv[2]}`)

console.log(alphaBetaDriver(testBoard, 1, process.argv[2]))
console.log(`win: ${alg.wins} \nlose: ${alg.losses} \ndraw: ${alg.draws}\n${alg.moves} moves`)
