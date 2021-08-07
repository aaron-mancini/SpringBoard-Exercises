class Boggle {
    constructor() {
        this.score = 0;
        this.correctWords = [];
        this.timer = 60;
        this.count = 0;

        this.gameTimer = setInterval(this.timeClock.bind(this), 1000)

        $('form').on('submit', this.handleSubmit.bind(this))
    }

    async timeClock(){
        if (this.count >= this.timer){
            clearInterval(this.gameTimer);
            $('#game_info').hide();
            await this.statistics();
        }
        $('#timer').val(this.timer - this.count)
        this.count += 1;
    }

    async handleSubmit(e){
        e.preventDefault();
        $('#result').empty();
        const guess = $('#guess').val()
        if (this.correctWords.includes(guess)){
            $('#result').append(`<div>Already guessed that word!</div>`)
            $('form').trigger("reset");
            return
        }
        this.checkWord(guess);
        $('form').trigger("reset");
    }

    async checkWord(guess) {
        const res = await axios.get(`http://127.0.0.1:5000/check/${guess}`)
        $('#result').append(`<div>${res.data.result}</div>`)
        this.setScore(res.data.result, guess);
    }

    setScore(result, guess) {
        if (result === 'ok') {
            this.score += guess.length
            $('#score').text(this.score)
            this.correctWords.push(guess)
        }
    }

    async statistics(){
        const res = await axios.get(`http://127.0.0.1:5000/game_over/${this.score}`)
        $('#content').append(`
                            <div id="high_score">
                                High Score: ${res.data.high_score}
                            </div>
                            <div>
                                Play Count: ${res.data.play_count}
                            </div>
        `)
    }
}



