export const calculateHandValue = (hand) => {
  let value = 0;
  let numberOfAces = 0;

  hand.forEach((card) => {
    if (!card || !card.value) {
      console.error("Invalid card:", card);
      return;
    }

    if (card.value === "J" || card.value === "Q" || card.value === "K") {
      value += 10;
    } else if (card.value === "A") {
      numberOfAces += 1;
      value += 11;
    } else {
      value += card.value;
    }
  });

  while (value > 21 && numberOfAces) {
    value -= 10;
    numberOfAces -= 1;
  }

  return value;
};
