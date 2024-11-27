import React from "react";

const CarSkeletons = ({ height, width, margin }) => {
  return (
    <div>
      <div
        className="skeleton-box"
        style={{ height: `${height}`, width: `${width}`, margin: `${margin}` }}
      ></div>
    </div>
  );
};

export default CarSkeletons;
