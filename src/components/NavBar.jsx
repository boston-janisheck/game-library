const NavBar = ({ selectedCategory, selectedGame }) => {
  let title = "Play Games";
  let logo = "src/assets/home-icon.png";

  // Conditional rendering based on selectedCategory
  if (selectedCategory === "casino" && selectedGame === null) {
    title = "The Casino";
    logo = "src/assets/casino-icon.png";
  } else if (selectedCategory === "arcade" && selectedGame === null) {
    title = "The Arcade";
    logo = "src/assets/arcade-icon.png";
  } else if (selectedGame === "slots") {
    title = "Slots";
    logo = "src/assets/slots-icon.png";
  }

  return (
    <nav className="navbar">
      <img src={logo} alt="logo" className="navbar-logo" />
      <h1 className="navbar-title">{title}</h1>
    </nav>
  );
};

export default NavBar;
