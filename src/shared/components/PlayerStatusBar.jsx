import insertCoinsSound from "../assets/sounds/insert-coins.wav";
import buxIcon from "../assets/images/bux.png";
import tokensIcon from "../assets/images/tokens.png";

const PlayerStatusBar = ({ allPoints, balance, setBalance }) => {
  const addTokens = () => {
    // Play the sound
    const audio = new Audio(insertCoinsSound);
    audio.volume = 0.1;
    audio.play();

    // Add tokens
    setBalance((prevBalance) => prevBalance + 10);
  };

  return (
    <div className="player-status-bar">
      <span className="balance-container">
        <img src={buxIcon} alt="bux" className="icon" />
        <span className="balance">{allPoints}</span>
      </span>
      <span className="balance-container">
        <img src={tokensIcon} alt="token" className="icon" />
        <span className="balance">{balance}</span>
      </span>
      <button className="add-tokens-button" onClick={addTokens}>
        Add Tokens
      </button>
    </div>
  );
};

export default PlayerStatusBar;
