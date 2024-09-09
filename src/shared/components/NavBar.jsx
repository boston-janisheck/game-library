import casinoLogo from "../assets/images/casino-icon.png";
import arcadeLogo from "../assets/images/arcade-icon.png";
import slotsLogo from "../assets/images/slots-icon.png";
import homeLogo from "../assets/images/home-icon.png";
import blackjackLogo from "../assets/images/blackjack-icon.png";

const NavBar = ({ selectedCategory, selectedGame }) => {
  let title = "Play Games";
  let logo = homeLogo;
  let fontFamily = '"Inter", sans-serif'; // Default font

  if (selectedCategory === "casino" && selectedGame === null) {
    title = "The Casino";
    logo = casinoLogo;
    fontFamily = '"Alfa Slab One", sans-serif'; // Font for Casino
  } else if (selectedCategory === "arcade" && selectedGame === null) {
    title = "The Arcade";
    logo = arcadeLogo;
    fontFamily = '"Orbitron", sans-serif'; // Font for Arcade
  } else if (selectedGame === "slots") {
    title = "Slots";
    logo = slotsLogo;
    fontFamily = '"Alfa Slab One", sans-serif'; // Font for Slots
  } else if (selectedGame === "blackjack") {
    title = "Blackjack";
    logo = blackjackLogo;
    fontFamily = '"Alfa Slab One", sans-serif'; // Font for Slots
  }

  return (
    <nav className="navbar">
      <img src={logo} alt="logo" className="navbar-logo" />
      <h1 className="navbar-title" style={{ fontFamily }}>
        {title}
      </h1>
    </nav>
  );
};

export default NavBar;
