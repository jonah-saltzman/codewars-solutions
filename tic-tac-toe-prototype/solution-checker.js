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

const board = ['x', 'x', 'o', null, 'o', null, 'o', null, null]

function checkWinner(board, conditions) {
    for (const condition of conditions) {
        for (let i = 0; i < 3; i++) {
            if (board[condition[i]] && condition.every(pos => board[pos] === board[condition[0]])) {
                return [board[condition[0]], condition]
            }
        }
    }
    return false
}
console.log(checkWinner(board, conditions))