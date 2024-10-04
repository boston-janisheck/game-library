import React from "react";

const suitsSymbols = {
  "♦": "♦",
  "♥": "♥",
  "♠": "♠",
  "♣": "♣",
};

const Card = ({ value, suit }) => {
  const color = suit === "♦" || suit === "♥" ? "red" : "black";

  return (
    <div className={`card ${value === "Face Down" ? "face-down" : color}`}>
      {value !== "Face Down" ? (
        <>
          <span className="card-value">{value}</span>
          <span className="card-suit">{suitsSymbols[suit]}</span>
        </>
      ) : (
        <div className="face-down-inner"></div>
      )}
    </div>
  );
};

export default Card;
