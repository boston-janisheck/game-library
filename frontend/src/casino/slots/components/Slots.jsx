import { useState, useCallback } from "react";
import SlotsGrid from "./SlotsGrid";
import SpinButton from "./SpinButton";
import { calculatePoints } from "./PointsCalculator";
import PointsKey from "./PointsKey";
import WagerButton from "../../../shared/components/WagerButton";
import WinPopup from "./WinPopup";
import sevenIcon from "../assets/images/slots-icon-seven.png";
import cloverIcon from "../assets/images/slots-icon-clover.png";
import cherryIcon from "../assets/images/slots-icon-cherry.png";
import grapesIcon from "../assets/images/slots-icon-grapes.png";
import diamondIcon from "../assets/images/slots-icon-diamond.png";
import orangeIcon from "../assets/images/slots-icon-orange.png";
import placeholder from "../../../shared/assets/images/placeholder.png";
import { useIncrementPoints } from "../../../shared/components/useIncrementPoints"; // Import the custom hook

// Define the points data for each slot symbol
const pointsData = [
  { symbol: sevenIcon, points: 500 },
  { symbol: cloverIcon, points: 150 },
  { symbol: cherryIcon, points: 125 },
  { symbol: grapesIcon, points: 100 },
  { symbol: diamondIcon, points: 75 },
  { symbol: orangeIcon, points: 50 },
];

const Slots = ({ balance, setBalance, allPoints, setAllPoints }) => {
  const elements = pointsData.map((item) => item.symbol);

  const [slot1, setSlot1] = useState(placeholder);
  const [slot2, setSlot2] = useState(placeholder);
  const [slot3, setSlot3] = useState(placeholder);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wager, setWager] = useState(1);
  const [showWinPopup, setShowWinPopup] = useState(false);
  const [lastPoints, setLastPoints] = useState(0);

  // Handle increments only when lastPoints is updated, preventing reruns
  useIncrementPoints(allPoints, lastPoints, (newPoints) => {
    setAllPoints(newPoints); // Update total points in parent state
    if (newPoints === allPoints + lastPoints) {
      setLastPoints(0); // Reset after reaching target to prevent re-trigger
    }
  });

  const spinSlot = useCallback((setSlot, duration) => {
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
  }, [elements]);

  const handleSpin = async () => {
    if (isSpinning || balance < wager) return;
    setIsSpinning(true);
    setBalance((prevBalance) => prevBalance - wager);

    const results = await Promise.all([
      spinSlot(setSlot1, 1000),
      spinSlot(setSlot2, 2000),
      spinSlot(setSlot3, 3000),
    ]);

    setTimeout(() => {
      // Calculate points earned from the spin
      const points = calculatePoints(results[0], results[1], results[2], pointsData) * wager;

      setLastPoints(points); // Set points to be animated
      
      if (points > 0) {
        setShowWinPopup(true); // Show popup if points are earned
      }
      setIsSpinning(false);

      console.log(`You earned ${points} points! Total Points: ${allPoints + points}`);
    }, 400);
  };

  return (
    <div className="slot-machine">
      {showWinPopup && (
        <WinPopup
          points={lastPoints}
          onClose={() => setShowWinPopup(false)}
        />
      )}
      <PointsKey
        pointsData={pointsData}
        wager={wager}
        sevenIcon={sevenIcon}
      />
      <SlotsGrid slot1={slot1} slot2={slot2} slot3={slot3} />
      <div className="controls">
        {!isSpinning && (
          <>
            <SpinButton
              handleSpin={handleSpin}
              isSpinning={isSpinning}
              isDisabled={balance < wager}
            />
            <WagerButton wager={wager} setWager={setWager} />
          </>
        )}
      </div>
    </div>
  );
};

export default Slots;