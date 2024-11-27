import React, { useState } from "react";
import { BsCheck2, BsStarFill, BsXLg } from "react-icons/bs";
import { LuLoader2 } from "react-icons/lu";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import { useDispatch } from "react-redux";

const ReviewStarInput = ({
  rating,
  setRating,
  ratingError,
  setRatingError,
}) => {
  return (
    <>
      <div className="rmodal-rating">
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            <label key={i} className="rmodal-rating_label">
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={(e) => {
                  setRating(parseInt(e.target.value));
                  setRatingError("");
                }}
                className="rmodal-rating_input"
              />
              <BsStarFill
                className={`rmodal-rating_icon ${
                  ratingValue <= rating
                    ? "rmodal-rating_fill"
                    : "rmodal-rating_empty"
                }`}
              />
            </label>
          );
        })}
        <span className="text-textDim text-sm pl-2">({rating} stars)</span>
      </div>
      {ratingError ? (
        <span className="rmodal-form_error">{ratingError}</span>
      ) : null}
    </>
  );
};

const ImagePlaceholder = () => {
  return (
    <div className="rmodal-images_imgp">
      <LuLoader2 className="rmodal-images_imgp_icon" />
    </div>
  );
};

const ReviewModal = ({
  pastRating,
  pastReview,
  pastImages,
  showModal,
  header,
  data,
  dispatchFunction,
}) => {
  const dispatch = useDispatch();

  const [rating, setRating] = useState(pastRating || 0);
  const [ratingError, setRatingError] = useState("");

  const [review, setReview] = useState(pastReview || "");
  const [reviewError, setReviewError] = useState("");

  const [images, setImages] = useState(pastImages || []);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [selectedSize, setSelectedSize] = useState(0);

  const [status, setStatus] = useState("idle");
  const [submitError, setSubmitError] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    setSelectedSize(e.target.files.length);
    const files = e.target.files;

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("image", file);
        setUploading(true);
        setUploadError(false);
        const { accessToken: token } = JSON.parse(
          localStorage.getItem("userInfo")
        );
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        };
        const { data } = await axios.post("/api/upload", formData, config);
        setImages((prev) => [data, ...prev]);
        setSelectedSize((prev) => prev - 1);
      }
    } catch (error) {
      setUploadError(true);
    } finally {
      setUploading(false);
    }
  };

  const handleImageRemove = (image) => {
    setImages((prev) => prev.filter((entry) => entry !== image));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    setStatus("loading");

    const formattedReview = review.trim();

    if (!formattedReview) {
      setReviewError("Required!");
      isValid = false;
    } else if (formattedReview.length < 8) {
      setReviewError("Too short!");
      isValid = false;
    } else if (formattedReview.length > 500) {
      setReviewError("Too long!");
      isValid = false;
    }

    if (isNaN(rating) || rating === 0 || !rating) {
      setRatingError("Required!");
      isValid = false;
    }

    if (isValid) {
      const reviewData = { rating, review, images };

      console.log(reviewData);
      try {
        await dispatch(
          dispatchFunction({ data: reviewData, id: data._id })
        ).unwrap();
        setStatus("success");

        setTimeout(() => {
          showModal(false);
        }, 2000);
      } catch (err) {
        setSubmitError(
          (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString()
        );
        setStatus("idle");
      }
    } else {
      setStatus("idle");
    }
  };

  return (
    <div className="rmodal">
      <div className="rmodal-bg" onClick={() => showModal(false)} />
      <div className="rmodal-main">
        <div className="rmodal-dialog">
          <div className="rmodal-dialog_header">
            <span className="rmodal-dialog_header--text">{header}</span>
            <button
              onClick={() => showModal(false)}
              className="rmodal-dialog_header--bton"
            >
              <BsXLg />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="rmodal-form">
            <div className="rmodal-form_item">
              <span className="rmodal-form_label">Product</span>
              <div className="rmodal-product">
                <div className="rmproduct-image">
                  <img
                    className="rmproduct-image_item"
                    src={`${process.env.REACT_APP_IMAGE_PREFIX}${data.image}`}
                    alt={data.name}
                  />
                </div>
                <div className="rmproduct-det">
                  <span className="rmproduct-det_title">
                    {data.name.substring(0, 30)}
                    {data.name.length > 30 ? "..." : null}
                  </span>
                  <span className="rmproduct-det_cat">
                    Category: {data.category}
                  </span>
                </div>
              </div>
            </div>

            <div className="rmodal-form_item">
              <span className="rmodal-form_label">Rating</span>
              <ReviewStarInput
                rating={rating}
                setRating={setRating}
                ratingError={ratingError}
                setRatingError={setRatingError}
              />
            </div>

            <div className="rmodal-form_item">
              <label htmlFor="review" className="rmodal-form_label">
                Review
              </label>
              <div className="rmodal-review">
                <textarea
                  className="rmodal-review_input"
                  placeholder="Write a review..."
                  value={review}
                  onChange={(e) => {
                    setReview(e.target.value);
                    setReviewError("");
                  }}
                  onBlur={(e) => {
                    if (!review) {
                      setReviewError("Required!");
                    } else {
                      setReviewError("");
                    }
                  }}
                />
                <div className="rmodal-review_footer">
                  <span className="rmodal-form_error">{reviewError}</span>

                  <span className="rmodal-review_count">
                    {review.length || 0}/500
                  </span>
                </div>
              </div>
              <div className="rmodal-images">
                {images.map((entry, key) => (
                  <div className="rmodal-images_item">
                    <img
                      src={`${process.env.REACT_APP_IMAGE_PREFIX}${entry}`}
                      key={key}
                      alt=""
                      className="rmodal-images_item--img"
                    />
                    <button
                      className="rmodal-images_item--icon"
                      type="button"
                      onClick={() => handleImageRemove(entry)}
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                ))}
                {uploading &&
                  [...Array(selectedSize)].map((entry) => (
                    <ImagePlaceholder key={entry} />
                  ))}
              </div>
              {uploadError ? (
                <span className="rmodal-form_error">
                  Some error occured. Please try again
                </span>
              ) : null}
            </div>
            {submitError && (
              <span className="rmodal-form_error text-end">{submitError}</span>
            )}
            <div className="rmodal-btns">
              <label className="rmodal_upload-bton">
                <input
                  type="file"
                  name="image"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleUpload}
                  multiple
                />
                Attach Images
              </label>
              <button
                type="submit"
                className="rmodal_submit-bton"
                disabled={status !== "idle"}
              >
                <span>
                  {status === "success" ? (
                    <BsCheck2 />
                  ) : status === "loading" ? (
                    <LuLoader2 className="rmodal_spin" />
                  ) : (
                    "Submit"
                  )}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
