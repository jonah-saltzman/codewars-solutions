function isInteresting(number, awesomePhrases) {
	const num = tooSmall([number]).map((n) => n.toString().split(''))
	const closeNums = tooSmall([number + 1, number + 2]).map((n) =>
		n.toString().split('')
	)
	const tests = [allZeros, allSame, isSequential, isPalindrome]
	if (closeNums.length == 0 && num.length == 0) {
		return 0
	}
	if (
		(num.length && awesomePhrases.includes(number)) ||
		num.some((n) => tests.some((test) => test(n)))
	) {
		return 2
	}
	if (
		(closeNums.length &&
			[number + 1, number + 2].some((closeNum) =>
				awesomePhrases.includes(closeNum)
			)) ||
		closeNums.some((closeN) => tests.some((test) => test(closeN)))
	) {
		return 1
	}
	return 0
}

function isPalindrome(nArr) {
	const reversed = [...nArr].reverse()
	return nArr.every((digit, index) => digit === reversed[index])
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
	return inc || dec
}

function allSame(nArr) {
	return nArr.every((digit) => digit === nArr[0])
}

function allZeros(nArr) {
	return nArr.slice(1).every((digit) => digit == '0')
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