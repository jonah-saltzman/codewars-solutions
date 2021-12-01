function generateHashtag (str) {
    const regex = /[^\s]+/g;
    let words = str.match(regex);
    if (!words){
        return false;
    }
    let uppercased = [];
    let index = 0;
    for (word of words){
        let upperword = "";
        for (i in word){
            if (i == 0){
                upperword += word[i].toUpperCase();
            }
            else {
                upperword += word[i];
            }
        }
        uppercased[index] = upperword;
        index++;
    }
    let result = "#";
    for (word of uppercased){
        result += word;
    }
    if (result.length > 140 || result.length < 2){
        return false;
    }
    return result;
}


let str = "Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Cat";
result = generateHashtag(str);
console.log(result);