import React from "react";
import { BsStarHalf, BsStarFill, BsStar } from "react-icons/bs";

const MAX_STARS = 5;

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = MAX_STARS - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="star-rating">
      {[...Array(fullStars)].map((_, i) => (
        <BsStarFill className="star-rating_icon" key={i} />
      ))}
      {hasHalfStar && <BsStarHalf className="star-rating_icon" />}
      {[...Array(emptyStars)].map((_, i) => (
        <BsStar className="star-rating_icon" key={i} />
      ))}
    </div>
  );
};

export default StarRating;
