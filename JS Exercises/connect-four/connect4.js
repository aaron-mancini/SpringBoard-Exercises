/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const width = 7;
const height = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  boardWidth = []
  for (let x = 0; x < width; x++){
    boardWidth.push(null);
  }
  for (let y = 0; y < height; y++){
    board.push(boardWidth);
  }
}
/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById('board');

  // TODO: we first make a tr element and set the id to make a extra row at the top for the players to click. Then we loop 
  // to make the number of columns based on the set width.
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < width; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: with the use of nested loops we can make rows based on the set height and then add cells to each row based on the width
  for (let y = 0; y < height; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < width; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let i = height - 1; i >= 0; i--){
    const spot = document.getElementById(`${i}-${x}`)
    if(spot.innerHTML === ''){
      return i;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement('div');
  if (currPlayer === 1){
    piece.setAttribute('class', 'piece p1');
  } else {
    piece.setAttribute('class', 'piece p2');
  }
  let pieceDestination = document.getElementById(`${y}-${x}`);
  pieceDestination.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg)
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
 
  // board[y][x] = currPlayer;
  // console.log(board);
  let boardRow = board[y]
  let count = 0;
  boardRow = boardRow.map(function(val) {
    if (count === x){
      count++
      return val = currPlayer;
    } else {
      count++;
      return val = val;
    }
    
  });
  board[y] = boardRow;

  placeInTable(y, x);
  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }
  if(currPlayer === 1){
    console.log(currPlayer);
    currPlayer = 2;
  } else {
    currPlayer = 1;
  }
  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  for (let row of board){
    if(!(row.every(val => val !== null))){
      return;
    } 
    return endGame('You have tied!');
  }
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
      // this checks not only if every item actually exists in board but also if all of them belong to the same player
        y >= 0 &&
        y < height &&
        x >= 0 &&
        x < width &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
// both loops will loop through each spot on the board
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // these variables are an array starting with the spot we are currently looping through and then adding 3
      // more spots just by adding 1 to 3 to check the other spots in a 4 pattern
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      // this conditional checks if any of the above are true based on the _win function
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
