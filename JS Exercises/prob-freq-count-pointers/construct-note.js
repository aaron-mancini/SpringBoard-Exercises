// add whatever parameters you deem necessary
// function constructNote(str1, str2) {
//     let letters = str2.split("");
//     let msg = str1.split("");
//     for (let i = 0; i < msg.length; i++) {
//         if (!letters.includes(msg[i])){
//             return false;
//         } else {
//             letters.splice(0, 1);
//         }
//     }
//     return true;
// }

function constructNote(str1, str2) {
    let letters = createFrequencyCounter(str2.split(""));
    let msg = createFrequencyCounter(str1.split(""));
    
    for (let [key, value] of msg) {
        if (!letters.has(key)){
            return false;
        } else if (value > letters.get(key)){
            return false;
        }
        
    }
    return true;
}

function createFrequencyCounter(array) {
    let frequencies = new Map();
    for (let val of array) {
        let valCount = frequencies.get(val) || 0;
        frequencies.set(val, valCount + 1);
    }
    
    return frequencies;
}

constructNote("abc", "abc")

module.exports = constructNote;