const crypto = require('crypto')

// generate 5x5 tic-tac-toe hash table

exports.genTable = function() {
    const table = []

    // 25 board spaces x 2 pieces
    for (let i = 0; i < 25; i++) {
        table.push([])
        for (let j = 0; j < 2; j++) {
            table[i][j] = parseInt(crypto.randomBytes(8).toString('hex'), 16)
        }
    }
    return table
}

// Hash a board given a board and a table

exports.hashBoard = function(board, table) {
    let hash = 0
    for (let i = 0; i < 25; i++) {
        if (board[i]) {
            const j = board[i] === 'x' ? 0 : 1
            hash = (hash ^ table[i][j])
        }
    }
    return hash
}