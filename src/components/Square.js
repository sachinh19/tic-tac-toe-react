import React from "react";

export const Square = props => {
  const { line, value, onClick, index } = props;
  const classes = line && line.includes(index) ? "square-winner" : "square";

  return (
    <button className={classes} onClick={() => onClick()}>
      {value}
    </button>
  );
};
