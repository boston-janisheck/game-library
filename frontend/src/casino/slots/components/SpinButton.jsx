const SpinButton = ({ handleSpin, isSpinning, isDisabled }) => {
  return !isSpinning ? (
    <button
      className={`spin-button ${!isDisabled ? "pulse-animation" : ""}`}
      onClick={handleSpin}
      disabled={isDisabled}
    >
      SPIN!
    </button>
  ) : null;
};

export default SpinButton;
