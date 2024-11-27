import React, { useState } from "react";
import AccountLayout from "../../components/accountLayout";
import Review from "../../components/MyReview/Review";
import History from "../../components/MyReview/History";

const tabs = {
  TO_REVIEW: "review",
  HISTORY: "history",
};

const Reviews = () => {
  const [activeTab, setActiveTab] = useState(tabs.TO_REVIEW);

  const renderReviewView = () => {
    switch (activeTab) {
      case tabs.TO_REVIEW:
        return <Review />;
      case tabs.HISTORY:
        return <History />;
      default:
        return <Review />;
    }
  };

  return (
    <AccountLayout>
      <div className="mreviews">
        <div className="mreviews-header">
          <h1>My Reviews</h1>
          <div className="mreviews-tabs">
            <button
              className={`mreviews-tabs_item ${
                activeTab === tabs.TO_REVIEW ? "mreviews-tabs_active" : ""
              }`}
              onClick={() => setActiveTab(tabs.TO_REVIEW)}
            >
              To Review
            </button>
            <button
              className={`mreviews-tabs_item ${
                activeTab === tabs.HISTORY ? "mreviews-tabs_active" : ""
              }`}
              onClick={() => setActiveTab(tabs.HISTORY)}
            >
              History
            </button>
          </div>
        </div>

        {renderReviewView()}
      </div>
    </AccountLayout>
  );
};

export default Reviews;
