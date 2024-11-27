import { formatDistance } from "date-fns";
import React, { useState } from "react";
import StarRating from "../reviews/StarRating";
import { BsDot } from "react-icons/bs";
import ReviewModal from "./ReviewModal";
import { resubmitReviewAsync } from "../../redux/reviewSlice";

const statusMapping = {
  ACCEPTED: {
    text: "Approved",
    color: "mreviews-history-apr_text",
    background: "mreviews-history-apr_bg",
  },
  PENDING: {
    text: "Pending",
    color: "mreviews-history-pen_text",
    background: "mreviews-history-pen_bg",
  },
  REJECTED: {
    text: "Rejected",
    color: "mreviews-history-rej_text",
    background: "mreviews-history-rej_bg",
  },
};

const HistoryItem = ({ data }) => {
  const status = statusMapping[data.status];
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={`mreviews-history_item ${status.background}`}>
      <span className={`mh-status ${status.color}`}>{status.text}</span>
      <div className="mh-product">
        <div className="mh-product_img">
          <img
            className="mh-product_img--item"
            alt={data?.product?.name}
            src={`${process.env.REACT_APP_IMAGE_PREFIX}${data?.product?.heroImage}`}
          />
        </div>
        <div className="mh-product-info">
          <span className="mh-product-info_title">{data?.product?.name}</span>
          <div className="mh-product-info_stars">
            <StarRating rating={data.rating} />
            <BsDot className="mh-product-info_stars--dot" />
            <span className="mh-product-info_stars--date">
              {formatDistance(new Date(data.date), new Date(), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>
      </div>

      <div className="mh-review">
        <p className="mh-review_text">{data.review}</p>

        {data.images && data?.images?.length > 0 ? (
          <div className="mh-review_images">
            {data.images.map((entry, key) => (
              <img
                src={`${process.env.REACT_APP_IMAGE_PREFIX}${entry}`}
                alt=""
                key={key}
                className="mh-review_images--item"
              />
            ))}
          </div>
        ) : null}
      </div>

      {status.text === "Rejected" ? (
        <div className="mh-rejected">
          <div className="mh-rejected_remarks">
            <span className="mh-rejected_remarks--title">Remarks:</span>
            <span>{data.remarks}</span>
          </div>
          <button
            className="mh-rejected-bton"
            onClick={() => setShowModal(true)}
          >
            Re-submit
          </button>
        </div>
      ) : null}
      {showModal ? (
        <ReviewModal
          showModal={setShowModal}
          pastRating={data.rating}
          pastReview={data.review}
          pastImages={data.images}
          header="Update Review"
          data={{
            _id: data._id,
            category: "DEMO",
            image: data?.product?.heroImage,
            name: data?.product?.name,
          }}
          dispatchFunction={resubmitReviewAsync}
        />
      ) : null}
    </div>
  );
};

export default HistoryItem;
