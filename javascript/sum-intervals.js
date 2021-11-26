function sumIntervals(intervals) {
    if (intervals.length === 0) {
        return 0
    }
    let result = getIntervals(intervals)
    while (true) {
        let tempResult = getIntervals(result)
        if (result.length === tempResult.length) {
            break
        }
        result = tempResult
    }
    let sum = 0
    result.forEach(interval => sum += interval[1] - interval[0])
    return sum
}

function getIntervals(intervals) {
    const sorted = intervals.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0])
    const nonOverlap = []
    let i = 0
    while (i < sorted.length) {
        let j = i
        if (j + 1 < sorted.length) {
            while (sorted[j][0] === sorted[j + 1][0]) {
                j++
                if (j === sorted.length - 1) break
            }
        }
        let k = j
        if (k + 1 < sorted.length) {
            while (sorted[k + 1][0] < sorted[j][1]) {
                k++
                if (k === sorted.length - 1) break
            }
        }
        sorted[k][1] <= sorted[j][1] ? 
        nonOverlap.push([sorted[j][0], sorted[j][1]]) : 
        nonOverlap.push([sorted[j][0], sorted[k][1]])
        if (k === sorted.length - 2) {
            nonOverlap.push([sorted[k + 1][0], sorted[k + 1][1]])
            break
        }
        i = k + 1
    }
    return nonOverlap
}

const intervals = [
	[1, 2],
	[6, 10],
	[11, 15],
]

console.log(sumIntervals(intervals))