const WinPopup = ({ points, onClose }) => {
  return (
    <div className="win-popup-overlay">
      <div className="win-popup">
        <h2 className="win-popup-message">Congratulations!</h2>
        <p className="win-popup-message">You just won:</p>
        <div className="points-display">
          <span className="points-text">{points}</span>
        </div>
        <p className="win-popup-message">points!</p>
        <button className="popup-button" onClick={onClose}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default WinPopup;
