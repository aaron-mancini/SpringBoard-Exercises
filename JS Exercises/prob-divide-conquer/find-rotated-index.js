function findRotatedIndex(array, num) {
    let rightIdx = array.length - 1;

    let largestIdx = findLargestNum(array);

    if (array[largestIdx] === num) {
        return largestIdx;
    } else if ((num < array[largestIdx]) && (num >= array[0])) {
        return binarySearch(array, 0, largestIdx - 1, num);
    } else if ((num < array[largestIdx]) && (num < array[rightIdx])) {
        return binarySearch(array, largestIdx + 1, rightIdx, num);
    } else {
        return -1;
    }
}

function binarySearch(array, left, right, num) {
    let leftIdx = left;
    let rightIdx = right;

    while (leftIdx <= rightIdx) {
        let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
        
        if (array[middleIdx] === num) {
            return middleIdx;
        } else if (array[middleIdx] > num) {
            rightIdx = middleIdx - 1;
        } else {
            leftIdx = middleIdx + 1;
        }
    }
    return -1;
}

function findLargestNum(array) {
    if (array.length === 1 || array[0] < array[array.length - 1]) return 0;
    let leftIdx = 0;
    let rightIdx = array.length - 1;

    while (leftIdx <= rightIdx) {
        let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
        let middleVal = array[middleIdx];
        let nextVal = array[middleIdx + 1];

        if (middleVal > nextVal) {
            return middleIdx;
        } else if (array[leftIdx] <= middleVal) {
            leftIdx = middleIdx + 1;
        } else {
            rightIdx = middleIdx - 1;
        }
    }
}




module.exports = findRotatedIndex