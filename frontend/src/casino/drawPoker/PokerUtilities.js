// PokerUtilities.js
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

  // Determine if hand is a straight
  const values = hand.map((card) => {
    const order = { J: 11, Q: 12, K: 13, A: 14 };
    return typeof card.value === "string" ? order[card.value] : card.value;
  });

  const isStraight = values.every(
    (value, index, arr) => !index || value === arr[index - 1] + 1
  );
  const isRoyal = isStraight && values[0] === 10; // Specifically identifies a royal flush
  const uniqueValuesCount = new Set(values).size;

  if (isFlush && isRoyal) return 5000; // Royal Flush
  if (isFlush && isStraight) return 1500; // Straight Flush
  if (uniqueValuesCount === 2) {
    // Check for Four of a Kind or Full House
    const occurrences = values.reduce((acc, v) => {
      acc[v] = (acc[v] || 0) + 1;
      return acc;
    }, {});

    if (Object.values(occurrences).includes(4)) return 600; // Four Of A Kind
    if (Object.values(occurrences).includes(3)) return 300; // Full House
  }
  if (isFlush) return 200; // Flush
  if (isStraight) return 125; // Straight
  if (uniqueValuesCount === 3) {
    // Three of a Kind or Two Pair
    const occurrences = values.reduce((acc, v) => {
      acc[v] = (acc[v] || 0) + 1;
      return acc;
    }, {});

    if (Object.values(occurrences).includes(3)) return 75; // Three Of A Kind
    if (Object.values(occurrences).filter((v) => v === 2).length === 2)
      return 40; // Two Pair
  }
  if (uniqueValuesCount === 4) {
    const occurrences = values.reduce((acc, v) => {
      acc[v] = (acc[v] || 0) + 1;
      return acc;
    }, {});

    if (Object.values(occurrences).includes(2)) {
      // Jacks or Better
      if ([11, 12, 13, 14].some((jb) => occurrences[jb])) {
        return 10; // Jacks Or Better
      }
    }
  }

  return 0; // No winning hand
};
