import React, { useState } from "react";
import { Pagination } from "react-bootstrap";
import usePagination from "../../hooks/usePagination";
import ReviewCard from "./ReviewCard";
import OrangeButton from "../common/OrangeButton";
import ReviewModal from "./ReviewModal";
import reviews from "../../data/reviews";

const Reviews = () => {
  const [show, setShow] = useState(false);
  const [newReview, setNewReview] = useState({ text: "", rating: 0 });

  const [expandedState, setExpandedState] = useState({});

  const { currentPage, currentItems, totalPages, handlePageChange } = usePagination(
    reviews, 2
  );

  const handleReadMoreToggle = (reviewId) => {
    setExpandedState((prevState) => ({
      ...prevState,
      [reviewId]: !prevState[reviewId], 
    }));
  };

  return (
    <div className="p-3 border-1 rounded ms-5 text-center">
      <h5 className="fw-bold mb-2" style={{ color: "var(--color-orange)" }}>Κριτικές</h5>

      {currentItems.map((review, index) => (
        <ReviewCard
          key={review.id || index} 
          review={review}
          isExpanded={expandedState[review.id]}
          onReadMoreToggle={() => handleReadMoreToggle(review.id)} 
        />
      ))}

      {/* Pagination Controls */}
      <Pagination className="justify-content-center mt-3">
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
        {currentPage > 2 && (
          <>
            <Pagination.Item onClick={() => handlePageChange(1)}>1</Pagination.Item>
            {currentPage > 3 && <Pagination.Ellipsis />}
          </>
        )}
        {currentPage > 1 && (
          <Pagination.Item onClick={() => handlePageChange(currentPage - 1)}>{currentPage - 1}</Pagination.Item>
        )}
        <Pagination.Item active>{currentPage}</Pagination.Item>
        {currentPage < totalPages && (
          <Pagination.Item onClick={() => handlePageChange(currentPage + 1)}>{currentPage + 1}</Pagination.Item>
        )}
        {currentPage < totalPages - 1 && (
          <>
            {currentPage < totalPages - 2 && <Pagination.Ellipsis />}
            <Pagination.Item onClick={() => handlePageChange(totalPages)}>{totalPages}</Pagination.Item>
          </>
        )}
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
      </Pagination>

      <div className="mt-2">
        <OrangeButton text="Πρόσθεσε κριτική" size="btn-md" onClick={() => setShow(true)} />
      </div>

      <ReviewModal
        show={show}
        handleClose={() => setShow(false)}
        handleSubmit={() => {}}
        newReview={newReview}
        setNewReview={setNewReview}
        handleRatingChange={() => {}}
      />
    </div>
  );
};



export default Reviews;
