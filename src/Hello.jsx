

import React, { useState } from 'react';
import { makeGuesses, makeBoard, guess, boardToString, getSolution } from "./find-the-queen";

const QUEEN = 5;

const Board = (props) => {
  let { board, guesses, setGuesses, solution} = props;
  console.log(boardToString(board));

  let [queenI, queenJ] = solution;
  let isSolved = guesses[queenI][queenJ] > 0;
  
  let n = board.length - 2;
  const rows = [];
  for (let i = 0; i < n; i++) {
    const cells = [];
    let oddI = i % 2;
    for (let j = 0; j < n; j++) {
      let className = (oddI ? j % 2 : !(j % 2)) ? "cell-white" : "cell-dark";
      if (isSolved) {
        if (board[i + 1][j + 1] == 1) {
          className += " knight";
        }
        if (board[i + 1][j + 1] == 5) {
          className += " queen";
        }
      }
      let onClick = (event) => {
        event.preventDefault();
        let newGuesses = guess(board, guesses, i, j);
        setGuesses(newGuesses);
      }
      ;
      cells.push(<div className={className} key={j} onClick={onClick}>
                     {
                       guesses[i][j] == -1 ? <>&nbsp;</> :
                       (board[i + 1][j + 1] == QUEEN ? "Q" : guesses[i][j])
                     }
                 </div>);
    }
    rows.push(<div key={i}>{cells}</div>);
  }
  const boardDiv = <div className={"board"}>{rows}</div>;
  return <div>{boardDiv}</div>;
  
}

const FindTheQueen = () => {
  const n = 10;
  const [board, setBoard] = useState(makeBoard(n));
  const [guesses, setGuesses] = useState(makeGuesses(n));
  const solution = getSolution(board);
  return <Board board={board} guesses={guesses} setGuesses={setGuesses} solution={solution} />;
}


export default FindTheQueen;
