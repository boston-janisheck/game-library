import React from "react";
import buxIcon from "../../shared/assets/images/bux.png";

const DrawPokerPointsKey = () => {
  const points = [
    { title: "Royal Flush", value: 5000 },
    { title: "Straight Flush", value: 1500 },
    { title: "Four Of A Kind", value: 600 },
    { title: "Full House", value: 300 },
    { title: "Flush", value: 200 },
    { title: "Straight", value: 125 },
    { title: "Three Of A Kind", value: 75 },
    { title: "Two Pair", value: 40 },
    { title: "Jacks Or Better", value: 10 },
  ];

  return (
    <div className="points-key">
      {points.map((point, index) => (
        <div className="row" key={index}>
          <div className="title">{point.title}</div>
          <div className="value">
            {point.value}
            <img src={buxIcon} alt="bux icon" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DrawPokerPointsKey;
