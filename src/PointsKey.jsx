const PointsKey = ({ pointsData }) => {
  return (
    <div className="points-key-container">
      <div className="single-item">1 × 7️⃣ = 10</div>
      <div className="points-key-grid">
        {pointsData.map((item, index) => (
          <div key={index} className="points-key-item">
            3 × {item.symbol} = {item.points}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PointsKey;
