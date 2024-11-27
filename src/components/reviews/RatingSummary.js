import React, { useState } from "react";
import { BsStarFill } from "react-icons/bs";

const RatingSummary = ({ data, total }) => {
  const [selectedStar, setSelectedStar] = useState(null);

  const getRatingPercentage = (value) => {
    const percent = 100 * (value / total);
    return parseFloat(percent.toFixed(2));
  };

  const handleStarFilter = (star) => {
    if (star === selectedStar) {
      setSelectedStar(null);
    } else {
      setSelectedStar(star);
    }
  };

  return (
    <div className="rating-summary">
      {data && data.length > 0
        ? data.map((entry) => {
            const percentage = getRatingPercentage(entry.count);

            return (
              <button
                onClick={() => handleStarFilter(entry.id)}
                className="rating-summary_item"
                key={entry.id}
              >
                <div className="rating-summary_item--star">
                  <span className="text">{entry.id}</span>
                  <BsStarFill
                    className={`icon ${
                      selectedStar === entry.id ? "selected" : ""
                    }`}
                  />
                </div>
                <div className="rating-summary_item--bar">
                  <div
                    className="bar--main"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>
                <span className="rating-summary_item--per">{percentage}%</span>
              </button>
            );
          })
        : null}
    </div>
  );
};

export default RatingSummary;
