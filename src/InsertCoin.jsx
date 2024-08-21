const InsertCoin = ({ balance, setBalance }) => {
  const addCoins = () => {
    setBalance((prevBalance) => prevBalance + 1);
  };

  return (
    <div className="insert-coin">
      <h2>Balance: {balance} Coins</h2>
      <button onClick={addCoins}>Add Coins</button>
    </div>
  );
};

export default InsertCoin;
