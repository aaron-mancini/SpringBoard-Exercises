"""Seed file to make sample data for blogly db."""

from models import User, db
from app import app

db.drop_all()
db.create_all()

User.query.delete()

aaron = User(first_name='Aaron', last_name='Mancini', image_url='https://static.wikia.nocookie.net/dogelore/images/3/3f/Bdoge.png/revision/latest/scale-to-width-down/180?cb=20190621160642')
bigbro = User(first_name='Travis', last_name='Doge', image_url='https://static.wikia.nocookie.net/dogelore/images/0/0a/Big_bro.png/revision/latest?cb=20190617100257')

db.session.add(aaron)
db.session.add(bigbro)

db.session.commit()