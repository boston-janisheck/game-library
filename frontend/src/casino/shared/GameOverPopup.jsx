import React from "react";

const GameOverPopup = ({ title, message, onClose }) => {
  return (
    <div className="win-popup-overlay">
      <div className="win-popup">
        <h2 className="win-popup-message">{title}</h2>
        <p className="win-popup-message">{message}</p>
        <button className="popup-button" onClick={onClose}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default GameOverPopup;
