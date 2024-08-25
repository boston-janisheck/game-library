import { useState } from "react";
import SlotsGrid from "./SlotsGrid";
import SpinButton from "./SpinButton";
import PlayerStatusBar from "./PlayerStatusBar";
import { calculatePoints } from "./PointsCalculator";
import PointsKey from "./PointsKey";
import WagerButton from "./WagerButton";

const pointsData = [
  { symbol: "7️⃣", points: 500 },
  { symbol: "🍀", points: 150 },
  { symbol: "🍒", points: 125 },
  { symbol: "🍇", points: 100 },
  { symbol: "🍌", points: 75 },
  { symbol: "🔔", points: 50 },
];

const Slots = () => {
  const elements = pointsData.map((item) => item.symbol);

  const [slot1, setSlot1] = useState(elements[0]);
  const [slot2, setSlot2] = useState(elements[0]);
  const [slot3, setSlot3] = useState(elements[0]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [balance, setBalance] = useState(0); // Token balance
  const [allPoints, setAllPoints] = useState(0); // Cumulative points/bux
  const [wager, setWager] = useState(1);

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
    if (isSpinning || balance < wager) return; // Ensure balance is sufficient for the wager
    setIsSpinning(true);
    setBalance((prevBalance) => prevBalance - wager); // Deduct wager from balance

    const results = await Promise.all([
      spinSlot(setSlot1, 1000),
      spinSlot(setSlot2, 2000),
      spinSlot(setSlot3, 3000),
    ]);

    setIsSpinning(false);

    const points =
      calculatePoints(results[0], results[1], results[2], pointsData) * wager;
    setAllPoints((prevAllPoints) => prevAllPoints + points);
    console.log(
      `You earned ${points} points! Total Points: ${allPoints + points}`
    );
  };

  return (
    <div className="slot-machine">
      <PointsKey pointsData={pointsData} wager={wager} />
      <SlotsGrid slot1={slot1} slot2={slot2} slot3={slot3} />
      <div className="controls">
        <SpinButton
          handleSpin={handleSpin}
          isSpinning={isSpinning}
          isDisabled={balance < wager}
        />
        <WagerButton wager={wager} setWager={setWager} />
      </div>
      <PlayerStatusBar
        allPoints={allPoints}
        balance={balance}
        setBalance={setBalance}
      />
    </div>
  );
};

export default Slots;
