"""Blogly application."""

from flask import Flask, request, redirect, render_template
from models import db, connect_db, User, Post, Tag

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
    posts = Post.query.filter_by(user_id=user_id)
    return render_template('detail.html', user=user, posts=posts)

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

# ################################################
# Post routes

@app.route('/users/<int:user_id>/posts/new')
def new_post_page(user_id):
    user = User.query.get_or_404(user_id)
    tags = Tag.query.all()
    return render_template('new_post.html', user=user, tags=tags)

@app.route('/users/<int:user_id>/posts/new', methods=['POST'])
def create_post(user_id):
    title = request.form['title']
    content = request.form['content']
    tag_ids = [int(num) for num in request.form.getlist('checkbox')]
    tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()

    post = Post(title=title, content=content, user_id=user_id, tags=tags)
    db.session.add(post)
    db.session.commit()
    return redirect(f'/users/{user_id}')

@app.route('/posts/<int:post_id>')
def show_post(post_id):
    post = Post.query.get_or_404(post_id)
    user = User.query.get_or_404(post.user_id)
    tags = post.tags
    return render_template('post_details.html', post=post, user=user, tags=tags)

@app.route('/posts/<int:post_id>/edit')
def edit_post_form(post_id):
    post = Post.query.get_or_404(post_id)
    user = User.query.get_or_404(post.user_id)
    return render_template('editpost.html', post=post, user=user)

@app.route('/posts/<int:post_id>/edit', methods=['POST'])
def edit_post(post_id):
    title = request.form['title']
    content = request.form['content']
    post = Post.query.get_or_404(post_id)
    post.edit(title, content)
    db.session.commit()
    return redirect(f'/posts/{post_id}')

@app.route('/posts/<int:post_id>/delete', methods=['POST', 'GET'])
def delete_post(post_id):
    
    Post.query.filter_by(id=post_id).delete()
    db.session.commit()
    return redirect(f'/users')

####################################### TAGS ##########################

@app.route('/tags')
def tags():
    tags = Tag.query.all()
    return render_template('tags.html', tags=tags)

@app.route('/tags/<int:tag_id>')
def tag_details(tag_id):
    tag = Tag.query.get_or_404(tag_id)
    posts = tag.posts_tags
    return render_template('tagdetails.html', tag=tag, posts=posts)

@app.route('/tags/new')
def create_tag_form():
    return render_template('createtag.html')

@app.route('/tags/new', methods=['POST'])
def create_tag():
    name = request.form['name']
    tag = Tag(name=name)
    db.session.add(tag)
    db.session.commit()
    return redirect('/tags')

@app.route('/tags/<int:tag_id>/edit')
def edit_tag_form(tag_id):
    tag = Tag.query.get_or_404(tag_id)
    return render_template('edittag.html', tag=tag)

@app.route('/tags/<int:tag_id>/edit', methods=['POST'])
def edit_tag(tag_id):
    tag = Tag.query.get_or_404(tag_id)
    name = request.form['name']
    tag.name = name
    db.session.add(tag)
    db.session.commit()
    return redirect('/tags')

@app.route('/tags/<int:tag_id>/delete', methods=['POST', 'GET'])
def delete_tag(tag_id):
    Tag.query.filter_by(tag_id).delete()
    db.session.commit()
    return redirect('/tags')