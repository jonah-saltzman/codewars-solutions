function movesToCompare(board, player) {
	const moves = []
	getMoves(board, player).forEach((move) => moves.push({ move: move }))

	moves.forEach(
		(move) =>
			(move.score = scoreBoard(generateBoard(board, move.move), player, player))
	)

	const validMoves = moves.filter((score) => score.move.player)
	const highestScore = validMoves.reduce(
		(highScore, move) => (move.score > highScore ? move.score : highScore),
		validMoves[0].score
	)

	return validMoves.filter((move) => move.score === highestScore)
}

function scoreBoard(board, moveBy, player) {
	const boardResult = gameOver(board, player)
	if (boardResult !== false) return boardResult

	const nextMover = moveBy === 'x' ? 'o' : 'x'

	const boards = getMoves(board, nextMover).map((move) =>
		move.player ? generateBoard(board, move) : null
	)

	return boards.reduce(
		(score, board) =>
			board ? score + scoreBoard(board, nextMover, player) : score,
		0
	)
}

function generateBoard(board, move) {
	if (move.player === null) return null
	const newBoard = [...board]
	newBoard[move.toIndex] = move.player
	return newBoard
}

function getMoves(board, nextPlayer) {
	const moves = []
	board.forEach((position, index) =>
		moves.push({
			player: position ? null : nextPlayer,
			toIndex: index,
		})
	)
	return moves
}

const gameOver = (board, player) => {
	const opponent = player === 'x' ? 'o' : 'x'
	if (board === null) return 0
	if (
		conditions.some((condition) =>
			condition.every((pos) => board[pos] === player)
		)
	) {
		wins++
		return 1
	}
	if (
		conditions.some((condition) =>
			condition.every((pos) => board[pos] === opponent)
		)
	) {
		losses++
		return -1
	}
	if (board.every((pos) => pos)) {
		draws++
		return 0
	}
	return false
}

const xWinBoard = ['x', 'x', 'x', null, null, null, null, null, null]
const oWinBoard = ['o', 'o', 'o', null, null, null, null, null, null]
const drawBoard = ['x', 'x', 'o', 'o', 'o', 'x', 'x', 'o', 'x']
const fullXwin = ['x', 'x', 'x', 'x', 'o', 'o', 'o', 'o', 'x']
const fullOwin = ['o', 'o', 'o', 'o', 'x', 'x', 'x', 'x', 'o']

const testBoard = [null, null, null, null, null, null, null, null, null]

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

let wins = 0
let losses = 0
let draws = 0

const board = [null, 'x', null, null, 'o', null, null, null, 'x']

console.log(movesToCompare(board, 'o'))
console.log(wins - losses)
console.log(`wins: ${wins}`)
console.log(`losses: ${losses}`)
console.log(`draws: ${draws}`)
console.log(`outcomes: ${wins + losses + draws}`)
