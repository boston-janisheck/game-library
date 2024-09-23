import React from "react";

const GameOverPopup = ({ result, onClose }) => {
  return (
    <div className="game-over-popup">
      <p>{result}</p>
      <button onClick={onClose}>Start New Game</button>
    </div>
  );
};

export default GameOverPopup;
