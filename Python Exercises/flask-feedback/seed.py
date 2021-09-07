from app import db
from models import User, Feedback

db.drop_all()
db.create_all()