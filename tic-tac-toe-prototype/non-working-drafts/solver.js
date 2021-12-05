const boardNumbers = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8]
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

// [wins/losses/ties]

function getResult(board) {
    for (const condition of conditions) {
        if (condition.every(pos => board[pos] === 'x')) return 'x'
        if (condition.every(pos => board[pos] === 'o')) return 'o'
    }
    return board.every(pos => pos)
}

// Scores: [xWins, oWins, draws]
function bestMove(board, player, turn, scores, movecount) {
    console.log(scores, movecount)
    console.log(board)
    const currentResult = getResult(board)
    const currentScores = [...scores]
    if (currentResult) {
        if (currentResult === 'x') return [currentScores[0]++ ,currentScores[1]   ,currentScores[2]  ]
        if (currentResult === 'o') return [currentScores[0]   ,currentScores[1]++ ,currentScores[2]  ]
                                   return [currentScores[0]   ,currentScores[1]   ,currentScores[2]++]
    }
    console.log(`game still going; scores: `, currentScores)
    movecount +=1
    const moves = []
    let boardID = 0
    console.log('currentturn: ', turn)
    for (let i = 0; i < 9; i++) {
        if (!board[i]) {
            const newboard = board.map((pos, index) => i === index ? turn : pos)
            moves.push({
                boardIndex: boardID,
                toPosition: i,
                scores: null,
                board: newboard
            })
            boardID++
        }
    }

    console.log('before recursion: ')
    console.log(moves)

    const nextTurn = turn === 'x' ? 'o' : 'x'
    console.log('nextturn: ', nextTurn)
    moves.forEach(move => move.scores = bestMove(move.board, player, nextTurn, currentScores, movecount))

    const playerIndex = player === 'x' ? 0 : 1
    console.log(`about to check: `)
    console.log(moves)
    let highestScoreMove
    for (const move of moves) {
        if (!highestScoreMove) highestScoreMove = move
        if (move.scores[playerIndex] > highestScoreMove.scores[playerIndex]) {
            highestScoreMove = move
        }
    }
    console.log(highestScoreMove)
}

bestMove(compBoard, 'o', 'o', [0, 0, 0], 0)

// const results = bestMove(compBoard, 'o', 'o', [0, 0, 0])
// console.log(results)
// for (const result of results) {
//     console.log(`move [ ${result.move} ] -> xWins: ${result.scores[0]} / oWins: ${result.scores[1]} / draws: ${result.scores[2]}`)
// }