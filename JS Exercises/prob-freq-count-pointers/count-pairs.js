// add whatever parameters you deem necessary
function countPairs(array, num) {
    count = 0;
    for(let i = 0; i < array.length; i++) {
        for(let j = i + 1; j < array.length; j++) {
            if (array[i] + array[j] === num) {
                count++;
            }
        }
    }

    return count;
}

module.exports = countPairs;