// function filterOutOdds() {
//     var nums = Array.prototype.slice.call(arguments);
//     return nums.filter(function(num) {
//       return num % 2 === 0
//     });
//   }

const filterOutOdds = (...nums) => nums.filter(num => num % 2 === 0);

// findMin

const findMin = (...nums) => Math.min(...nums);

// mergeObjects({a:1, b:2}, {c:3, d:4}) // {a:1, b:2, c:3, d:4}

const mergeObjects = (a, b) => ({...a, ...b});

// doubleAndReturnArgs([1,2,3],4,4) // [1,2,3,8,8]
// doubleAndReturnArgs([2],10,4) // [2, 20, 8]

function doubleAndReturnArgs(arr, ...nums) {
    const doubledNums = nums.map(num => num * 2);
    return [...arr, ...doubledNums];
}

/** remove a random element in the items array
and return a new array without that item. */

function removeRandom(items) {
const randomNumber = Math.floor(Math.random() * items.length - 1);
const newArray = items.splice(randomNumber, 1);
return [...newArray];
}

/** Return a new array with every item in array1 and array2. */

function extend(array1, array2) {
    return [...array1, ...array2];
}

/** Return a new object with all the keys and values
from obj and a new key/value pair */

function addKeyVal(obj, key, val) {
    return {...obj, [key]: value};
}


/** Return a new object with a key removed. */

function removeKey(obj, key) {
    let newObject = {...obj};
    delete newObject[key];
    return newObject;
}


/** Combine two objects and return a new object. */

function combine(obj1, obj2) {
    return (obj1, obj2) => ({...obj1, ...obj2});
}


/** Return a new object with a modified key and value. */

function update(obj, key, val) {
    let newObj = {...obj};
    newObj[key] = val;
    return newObj;
}