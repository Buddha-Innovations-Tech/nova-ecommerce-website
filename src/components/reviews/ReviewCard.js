import React from "react";
import StarRating from "./StarRating";
import { formatDistance } from "date-fns";
import { MdVerifiedUser } from "react-icons/md";

const ReviewCard = ({ data }) => {
  return (
    <div className="reviews-card">
      <div>
        <div className="reviews-card_header">
          <StarRating rating={data.rating} />
          <span className="reviews-card_header--date">
            {formatDistance(new Date(data.date), new Date(), {
              addSuffix: true,
            })}
          </span>
        </div>

        <div className="reviews-card_author">
          <span className="author_name">By {data?.user.name}</span>
          <div className="verified_badge">
            <MdVerifiedUser className="verified_badge--icon" />
            <span className="verified_badge--text">Verified Purchase</span>
          </div>
        </div>
      </div>

      <p className="reviews-card_text">{data.review}</p>

      {data.images && data?.images?.length > 0 ? (
        <div className="reviews-card_images">
          {data.images.map((entry, key) => (
            <img
              src={`${process.env.REACT_APP_IMAGE_PREFIX}${entry}`}
              alt=""
              key={key}
              className="reviews-card_images--item"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default ReviewCard;
