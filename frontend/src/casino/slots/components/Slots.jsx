import { useState } from "react";
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
  const [showWinPopup, setShowWinPopup] = useState(false); // State for showing the popup
  const [lastPoints, setLastPoints] = useState(0); // State to store last points won

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

    // Delay the entire sequence by 400ms
    setTimeout(() => {
      const points =
        calculatePoints(results[0], results[1], results[2], pointsData) * wager;

      // Animate the points addition
      let currentPoints = allPoints;
      const targetPoints = allPoints + points;
      const interval = setInterval(() => {
        if (currentPoints < targetPoints) {
          currentPoints += 1;
          setAllPoints(currentPoints);
        } else {
          clearInterval(interval);
        }
      }, 20); // Adjust the speed as needed

      // Delay showing the popup by 400ms
      if (points > 0) {
        setLastPoints(points); // Store points won in state
        setShowWinPopup(true); // Show the popup after 400ms
      }

      // Stop spinning after everything is done
      setIsSpinning(false);

      console.log(`You earned ${points} points! Total Points: ${targetPoints}`);
    }, 400); // 400ms delay
  };

  return (
    <>
      <div className="slot-machine">
        {showWinPopup && (
          <WinPopup
            points={lastPoints}
            onClose={() => setShowWinPopup(false)} // Hide popup on close
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
    </>
  );
};

export default Slots;
