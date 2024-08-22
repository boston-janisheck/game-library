import Footer from "./Footer";
import NavBar from "./NavBar";
import PointsKey from "./PointsKey";
import Slots from "./Slots";

const pointsData = [
  { symbol: "7️⃣", points: 500 },
  { symbol: "🍀", points: 150 },
  { symbol: "🍒", points: 125 },
  { symbol: "🍇", points: 100 },
  { symbol: "🍌", points: 75 },
  { symbol: "🔔", points: 50 },
];

const App = () => {
  return (
    <>
      <NavBar />
      <PointsKey pointsData={pointsData} />
      <Slots pointsData={pointsData} />
      <Footer />
    </>
  );
};

export default App;
