export const calculatePoints = (slot1, slot2, slot3, pointsData) => {
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
      pointsData.find((item) => item.symbol === doubledSymbols[0])?.points || 0;
  } else if (counts["7️⃣"] === 1) {
    points = 10;
  }

  return points;
};
