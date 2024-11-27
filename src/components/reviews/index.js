import React, { useEffect, useState } from "react";
import RatingCard from "./RatingCard";
import ReviewCard from "./ReviewCard";
import Pagination from "../P";
import { BsSortUpAlt } from "react-icons/bs";
import axios from "axios";

const postsPerPage = 15;

const ProductReview = ({ id }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [reviews, setReviews] = useState([]);

  const [sort, setSort] = useState("");

  const fetchRatingData = async () => {
    const { data } = await axios.get(`/api/reviews/product/${id}?sort=${sort}`);
    setReviews(data);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  useEffect(() => {
    fetchRatingData();
  }, [id, sort]);

  return (
    <div className="reviews">
      <div className="reviews-header">
        <h2 className="rheader--text">Reviews and Ratings</h2>
      </div>
      {reviews && reviews?.length > 0 ? (
        <>
          <RatingCard id={id} />
          <div className="reviews-main">
            <span className="reviews-main_text">Customer Reviews</span>
            <div className="reviews-main--sort">
              <BsSortUpAlt className="reviews-main--sort_icon" />
              <select
                className="reviews-main--sort_select"
                onChange={handleSortChange}
              >
                <option value="date:-1">Date (New to old)</option>
                <option value="date:1">Date (Old to new)</option>
                <option value="rating:-1">Rating (High to low)</option>
                <option value="rating:1">Rating (Low to high)</option>
              </select>
            </div>
          </div>
          <div className="reviews-list">
            {reviews
              .slice(
                postsPerPage * (currentPage - 1),
                postsPerPage * currentPage
              )
              .map((entry) => (
                <ReviewCard key={entry._id} data={entry} />
              ))}
          </div>

          <Pagination
            postsPerPage={postsPerPage}
            totalProducts={reviews?.length}
            paginate={(number) => setCurrentPage(number)}
            current={currentPage}
          />
        </>
      ) : (
        <p>No reviews found</p>
      )}
    </div>
  );
};

export default ProductReview;
