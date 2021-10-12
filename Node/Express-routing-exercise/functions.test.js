const { findMode, findMean, findMedian } = require('./functions');


let nums1;
let nums2

beforeAll(function() {
    nums1 = [1,2,2,2,4,5,5]
    nums2 = [1,1,1,2,3,4,5,8]
})

describe("test findMean", function() {
    

    test("function should return Mean", function() {

        let test = findMean(nums1);
        expect(test).toEqual(3);
    })
})

describe("test findMedian", function() {

    test("function should return Median when array count is odd", function() {
        let test = findMedian(nums1);
        expect(test).toEqual(2);
    })

    test("function should return Median when array count is even", function() {
        let test = findMedian(nums2);
        expect(test).toEqual(2.5);
    })
    
})

describe("test findMode", function() {
    
    test("function should return Median when array count is odd", function() {
        let test = findMode(nums1);
        expect(test).toEqual([2]);
    })
})