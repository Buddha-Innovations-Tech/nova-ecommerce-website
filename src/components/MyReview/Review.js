import React, { useEffect, useState } from "react";
import emptyImg from "../../assets/images/No data-cuate.svg";
import ReviewItem from "./ReviewItem";
import Pagination from "../P";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchToReviewAsync,
  getFetchToReviewError,
  getFetchToReviewLoading,
  getToReview,
} from "../../redux/reviewSlice";
import LoaderComponent from "../LoaderComponent";

const postsPerPage = 10;

const Review = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const data = useSelector(getToReview);
  const loading = useSelector(getFetchToReviewLoading);
  const error = useSelector(getFetchToReviewError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data || data.length === 0) {
      dispatch(fetchToReviewAsync());
    }
  }, []);

  if (loading) {
    return <LoaderComponent height={2} />;
  }

  if (error) {
    return (
      <p
        style={{
          color: "red",
          fontSize: "14px",
          textAlign: "center",
        }}
      >
        Some error occured. Please try again later.
      </p>
    );
  }

  return (
    <div className="mreviews-list">
      {data && data.length > 0 ? (
        data
          .slice(postsPerPage * (currentPage - 1), postsPerPage * currentPage)
          .map((entry) => <ReviewItem data={entry} key={entry._id} />)
      ) : (
        <div className="mreviews-list_empty">
          <span className="mreviews-list_empty--text">
            There is no item to review
          </span>
          <img
            src={emptyImg}
            alt="No past orders"
            className="mreviews-list_empty--img"
          />
          <Link to="/" className="mreviews-list_empty--link">
            Continue Shopping
          </Link>
        </div>
      )}
      <Pagination
        postsPerPage={postsPerPage}
        totalProducts={data.length}
        paginate={(number) => setCurrentPage(number)}
        current={currentPage}
      />
    </div>
  );
};

export default Review;
