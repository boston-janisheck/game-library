import { useEffect, useState } from "react";

export function useIncrementPoints(
  initialPoints,
  pointsToAdd,
  onPointsUpdated
) {
  const [currentPoints, setCurrentPoints] = useState(initialPoints);

  useEffect(() => {
    if (pointsToAdd <= 0) return;

    const targetPoints = initialPoints + pointsToAdd;
    const interval = setInterval(() => {
      setCurrentPoints((prevPoints) => {
        if (prevPoints < targetPoints) {
          const newPoints = prevPoints + 1;
          onPointsUpdated(newPoints); // Call the callback whenever points update
          return newPoints;
        } else {
          clearInterval(interval);
          return prevPoints;
        }
      });
    }, 20);

    return () => clearInterval(interval);
  }, [initialPoints, pointsToAdd, onPointsUpdated]);

  return currentPoints;
}
