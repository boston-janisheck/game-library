import React from "react";

const GameOverPopup = ({ result, onClose }) => {
  return (
    <div className="win-popup-overlay">
      <div className="win-popup">
        <h2 className="win-popup-message">Game Over</h2>
        <p className="win-popup-message">{result}</p>
        <button className="popup-button" onClick={onClose}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default GameOverPopup;
