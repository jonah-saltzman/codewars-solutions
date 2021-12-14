const correct5 = [
	[1, 1, 1, 1, 1],
	[0, 0, 0, 0, 1],
	[1, 1, 1, 0, 1],
	[1, 0, 0, 0, 1],
	[1, 1, 1, 1, 1],
]

const correct8 = [
	[1, 1, 1, 1, 1, 1, 1, 1],
	[0, 0, 0, 0, 0, 0, 0, 1],
	[1, 1, 1, 1, 1, 1, 0, 1],
	[1, 0, 0, 0, 0, 1, 0, 1],
	[1, 0, 1, 0, 0, 1, 0, 1],
	[1, 0, 1, 1, 1, 1, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 1],
	[1, 1, 1, 1, 1, 1, 1, 1],
]

function spiralize(size) {

}

function right(size, start, array, done) {
    let [ y, x ] = [ start[0], start[1] ]
    // if ()
    if (x + 1 >= size || array[y][x + 2] === 1) {
        
    }
    [ y, x ] = [ y, x + 1 ]
    
}

function checkDone(position, array, direction) {
    let [ x, y ] = [ position[0], position[1] ]
    if (direction === 'right') {
        if (array[y + 1][x] || array[y][x + 1] || array[y - 1][x]) {
            return true
        }
        return false
    }
}