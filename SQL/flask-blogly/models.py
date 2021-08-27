"""Models for Blogly."""

from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)

class User(db.Model):
    """Users"""

    __tablename__ = "users"

    id = db.Column(db.Integer,
                    primary_key=True,
                    autoincrement=True)
    first_name = db.Column(db.String(25),
                            nullable=False)
    last_name = db.Column(db.String(30),
                            nullable=False)
    image_url = db.Column(db.String(500),
                            nullable=False,
                            default='https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg')
    
    def edit(self, first_name, last_name, image_url):
        """updates a user"""
        self.first_name = first_name
        self.last_name = last_name
        self.image_url = image_url

class Post(db.Model):
    """Posts"""

    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(), nullable=False)
    content = db.Column(db.String(), nullable=False)
    created_at = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    user = db.relationship('User')

    def edit(self, title, content):
        """updates a post"""
        self.title = title
        self.content = content
        