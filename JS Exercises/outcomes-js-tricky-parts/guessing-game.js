function guessingGame() {
    const randNumber = Math.floor(Math.random() * 100);
    let count = 0;
    let game = true;
    return function guess(num) {
        if (!game) {
            return "The game is over, you already won!";
        }
        count++;
        if (num < randNumber) {
            return `${num} is too low!`;
        } else if (num > randNumber) {
            return `${num} is too high!`;
        } else if (num === randNumber) {
            game = false;
            return `You win! You found ${randNumber} in ${count} guesses.`;
            
        } else {
            return `${num} was not a valid number, please try again.`;
        }
    };
}

module.exports = { guessingGame };
