import React from "react";
import Board from "./Board";
import { calculateWinner } from "../helpers/calculateWinner";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          row: -1,
          col: -1
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      order: false
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) return;
    squares[i] = this.state.xIsNext ? "X" : "O";
    const row = Math.floor(i / 3);
    const col = i % 3;

    // Array.concat does not mutate original array, unlike Array.push
    this.setState({
      history: history.concat([
        {
          squares: squares,
          row: row,
          col: col
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpToMove(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const result = calculateWinner(current.squares);
    const { winner, winningLine } = result
      ? result
      : { winner: null, winningLine: null };

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      let moveCoord =
        step.row >= 0 && step.col >= 0
          ? " (" + step.col + "," + step.row + ")"
          : "";
      return (
        <li key={move}>
          <button onClick={() => this.jumpToMove(move)} className="active">
            {desc + moveCoord}
          </button>
        </li>
      );
    });

    let toggleButtonText = "most";
    if (this.state.order) {
      moves.reverse();
      toggleButtonText = "least";
    }

    let status;
    if (moves.length === 10 && !winner) {
      status = "Result : Draw";
    } else if (winner) {
      status = "Winner : " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
            winningLine={winningLine}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <br />
          <div>
            <button onClick={() => this.setState({ order: !this.state.order })}>
              Order by {toggleButtonText} recent move
            </button>
            <ol>{moves}</ol>
          </div>
        </div>
      </div>
    );
  }
}
