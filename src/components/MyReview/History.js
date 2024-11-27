import React, { useEffect, useState } from "react";
import Pagination from "../P";
import { Link } from "react-router-dom";
import HistoryItem from "./HistoryItem";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReviewHistoryAsync,
  getFetchReviewHistoryError,
  getFetchReviewHistoryLoading,
  getMyReviews,
} from "../../redux/reviewSlice";
import LoaderComponent from "../LoaderComponent";

const postsPerPage = 10;

const Review = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const data = useSelector(getMyReviews);
  const loading = useSelector(getFetchReviewHistoryLoading);
  const error = useSelector(getFetchReviewHistoryError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data || data.length === 0) {
      dispatch(fetchReviewHistoryAsync());
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
    <div className="mreviews-history">
      {data && data.length > 0 ? (
        data.map((entry) => <HistoryItem data={entry} key={entry.id} />)
      ) : (
        <div className="mreviews-history_empty">
          <span className="mreviews-history_empty--text">
            You have not given any reviews yet
          </span>
          <Link to="/orders" className="mreviews-history_empty--link">
            Give Reviews
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
