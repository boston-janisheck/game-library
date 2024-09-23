import React from "react";

const suitsSymbols = {
  "♦": "♦",
  "♥": "♥",
  "♠": "♠",
  "♣": "♣",
};

const Card = ({ value, suit }) => {
  return (
    <div className="card">
      {value !== "Face Down" ? (
        <>
          <span className="card-value">{value}</span>
          <span className="card-suit">{suitsSymbols[suit]}</span>
        </>
      ) : (
        <span className="card-value">{value}</span>
      )}
    </div>
  );
};

export default Card;
