import React from "react";
import Card from "./Card";

const Hand = ({ cards, hideSecondCard }) => {
  return (
    <div className="hand">
      {cards.map((card, index) => (
        <Card
          key={index}
          value={hideSecondCard && index === 1 ? "Face Down" : card.value}
          suit={hideSecondCard && index === 1 ? "" : card.suit}
        />
      ))}
    </div>
  );
};

export default Hand;
