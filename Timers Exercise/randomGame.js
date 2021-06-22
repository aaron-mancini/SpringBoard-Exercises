function randomGame() {
    const randomNumber = function() {
        return Math.floor(Math.random() * 100)
    }
    let counter = 0;
    let randomizer = setInterval(() => {
        let currentNumber = randomNumber();
        counter++;
        if (currentNumber > 75) {
            clearInterval(randomizer);
            console.log(counter);
        }
    }, 1000);
}
