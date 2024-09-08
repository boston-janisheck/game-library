import sevenIcon from "/src/assets/slots-icon-seven.png";

export const calculatePoints = (slot1, slot2, slot3, pointsData) => {
  const slots = [slot1, slot2, slot3];
  const counts = slots.reduce((acc, symbol) => {
    acc[symbol] = (acc[symbol] || 0) + 1;
    return acc;
  }, {});

  let points = 0;

  // Find the points for the "7" icon from pointsData
  const sevenPointsData = pointsData.find((item) => item.symbol === sevenIcon);

  if (counts[sevenIcon] === 3) {
    // Case: 3 "7" in a row
    points = sevenPointsData?.points || 0;
  } else if (Object.values(counts).includes(3)) {
    // Case: 3 identical non-"7" symbols
    const matchingSymbol = Object.keys(counts).find(
      (symbol) => counts[symbol] === 3
    );
    points =
      pointsData.find((item) => item.symbol === matchingSymbol)?.points || 0;
  } else if (counts[sevenIcon] === 2) {
    // Case: 2 "7" symbols
    const otherSymbol = slots.find((symbol) => symbol !== sevenIcon);
    points =
      pointsData.find((item) => item.symbol === otherSymbol)?.points || 0;
  } else if (counts[sevenIcon] === 1) {
    const non7Symbols = slots.filter((symbol) => symbol !== sevenIcon);
    if (non7Symbols.length === 2 && non7Symbols[0] === non7Symbols[1]) {
      // Case: 1 "7" + 2 identical non-"7" symbols
      points =
        pointsData.find((item) => item.symbol === non7Symbols[0])?.points || 0;
    } else {
      // Case: 1 "7" + 2 different symbols
      points = 10;
    }
  }

  return points;
};
