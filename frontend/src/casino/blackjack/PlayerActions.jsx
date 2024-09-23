const PlayerActions = ({ isPlayerTurn, handleHit, handleStand }) => {
  return (
    <div className="player-actions">
      {isPlayerTurn && (
        <>
          <button onClick={handleHit}>Hit</button>
          <button onClick={handleStand}>Stand</button>
        </>
      )}
    </div>
  );
};

export default PlayerActions;
