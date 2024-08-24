// Import React and other necessary modules
import { useState } from "react";
import SlotsGrid from "./SlotsGrid";
import SpinButton from "./SpinButton";
import PlayerStatusBar from "./PlayerStatusBar";
import { calculatePoints } from "./PointsCalculator";

const Slots = ({ pointsData }) => {
  const elements = pointsData.map((item) => item.symbol);

  const [slot1, setSlot1] = useState(elements[0]);
  const [slot2, setSlot2] = useState(elements[0]);
  const [slot3, setSlot3] = useState(elements[0]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [balance, setBalance] = useState(0); // Token balance
  const [allPoints, setAllPoints] = useState(0); // Cumulative points/bux

  const spinSlot = (setSlot, duration) => {
    return new Promise((resolve) => {
      let index = 0;
      const interval = setInterval(() => {
        index = (index + 1) % elements.length;
        setSlot(elements[index]);
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
        const randomIndex = Math.floor(Math.random() * elements.length);
        setSlot(elements[randomIndex]);
        resolve(elements[randomIndex]);
      }, duration);
    });
  };

  const handleSpin = async () => {
    if (isSpinning || balance <= 0) return;
    setIsSpinning(true);
    setBalance((prevBalance) => prevBalance - 1);

    const results = await Promise.all([
      spinSlot(setSlot1, 1000),
      spinSlot(setSlot2, 2000),
      spinSlot(setSlot3, 3000),
    ]);

    setIsSpinning(false);

    const points = calculatePoints(
      results[0],
      results[1],
      results[2],
      pointsData
    );
    setAllPoints((prevAllPoints) => prevAllPoints + points);
    console.log(
      `You earned ${points} points! Total Points: ${allPoints + points}`
    );
  };

  return (
    <div className="slot-machine">
      <SlotsGrid slot1={slot1} slot2={slot2} slot3={slot3} />
      <SpinButton
        handleSpin={handleSpin}
        isSpinning={isSpinning}
        isDisabled={balance <= 0}
      />
      <PlayerStatusBar
        allPoints={allPoints}
        balance={balance}
        setBalance={setBalance}
      />
    </div>
  );
};

export default Slots;
