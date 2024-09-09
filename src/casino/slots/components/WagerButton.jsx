import tokensIcon from "../../../shared/assets/images/tokens.png";

const WagerButton = ({ wager, setWager }) => {
  const handleWagerClick = () => {
    setWager((prevWager) => (prevWager === 10 ? 1 : prevWager + 1));
  };
  return (
    <button className="wager-button" onClick={handleWagerClick}>
      <img src={tokensIcon} alt="Token Icon" className="token-icon" />
      <span className="wager-amount">{wager}</span>
    </button>
  );
};

export default WagerButton;
