import { useState, useEffect } from "react";
import { createDeck, shuffleDeck } from "../shared/CardUtilities";
import DrawPokerHand from "./DrawPokerHand";
import DealButton from "../shared/DealButton";
import WagerButton from "../../shared/components/WagerButton";
import DrawPokerPointsKey from "./DrawPokerPointsKey";
import { evaluateHand } from "./PokerUtilities";
import GameOverPopup from "../shared/GameOverPopup";

const DrawPoker = ({ balance, setBalance, allPoints, setAllPoints }) => {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [heldCards, setHeldCards] = useState([]);
  const [wager, setWager] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameResult, setGameResult] = useState({ title: "", message: "" });
  const [showDealButton, setShowDealButton] = useState(true);
  const [showWagerButton, setShowWagerButton] = useState(true);

  useEffect(() => {
    setDeck(shuffleDeck(createDeck())); // Initialize and shuffle deck when component mounts
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (showDealButton || isGameOver) return;

      const key = parseInt(event.key, 10);
      if (key >= 1 && key <= 5) {
        toggleHold(key - 1); // Subtract 1 to align the key with index (0-based)
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [showDealButton, isGameOver, heldCards]);

  const dealCards = () => {
    if (showDealButton) {
      if (balance < wager) return; // Prevent dealing if balance is insufficient

      // Reset the held cards for a new game before dealing
      setHeldCards([]);

      // Initialize a new shuffled deck
      const newDeck = shuffleDeck(createDeck());
      const newPlayerHand = [];

      for (let i = 0; i < 5; i++) {
        newPlayerHand.push(newDeck.pop());
      }

      setPlayerHand(newPlayerHand);
      setDeck(newDeck);
      setShowDealButton(false);
      setShowWagerButton(false); // Hide wager button after initial deal
      setBalance(balance - wager);
    } else {
      // Reset held cards in preparation for another drawing round
      setHeldCards([]);

      // Draw new cards
      const newDeck = [...deck];
      const newPlayerHand = playerHand.map((card, index) =>
        heldCards.includes(index) ? card : newDeck.pop()
      );
      setPlayerHand(newPlayerHand);
      setDeck(newDeck);

      const { title, points } = evaluateHand(newPlayerHand);
      const totalPoints = points * wager;

      setTimeout(() => {
        if (points > 0) {
          setAllPoints(allPoints + totalPoints);
          setGameResult({
            title: title,
            message: `You just earned ${totalPoints} bux!`,
          });
          setIsGameOver(true);
        }

        setShowDealButton(true); // Reset for a new game start
        setShowWagerButton(true); // Re-show the wager button after delay
      }, 600);
    }
  };

  const toggleHold = (index) => {
    if (showDealButton || isGameOver) return; // Prevent holding cards after the game is finished
    setHeldCards((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const resetGame = () => {
    setIsGameOver(false);
    setGameResult({ title: "", message: "" });
    // Keep the current hand until the next deal is pressed
  };

  return (
    <div className="blackjack-container">
      {isGameOver && (
        <GameOverPopup
          title={gameResult.title}
          message={gameResult.message}
          onClose={resetGame}
        />
      )}
      <DrawPokerPointsKey />
      <DrawPokerHand
        cards={playerHand}
        onClickCard={toggleHold}
        heldCards={heldCards}
      />
      <div className="controls">
        <DealButton
          handleDeal={dealCards}
          isDisabled={showDealButton && balance < wager} // Disable only for the initial deal
        />
        {showWagerButton && <WagerButton wager={wager} setWager={setWager} />}
      </div>
      <div>{!showDealButton && <p>Tap to hold cards or press 1-5</p>}</div>
    </div>
  );
};

export default DrawPoker;
