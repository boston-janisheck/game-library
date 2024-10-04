// DrawPoker.jsx
import { useState } from "react";
import { createDeck, shuffleDeck } from "../shared/CardUtilities";
import DrawPokerHand from "./DrawPokerHand";
import DealButton from "../shared/DealButton";
import WagerButton from "../../shared/components/WagerButton";
import DrawPokerPointsKey from "./DrawPokerPointsKey";
import { evaluateHand } from "./PokerUtilities";

const DrawPoker = ({ balance, setBalance, allPoints, setAllPoints }) => {
  const [deck, setDeck] = useState(shuffleDeck(createDeck()));
  const [playerHand, setPlayerHand] = useState([]);
  const [heldCards, setHeldCards] = useState([]);
  const [wager, setWager] = useState(1);
  const [pointsWon, setPointsWon] = useState(0);
  const [showDealButton, setShowDealButton] = useState(true);

  const dealCards = () => {
    if (showDealButton) {
      // Initial deal
      const newDeck = [...deck];
      const newPlayerHand = [];
      for (let i = 0; i < 5; i++) {
        newPlayerHand.push(newDeck.pop());
      }
      setPlayerHand(newPlayerHand);
      setDeck(newDeck);
      setShowDealButton(false);
      setBalance(balance - wager);
    } else {
      // Draw new cards
      const newDeck = [...deck];
      const newPlayerHand = playerHand.map((card, index) =>
        heldCards.includes(index) ? card : newDeck.pop()
      );
      setPlayerHand(newPlayerHand);
      setDeck(newDeck);

      const points = evaluateHand(newPlayerHand);
      setPointsWon(points);
      setAllPoints(allPoints + points * wager);

      setShowDealButton(true);
      setHeldCards([]);
    }
  };

  const toggleHold = (index) => {
    if (heldCards.includes(index)) {
      setHeldCards(heldCards.filter((i) => i !== index));
    } else {
      setHeldCards([...heldCards, index]);
    }
  };

  return (
    <div className="blackjack-container">
      <DrawPokerPointsKey />
      <DrawPokerHand
        cards={playerHand}
        onClickCard={toggleHold}
        heldCards={heldCards}
      />
      <div className="controls">
        <DealButton handleDeal={dealCards} />
        <WagerButton wager={wager} setWager={setWager} />
      </div>
      {pointsWon > 0 && <div>You won {pointsWon * wager} points!</div>}
      <div>{!showDealButton && <p>Tap to hold cards</p>}</div>
    </div>
  );
};

export default DrawPoker;
