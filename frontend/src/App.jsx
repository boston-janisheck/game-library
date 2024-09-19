import { useState, useEffect } from "react";
import { TriangleLeftIcon } from "@radix-ui/react-icons";
import NavBar from "./shared/components/NavBar";
import Footer from "./shared/components/Footer.jsx";
import PlayerStatusBar from "./shared/components/PlayerStatusBar";
import Slots from "./casino/slots/components/Slots";
import Blackjack from "./casino/blackjack/Blackjack.jsx";

import { saveTokens, saveBux } from "./api/tokensApi"; // Importing the correct API functions

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null); // Manage game category selection (arcade/casino)
  const [selectedGame, setSelectedGame] = useState(null); // Manage selected game
  const [balance, setBalance] = useState(0); // For tokens balance
  const [allPoints, setAllPoints] = useState(0); // For bux balance (allPoints)

  const apiEndpoint = "http://localhost:5001"; // Your API base URL

  // ---------------- Fetch Tokens and Bux on Initial Load ---------------- //
  useEffect(() => {
    const userId = 1; // Hard-coded for now, replace with dynamic userId eventually

    // Fetch current tokens (balance)
    fetch(`${apiEndpoint}/tokens/${userId}`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch tokens");
        return response.json();
      })
      .then((data) => setBalance(data.balance)) // Set balance state on success
      .catch((error) => console.error("Error fetching tokens:", error));

    // Fetch current bux (allPoints)
    fetch(`${apiEndpoint}/bux/${userId}`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch bux");
        return response.json();
      })
      .then((data) => setAllPoints(data.balance))
      .catch((error) => console.error("Error fetching bux:", error));
  }, []); // Empty dependency array ensures this runs once on component mount

  // ---------------- Persist Tokens When Balance Changes ---------------- //
  useEffect(() => {
    if (balance >= 0) {
      // Ensure valid balance
      saveTokens(1, balance) // Example userId, 1
        .then((response) => console.log("Tokens saved:", response))
        .catch((error) => console.error("Error saving tokens:", error));
    }
  }, [balance]); // Trigger effect when the `balance` state changes

  // ---------------- Persist Bux When AllPoints Changes ---------------- //
  useEffect(() => {
    if (allPoints >= 0) {
      // Ensure valid bux (allPoints)
      saveBux(1, allPoints) // Example userId, 1
        .then((response) => console.log("Bux saved:", response))
        .catch((error) => console.error("Error saving bux:", error));
    }
  }, [allPoints]); // Trigger effect when `allPoints` state changes

  // ---------------- Handle Navigation (Back Button) ---------------- //
  const handleBack = () => {
    if (selectedGame) {
      setSelectedGame(null); // Go back to casino game selection
    } else {
      setSelectedCategory(null); // Go back to choosing category
    }
  };

  // ---------------- Render Game Content ---------------- //
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
          balance={balance} // Tokens passed to Slots
          setBalance={setBalance} // Ability to update balance
          allPoints={allPoints} // Bux passed to Slots
          setAllPoints={setAllPoints} // Ability to update allPoints (bux)
        />
      );
    }

    if (selectedGame === "blackjack") {
      return <Blackjack />; // Include your blackjack logic
    }
  };

  // ---------------- Return Main Structure ---------------- //
  return (
    <div>
      {/* Main Navigation Bar */}
      <NavBar selectedCategory={selectedCategory} selectedGame={selectedGame} />

      {/* Back button when we're within a selected game or menu */}
      {(selectedCategory || selectedGame) && (
        <button onClick={handleBack} className="back-button">
          <TriangleLeftIcon className="back-icon" />
        </button>
      )}

      {/* Main content based on selection */}
      <main>{renderContent()}</main>

      {/* Player Status Bar for Tokens and Bux */}
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
