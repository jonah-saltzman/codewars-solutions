const alg = {
	wins: 0,
	losses: 0,
	draws: 0,
	moves: 0,
}

function alphaBetaDriver(board, maxDepth) {
	const bestMoves = findBestMove(board, maxDepth)
	return bestMoves
}

function findBestMove(board, maxDepth) {
	const unSortMoves = generateBoards([[...board]], 'o')
    console.log('unsorted root moves:')
    console.log(unSortMoves)
    const sortMoves = sortBoards(unSortMoves, true)
    console.log('sorted root moves:')
    console.log(sortMoves)
    
    const moves = sortMoves.map(move => {
        return {
            moves: {
                player: 'o',
                toIndex: move[1]
            },
            score: minMax(move, 0, false, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, maxDepth)
        }
    })

	const bestMoveScore = moves.reduce((highScore, move) => {
		return move.score > highScore ? move.score : highScore
	}, Number.NEGATIVE_INFINITY)

	return moves.filter((move) => move.score === bestMoveScore)
}

function minMax(board, depth, isMaximizer, alpha, beta, maxDepth) {
	alg.moves++
	const score = evaluateBoard(board)
	if (score) {
		score > 0 ? alg.wins++ : alg.losses++
		return score > 0 ? score - depth : score + depth
	}
	if (isGameOver(board)) {
		alg.draws++
		return 0
	}
	if (depth >= maxDepth) {
		return 0
	}

	if (isMaximizer) {
		let maxScore = Number.NEGATIVE_INFINITY
		const nextBoards = sortBoards(generateBoards(board, 'o'), true)
		for (let i = 0; i < nextBoards.length; i++) {
			maxScore = Math.max(
				maxScore,
				minMax(nextBoards[i], depth + 1, !isMaximizer, alpha, beta, maxDepth)
			)
			alpha = Math.max(alpha, maxScore)
			if (alpha >= beta) {
				break
			}
		}
		return maxScore
	} else {
		let minScore = Number.POSITIVE_INFINITY
		const nextBoards = sortBoards(generateBoards(board, 'x'), false)
		for (let i = 0; i < nextBoards.length; i++) {
			minScore = Math.min(
				minScore,
				minMax(nextBoards[i], depth + 1, !isMaximizer, alpha, beta, maxDepth)
			)
			beta = Math.min(beta, minScore)
			if (alpha >= beta) {
				break
			}
		}
		return minScore
	}
}

const sortBoards = (boards, isMax) => {
    return boards.sort((a, b) => {
        return guess(b, isMax) - guess(a, isMax)
    })
}

const guess = (move, isMax) => {
    const eval = evaluateBoard(move)
    if (eval) {
        if (eval > 0 && isMax || eval < 0 && !isMax) {
            return Number.POSITIVE_INFINITY
        } else {
            return Number.NEGATIVE_INFINITY
        }
    }
    let score = 0
    abConditions[move[1]].forEach(array => {
        let winScore = 0
        let blockScore = 0
        let countEmpty = true
        let countWin = true
        let countBlock = true
        for (let i = 0; i < 4; i++) {
            if (move[0][array[i]] === (isMax ? 'o' : 'x')) {
                winScore++
                countBlock = false
                countEmpty = false
            }
            if (move[0][array[i]] === (isMax ? 'x' : 'o')) {
                blockScore++
                countWin = false
                countEmpty = false
            }
        }
        if (countWin) {
            score += winScore
        }
        if (countBlock) {
            score += blockScore
        }
        if (countEmpty) {
            score++
        }
    })
    return score
}

function generateBoards(board, mover) {
	const oldBoard = board[0]
	const boards = []
	for (let i = 0; i < oldBoard.length; i++) {
		if (!oldBoard[i]) {
			const newBoard = [...oldBoard]
			newBoard[i] = mover
			boards.push([newBoard, i])
		}
	}
	return boards
}

function evaluateBoard(board) {
	const boardArr = board[0]
	const moveInd = board[1]
	for (let array = 0; array < abConditions[moveInd].length; array++) {
		let win = true
		for (let pos = 0; pos < abConditions[moveInd][array].length; pos++) {
			if (boardArr[abConditions[moveInd][array][pos]] !== boardArr[moveInd]) {
				win = false
				break
			}
		}
		if (win) {
			return boardArr[moveInd] === 'o' ? 100 : -100
		}
	}
	return 0
}

function isGameOver(board) {
	if (board[0].every((position) => position)) {
		return true
	}
	return false
}

const abConditions = {
	0: [
		[1, 2, 3, 4],
		[5, 10, 15, 20],
		[6, 12, 18, 24],
	],
	1: [
		[0, 2, 3, 4],
		[6, 11, 16, 21],
	],
	2: [
		[0, 1, 3, 4],
		[7, 12, 17, 22],
	],
	3: [
		[0, 1, 2, 4],
		[8, 13, 18, 23],
	],
	4: [
		[0, 1, 2, 3],
		[9, 14, 19, 24],
		[8, 12, 16, 20],
	],
	5: [
		[6, 7, 8, 9],
		[0, 10, 15, 20],
	],
	6: [
		[5, 7, 8, 9],
		[1, 11, 16, 21],
		[0, 12, 18, 24],
	],
	7: [
		[5, 6, 8, 9],
		[2, 12, 17, 22],
	],
	8: [
		[5, 6, 7, 9],
		[3, 13, 18, 23],
		[4, 12, 16, 20],
	],
	9: [
		[5, 6, 7, 8],
		[4, 14, 19, 24],
	],
	10: [
		[11, 12, 13, 14],
		[0, 5, 15, 20],
	],
	11: [
		[10, 12, 13, 14],
		[1, 6, 16, 21],
	],
	12: [
		[10, 11, 13, 14],
		[2, 7, 17, 22],
		[0, 6, 18, 24],
		[4, 8, 16, 20],
	],
	13: [
		[10, 11, 12, 14],
		[3, 8, 18, 23],
	],
	14: [
		[10, 11, 12, 13],
		[4, 9, 19, 24],
	],
	15: [
		[16, 17, 18, 19],
		[0, 5, 10, 20],
	],
	16: [
		[15, 17, 18, 19],
		[1, 6, 11, 21],
		[4, 8, 12, 20],
	],
	17: [
		[15, 16, 18, 19],
		[2, 7, 12, 22],
	],
	18: [
		[15, 16, 17, 19],
		[3, 8, 13, 23],
		[0, 6, 12, 24],
	],
	19: [
		[15, 16, 17, 18],
		[4, 9, 14, 24],
	],
	20: [
		[21, 22, 23, 24],
		[0, 5, 10, 15],
		[4, 8, 12, 16],
	],
	21: [
		[20, 22, 23, 24],
		[1, 6, 11, 16],
	],
	22: [
		[20, 21, 23, 24],
		[2, 7, 12, 17],
	],
	23: [
		[20, 21, 22, 24],
		[3, 8, 13, 18],
	],
	24: [
		[20, 21, 22, 23],
		[4, 9, 14, 19],
		[0, 6, 12, 18],
	],
}

const testBoard = [
	null, 'o', null, null, null,
	'o', null, null, null, null,
	null, null, 'o', null, null,
	null, null, null, null, null,
	'x', 'x', 'x', 'x', null,
]

const testBoardNext = [
	null, null, null, null, 'x',
	null, null, 'o', null, 'x',
	null, null, 'o', 'o', 'x',
	null, null, null, null, 'o',
	null, null, null, null, 'x',
]

console.log(`maxDepth: ${process.argv[2]}`)

const results = alphaBetaDriver(testBoard, process.argv[2])

console.log(results)
console.log(`${results.length} boards of equal score`)
console.log(`win: ${alg.wins} \nlose: ${alg.losses} \ndraw: ${alg.draws}\n${alg.moves} moves`)