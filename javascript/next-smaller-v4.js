function nextSmaller(n) {
    const digits = n.toString().split('').map(str => parseInt(str))
    let indexOfX
    let found
    for (let i = digits.length - 2; i >= 0; i--) {
        found = false
        for (let j = i + 1; j < digits.length; j++) {
            if (digits[j] < digits[i]) {
                indexOfX = i
                found = true
                break
            }
        }
        if (found) break
    }
    if (!found) return -1
    let indexOfY = false
    for (let i = indexOfX + 1; i < digits.length; i++) {
        if (digits[i] < digits[indexOfX] && !indexOfY ||
        digits[i] < digits[indexOfX] && digits[i] > digits[indexOfY]) indexOfY = i
    }
    if (!indexOfY) return -1
    const swapped = []
    digits.forEach((digit, index) => {
        if (index === indexOfX) swapped[index] = digits[indexOfY]
        else if (index === indexOfY) swapped[index] = digits[indexOfX]
        else swapped[index] = digit
    })
    const sorted = swapped.slice(0, indexOfX + 1).concat(swapped.slice(indexOfX + 1).sort((a, b) => b - a))
    return sorted[0] == 0 ? -1 : parseInt(sorted.join(''))
}

console.log(nextSmaller(1027))