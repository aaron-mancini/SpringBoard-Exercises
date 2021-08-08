from unittest import TestCase

from werkzeug.wrappers import response
from app import app
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):

    def setUp(self):
        
        self.client = app.test_client()
        app.config['TESTING'] = True
    
    def test_homepage(self):
        with self.client:
            response = self.client.get('/')
            self.assertIn('board', session)
    
    def test_valid_word(self):

        with self.client as client:
            with client.session_transaction() as sess:
                sess['board'] = [['T', 'E', 'S', 'T', 'X'],
                                 ['T', 'E', 'S', 'T', 'X'],
                                 ['T', 'E', 'S', 'T', 'X'],
                                 ['T', 'E', 'S', 'T', 'X'],
                                 ['T', 'E', 'S', 'T', 'X']]
        response = self.client.get('/check/test')
        self.assertEqual(response.json['result'], 'ok')
    
    def test_invalid_word(self):
        self.client.get('/')
        response = self.client.get('/check/impossible')
        self.assertEqual(response.json['result'], 'not-on-board')
    
    def test_non_english_word(self):
        self.client.get('/')
        response = self.client.get('/check/lkasjdglkashjg')
        self.assertEqual(response.json['result'], 'not-word')

    def test_gameover(self):
        self.client.get('/')
        response = self.client.get('/game_over/10')
        self.assertEqual(response.json['high_score'], '10')
        self.assertEqual(response.json['play_count'], '1')


