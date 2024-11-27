import React, { useEffect, useState } from "react";
import RatingSummary from "./RatingSummary";
import { BsStarFill } from "react-icons/bs";
import axios from "axios";

const RatingCard = ({ id }) => {
  const [data, setData] = useState("");

  const fetchRatingData = async () => {
    const { data } = await axios.get(`/api/reviews/rating/${id}`);
    setData(data.data);
  };

  useEffect(() => {
    fetchRatingData();
  }, [id]);

  return (
    <div className="row reviews-summary">
      <div className="col-md-6">
        <RatingSummary data={data.ratings} total={data.total} />
      </div>
      <div className="col-md-6 reviews-summary_total">
        <div className="total-stars">
          <span className="total-stars_text">
            {parseFloat(data.averageRating).toFixed(1)}
          </span>
          <BsStarFill className="total-stars_icon" />
        </div>
        <span className="total_reviews">
          {data.total} {data.total > 1 ? "Reviews" : "Review"}
        </span>
      </div>
    </div>
  );
};

export default RatingCard;
