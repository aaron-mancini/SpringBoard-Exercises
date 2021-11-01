function countZeroes(array) {
    let leftIdx = 0;
    let rightIdx = array.length - 1;

    while (leftIdx <= rightIdx) {
        let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
        let middleVal = array[middleIdx];
        let leftNeighbor = array[middleIdx - 1];

        if (middleVal === 1) {
            leftIdx = middleIdx + 1;
        } else if (leftNeighbor === 0) {
            rightIdx = middleIdx - 1;
        } else {
            return array.length - middleIdx;
        }

    }
    return 0;
}


module.exports = countZeroes