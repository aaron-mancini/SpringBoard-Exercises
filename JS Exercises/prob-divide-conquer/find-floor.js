function findFloor(array, num) {
    let leftIdx = 0;
    let rightIdx = array.length - 1;

    while (leftIdx <= rightIdx) {
        let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
        let middleVal = array[middleIdx];

        if (middleVal > num) {
            rightIdx = middleIdx - 1;
        } else if (middleVal < num && array[middleIdx + 1] < num) {
            leftIdx = middleIdx + 1;
        } else {
            return array[middleIdx];
        }

    }
    return -1;
}

module.exports = findFloor