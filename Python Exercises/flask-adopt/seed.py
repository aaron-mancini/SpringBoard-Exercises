from app import db
from model import Pet

db.drop_all()
db.create_all()

doge = Pet(name='doge', species='dog', photo_url='https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg', age='3', notes='These are some notes about doge', available=True)

db.session.add(doge)
db.session.commit()