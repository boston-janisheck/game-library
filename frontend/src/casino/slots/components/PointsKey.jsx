import buxIcon from "../../../shared/assets/images/bux.png";

const PointsKey = ({ pointsData, wager, sevenIcon }) => {
  return (
    <div className="points-key-container">
      <div className="single-item">
        1x
        <img src={sevenIcon} alt="Wild" className="symbol-icon" /> WILD!{" "}
        {10 * wager}
        <img src={buxIcon} alt="Bux" className="symbol-icon" />
      </div>
      <div className="points-key-grid">
        {pointsData.map((item, index) => (
          <div key={index} className="points-key-item">
            3×
            <img
              src={item.symbol}
              alt={`Symbol ${index}`}
              className="symbol-icon"
            />
            {(item.points * wager).toLocaleString()}
            <img src={buxIcon} alt="Bux" className="symbol-icon" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PointsKey;
