// add whatever parameters you deem necessary
function longestFall(nums) {
    if (nums.length === 0) return 0;
    let streak = 1;
    let maxStreak = 1;
    for(let i = 0; i < nums.length; i++) {
        if (nums[i] > nums[i + 1] && nums[i + 1] !== undefined) {
            streak++;
            if (streak > maxStreak) maxStreak = streak;
        } else {
            streak = 1;
        }
    }
    return maxStreak;
}

module.exports = longestFall;
