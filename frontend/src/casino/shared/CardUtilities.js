const suits = ["♦", "♥", "♠", "♣"];
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];

export const createDeck = () => {
  let deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ value, suit });
    }
  }
  return deck;
};

export const shuffleDeck = (deck) => {
  let shuffledDeck = [...deck];
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }
  return shuffledDeck;
};
