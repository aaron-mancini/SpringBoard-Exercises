function bubbleSort(arr) {
    let shifted = true;
    while (shifted) {
        shifted = false;
        let i = 0
        for (let j = 0; j < arr.length - i; j++) {
            let current = arr[j];
            if (arr[j] > arr[j + 1]) {
                arr[j] = arr[j + 1];
                arr[j + 1] = current;
                shifted = true;
            }
        }
        i++;
    }
    return arr;
}

module.exports = bubbleSort;