// function doAllMath(a, b, mathFuncs) {
//     for (let func of mathFuncs) {
//         func(a, b);
//     }
// }

function addOne(num){
    return num + 1;
};

const numbers = [1, 2, 3];

function myForEach(arr, func) {
    for(let element of arr){
        func(element);
    };
};

myForEach(numbers, addOne);