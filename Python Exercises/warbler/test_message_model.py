"""Message model tests."""

import os
from unittest import TestCase

from models import db, User, Message, Follows
from passwords import Password

os.environ['DATABASE_URL'] = f'postgresql://postgres:{Password}@localhost:5432/warbler-test'

from app import app

db.create_all()

class UserModelTestCase(TestCase):
    """Test Message model"""

    def setUp(self):
        User.query.delete()
        Message.query.delete()
        Follows.query.delete()

        self.client = app.test_client()

    
    def test_message_model(self):

        u = User.signup( "testuser", "test@test.com", "HASHED_PASSWORD", None)

        db.session.commit()

        msg = Message(text="This is a test message")
        u.messages.append(msg)
        db.session.commit()

        self.assertEqual(len(u.messages), 1)
        self.assertEqual(u.messages[0].text, "This is a test message")