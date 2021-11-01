function findRotationCount(array) {
    let smallestIdx = findSmallestNum(array);
    return smallestIdx;
}

function findSmallestNum(array) {
    if (array.length === 1 || array[0] < array[array.length - 1]) return 0;
    let leftIdx = 0;
    let rightIdx = array.length - 1;

    while (leftIdx <= rightIdx) {
        let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
        let middleVal = array[middleIdx];
        let nextVal = array[middleIdx + 1];

        if (middleVal > nextVal) {
            return middleIdx + 1;
        } else if (array[leftIdx] <= middleVal) {
            leftIdx = middleIdx + 1;
        } else {
            rightIdx = middleIdx - 1;
        }
    }
}

module.exports = findRotationCount