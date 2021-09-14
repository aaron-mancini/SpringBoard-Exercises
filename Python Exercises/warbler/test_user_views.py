"""User View tests."""

# run these tests like:
#
#    FLASK_ENV=production python -m unittest test_user_views.py


import os
from unittest import TestCase
from passwords import Password

from models import db, connect_db, Message, User

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

os.environ['DATABASE_URL'] = f'postgresql://postgres:{Password}@localhost:5432/warbler-test'


# Now we can import app

from app import app, CURR_USER_KEY

# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data

db.create_all()

# Don't have WTForms use CSRF at all, since it's a pain to test

app.config['WTF_CSRF_ENABLED'] = False

class UserViewTestCase(TestCase):
    """Test views for users."""

    def setUp(self):
        """Create test client and sample data."""

        User.query.delete()
        Message.query.delete()

        self.client = app.test_client()

        self.testuser = User.signup(username="testuser",
                                    email="test@test.com",
                                    password="testuser",
                                    image_url=None)
        self.testuser_id = 123
        self.testuser.id = self.testuser_id

        self.otheruser = User.signup(username="otheruser", email="otheruser@test.com", password="otheruser", image_url=None)
        self.otheruser_id = 321
        self.otheruser.id = self.otheruser_id

        db.session.commit()

    def following(self):
        """test if logged in user can see following page"""

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] =  self.testuser.id

            resp = c.get("/users/321/following")

            self.assertEqual(resp.status_code, 200)