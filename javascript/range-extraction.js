function solution(list) {
    const result = []
    for (let i = 0; i < list.length; i++) {
        const nextConsecutives = countConsecutive(i, list)
        if (nextConsecutives >= 2) {
            const consecutiveGroup = []
            for (let j = i; j <= i + nextConsecutives; j++) {
                consecutiveGroup.push(list[j])
            }
            result.push(consecutiveGroup)
            i = i + nextConsecutives
        }
        else {
            result.push(list[i])
        }
    }
    let string = ""
    for (const element of result) {
        if (Array.isArray(element)) {
            string += `${element[0]}-${element[element.length - 1]},`
        }
        else {
            string += `${element},`
        }
    }
    return string.slice(0, string.length - 1)
}

function countConsecutive(index, list) {
    let counter = 0
    for (let i = index; i < list.length; i++) {
        if (list[i] + 1 === list[i + 1]) {
            counter++
        }
        else {
            return counter
        }
    }
    return counter
}

const list = [
	-6
]

//consecutivecount = 4
//i1 = 1
//i2 = 5

console.log(solution(list))