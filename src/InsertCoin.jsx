const InsertCoin = ({ allPoints, balance, setBalance }) => {
  const addCoins = () => {
    setBalance((prevBalance) => prevBalance + 1);
  };

  return (
    <div className="insert-coin">
      <span className="coin-balance-container">
        <img src="src/assets/bux.png" alt="coin" className="bux" />
        <span className="coin-balance">{allPoints}</span>
      </span>
      <span className="coin-balance-container">
        <img src="src/assets/coins.png" alt="coin" className="coin" />
        <span className="coin-balance">{balance}</span>
      </span>
      <button className="insert-coin-button" onClick={addCoins}>
        Add Coins
      </button>
    </div>
  );
};

export default InsertCoin;
