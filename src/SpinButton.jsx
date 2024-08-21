const SpinButton = ({ handleSpin, isSpinning, isDisabled }) => {
  return (
    <button onClick={handleSpin} disabled={isSpinning || isDisabled}>
      {isSpinning ? "Spinning..." : "Spin"}
    </button>
  );
};

export default SpinButton;
