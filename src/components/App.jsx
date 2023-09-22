import '../style/app.css';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Githublink } from './GithubLink'

const Square = (propiedad) => {
  const { children, isSelect, index, updateBoard } = propiedad;
  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div
      className={`square_1 ${isSelect ? 'selected' : ''}`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

const Turns = {
  X: '❌',
  O: '🔵',
};

const winnerBlocks = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turns, setTurns] = useState(Turns.X);
  const [winner, setWinner] = useState(null);

  const winnerCondition = (boardCheck) => {
    for (const combo of winnerBlocks) {
      const [a, b, c] = combo;
      if (
        boardCheck[a] &&
        boardCheck[a] === boardCheck[b] &&
        boardCheck[b] === boardCheck[c]
      ) {
        return boardCheck[a];
      }
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurns(Turns.X);
    setWinner(null);
  };
  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square != null);
  };
  const updateBoard = (index) => {
    //repetir posicion si contiene algo
    if (board[index] || winner) return;
    //actualiza tablero
    const newBoard = [...board];
    newBoard[index] = turns;
    setBoard(newBoard);
    //cambia el turno
    const newTurn = turns == Turns.X ? Turns.O : Turns.X;
    setTurns(newTurn);
    //s hay un ganador
    const newWinner = winnerCondition(newBoard);
    {
      if (newWinner) {
        setWinner(newWinner);
      } else if (checkEndGame(newBoard)) {
        setWinner(false);
      }
    }
  };

  return (
    <div className="app">
      <BrowserRouter>
        <Githublink/>
      </BrowserRouter>
      <h1>TRES EN RAYA</h1>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>
      <section className="selec">
        <h1>Turno de:</h1>
        <Square isSelect={turns === Turns.X}>{Turns.X}</Square>
        <Square isSelect={turns === Turns.O}>{Turns.O}</Square>
      </section>
      {winner != null && (
        <section className="winner">
          <div className="text">
            <h2>{winner == false ? 'EMPATE' : 'GANO!!!'}</h2>
            <header className="win">
              {winner && <Square>{winner}</Square>}
            </header>
            <footer>
              <button onClick={resetGame}>Reiniciar Juego</button>
            </footer>
          </div>
        </section>
      )}
      <button onClick={resetGame}>Reiniciar Juego</button>
    </div>
  );
}

export default App;
