// add whatever parameters you deem necessary
function separatePositive(numArray) {
    let left = 0;
    let right = numArray.length - 1;
    while(left < right) {
        if (numArray[left] < 0) {
            let num = numArray[left];
            numArray.splice(left, 1);
            numArray.push(num);
            right--;
        } else {
            left++;
        }
    }
    return numArray;
}



module.exports = separatePositive;
