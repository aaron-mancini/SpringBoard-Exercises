/** product: calculate the product of an array of numbers. */

function product(nums, i=0) {
  if (i === nums.length) return 1;

  return nums[i] * product(nums, i + 1);
}

/** longest: return the length of the longest word in an array of words. */

function longest(words) {
  let longest = "";

  function _longest(words, i) {
    if (words.length === i) return;
    if (words[i].length > longest.length) longest = words[i];
    _longest(words, i + 1);
  }

  _longest(words, 0);
  return longest.length;
}

/** everyOther: return a string with every other letter. */

function everyOther(str) {
  let evOther = [];

  function _everyOther(str, i) {
    if (str.length === i) return;
    if (i % 2 === 0) evOther.push(str[i]);
    _everyOther(str, i + 1);
  }

  _everyOther(str, 0);
  return evOther.join("");
}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str) {
  let check = true;

  function _isPalindrome(str, i, j) {
   
    if (str[i] !== str[j]) {
      check = false;
      return;
    }
    if (j <= i) return;

    _isPalindrome(str, i + 1, j - 1);
    
  }

  _isPalindrome(str, 0, str.length - 1);

  return check;
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val) {
  let index = -1;

  function _findIndex(arr, val, i) {
    if (i === arr.length) return;
    if (arr[i] === val) {
      index = i;
      return;
    }
    _findIndex(arr, val, i + 1);
  }
  _findIndex(arr, val, 0)
  return index;
}

/** revString: return a copy of a string, but in reverse. */

function revString(str) {
  let reverse = [];

  function _revString(str, i) {
    if (i === -1) return;
    reverse.push(str[i]);
    _revString(str, i - 1);
  }
  _revString(str, str.length - 1);
  return reverse.join("");
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj) {
  let strings = [];

  function _gatherStrings(obj) {
    for (let [key, val] of Object.entries(obj)) {
      if (typeof val === "object") {
        _gatherStrings(val);
      }
      if (typeof val === "string") {
        strings.push(val);
      }
    }
  }
  _gatherStrings(obj);

  return strings;
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val) {
  let index = -1;

  function _binarySearch(arr, val, start, end) {
    let middleIdx = Math.floor((start + end) / 2);
    if (arr[middleIdx] === val) {
      index = middleIdx;
      return;
    } else if (arr[middleIdx] > val) {
      _binarySearch(arr, val, start, middleIdx - 1);
    } else if (arr[middleIdx] < val) {
      _binarySearch(arr, val, middleIdx + 1, start);
    } else {
      return;
    }
  }

  _binarySearch(arr, val, 0, arr.length - 1);

  return index;
}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch
};
