import { format } from "date-fns";
import React, { useState } from "react";
import ReviewModal from "./ReviewModal";
import { addReviewAsync } from "../../redux/reviewSlice";

const ReviewItem = ({ data }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="mreviews-list_item" onClick={() => setShowModal(true)}>
        <div className="mr-image">
          <img
            className="mr-image_item"
            src={`${process.env.REACT_APP_IMAGE_PREFIX}${data.image}`}
            alt={data.name}
          />
        </div>
        <div className="mr-det">
          <span className="mr-det_title">
            {data.name.substring(0, 30)}
            {data.name.length > 30 ? "..." : null}
          </span>
          <span className="mr-det_cat">Category: {data.category}</span>
          <span className="mr-det_date">
            Ordered on: {format(new Date(data.date), "dd/MM/yyyy")}
          </span>
        </div>
        <div className="mr-bton">Review</div>
      </button>
      {showModal ? (
        <ReviewModal
          showModal={setShowModal}
          header="Add Review"
          data={data}
          dispatchFunction={addReviewAsync}
        />
      ) : null}
    </>
  );
};

export default ReviewItem;
