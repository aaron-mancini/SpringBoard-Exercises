"""Blogly application."""

from flask import Flask, request, redirect, render_template
from models import db, connect_db, User

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres542973@localhost:5432/blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

connect_db(app)
# db.create_all()

from flask_debugtoolbar import DebugToolbarExtension
app.config['SECRET_KEY'] = 'SHHHHH'
debug = DebugToolbarExtension(app)

@app.route('/')
def home():
    

    return redirect('/users')

@app.route('/users')
def users():
    """List users and show create user button"""

    users = User.query.all()
    return render_template('users.html', users=users)

@app.route('/users/new')
def create():
    return render_template('createusers.html')

@app.route('/users/new', methods=['POST'])
def add_user():

    first_name = request.form['first_name']
    last_name = request.form['last_name']
    image_url = request.form['image_url']

    user = User(first_name=first_name, last_name=last_name, image_url=image_url)
    db.session.add(user)
    db.session.commit()

    return redirect(f"/users/{user.id}")

@app.route('/users/<int:user_id>')
def show_user(user_id):
    """Show info on a single user"""

    user = User.query.get_or_404(user_id)
    return render_template('detail.html', user=user)

@app.route('/users/<int:user_id>/edit')
def edit_user(user_id):
    user = User.query.get_or_404(user_id)
    return render_template('edit.html', user=user)
    

@app.route('/users/<int:user_id>/edit', methods=['POST'])
def update_user(user_id):

    first_name = request.form['first_name']
    last_name = request.form['last_name']
    image_url = request.form['image_url']

    user = User.query.get_or_404(user_id)
    user.edit(first_name, last_name, image_url)
    db.session.commit()
    
    return redirect(f'/users/{user_id}')

@app.route('/users/<int:user_id>/delete', methods=['POST', 'GET'])
def delete_user(user_id):
    user = User.query.filter_by(id=user_id).delete()
    db.session.commit()
    return redirect('/users')