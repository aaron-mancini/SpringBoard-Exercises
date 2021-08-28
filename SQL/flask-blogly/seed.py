"""Seed file to make sample data for blogly db."""

from models import User, Post, Tag, PostTag, db
from app import app

db.drop_all()
db.create_all()

User.query.delete()

aaron = User(first_name='Aaron', last_name='Mancini', image_url='https://static.wikia.nocookie.net/dogelore/images/3/3f/Bdoge.png/revision/latest/scale-to-width-down/180?cb=20190621160642')
bigbro = User(first_name='Travis', last_name='Doge', image_url='https://static.wikia.nocookie.net/dogelore/images/0/0a/Big_bro.png/revision/latest?cb=20190617100257')

db.session.add(aaron)
db.session.add(bigbro)

db.session.commit()

Post.query.delete()

first_post = Post(title='First Post!', content='This is my first post', user_id=1)
second_post = Post(title='Second Post!', content='This is my second post', user_id=1)
bigbro_post = Post(title='Doge', content='Bark bark bark', user_id=2)

db.session.add(first_post)
db.session.add(second_post)
db.session.add(bigbro_post)

db.session.commit()

Tag.query.delete()
PostTag.query.delete()

first_tag = Tag(name='Fun')
second_tag = Tag(name='Dope')

db.session.add(first_tag)
db.session.add(second_tag)

db.session.commit()

tag_assignment = PostTag(post_id=1, tag_id=1)
another_tag_assignment = PostTag(post_id=3, tag_id=2)

db.session.add(tag_assignment)
db.session.add(another_tag_assignment)

db.session.commit()