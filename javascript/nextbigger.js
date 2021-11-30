function nextBigger(n) {
    const permutations = permute(n);
    if (permutations.length == 0) {
        return -1;
    }
    const sorted = permutations.sort((x, y) => x - y);
    return sorted[0];
}

function permute(n) {
    const str = n.toString();
    let array = [];
    for (i in str) {
        for (j in str) {
            if (j == i) {
                continue;
            }
            const permutation = parseInt(swap(str, i, j));
            if (permutation > n && !array.includes(permutation)) {
                array.push(permutation);
            }
            const secondString = permutation.toString();
            for (x in secondString) {
                for (y in secondString) {
                    if (x == y) {
                        continue;
                    }
                    const secondPermutation = parseInt(swap(secondString, x, y));
                    if (secondPermutation > n && !array.includes(secondPermutation)) {
                        array.push(secondPermutation);
                    }
                }
            }
        }
    }
    return array;
}

function swap(string, i, j) {
    let array = [];
    for (c in string) {
        if (c == i) {
            array[c] = string[j];
        }
        else if (c == j) {
            array[c] = string[i];
        }
        else {
            array[c] = string[c];
        }
    }
    let newstring = "";
    for (c in array) {
        newstring += array[c];
    }
    return newstring;
}

  const n = 1234567890;
  const result = nextBigger(n);
  console.log("result: ")
  console.log(result);