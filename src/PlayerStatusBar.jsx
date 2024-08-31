const PlayerStatusBar = ({ allPoints, balance, setBalance }) => {
  const addTokens = () => {
    setBalance((prevBalance) => prevBalance + 10);
  };

  return (
    <div className="player-status-bar">
      <span className="balance-container">
        <img src="src/assets/bux.png" alt="bux" className="icon" />
        <span className="balance">{allPoints}</span>
      </span>
      <span className="balance-container">
        <img src="src/assets/tokens.png" alt="token" className="icon" />
        <span className="balance">{balance}</span>
      </span>
      <button className="add-tokens-button" onClick={addTokens}>
        Add Tokens
      </button>
    </div>
  ); // Token Shop to be implemented
};

export default PlayerStatusBar;
