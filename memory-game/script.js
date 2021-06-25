const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter]; 
    array[counter] = array[index]; 
    array[index] = temp; 
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

const btn = document.getElementById('playbutton');
const resetBtn = document.getElementById('resetbutton');
gameContainer.className = 'hidden';
btn.addEventListener('click', function(event){
  event.target.className = 'hidden';
  gameContainer.className = '';
  resetBtn.className = 'button';
  shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
})

resetBtn.addEventListener('click', function(event){
  let cards = gameContainer.children;
  console.log(cards);
  for(let i = 0; i < 10; i++){
    cards[0].remove();
  }
  resetBtn.className = 'button hidden';
  btn.className = 'button';
})

let firstColorClicked = 0;
let secondColorClicked = 0;

let firstDiv = 0;
let secondDiv = 0;

let numberOfClicks = 0;
function handleCardClick(event) {
  numberOfClicks++;
  let color = event.target.className
 

  if(numberOfClicks === 1){
    firstDiv = event.target;
    firstColorClicked = event.target.className;
    event.target.style.backgroundColor = color
  }
  if(numberOfClicks === 2){
    secondDiv = event.target;
    if(firstDiv === secondDiv){
      numberOfClicks = 1;
      return;
    }
    secondColorClicked = event.target.className;
    event.target.style.backgroundColor = color
  }
  if(firstColorClicked === secondColorClicked){
    firstColorClicked = 0;
    secondColorClicked = 0;
    numberOfClicks = 0;
  }
  if(firstColorClicked !== secondColorClicked && numberOfClicks > 1){
    setTimeout(function(){
      const firstColorReset = document.getElementsByClassName(firstColorClicked)
      const secondColorReset = document.getElementsByClassName(secondColorClicked)
      // console.log(firstColorReset, secondColorReset);
      for(div of firstColorReset){
        div.style.backgroundColor = 'white';
      }
      for(div of secondColorReset){
        div.style.backgroundColor = 'white';
      }
      numberOfClicks = 0;
      firstColorClicked = 0;
      secondColorClicked = 0;
    }, 1000)
  }
  
  
  // event.target.style.backgroundColor = color;
  // console.log("you just clicked", event.target);
}

// when the DOM loads
// createDivsForColors(shuffledColors);
