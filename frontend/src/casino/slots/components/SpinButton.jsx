const SpinButton = ({ handleSpin, isSpinning, isDisabled }) => {
  return !isSpinning ? (
    <button
      className={`action-button ${!isDisabled ? "pulse-animation" : ""}`}
      onClick={handleSpin}
      disabled={isDisabled}
    >
      SPIN!
    </button>
  ) : null;
};

export default SpinButton;
