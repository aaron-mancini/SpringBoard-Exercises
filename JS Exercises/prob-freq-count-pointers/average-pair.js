// add whatever parameters you deem necessary
function averagePair(arr, avg) {
    if (arr.length < 2) {
        return false;
    }
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        let average = arr[left] + arr[right] / 2;
    
        if (average === avg) {
            return true;
        } else if (average > avg) {
            right--;
        } else {
            left++;
        }
    }
    return false;
}



module.exports = averagePair;
