const SlotsGrid = ({ slot1, slot2, slot3 }) => {
  return (
    <div className="slots">
      <div className="slot">{slot1}</div>
      <div className="slot">{slot2}</div>
      <div className="slot">{slot3}</div>
    </div>
  );
};

export default SlotsGrid;
