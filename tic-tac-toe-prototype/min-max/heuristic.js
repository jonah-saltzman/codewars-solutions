const alg = {
	wins: 0,
	losses: 0,
	draws: 0,
	moves: 0,
}

function alphaBetaDriver(board, maxDepth) {
	//console.log(`DRIVER BOARD: `, board)
	const bestMoves = findBestMove(board, maxDepth)
	return bestMoves
}

function findBestMove(board, maxDepth) {

    const moves = sortBoards(generateBoards([board, 0], 'o'), true).map(board => {
        return {
            move: {
                player: 'o',
                toIndex: board[1]
            },
            score: minMax(board, 0, false, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY,maxDepth)
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
		return heuristic(board)
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
				//console.log(indent, 'pruning lower scores')
				break
			}
		}
		//console.log(indent, 'isMax: ', maxScore)
		return maxScore
	} else {
		let minScore = Number.POSITIVE_INFINITY
		const nextBoards = sortBoards(generateBoards(board, 'x'), false)
		//nextBoards.sort((a, b) => 0.5 - Math.random())
		for (let i = 0; i < nextBoards.length; i++) {
			minScore = Math.min(
				minScore,
				minMax(nextBoards[i], depth + 1, !isMaximizer, alpha, beta, maxDepth)
			)
			beta = Math.min(beta, minScore)
			if (alpha >= beta) {
				//console.log(indent, 'pruning higher scores')
				break
			}
		}
		//console.log(indent, 'isMin: ', minScore)
		return minScore
	}
}

const sortBoards = (boards, isMax) => {
    return boards.sort((a, b) => {
        return guess(b, isMax) - guess(a, isMax)
    })
}

const heuristic = (board) => {
    let score = 0
    for (let i = 0; i < 25; i++) {
        if (board[0][i]) {
            abConditions[i].forEach(array => {
                if (board[0][i] === 'o') {
                    let oScore = 0
                    for (let j = 0; j < 4; j++) {
                        if (board[0][array[j]] === 'o' || board[0][array[j]] === null) {
                            oScore++
                        } else {
                            oScore = 0
                            break
                        }
                    }
                    score += oScore
                } else {
                    let xScore = 0
                    for (let j = 0; j < 4; j++) {
                        if (board[0][array[j]] === 'x' || board[0][array[j]] === null) {
                            xScore++
                        } else {
                            xScore = 0
                            break
                        }
                    }
                    score -= xScore
                }
            })
        }
    }
    return score
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
            if (move[0][array[i]] === 'o') {
                winScore++
                countBlock = false
                countEmpty = false
            }
            if (move[0][array[i]] === 'x') {
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
    //console.log(`score: ${score}`)
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
	//console.log(`evaluating moveto: ${moveInd} on board:`, boardArr)
	for (let array = 0; array < abConditions[moveInd].length; array++) {
		let win = true
		for (let pos = 0; pos < abConditions[moveInd][array].length; pos++) {
			if (boardArr[abConditions[moveInd][array][pos]] !== boardArr[moveInd]) {
				win = false
				break
			}
		}
		if (win) {
			//console.log(`found a win for ${boardArr[moveInd]}`)
			return boardArr[moveInd] === 'o' ? 100 : -100
		}
	}
	//console.log('found nothing')
	return 0
}

// if (
// 	abConditions.some((condition) =>
// 		condition.every((pos) => board[pos] === 'o')
// 	)
// ) {
// 	return 100
// }
// if (
// 	abConditions.some((condition) =>
// 		condition.every((pos) => board[pos] === 'x')
// 	)
// ) {
// 	return -100
// }
// return 0

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

const testBoardNext = [
	null, null, 'o', null, 'x',
	null, null, null, null, 'x',
	null, null, 'o', null, 'x',
	null, null, null, null, null,
	null, null, null, 'o', 'x',
]

const testBoard = [
	'o', null, null, 'x', null,
	null, null, null, 'x', 'x',
	'o', null, null, 'x', 'o',
	null, null, 'x', null, null,
	'o', null, null, null, 'x',
]

// 5, 6, 11, 16

console.log(`maxDepth: ${process.argv[2]}`)

console.log(alphaBetaDriver(testBoardNext, process.argv[2]))
console.log(`win: ${alg.wins} \nlose: ${alg.losses} \ndraw: ${alg.draws}\n${alg.moves} moves`)