const PointsKey = ({ pointsData, wager }) => {
  return (
    <div className="points-key-container">
      <div className="single-item">
        1×{" "}
        <img
          src="/src/assets/slots-icon-seven.png"
          alt="Wild"
          className="symbol-icon"
        />{" "}
        WILD! {10 * wager}
      </div>
      <div className="points-key-grid">
        {pointsData.map((item, index) => (
          <div key={index} className="points-key-item">
            3×{" "}
            <img
              src={item.symbol}
              alt={`Symbol ${index}`}
              className="symbol-icon"
            />{" "}
            {item.points * wager}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PointsKey;
