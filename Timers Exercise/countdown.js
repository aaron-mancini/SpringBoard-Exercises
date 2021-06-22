function countDown(num) {
    let count = 1;
    for (let i = num; i >= 0; i--) {
        if (i === 0) {
            setTimeout(function() {
                console.log("DONE!")
            }, count * 1000)
            
        } else {
            setTimeout(function() {
                console.log(i)
            }, count * 1000)
        }
        count++
    }
}