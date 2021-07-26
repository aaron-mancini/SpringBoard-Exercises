// Quick Question 1

{1,2,3,4}

// Quick Question 2

'ref'

// Quick Question 3

// {[1,2,3]: true, [1,2,3]: false}

// hasDuplicate

function hasDuplicate(arr) {
    const noDuplicates = new Set(arr);
    console.log(noDuplicates);
    if (noDuplicates.size < arr.length) {
        return true;
    } else {
        return false;
    }
}

// vowelCount

function vowelCount(string) {
    let counter = new Map();
    const vowels = 'aeiou'
    for (let char of string){
        if (vowels.includes(char)){
            if(counter.has(char)){
                let charCount = counter.get(char);
                counter.set(char, charCount + 1)
            } else {
                counter.set(char, 1)
            }
        }
    }
    return console.log(counter);
}

vowelCount('awesome');