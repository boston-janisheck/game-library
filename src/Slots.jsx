import { useState } from "react";
import SpinButton from "./SpinButton";

const Slots = ({ pointsData }) => {
  const elements = pointsData.map((item) => item.symbol);

  const [slot1, setSlot1] = useState(elements[0]);
  const [slot2, setSlot2] = useState(elements[0]);
  const [slot3, setSlot3] = useState(elements[0]);
  const [isSpinning, setIsSpinning] = useState(false);

  const spinSlot = (setSlot, duration) => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % elements.length;
      setSlot(elements[index]);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      const randomIndex = Math.floor(Math.random() * elements.length);
      setSlot(elements[randomIndex]);
    }, duration);
  };

  const handleSpin = () => {
    if (isSpinning) return; // Prevent spinning if already spinning
    setIsSpinning(true);
    spinSlot(setSlot1, 1000);
    spinSlot(setSlot2, 2000);
    spinSlot(setSlot3, 3000);
    setTimeout(() => setIsSpinning(false), 3000);
  };

  return (
    <div className="slot-machine">
      <div className="slots">
        <div className="slot">{slot1}</div>
        <div className="slot">{slot2}</div>
        <div className="slot">{slot3}</div>
      </div>
      <SpinButton handleSpin={handleSpin} isSpinning={isSpinning} />
    </div>
  );
};

export default Slots;
