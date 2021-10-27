// add whatever parameters you deem necessary
function sameFrequency(num1, num2) {
    let num1Freq = frequencyCounter(num1.toString().split(""));
    let num2Freq = frequencyCounter(num2.toString().split(""));
    if (num1Freq.size() !== num2Freq.size()) return false;
    for (let [num, freq] of num1Freq) {
        if (!num2Freq.has(num)) {
            return false;
        } else if (num2Freq.get(num) !== freq) {
            return false;
        }
    }
    return true;
}

function frequencyCounter(array) {
    let frequencies = new Map();

    for (let val of array) {
        let valCount = frequencies.get(val) || 0;
        frequencies.set(val, valCount + 1);
    }
    return frequencies;
}

module.exports = sameFrequency;