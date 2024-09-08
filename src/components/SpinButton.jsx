const SpinButton = ({ handleSpin, isSpinning, isDisabled }) => {
  return !isSpinning ? (
    <button className="spin-button" onClick={handleSpin} disabled={isDisabled}>
      SPIN!
    </button>
  ) : null; // Hide the button while spinning, logic passed for the button to be disabled when token balance is 0
};

export default SpinButton;
