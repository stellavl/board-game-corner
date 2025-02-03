import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReviewCard from "./ReviewCard";
import ReviewModal from "./ReviewModal";
import OrangeButton from "../common/OrangeButton";
import reviews from "../../data/reviews"; 

const Reviews = () => {
  const [show, setShow] = useState(false);
  const [allReviews, setAllReviews] = useState([...reviews].sort((a, b) => new Date(b.date) - new Date(a.date))); // Sort by newest
  const [newReview, setNewReview] = useState({ text: "", rating: 0 });

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleRatingChange = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const loggedInUser = "Current User"; 
    const newDate = new Date().toISOString();

    const reviewToAdd = {
      name: loggedInUser,
      date: newDate,
      text: newReview.text,
      rating: newReview.rating,
    };

    const updatedReviews = [reviewToAdd, ...allReviews];
    setAllReviews(updatedReviews);

    reviews.unshift(reviewToAdd); 
    setNewReview({ text: "", rating: 0 });
    handleClose();
  };

  return (
    <div className="p-3 border-1 rounded ms-5 text-center" style={{ backgroundColor: "var(--color-soft-yellow)", borderColor: "var(--color-orange)", maxWidth: "320px" }}>
      <h5 className="fw-bold mb-2" style={{ color: "var(--color-orange)" }}>Κριτικές</h5>
      <div className="overflow-auto" style={{ maxHeight: "300px", paddingRight: "5px" }}>
        {allReviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
      <div className="mt-2">
        <OrangeButton text="Πρόσθεσε κριτική" size="btn-md" onClick={handleShow} />
      </div>

      <ReviewModal
        show={show}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        newReview={newReview}
        setNewReview={setNewReview}
        handleRatingChange={handleRatingChange}
      />
    </div>
  );
};

export default Reviews;
