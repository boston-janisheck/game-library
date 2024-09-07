const NavBar = ({ selectedCategory, selectedGame }) => {
  let title = "Play Games";
  let logo = "src/assets/home-icon.png";
  let fontFamily = '"Inter", sans-serif'; // Default font

  if (selectedCategory === "casino" && selectedGame === null) {
    title = "The Casino";
    logo = "src/assets/casino-icon.png";
    fontFamily = '"Alfa Slab One", sans-serif'; // Font for Casino
  } else if (selectedCategory === "arcade" && selectedGame === null) {
    title = "The Arcade";
    logo = "src/assets/arcade-icon.png";
    fontFamily = '"Orbitron", sans-serif'; // Font for Arcade
  } else if (selectedGame === "slots") {
    title = "Slots";
    logo = "src/assets/slots-icon.png";
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
