function isInteresting(number, awesomePhrases) {
    // for each number to check - n, n+1, n+2 - create an array of each digit
    // as a string, and put it in another array 'num' (for main number) or
    // 'closeNums' for the 2 close numbers to check. Do not add a number to its
    // final array if it is 99 or less.
    const num = tooSmall([number]).map((n) => n.toString().split(''))
    const closeNums = tooSmall([number + 1, number + 2]).map((n) => n.toString().split(''))
    
    // array of tests to run on each of the three numbers (n, n+1, n+2)
    const tests = [
        allZeros,
        allSame,
        isSequential,
        isPalindrome
    ]

    // 
    if (closeNums.length == 0 && num.length == 0) {
        return 0
    }
    if (num.length) {
        for (const fn of tests) {
            console.log(`testing real num against ${fn.name}; num[0] is:`)
            console.log(num[0])
            console.log(`allZeros(num[0]) returns ${allZeros(num[0])}`)
            if (fn(num[0])) {
                return 2
            }
        }
        if (awesomePhrases.includes(number)) {
            return 2
        }
    }
    for (const fn of tests) {
        if (fn(closeNums[0]) || fn(closeNums[1])) {
            return 1
        }
    }
    if ([number + 1, number + 2].some(closeNum => awesomePhrases.includes(closeNum))) {
        return 1
    }
    return 0
}

function isPalindrome(nArr) {
    const reversed = []
    nArr.forEach((digit) => reversed.unshift(digit))
    return nArr.every((digit, index) => digit === reversed[index] ? true : false)
}

function isSequential(nArr) {
    const increasing = '1234567890'.split('')
    const decreasing = '9876543210'.split('')
    let incIndex = increasing.indexOf(nArr[0])
    let decIndex = decreasing.indexOf(nArr[0])
    let inc = true
    let dec = true
    for (let i = 0; i < nArr.length; i++) {
        if (nArr[i] != increasing[incIndex]) {
            inc = false
        }
        if (nArr[i] != decreasing[decIndex]) {
            dec = false
        }
        incIndex++
        decIndex++
    }
    return inc || dec ? true : false
}

function allSame(nArr) {
    return nArr.every((digit) => digit === nArr[0]) ? true : false
}

function allZeros(nArr) {
    return nArr.slice(1).every(digit => digit == '0') ? true : false
}

function tooSmall(arr) {
    const newArr = []
    for (n of arr) {
        if (n > 99) {
            newArr.push(n)
        }
    }
    return newArr
}

console.log(isInteresting(100, []))