from flask import Flask, request
from operations import add, sub, mult, div

app = Flask(__name__)

@app.route('/add')
def addpage():
    a = request.args.get('a', type = int)
    b = request.args.get('b', type = int)
    return f'{add(a, b)}'

@app.route('/sub')
def subpage():
    a = request.args.get('a', type = int)
    b = request.args.get('b', type = int)
    return f'{sub(a, b)}'

@app.route('/mult')
def multpage():
    a = request.args.get('a', type = int)
    b = request.args.get('b', type = int)
    return f'{mult(a, b)}'

@app.route('/div')
def divpage():
    a = request.args.get('a', type = int)
    b = request.args.get('b', type = int)
    return f'{div(a, b)}'

operators = {
        "add": add,
        "sub": sub,
        "mult": mult,
        "div": div,
        }

@app.route('/math/<func>')
def domath(func):
    a = request.args.get('a', type = int)
    b = request.args.get('b', type = int)
    
    return f'{operators[func](a, b)}'

