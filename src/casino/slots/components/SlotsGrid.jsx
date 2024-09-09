const SlotsGrid = ({ slot1, slot2, slot3 }) => {
  return (
    <div className="slots">
      <div className="slot">
        <img src={slot1} alt="Slot 1" />
      </div>
      <div className="slot">
        <img src={slot2} alt="Slot 2" />
      </div>
      <div className="slot">
        <img src={slot3} alt="Slot 3" />
      </div>
    </div>
  );
};

export default SlotsGrid;
