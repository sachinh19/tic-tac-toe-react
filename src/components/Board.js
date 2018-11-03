import React from "react";
import { Square } from "./Square";

export default class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        key={i}
        onClick={() => this.props.onClick(i)}
        line={this.props.winningLine}
        index={i}
      />
    );
  }

  renderCols(row) {
    let cols = [];

    for (let c = row * 3; c < 3 * (row + 1); c++)
      cols.push(this.renderSquare(c));

    return cols;
  }

  renderRows() {
    let rows = [];

    for (let r = 0; r < 3; r++)
      rows.push(
        <div className="board-row" key={r}>
          {this.renderCols(r)}
        </div>
      );

    return rows;
  }

  render() {
    return <div>{this.renderRows()}</div>;
  }
}
