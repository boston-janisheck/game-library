import { useState, useEffect } from "react";
import { TriangleLeftIcon } from "@radix-ui/react-icons";
import NavBar from "./shared/components/NavBar";
import Footer from "./shared/components/Footer.jsx";
import PlayerStatusBar from "./shared/components/PlayerStatusBar";
import Slots from "./casino/slots/components/Slots";
import Blackjack from "./casino/blackjack/Blackjack.jsx";

import { saveTokens, saveBux } from "./api/tokensApi"; // Added saveBux here

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [balance, setBalance] = useState(0); // For tokens
  const [allPoints, setAllPoints] = useState(0); // For Bux (allPoints)

  // Handle going back to previous selection
  const handleBack = () => {
    if (selectedGame) {
      setSelectedGame(null); // Go back to the casino game selection
    } else {
      setSelectedCategory(null); // Go back to the category selection
    }
  };

  const apiEndpoint = "http://localhost:5001"; // Replace with your API endpoint

  // Fetch balance and points when game is selected
  useEffect(() => {
    if (selectedGame) {
      fetch(`${apiEndpoint}/balance`)
        .then((response) => response.json())
        .then((data) => setBalance(data.balance))
        .catch((error) => console.error("Error fetching balance:", error));

      fetch(`${apiEndpoint}/points`)
        .then((response) => response.json())
        .then((data) => setAllPoints(data.points))
        .catch((error) => console.error("Error fetching points:", error));
    }
  }, [selectedGame]);

  // Persist tokens (balance) when balance changes
  useEffect(() => {
    if (balance > 0) {
      // Only persist positive values
      const userId = 1; // Example user ID; customize as needed
      saveTokens(userId, balance)
        .then((savedToken) => {
          console.log("Tokens saved successfully:", savedToken);
        })
        .catch((error) => {
          console.error("Error saving tokens:", error);
        });
    }
  }, [balance]); // Run effect when `balance` changes

  // Persist bux (allPoints) when allPoints changes
  useEffect(() => {
    if (allPoints > 0) {
      // Only persist positive values
      const userId = 1; // Example user ID; customize as needed
      saveBux(userId, allPoints)
        .then((savedBux) => {
          console.log("Bux saved successfully:", savedBux);
        })
        .catch((error) => {
          console.error("Error saving bux:", error);
        });
    }
  }, [allPoints]); // Run effect when `allPoints` changes

  // Logic to handle the content that should be rendered based on selection
  const renderContent = () => {
    if (!selectedCategory) {
      return (
        <div className="game-selection">
          <button
            className="select-casino"
            onClick={() => setSelectedCategory("casino")}
          >
            The Casino
          </button>
          <button
            className="select-arcade"
            onClick={() => setSelectedCategory("arcade")}
          >
            The Arcade
          </button>
        </div>
      );
    }

    if (selectedCategory === "arcade") {
      return <h2 className="coming-soon">Games coming soon!</h2>;
    }

    if (selectedCategory === "casino" && !selectedGame) {
      return (
        <div className="game-selection">
          <button
            className="select-slots"
            onClick={() => setSelectedGame("slots")}
          >
            Play Slots
          </button>
          <button
            className="select-blackjack"
            onClick={() => setSelectedGame("blackjack")}
          >
            Play Blackjack
          </button>
        </div>
      );
    }

    if (selectedGame === "slots") {
      return (
        <Slots
          balance={balance}
          setBalance={setBalance}
          allPoints={allPoints}
          setAllPoints={setAllPoints}
        />
      );
    }

    if (selectedGame === "blackjack") {
      return <Blackjack />;
    }
  };

  return (
    <div>
      <NavBar selectedCategory={selectedCategory} selectedGame={selectedGame} />
      {(selectedCategory || selectedGame) && (
        <button onClick={handleBack} className="back-button">
          <TriangleLeftIcon className="back-icon" />
        </button>
      )}
      <main>{renderContent()}</main>
      <PlayerStatusBar
        balance={balance}
        setBalance={setBalance}
        allPoints={allPoints}
      />
      <Footer />
    </div>
  );
};

export default App;
