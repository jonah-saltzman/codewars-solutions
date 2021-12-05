
function movesToCompare(board, player) {

    const moves = [] 
    getMoves([...board], player).forEach(move => moves.push({move: move, score: 0}))

    moves.forEach(move => move.score = scoreBoard(generateBoard(board, move.move), player, player))

    const validMoves = moves.filter(score => score.move.player)
    const highestScore = validMoves.reduce(
        (highScore, move) => 
            move.score > highScore 
            ? move.score 
            : highScore, 
        validMoves[0].score
    )

    const nextMoves = validMoves.filter(move => move.score === highestScore)
    return nextMoves
}

function scoreBoard(board, moveBy, player) {
    
    const opponent = player === 'x' ? 'o' : 'x'
    const nextMover = moveBy === 'x' ? 'o' : 'x'

    if (board === null) return 0
    if (conditions.some(condition => condition.every(pos => board[pos] === player))) return 1
    if (conditions.some(condition => condition.every(pos => board[pos] === opponent))) return -1
    if (board.every((pos) => pos)) return 0

    const boards = getMoves(board, nextMover).map(move => move.player ? generateBoard(board, move) : null)

    return boards.reduce((score, board) => board ? score + scoreBoard(board, nextMover, player) : score, 0)
}

function generateBoard(board, move) {
    if (move.player === null) return null
    const newBoard = [...board]
    newBoard[move.toIndex] = move.player
    return newBoard
}

function getMoves(board, nextPlayer) {
    const moves = [] 
    board.forEach((position, index) => moves.push({
        player: !position ? nextPlayer : null,
        toIndex: index
    }))
    return moves
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

const board = [null, null, null, null, 'x', null, null, null, null]

console.log(`final return: `)
console.log(movesToCompare(board, 'o'))
