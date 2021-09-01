from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import InputRequired, Optional, URL, AnyOf, NumberRange

class PetForm(FlaskForm):
    """Form for adding pets"""

    name = StringField("Pet Name", validators=[InputRequired()])
    species = StringField("Pet's Species", validators=[InputRequired(), AnyOf("cat", "dog", "porcupine")])
    photo = StringField("Pet Photo URL", validators=[Optional(), URL()])
    age = IntegerField("Pet Age", validators=[Optional(), NumberRange(min=0, max=30)])
    notes = TextAreaField("Pet Notes", validators=[Optional()])