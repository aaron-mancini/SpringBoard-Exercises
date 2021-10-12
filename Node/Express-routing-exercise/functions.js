function findMode(nums) {
        let count = {};
        let max = 0;
        let mode = new Set();
        for (let i = 0; i < nums.length; i++) {
            const num = nums[i];
            if (count[num]) {
                count[num]++;
            } else {
                count[num] = 1;
            }
            
            if (max < count[num]) {
                max = count[num];
            }
        }
        for (let i = 0; i < nums.length; i++) {
            const num = nums[i];
            if (count[num] === max) {
                mode.add(num);
            }
        }
        return Array.from(mode);
}

function findMean(nums) {
    let sum = nums.reduce((prevNum, currNum) => prevNum + currNum);
    let mean = sum / nums.length;
    return mean;
}

function findMedian(nums) {
    let median;
    nums = nums.sort((a,b) => a-b);
    if (nums.length % 2 === 0) {
        let p1 = nums[nums.length/2 - 1];
        let p2 = nums[nums.length/2];
        median = (p1 + p2) / 2;
    } else {
        median = nums[(nums.length + 1)/2 - 1];
    };
    return median;
}


module.exports = {
    findMode,
    findMean,
    findMedian
};