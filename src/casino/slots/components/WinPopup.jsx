const WinPopup = ({ points, onClose }) => {
  return (
    <div className="win-popup-overlay">
      <div className="win-popup">
        <h2>You Just Won {points} Points!</h2>
        <button className="win-popup-button" onClick={onClose}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default WinPopup;
