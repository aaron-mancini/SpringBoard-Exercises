from flask import Flask, render_template, redirect, session, flash
from flask_debugtoolbar import DebugToolbarExtension
from models import connect_db, db, User, Feedback
from forms import UserForm, LoginForm, FeedbackForm
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres542973@localhost:5432/feedback'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True
app.config["SECRET_KEY"] = "abc123"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

connect_db(app)

# toolbar = DebugToolbarExtension(app)

@app.route('/')
def home():
    if 'user_id' not in session:
        return redirect('/register')
    user = User.query.get_or_404(session['user_id'])
    return redirect(f'/users/{user.username}')

@app.route('/register', methods=["GET", "POST"])
def register():
    """Show a for to register and create a user. Username, password, email, firstname, lastname."""
    form = UserForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        email = form.email.data
        first_name = form.first_name.data
        last_name = form.last_name.data
        new_user = User.register(username, password, email, first_name, last_name)
        
        db.session.add(new_user)
        try:
            db.session.commit()
        except IntegrityError:
            form.username.errors.append('Username taken. Please pick another')
            return render_template('register.html', form=form)
        session['user_id'] = new_user.id
        flash('Welcome! Account Created!')
        return redirect(f'/users/{new_user.username}')
    return render_template('register.html', form=form)

@app.route('/login', methods=["GET", "POST"])
def login_user():
    form = LoginForm()
    
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        user = User.authenticate(username, password)
        if user:
            session['user_id'] = user.id
            return redirect(f'/users/{user.username}')
        else:
            form.username.errors = ["Invalid username/password"]
    
    return render_template('login.html', form=form)

@app.route('/users/<username>')
def user_info(username):
    """Display a users info and show their submitted feedback."""
    if 'user_id' not in session:
        return redirect('/login')
    user = User.query.filter_by(username=username).first()
    if user:
        feedback = Feedback.query.filter_by(user_id=user.id).all()
        return render_template('user_info.html', user=user, feedback=feedback)
    else:
        return redirect('/login')

@app.route('/logout')
def logout_user():
    session.pop('user_id')
    return redirect('/')

@app.route('/users/<username>/delete')
def delete_user(username):
    user = User.query.get_or_404(session['user_id'])
    if user.username != username:
        return redirect('/')
    db.session.delete(user)
    db.session.commit()
    session.pop('user_id')
    return redirect('/')

    

# Feedback routes

@app.route('/users/<username>/feedback/add', methods=["GET", "POST"])
def add_feedback(username):
    """Show a feedback form to allow logged in users to submit feedback."""
    if 'user_id' not in session:
        return redirect('/login')
    form = FeedbackForm()
    user = User.query.filter_by(username=username).first()
    if form.validate_on_submit():
        title = form.title.data
        content = form.content.data

        new_feedback = Feedback(title=title, content=content, user_id=user.id)
        db.session.add(new_feedback)
        db.session.commit()
        return redirect(f'/users/{username}')
    return render_template('feedback_form.html', form=form)

@app.route('/feedback/<int:feedback_id>/update', methods=["GET", "POST"])
def update_feedback(feedback_id):
    """Shows a form where a user can edit their feedback."""
    if 'user_id' not in session:
        return redirect('/login')
    feedback = Feedback.query.get_or_404(feedback_id)
    form = FeedbackForm(obj=feedback)
    if feedback.user_id != session['user_id']:
        return redirect('/login')
    user_id = session['user_id']
    user = User.query.get_or_404(user_id)
        
    if form.validate_on_submit():
        feedback.title = form.title.data
        feedback.content = form.content.data
        db.session.commit()
        return redirect(f'/users/{user.username}')

    return render_template('feedback_form.html', form=form)

@app.route('/feedback/<int:feedback_id>/delete', methods=["POST", "GET"])
def delete_feedback(feedback_id):
    """Deletes a users feedback"""
    if 'user_id' not in session:
        return redirect('/login')
    feedback = Feedback.query.get_or_404(feedback_id)
    if feedback.user_id != session['user_id']:
        return redirect('/login')
    db.session.delete(feedback)
    db.session.commit()
    user_id = session['user_id']
    user = User.query.get_or_404(user_id)
    return redirect(f'/users/{user.username}')
    