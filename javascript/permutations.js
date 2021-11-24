function permutations(string) {
    const results = generateArrays(string.split(''))
    const strings = []
    results.forEach(array => {
        const temp = array.join('')
        if (!strings.includes(temp)) strings.push(temp)
    })
    return strings
}

function generateArrays(array) {
    const result = []
    if (array.length === 0) return []
    if (array.length === 1) return [array]
    for (let i = 0; i < array.length; i++) {
        const movingElements = array.slice(0, i).concat(array.slice(i + 1))
        generateArrays(movingElements).forEach(permutation => result.push([array[i]].concat(permutation)))
    }
    return result
}

// driver code
console.log(permutations('aabb'))