from flask import Flask, request, render_template, redirect, flash, session
from surveys import satisfaction_survey

app = Flask(__name__)

app.config['SECRET_KEY'] = 'ilikewow'

responses = []

@app.route('/')
def survey_start():
    responses.clear()
    return render_template('survey.html', title=satisfaction_survey.title, instructions=satisfaction_survey.instructions)

@app.route('/start_survey', methods=['GET', 'POST'])
def start_survey():
    session['responses'] = []
    return redirect('/questions/0')

@app.route('/questions/<int:num>')
def questions(num):
    if num != len(responses):
        flash('You tried to access a question out of order')
        return redirect(f'/questions/{len(responses)}')
    current_question = satisfaction_survey.questions[num]
    return render_template('questions.html', question_num=num, question=current_question.question, choices=current_question.choices)

@app.route('/answers/<int:num>', methods=["GET"])
def answers(num):
    response = session['responses']
    response.append(request.args['answer'])
    session['responses'] = response
    answer = request.args['answer']
    responses.append(answer)
    if len(responses) == len(satisfaction_survey.questions):
        return redirect('/thankyou')
    return redirect(f'/questions/{num + 1}')

@app.route('/thankyou')
def thankyou():
    return render_template('thankyou.html', answers=responses)