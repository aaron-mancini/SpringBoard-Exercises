const idWithoutQuery = document.getElementById('container');
const idWithQuery = document.querySelector('#container');
const secondListElement = document.querySelectorAll('.second');
const numberThree = document.querySelector('ol .third');
// idWithQuery.innerHTML = 'Hello!';

const footer = document.querySelector('.footer');
footer.classList.add('main');
footer.classList.remove('main');

const newListElement = document.createElement('li');
newListElement.innerText = 'four';

const ul = document.querySelector('ul');
ul.append(newListElement);

const ol = document.querySelectorAll('ol li');
for (element of ol) {
    element.style.backgroundColor = "green";
}

footer.remove();