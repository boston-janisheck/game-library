const PointsKey = ({ pointsData, wager }) => {
  return (
    <div className="points-key-container">
      <div className="single-item">1 × 7️⃣ = {10 * wager}</div>
      <div className="points-key-grid">
        {pointsData.map((item, index) => (
          <div key={index} className="points-key-item">
            3 × {item.symbol} = {item.points * wager}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PointsKey;
