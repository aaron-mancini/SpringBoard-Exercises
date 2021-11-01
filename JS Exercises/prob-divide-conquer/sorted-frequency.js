function sortedFrequency(array, num) {
    let firstNum = findFirst(array, num);
    if (firstNum === -1) return -1;
    let lastNum = findLast(array, num);
    return lastNum - firstNum + 1;
}

function findFirst(array, num) {
    let leftIdx = 0;
    let rightIdx = array.length - 1;

    while (leftIdx <= rightIdx) {
        let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
        let middleVal = array[middleIdx];
        let leftNeighbor = array[middleIdx - 1];

        if (middleVal < num) {
            leftIdx = middleIdx + 1;
        } else if (middleVal > num) {
            rightIdx = middleIdx - 1;
        } else if (leftNeighbor === num) {
            rightIdx = middleIdx - 1;
        } else {
            return middleIdx;
        }

    }
    return -1;
}

function findLast(array, num) {
    let leftIdx = 0;
    let rightIdx = array.length - 1;

    while (leftIdx <= rightIdx) {
        let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
        let middleVal = array[middleIdx];
        let rightNeighbor = array[middleIdx + 1];

        if (middleVal < num) {
            leftIdx = middleIdx + 1;
        } else if (middleVal > num) {
            rightIdx = middleIdx - 1;
        } else if (rightNeighbor === num) {
            leftIdx = middleIdx + 1;
        } else {
            return middleIdx;
        }

    }
    return -1;
}

module.exports = sortedFrequency