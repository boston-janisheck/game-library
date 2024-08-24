import { useState, useEffect, useCallback } from "react";
import SpinButton from "./SpinButton";
import PlayerStatusBar from "./PlayerStatusBar";

const Slots = ({ pointsData }) => {
  const elements = pointsData.map((item) => item.symbol);

  const [slot1, setSlot1] = useState(elements[0]);
  const [slot2, setSlot2] = useState(elements[0]);
  const [slot3, setSlot3] = useState(elements[0]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isSpinComplete, setIsSpinComplete] = useState(false);
  const [balance, setBalance] = useState(0);
  const [allPoints, setAllPoints] = useState(0); // Cumulative points

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
        resolve();
      }, duration);
    });
  };

  const calculatePoints = useCallback(() => {
    const slots = [slot1, slot2, slot3];
    const counts = slots.reduce((acc, symbol) => {
      acc[symbol] = (acc[symbol] || 0) + 1;
      return acc;
    }, {});

    let points = 0;

    if (Object.values(counts).includes(3)) {
      points = pointsData.find((item) => item.symbol === slot1)?.points || 0;
    } else if (counts["7️⃣"] === 2) {
      const otherSymbol = slots.find((symbol) => symbol !== "7️⃣");
      points =
        pointsData.find((item) => item.symbol === otherSymbol)?.points || 0;
    } else if (
      Object.keys(counts).filter((symbol) => counts[symbol] >= 2).length > 1 &&
      Object.values(counts).some((count) => count < 3)
    ) {
      const doubledSymbols = Object.keys(counts).filter(
        (symbol) => counts[symbol] >= 2
      );
      points =
        pointsData.find((item) => item.symbol === doubledSymbols[0])?.points ||
        0;
    } else if (counts["7️⃣"] === 1) {
      points = 10;
    }

    setAllPoints((prevAllPoints) => prevAllPoints + points); // Update cumulative points
    console.log(
      `You earned ${points} points! Total Points: ${allPoints + points}`
    );
  }, [slot1, slot2, slot3, pointsData, allPoints]);

  useEffect(() => {
    if (isSpinComplete) {
      calculatePoints();
      setIsSpinComplete(false);
    }
  }, [isSpinComplete, calculatePoints]);

  const handleSpin = async () => {
    if (isSpinning || balance <= 0) return;
    setIsSpinning(true);
    setBalance((prevBalance) => prevBalance - 1);

    await Promise.all([
      spinSlot(setSlot1, 1000),
      spinSlot(setSlot2, 2000),
      spinSlot(setSlot3, 3000),
    ]);

    setIsSpinning(false);
    setIsSpinComplete(true);
  };

  return (
    <div className="slot-machine">
      <div className="slots">
        <div className="slot">{slot1}</div>
        <div className="slot">{slot2}</div>
        <div className="slot">{slot3}</div>
      </div>
      <SpinButton
        handleSpin={handleSpin}
        isSpinning={isSpinning}
        isDisabled={balance <= 0}
      />
      <PlayerStatusBar
        allPoints={allPoints} // Pass cumulative points to InsertToken
        balance={balance}
        setBalance={setBalance}
      />
    </div>
  );
};

export default Slots;
