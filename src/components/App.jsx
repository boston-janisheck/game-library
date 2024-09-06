import { useState } from "react";
import NavBar from "./NavBar";
import Slots from "./Slots";
import Footer from "./Footer";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);

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
          <button onClick={() => setSelectedCategory("casino")}>
            The Casino
          </button>
          <button onClick={() => setSelectedCategory("arcade")}>
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
        <div className="casino-games">
          <button onClick={() => setSelectedGame("slots")}>Slots</button>
          {/* Add more buttons for additional casino games here */}
        </div>
      );
    }

    if (selectedGame === "slots") {
      return <Slots />;
    }
  };

  return (
    <div>
      <NavBar selectedCategory={selectedCategory} selectedGame={selectedGame} />
      {(selectedCategory || selectedGame) && (
        <button onClick={handleBack} className="back-button">
          Back
        </button>
      )}
      <main>{renderContent()}</main>
      <Footer />
    </div>
  );
};

export default App;
