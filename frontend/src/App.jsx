import { useState, useEffect } from "react";
import { TriangleLeftIcon } from "@radix-ui/react-icons";
import NavBar from "./shared/components/NavBar";
import Footer from "./shared/components/Footer.jsx";
import PlayerStatusBar from "./shared/components/PlayerStatusBar";
import Slots from "./casino/slots/components/Slots";
import Blackjack from "./casino/blackjack/Blackjack.jsx";
import { saveTokens, saveBux } from "./api/tokensApi";
import DrawPoker from "./casino/drawPoker/DrawPoker";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [balance, setBalance] = useState(0); // Tokens
  const [allPoints, setAllPoints] = useState(0); // Bux (allPoints)

  const userId = 1; // Static userId for now (adjust to dynamic later)
  const apiEndpoint = "http://localhost:5001";

  useEffect(() => {
    // Fetch tokens
    console.log("[App Load] Fetching initial tokens...");
    fetch(`${apiEndpoint}/tokens/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("[Fetch] Fetched Tokens:", data);
        setBalance(data.balance);
      })
      .catch((error) => console.error("Error fetching tokens:", error));

    // Fetch bux
    console.log("[App Load] Fetching initial bux...");
    fetch(`${apiEndpoint}/bux/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("[Fetch] Fetched Bux (allPoints):", data);
        setAllPoints(data.balance);
      })
      .catch((error) => console.error("Error fetching bux:", error));
  }, []);

  useEffect(() => {
    if (balance >= 0) {
      console.log("[State Change] Sending updated tokens:", balance);
      saveTokens(userId, balance)
        .then((res) => console.log("Tokens save success:", res))
        .catch((err) => console.error("Tokens save error:", err));
    }
  }, [balance]);

  useEffect(() => {
    if (allPoints >= 0) {
      console.log("[State Change] Sending updated bux (allPoints):", allPoints);
      saveBux(userId, allPoints)
        .then((res) => console.log("Bux save success:", res))
        .catch((err) => console.error("Bux save error:", err));
    }
  }, [allPoints]);

  const handleBack = () => {
    if (selectedGame) {
      setSelectedGame(null);
    } else {
      setSelectedCategory(null);
    }
  };

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

    if (selectedCategory === "arcade" && !selectedGame) {
      return (
        <div className="game-selection">
          <button
            className="select-snake"
            onClick={() => setSelectedGame("snake")}
          >
            Play Snake
          </button>
          <button
            className="select-minesweeper"
            onClick={() => setSelectedGame("minesweeper")}
          >
            Play Minesweeper
          </button>
          <button
            className="select-flappy-bird"
            onClick={() => setSelectedGame("flappyBird")}
          >
            Play Flappy Bird
          </button>
        </div>
      );
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
          <button
            className="select-draw-poker"
            onClick={() => setSelectedGame("drawPoker")}
          >
            Play Draw Poker
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
      return (
        <Blackjack
          balance={balance}
          setBalance={setBalance}
          allPoints={allPoints}
          setAllPoints={setAllPoints}
        />
      );
    }

    if (selectedGame === "drawPoker") {
      return (
        <DrawPoker
          balance={balance}
          setBalance={setBalance}
          allPoints={allPoints}
          setAllPoints={setAllPoints}
        />
      );
    }

    if (selectedGame === "snake") {
      return <h2 className="coming-soon-arcade">Coming soon!</h2>;
    }

    if (selectedGame === "minesweeper") {
      return <h2 className="coming-soon-arcade">Coming soon!</h2>;
    }

    if (selectedGame === "flappyBird") {
      return <h2 className="coming-soon-arcade">Coming soon!</h2>;
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
