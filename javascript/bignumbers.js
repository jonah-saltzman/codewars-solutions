// Javascript code sample

// Project instructions (Codewars):

// Write a function that returns the sum of two numbers. The input numbers are strings and the function must return a string.

// Notes: 
// The input numbers are ***big***.
// The input is a string of only digits
// The numbers are positives

// https://www.codewars.com/kata/525f4206b73515bffb000b21


function add(a, b) {

    // set length to one longer than the longer of a or b
    let length = null;
    if (a.length > b.length) {
        length = a.length + 1;
    }
    else {
        length = b.length + 1;
    }

    // generate arrays for digits of a and b, for tracking carried columns,
    // and for the resulting sum (all of equal length with leading zeros)
    let arrayA = generateArray(a, length);
    let arrayB = generateArray(b, length);
    let carrying = generateArray(0, length);
    let result = generateArray(0, length);

    // add digit from a to corresponding digit from b and store in result array
    // if result is more than 9, store final digit in result array and incrememt 
    // the carrying array one place to the left
    for (let i = length - 1; i >= 0; i--) {
        let temp = arrayA[i] + arrayB[i];
        if (temp <= 9) {
            result[i] = temp;
        }
        else {
            result[i] = parseInt(temp.toString().slice(1));
            carrying[i - 1]++;
        }
    }

    // carry the ones
    let array = carry(result, carrying);

    // generate string from digits in results array
    let str = "";
    for (i in array) {
        str += array[i].toString();
    }
    
    // return the resulting string stripped of leading zeros
    return removeZeros(str);
}

function removeZeros(str) {

    // determine index of last leading zero
    let index = 0;
    for (i in str) {
        if (str[i] == "0") {
            index++;
        }
        else {
            break;
        }
    }

    //return the string with leading zeros sliced
    return str.slice(index);
}

function carry(result, carrying) {

    //starting with rightmost digit, carry the ones if they exist
    for (let i = result.length - 1; i >= 0; i--) {
        if (carrying[i] == 1) {
            let temp = result[i] + carrying[i];
            carrying[i]--
            if (temp <= 9) {
                result[i] = temp;
            }
            else {
                result[i] = 0;
                carrying[i - 1]++
            }
        }
    }

    // if there are no  more ones to carry, return the result
    if (zeroed(carrying)) {
        return result;
    }

    // otherwise, continue carrying until all ones are carried
    else {
        return carry(result, carrying);
    }
}

// function for determining if all ones have been carried
function zeroed(array) {
    for (i in array.length) {
        if (array[i] != 0) {
            return false;
        }
    }
    return true;
}

// function to generate arrays of digits given a string
// adding leading zeros if necessary
function generateArray(nStr, length) {
    let array = [];
    for (i in nStr) {
        array[i] = parseInt(nStr[i]);
    }
    while (true) {
        if (array.length == length) {
            break;
        }
        array.unshift(0);
    }
    return array;
}
