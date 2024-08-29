export const calculatePoints = (slot1, slot2, slot3, pointsData) => {
  const slots = [slot1, slot2, slot3];
  const counts = slots.reduce((acc, symbol) => {
    acc[symbol] = (acc[symbol] || 0) + 1;
    return acc;
  }, {});

  let points = 0;

  if (counts["7️⃣"] === 3) {
    // Case: 3 "7️⃣" in a row
    points = pointsData.find((item) => item.symbol === "7️⃣")?.points || 0;
  } else if (Object.values(counts).includes(3)) {
    // Case: 3 identical non-"7️⃣" symbols
    const matchingSymbol = Object.keys(counts).find(
      (symbol) => counts[symbol] === 3
    );
    points =
      pointsData.find((item) => item.symbol === matchingSymbol)?.points || 0;
  } else if (counts["7️⃣"] === 2) {
    // Case: 2 "7️⃣" symbols
    const otherSymbol = slots.find((symbol) => symbol !== "7️⃣");
    points =
      pointsData.find((item) => item.symbol === otherSymbol)?.points || 0;
  } else if (counts["7️⃣"] === 1) {
    const non7Symbols = slots.filter((symbol) => symbol !== "7️⃣");
    if (non7Symbols.length === 2 && non7Symbols[0] === non7Symbols[1]) {
      // Case: 1 "7️⃣" + 2 identical non-"7️⃣" symbols
      points =
        pointsData.find((item) => item.symbol === non7Symbols[0])?.points || 0;
    } else {
      // Case: 1 "7️⃣" + 2 different symbols
      points = 10;
    }
  }

  return points;
};
