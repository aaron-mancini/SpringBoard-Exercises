from flask import Flask, request, render_template
from stories import Story, story1, story2

app = Flask(__name__)

@app.route('/')
def mad_libs():
    stories = [story1, story2]
    return render_template('home.html', stories=stories)

@app.route('/story_form/<story>')
def story_form(story):
    the_story = eval(story)
    return render_template('form.html', story=the_story.prompts,  story_title=the_story.title)

@app.route('/story/<story>')
def create_madlib(story):
    the_story = eval(story)
    answers = {}
    for prompt in the_story.prompts:
        answers[prompt] = request.args.get(f'{prompt}')
    madlib = the_story.generate(answers)
    return render_template('story.html', your_story=madlib)