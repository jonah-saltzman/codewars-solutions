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

function solver(prevBoard, movePlayer, movePosition, playingFor) {
    const newBoard = [...prevBoard]
    newBoard[movePosition] = movePlayer
    const opponent = playingFor === 'x' ? 'o' : 'x'
    const moveResult = getResult(newBoard)
    if (moveResult) {
        if (moveResult === playingFor) return 1
        if (moveResult === opponent) return -1
        return 0
    }

    const nextMover = movePlayer === 'x' ? 'o' : 'x'
    
}