import { useEffect, useState } from "react";

export function useIncrementPoints(initialPoints, pointsToAdd, onPointsUpdated) {
  const [currentPoints, setCurrentPoints] = useState(initialPoints);

  useEffect(() => {
    if (pointsToAdd <= 0) {
      onPointsUpdated(initialPoints);
      return;
    }

    const targetPoints = initialPoints + pointsToAdd;

    const interval = setInterval(() => {
      setCurrentPoints((prevPoints) => {
        if (prevPoints < targetPoints) {
          const newPoints = prevPoints + 1;
          onPointsUpdated(newPoints); // Update external points state
          return newPoints;
        } else {
          clearInterval(interval); // Clear interval when target is reached
          return prevPoints;
        }
      });
    }, 20);

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [initialPoints, pointsToAdd, onPointsUpdated]);

  return currentPoints;
}