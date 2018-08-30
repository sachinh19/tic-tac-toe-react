import React from 'react';
import Board from './Board';
import { calculateWinner } from '../helpers/calculateWinner';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        row: -1,
        col: -1,
      }],
      stepNumber: 0,
      xIsNext: true,
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if(calculateWinner(squares) || squares[i])
      return;
    squares[i] = (this.state.xIsNext? 'X': 'O');
    const row = Math.floor(i / 3);
    const col = i % 3;

    // Array.concat does not mutate original array, unlike Array.push
    this.setState({
      history: history.concat([{
        squares: squares,
        row: row,
        col: col,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpToMove(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      
      const desc = move ? 'Go to move #' + move: 'Go to game start';
      let moveCoord = (step.row >= 0 && step.col >= 0)? ' (' + step.col + ',' + step.row + ')': '';
      return (
        <li key={move}>
          <button onClick={() => this.jumpToMove(move)}>
            {desc + moveCoord}
          </button>
        </li>
      );
    });

    let status;
    if(winner) {
      status = 'Winner : ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext? 'X': 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick = {(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}