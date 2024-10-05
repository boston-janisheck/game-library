export const evaluateHand = (hand) => {
  // Sort hand by value, supporting evaluating some poker hands better
  hand = hand.slice().sort((a, b) => {
    const order = { J: 11, Q: 12, K: 13, A: 14 };
    const aValue = typeof a.value === "string" ? order[a.value] : a.value;
    const bValue = typeof b.value === "string" ? order[b.value] : b.value;
    return aValue - bValue;
  });

  // Determine if the hand is a flush
  const isFlush = hand.every((card) => card.suit === hand[0].suit);

  // Determine if the hand is a straight
  const values = hand.map((card) => {
    const order = { J: 11, Q: 12, K: 13, A: 14 };
    return typeof card.value === "string" ? order[card.value] : card.value;
  });

  const isStraight = values.every(
    (value, index, arr) => !index || value === arr[index - 1] + 1
  );
  const isRoyal = isStraight && values[0] === 10; // Specifically identifies a royal flush
  const uniqueValuesCount = new Set(values).size;

  const occurrences = values.reduce((acc, v) => {
    acc[v] = (acc[v] || 0) + 1;
    return acc;
  }, {});

  if (isFlush && isRoyal) return { title: "Royal Flush", points: 5000 };
  if (isFlush && isStraight) return { title: "Straight Flush", points: 1500 };
  if (uniqueValuesCount === 2) {
    if (Object.values(occurrences).includes(4))
      return { title: "Four Of A Kind", points: 600 };
    if (Object.values(occurrences).includes(3))
      return { title: "Full House", points: 300 };
  }
  if (isFlush) return { title: "Flush", points: 200 };
  if (isStraight) return { title: "Straight", points: 125 };
  if (uniqueValuesCount === 3) {
    if (Object.values(occurrences).includes(3))
      return { title: "Three Of A Kind", points: 75 };
    if (Object.values(occurrences).filter((v) => v === 2).length === 2)
      return { title: "Two Pair", points: 40 };
  }
  if (uniqueValuesCount === 4) {
    const jacksOrBetter = Object.entries(occurrences)
      .filter(([value]) => [11, 12, 13, 14].includes(Number(value)))
      .some(([, count]) => count >= 2);

    if (jacksOrBetter) {
      return { title: "Jacks Or Better", points: 10 };
    }
  }

  return { title: "No Winning Hand", points: 0 };
};
