from flask import Flask, request, redirect, render_template
from model import db, connect_db, Pet

from forms import PetForm

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres542973@localhost:5432/adopt'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

connect_db(app)


app.config['SECRET_KEY'] = 'SHHHHH'


@app.route('/')
def show_all_pets():
    """Pet homepage that displays all of our pets!"""
    pets = Pet.query.all()
    return render_template('pets.html', pets=pets)

@app.route('/add', methods=["GET", "POST"])
def add_pet():
    """Pet add form"""

    form = PetForm()

    if form.validate_on_submit():
        name = form.name.data
        species = form.species.data
        photo = form.photo.data
        age = form.age.data
        notes = form.notes.data
        pet = Pet(name=name, species=species, photo_url=photo, age=age, notes=notes)
        db.session.add(pet)
        db.session.commit()
        return redirect('/')
    else:
        return render_template('pet_form.html', form=form)

@app.route('/<int:pet_id>', methods=["GET", "POST"])
def show_edit_pet(pet_id):
    """Show pet details with an edit form."""
    pet = Pet.query.get_or_404(pet_id)
    form = PetForm(obj=pet)

    if form.validate_on_submit():
        pet.name = form.name.data
        pet.species = form.species.data
        pet.photo = form.photo.data
        pet.age = form.age.data
        pet.notes = form.notes.data
        db.session.commit()
        return redirect(f'/{pet_id}')
    else:
        return render_template("pet_display.html", form=form, pet=pet)