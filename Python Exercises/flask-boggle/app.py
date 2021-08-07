from boggle import Boggle
from flask import Flask, render_template, session, jsonify

boggle_game = Boggle()
app = Flask(__name__)

app.config['SECRET_KEY'] = 'thisisabadkey'



@app.route('/')
def home():
    """sets the game board and returns a html template with the game"""
    board = boggle_game.make_board()
    session['board'] = board
    return render_template('home.html', board=board)

@app.route('/check/<guess>')
def check_word(guess):
    """checks the guessed word with the check_valid_word function from the Boggle class"""
    board = session['board']
    result = boggle_game.check_valid_word(board, guess)
    response = jsonify({"result":result})
    return response

@app.route('/game_over/<int:score>')
def stats(score):
    """sets the high score and the play count"""
    high_score = session.get("high_score", 0)
    if score > high_score:
        high_score = score
        session['high_score'] = score
    play_count = session.get('play_count', 0)
    play_count += 1
    session['play_count'] = play_count
    response = jsonify({'play_count':play_count, 'high_score':high_score})
    return response