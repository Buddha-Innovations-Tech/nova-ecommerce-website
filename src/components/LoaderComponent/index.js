import React from "react";

const LoaderComponent = ({ height }) => {
  return (
    <ul className="loader" style={{ height: `${height}rem` }}>
      <li className="loader__item"></li>
      <li className="loader__item"></li>
      <li className="loader__item"></li>
    </ul>
  );
};

export default LoaderComponent;
