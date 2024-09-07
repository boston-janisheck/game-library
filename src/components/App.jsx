import { useState } from "react";
import NavBar from "./NavBar";
import Slots from "./Slots";
import Footer from "./Footer";
import { TriangleLeftIcon } from "@radix-ui/react-icons";
import PlayerStatusBar from "./PlayerStatusBar";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [balance, setBalance] = useState(0);
  const [allPoints, setAllPoints] = useState(0);

  // Function to handle going back
  const handleBack = () => {
    if (selectedGame) {
      setSelectedGame(null); // Go back to the casino game selection
    } else {
      setSelectedCategory(null); // Go back to the category selection
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

    if (selectedCategory === "arcade") {
      return <h2>Games coming soon</h2>;
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
          {/* Add more buttons for additional casino games here */}
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
