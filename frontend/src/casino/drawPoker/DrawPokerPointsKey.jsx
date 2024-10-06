import React from "react";
import buxIcon from "../../shared/assets/images/bux.png";

const DrawPokerPointsKey = ({ wager }) => {
  const points = [
    { title: "Royal Flush", value: 5000 * wager },
    { title: "Straight Flush", value: 1500 * wager },
    { title: "Four Of A Kind", value: 600 * wager },
    { title: "Full House", value: 300 * wager },
    { title: "Flush", value: 200 * wager },
    { title: "Straight", value: 125 * wager },
    { title: "Three Of A Kind", value: 75 * wager },
    { title: "Two Pair", value: 40 * wager },
    { title: "Jacks Or Better", value: 10 * wager },
  ];

  return (
    <div className="points-key">
      {points.map((point, index) => (
        <div className="row" key={index}>
          <div className="title">{point.title}</div>
          <div className="value">
            {point.value.toLocaleString()}
            <img src={buxIcon} alt="bux icon" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DrawPokerPointsKey;
