const SpinButton = ({ handleSpin, isSpinning, isDisabled }) => {
  return !isSpinning ? (
    <button className="spin-button" onClick={handleSpin} disabled={isDisabled}>
      Spin
    </button>
  ) : null;
};

export default SpinButton;
