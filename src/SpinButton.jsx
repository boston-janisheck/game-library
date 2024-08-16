const SpinButton = ({ handleSpin, isSpinning }) => {
  return (
    <button className="spin-button" onClick={handleSpin} disabled={isSpinning}>
      Spin
    </button>
  );
};

export default SpinButton;
