console.log('hello')

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

function driver(board) {
    return findBestMove(board)
}

function findBestMove(board) {
    console.log('initial board: ', board)
    const moves = []
    for (let i = 0; i < board.length; i++) {
        if(!board[i]) {
            moves.push({
                maximizer: true,
                toIndex: i,
                score: 0
            })
        }
    }

    
    for (const move of moves) {
        move.board = generateBoard(board, move)
    }

    let bestMove = null

    for (let i = 0; i < moves.length; i++) {
        moves[i].score = minMax(moves[i].board, 0, true)
        console.log(`moves[${i}] = ${moves[i].score}`)
        console.log(`move: isMax=${moves[i].maximizer} to ${moves[i].toIndex}; SCORE: ${moves[i].score}`)
        if (!bestMove || moves[i].score > bestMove.score) {
					bestMove = moves[i]
				}
    }
    console.log(`FINISHED RECURSION`)
    const equalMoves = []
    for (const move of moves) {
        if (move.score === bestMove.score) {
            equalMoves.push(move)
        }
    }
    return equalMoves
}

function minMax(board, depth, isMaximizer) {
    const indent = ''.padStart(depth * 5)
    console.log(indent, `isMax: ${isMaximizer}; depth is: ${depth}`)
    
    const score = evaluateBoard(board, indent)
    if (score === 10)
        return score
    if (score === -10)
        return score
    if (isGameOver(board, indent))
        return 0

    console.log(`game is not over; generating moves for isMaximizer=${!isMaximizer}:`)

    const moves = []
		for (let i = 0; i < board.length; i++) {
			if (!board[i]) {
				moves.push({
					maximizer: !isMaximizer,
					toIndex: i,
					score: 0,
				})
			}
		}
    // console.log(moves)

    for (const move of moves) {
        move.board = generateBoard(board, move)
    }
    // console.log(`Next moves:`)
    // console.log(moves)

    const nextDepth = depth + 1
    let bestValue
    if (isMaximizer) {
        console.log(indent, 'minMax: is Maximizer')
        bestValue = -Infinity
        for (let i = 0; i < moves.length; i++) {
            const tempVal = minMax(moves[i].board, nextDepth, false)
            if (tempVal > bestValue) {
                bestValue = tempVal
            }
        }
        console.log(indent, `MINMAX COMPLETE...HIGHESTSCORE: ${bestValue} for board: `, board)
        return bestValue
    }else {
        console.log(indent, 'minMax: is Minimizer')
        bestValue = Infinity
        for (let i = 0; i < moves.length; i++) {
            const tempVal = minMax(moves[i].board, nextDepth, true)
            if (tempVal < bestValue) {
                bestValue = tempVal
            }
        }
        console.log(indent, `MINMAX COMPLETE...LOWESTSCORE: ${bestValue} for board: `, board)
        return bestValue
    }
}

function generateBoard(prevBoard, move) {
    const newBoard = [...prevBoard]
    console.log(`generating board for isMax: ${move.maximizer}`)
    newBoard[move.toIndex] = move.maximizer ? 'o' : 'x'
    // console.log('prev', prevBoard)
    // console.log('new', newBoard)
    return newBoard
}

function isGameOver(board, indent) {
    const result =
			board.every((position) => position)
    //console.log(indent, 'isGameOver: ', result, 'board: ', board)
    return result
}

function evaluateBoard(board, indent) {
    if (conditions.some(condition => condition.every(position => board[position] === 'o'))) {
        //console.log(indent, `found o win, board:`, board)
        return 10
    }
    if (conditions.some(condition => condition.every(position => board[position] === 'x'))) {
        //console.log(indent, `found x win, board:`, board)
        return -10
    }
    //console.log(indent, 'draw')
    return 0
}

const board = [
    'x', null, null, 
    null, null, null, 
    null, null, null]

const xWinBoard = ['x', 'x', 'x', null, null, null, null, null, null]
const oWinBoard = ['o', 'o', 'o', null, null, null, null, null, null]
const drawBoard = ['x', 'x', 'o', 'o', 'o', 'x', 'x', 'o', 'x']
const fullXwin = ['x', 'x', 'x', 'x', 'o', 'o', 'o', 'o', 'x']
const fullOwin = ['o', 'o', 'o', 'o', 'x', 'x', 'x', 'x', 'o']

const testBoard = [
    'x', 'x', null, 
    'x', null, 'o', 
    'o', null, null
]

const test2 = [null, null,]

console.log(driver(testBoard))