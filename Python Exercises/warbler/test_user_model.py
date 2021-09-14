"""User model tests."""

# run these tests like:
#
#    python -m unittest test_user_model.py


import os
from unittest import TestCase

from models import db, User, Message, Follows
from passwords import Password

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

os.environ['DATABASE_URL'] = f'postgresql://postgres:{Password}@localhost:5432/warbler-test'


# Now we can import app

from app import app

# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data

db.create_all()


class UserModelTestCase(TestCase):
    """Test User Model"""

    def setUp(self):
        """Create test client, add sample data."""

        User.query.delete()
        Message.query.delete()
        Follows.query.delete()

        self.client = app.test_client()

    def test_user_model(self):
        """Does basic model work?"""

        u = User.signup( "testuser", "test@test.com", "HASHED_PASSWORD", None)

        u2 = User.signup( "testuser2", "test@test.com2", "HASHED_PASSWORD2", None)

        
        db.session.commit()

        repr = User.__repr__(u)
        user = User.query.get(u.id) 

        # User should have no messages & no followers
        self.assertEqual(len(u.messages), 0)
        self.assertEqual(len(u.followers), 0)
        self.assertEqual(repr, f"<User #{u.id}: {u.username}, {u.email}>")

        self.assertEqual(User.is_following(u,u2), False)
        self.assertEqual(u.is_following(u2), False)

        u.following.append(u2)
        db.session.commit()

        self.assertEqual(u.is_following(u2), True)

        self.assertEqual(u.is_followed_by(u2), False)
        self.assertEqual(u2.is_followed_by(u), True)

        self.assertEqual(u.authenticate("testuser", "HASHED_PASSWORD"), user)
        self.assertEqual(u.authenticate("testuser", "HASHED_PASS"), False)
        self.assertEqual(u.authenticate("wronguser", "HASHED_PASSWORD"), False)
    