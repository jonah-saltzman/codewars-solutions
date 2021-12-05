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
		if (condition.every((pos) => board[pos] === 'x')) {
            console.log('found an x win!')
            return 'x'
        }
		if (condition.every((pos) => board[pos] === 'o')) {
            console.log('found an o win!')
            return 'o'
        }
	}
	if (board.every((pos) => pos)) {
        console.log('found a draw!')
        return true
    }
    else {
        console.log('no end')
        return false
    }
}

function solver(board, previousMove, player) {
    console.log(`checking board: ${board}`)
    const gameResult = getResult(board)
    const opponent = player === 'x' ? 'o' : 'x'
    if (gameResult) {
        if (gameResult === player) return 1
        if (gameResult === opponent) return -1
        return 0
    }
    const nextMove = previousMove === 'x' ? 'o' : 'x'
    const moves = []
    for (let i = 0; i < 9; i++) {
        if (!board[i]) {
            console.log(`moving to pos:${i}`)
            const newBoard = board.map((oldBoard, index) => index === i ? nextMove : oldBoard)
            moves.push({
                moveTo: i,
                board: newBoard,
                score: 0
            })
            console.log(`new board: ${newBoard}`)
        }
    }
    console.log(`end of moves`)
    // console.log(moves)
    for (const move of moves) {
        move.score += solver(move.board, nextMove, player)
        console.log(`moveto: ${move.moveTo}; score: ${move.score}`)
    }
    let bestmove = moves[0]
    for (let i = 1; i < moves.length; i++) {
        if (moves[i].score > bestmove.score) {
            bestmove = moves[i]
        }
    }
    
}

console.log(solver(compBoard, 'x', 'o'))

const xWinBoard = ['x', 'x', 'x', null, null, null, null, null, null]
const oWinBoard = ['o', 'o', 'o', null, null, null, null, null, null]
const drawBoard = ['x', 'x', 'o', 'o', 'o', 'x', 'x', 'o', 'x']
const fullXwin = ['x', 'x', 'x', 'x', 'o', 'o', 'o', 'o', 'x']
const fullOwin = ['o', 'o', 'o', 'o', 'x', 'x', 'x', 'x', 'o']
// getResult(xWinBoard)
// getResult(oWinBoard)
// getResult(drawBoard)
// getResult(fullXwin)
// getResult(fullOwin)