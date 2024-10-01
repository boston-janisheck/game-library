import { useState, useEffect } from "react";
import BlackjackTable from "./BlackjackTable";
import DealButton from "./DealButton";
import ActionButtons from "./ActionButtons";
import PlayerStatusBar from "../../shared/components/PlayerStatusBar";
import { createDeck, shuffleDeck, calculateHandValue } from "./CardUtilities";
import GameOverPopup from "./GameOverPopup";
import WagerButton from "../../shared/components/WagerButton";

const Blackjack = ({ balance, setBalance, allPoints, setAllPoints }) => {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerTotal, setPlayerTotal] = useState(0);
  const [dealerTotal, setDealerTotal] = useState(0);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [wager, setWager] = useState(1);
  const [gameResult, setGameResult] = useState({ title: "", message: "" });
  const [showDealButton, setShowDealButton] = useState(true);
  const [isDealing, setIsDealing] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const newDeck = shuffleDeck(createDeck());
    setDeck(newDeck);
    resetGame();
  };

  const resetGame = () => {
    const newDeck = shuffleDeck(createDeck()); // Ensure fresh shuffled deck
    setDeck(newDeck);
    setPlayerHand([]);
    setDealerHand([]);
    setPlayerTotal(0);
    setDealerTotal(0);
    setIsPlayerTurn(false);
    setIsGameOver(false);
    setShowDealButton(true);
    setIsDealing(false);
    setGameResult({ title: "", message: "" });
  };

  const dealInitialCards = () => {
    if (deck.length < 4 || isDealing) return;

    setIsDealing(true);
    setShowDealButton(false); // Hide the buttons immediately
    setBalance((prevBalance) => prevBalance - wager); // Immediately deduct the wager from balance

    const newDeck = [...deck];
    const playerCards = [newDeck.pop(), newDeck.pop()];
    const dealerCards = [newDeck.pop(), newDeck.pop()];

    setPlayerHand([playerCards[0]]);
    setDealerHand([dealerCards[0]]);
    setPlayerTotal(calculateHandValue([playerCards[0]]));
    setDealerTotal(calculateHandValue([dealerCards[0]]));
    setDeck(newDeck);

    const dealCardWithDelay = (callback, delay) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          callback();
          resolve();
        }, delay);
      });
    };

    (async () => {
      await dealCardWithDelay(() => {
        setPlayerHand([playerCards[0], playerCards[1]]);
        setDealerHand([dealerCards[0], dealerCards[1]]);
        const newTotal = calculateHandValue([playerCards[0], playerCards[1]]);
        setPlayerTotal(newTotal);
        if (newTotal === 21) {
          setTimeout(() => {
            handlePlayerWin(80); // 80 points for 21
          }, 400);
        } else if (newTotal > 21) {
          setTimeout(() => {
            endGame("You Busted!", "Better luck next time!");
          }, 400);
        }
      }, 400);

      setIsPlayerTurn(true);
      setIsDealing(false);
    })();
  };

  const handlePlayerWin = (points) => {
    const totalPoints = points * wager;
    setAllPoints((prevPoints) => prevPoints + totalPoints);
    endGame("21!", `You just won ${totalPoints} bux!`);
  };

  const handleHit = () => {
    if (!isPlayerTurn || isGameOver || isDealing) return;
    const newDeck = [...deck];
    if (newDeck.length === 0) {
      console.error("Deck is empty, cannot draw a card");
      return;
    }
    const newCard = newDeck.pop();
    if (!newCard) {
      console.error("Drew an undefined card from the deck");
      return;
    }
    const newPlayerHand = [...playerHand, newCard];

    setPlayerHand(newPlayerHand);
    setDeck(newDeck);

    const newTotal = calculateHandValue(newPlayerHand);
    setPlayerTotal(newTotal);

    if (newTotal === 21) {
      setTimeout(() => {
        handlePlayerWin(80); // 80 points for 21
      }, 400);
    } else if (newTotal > 21) {
      setTimeout(() => {
        endGame("You Busted!", "Better luck next time!");
      }, 400);
    }
  };

  const handleStand = () => {
    setIsPlayerTurn(false);
    handleDealerTurn();
  };

  const handleDealerTurn = async () => {
    const newDeck = [...deck];
    let newDealerHand = [...dealerHand];
    let newDealerTotal = calculateHandValue(newDealerHand);

    // Flip the face-down card immediately
    newDealerHand[1] = newDeck.pop();
    setDealerHand(newDealerHand);
    newDealerTotal = calculateHandValue(newDealerHand);
    setDealerTotal(newDealerTotal);

    // Deal subsequent cards with a 400ms delay
    const dealSubsequentCards = async () => {
      while (newDealerTotal < 17) {
        if (newDeck.length === 0) {
          console.error("Deck is empty, cannot draw a card");
          break;
        }
        await new Promise((resolve) => setTimeout(resolve, 400));
        const newCard = newDeck.pop();
        if (!newCard) {
          console.error("Drew an undefined card from the deck");
          break;
        }
        newDealerHand.push(newCard);
        setDealerHand([...newDealerHand]);
        newDealerTotal = calculateHandValue(newDealerHand);
        setDealerTotal(newDealerTotal);
      }
    };

    await dealSubsequentCards();

    setTimeout(() => {
      determineWinner(newDealerTotal);
    }, 400);
  };

  const determineWinner = (finalDealerTotal) => {
    const playerValue = playerTotal;

    if (finalDealerTotal > 21) {
      handlePlayerWin(30); // Dealer busts
      endGame("Dealer busts!", `You just won ${30 * wager} bux!`);
    } else if (playerValue > finalDealerTotal) {
      handlePlayerWin(30); // Player wins
      endGame("Player wins!", `You just won ${30 * wager} bux!`);
    } else if (playerValue < finalDealerTotal) {
      endGame("Dealer wins!", "Better luck next time!");
    } else {
      handlePlayerWin(15); // Push
      endGame("Push!", `You just won ${15 * wager} bux!`);
    }
  };

  const endGame = (title, message) => {
    setGameResult({ title, message });
    setIsGameOver(true);
    setIsPlayerTurn(false);
  };

  return (
    <>
      <div className="blackjack-game">
        {isGameOver && (
          <GameOverPopup
            title={gameResult.title}
            message={gameResult.message}
            onClose={resetGame}
          />
        )}
        <div className="blackjack-container">
          <BlackjackTable
            playerHand={playerHand}
            dealerHand={dealerHand}
            playerTotal={playerTotal}
            dealerTotal={dealerTotal}
            isPlayerTurn={isPlayerTurn}
          />
          <div className="controls">
            {showDealButton ? (
              <>
                <DealButton
                  handleDeal={dealInitialCards}
                  isDealing={isDealing}
                  isDisabled={balance < wager}
                />
                <WagerButton
                  wager={wager}
                  setWager={setWager}
                  disabled={isPlayerTurn || isGameOver || balance < wager}
                />
              </>
            ) : (
              <ActionButtons handleHit={handleHit} handleStand={handleStand} />
            )}
          </div>
        </div>
      </div>
      <PlayerStatusBar
        allPoints={allPoints}
        balance={balance}
        setBalance={setBalance}
      />
    </>
  );
};

export default Blackjack;
