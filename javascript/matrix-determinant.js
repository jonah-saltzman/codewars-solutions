function determinant(m) {
    if (m.length === 1) return m[0][0]
    let det = 0
    for (let x = 0; x < m.length; x++) {
        if (x % 2 == 0) det += m[0][x] * determinant(getMinor(x, m))
        else det -= m[0][x] * determinant(getMinor(x, m))
    }
    return det
}

function getMinor(index, matrix) {
    const newN = matrix.length - 1
    const minor = []
    for (let i = 0; i < matrix.length - 1; i++) {
        minor.push([])
    }
    let yMinor = 0
    let xMinor = 0
    for (let y = 1; y < matrix.length; y++) {
        for (let x = 0; x < matrix.length; x++) {
            if (x === index) continue
            else {
                minor[yMinor][xMinor] = matrix[y][x]
                xMinor + 1 === matrix.length - 1 ? (xMinor = 0, yMinor++) : xMinor++
            }
        }
    }
    return minor
}

const small = [
	[1, 2, 4],
	[4, 5, 6],
    [7, 8, 9]
]
console.log(determinant(small))