
let boardSize = 10;

function pickRandomNumber(n) {
  return Math.floor(n * Math.random());
}

let print = console.log;

function makeBoard(n) {
  let board = [];
  n = n + 2;
  for (let r = 0; r < n; r++) {
    let row = [];
    board.push(row);
    for (let c = 0; c < n; c++) {
      row.push(0);
    }
  }
  return board;
}

let blank = '.';

function printBoard(board) {
  board = board.slice(1, board.length - 1);
  print(
    board.map(row => {
      row = row.slice(1, row.length - 1);
      return '   ' + row.map(n => {
        if (n == 5) {
          return 'Q';
        } else if (n == 1) {
          return 'K';
        } else {
          return blank;
        }
      }).join(' ');
      
    }).join("\n"));
}

function placeFirstPiece(board, piece){
  let row = 1 + pickRandomNumber(board.length - 2);
  let column = 1+ pickRandomNumber(board.length - 2);
  board[row][column] = piece;  
}

function isEmptySquare(board, row, column) {
  if (board[row][column] == 0) {
    return true;
  } else {
    return false;
  }
}

function isTouchingAnotherPiece(board, row, column) {

  for (let i = row - 1; i < row + 2; i++) {
    for (let j = column - 1; j < column + 2; j++) {
      if (board[i][j] != 0) {
        return true;
      }
    }
  }
  return false;
}

function placeOtherPieces(board, piece) {
  let row = 1 + pickRandomNumber(board.length - 2);
  let column = 1+ pickRandomNumber(board.length - 2);
  if (isEmptySquare(board, row, column) && isTouchingAnotherPiece(board, row, column)) {
    board[row][column] = piece;
  } else {
    placeOtherPieces(board, piece);
  }
}

let board = makeBoard(boardSize);


let pieces = [1, 1, 1, 1, 1, 1, 1];
let queenPosition = pickRandomNumber(pieces.length);
pieces[queenPosition] = 5;

placeFirstPiece(board, pieces[0]);
for (let i = 1; i < pieces.length; i++) {
  placeOtherPieces(board, pieces[i]);
}

//printBoard(board);

function makeGuesses(n) {
  let guesses = [];
  for (let i = 0; i < n; i++) {
    let row = [];
    guesses.push(row);
    for (let j = 0; j < n; j++) {
      row.push(-1);
    }
   }
  
  return guesses;
}

function printGuesses(guesses) {
  let headerLine = "   " + guesses.map((g, i) => 'ABCDEFGHIJ'.charAt(i)).join(' ');

let guessesLines = 
  (guesses.map((row, i) => {
    return ((i + 1) < 10 ? ' ' + (i + 1) : (i + 1)) + row.map(n => {
      if (n == -1) {
        return ' .';
      } else if (n > 9) {
        return n;
      } else {
        return ' ' + n;
      }
    }).join('');
  }).join('\n'));

  return headerLine + '\n' + guessesLines;
}

let guesses = makeGuesses(boardSize);
printGuesses(guesses);


function takeGuess(board, guesses) {
  
}


let readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function computeTotal(board, row, column) {
  let total = 0;
  for (let i = row - 1; i < row + 2; i++) {
    for (let j = column - 1; j < column + 2; j++) {
      total = total + board[i][j];
    }
  }
  return total;
}

function isCorrect(board, i, j) {
  return board[i][j] == 5;
}

function printSolution(board) {
  printBoard(board);
}

function takeGuess() {
  console.clear();
//  printBoard(board);
  print("\n");
  print(printGuesses(guesses));
  print("\n\n");
  rl.question("enter your guess: ", answer => {
    print("\n");
    answer = answer.replaceAll(' ', '').toUpperCase();
    let col = 1 + "ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(answer.charAt(0));
    let row = parseInt(answer.substring(1));

    if (isCorrect(board, row, col)) {
      printSolution(board);
      print("\n\nYOU WIN!");
      rl.close();
    } else {
      let total = computeTotal(board, row, col);
      guesses[row - 1][col - 1] = total;
      takeGuess();
    }
  });
}

takeGuess();
