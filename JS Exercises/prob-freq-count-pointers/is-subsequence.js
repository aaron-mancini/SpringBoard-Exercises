// add whatever parameters you deem necessary
function isSubsequence(str1, str2) {
    if (str1.length > str2.length) return false;
    let count = 0;
    for (let letter of str2) {
        if (letter === str1[count]) count++;
        if (count === str1.length) return true;
    }
    return false;
}

module.exports = isSubsequence;
